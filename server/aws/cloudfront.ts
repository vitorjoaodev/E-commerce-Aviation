import {
  CloudFrontClient,
  CreateInvalidationCommand,
  ListDistributionsCommand,
  GetDistributionConfigCommand,
  UpdateDistributionCommand
} from "@aws-sdk/client-cloudfront";

// Configurações do CloudFront
const region = process.env.AWS_REGION || 'us-east-1';
const cloudfrontClient = new CloudFrontClient({ region });

/**
 * Obtém a lista de distribuições CloudFront disponíveis
 */
export async function listDistributions() {
  try {
    const command = new ListDistributionsCommand({});
    const response = await cloudfrontClient.send(command);
    
    if (response.DistributionList && response.DistributionList.Items) {
      return response.DistributionList.Items.map(item => ({
        id: item.Id,
        domainName: item.DomainName,
        enabled: item.Enabled,
        status: item.Status,
        origins: item.Origins?.Items?.map(origin => origin.DomainName) || []
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao listar distribuições CloudFront:', error);
    throw new Error(`Falha ao listar distribuições: ${error.message}`);
  }
}

/**
 * Invalida o cache do CloudFront para um conjunto de caminhos
 * @param distributionId - ID da distribuição CloudFront
 * @param paths - Caminhos a serem invalidados (ex: ['/images/*', '/css/main.css'])
 */
export async function invalidateCache(
  distributionId: string,
  paths: string[]
) {
  try {
    const callerReference = new Date().getTime().toString();
    
    const command = new CreateInvalidationCommand({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: callerReference,
        Paths: {
          Quantity: paths.length,
          Items: paths
        }
      }
    });
    
    const response = await cloudfrontClient.send(command);
    return response.Invalidation;
  } catch (error) {
    console.error('Erro ao invalidar cache CloudFront:', error);
    throw new Error(`Falha ao invalidar cache: ${error.message}`);
  }
}

/**
 * Obtém a URL completa para um arquivo utilizando o domínio do CloudFront
 * @param distributionDomain - Domínio da distribuição CloudFront
 * @param filePath - Caminho do arquivo
 */
export function getCloudFrontUrl(
  distributionDomain: string,
  filePath: string
): string {
  // Assegura que o caminho comece com '/'
  const path = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return `https://${distributionDomain}${path}`;
}

/**
 * Atualiza configurações de uma distribuição CloudFront
 * @param distributionId - ID da distribuição CloudFront
 * @param updateConfig - Função que recebe a configuração atual e retorna a configuração atualizada
 */
export async function updateDistribution(
  distributionId: string,
  updateConfig: (config: any) => any
) {
  try {
    // Primeiro, obtém a configuração atual
    const getConfigCommand = new GetDistributionConfigCommand({
      Id: distributionId
    });
    
    const configResponse = await cloudfrontClient.send(getConfigCommand);
    
    if (!configResponse.DistributionConfig || !configResponse.ETag) {
      throw new Error('Não foi possível obter a configuração da distribuição');
    }
    
    // Atualiza a configuração
    const updatedConfig = updateConfig(configResponse.DistributionConfig);
    
    // Aplica a configuração atualizada
    const updateCommand = new UpdateDistributionCommand({
      Id: distributionId,
      IfMatch: configResponse.ETag,
      DistributionConfig: updatedConfig
    });
    
    const response = await cloudfrontClient.send(updateCommand);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar distribuição CloudFront:', error);
    throw new Error(`Falha ao atualizar distribuição: ${error.message}`);
  }
}