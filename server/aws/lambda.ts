import {
  LambdaClient,
  InvokeCommand,
  CreateFunctionCommand,
  UpdateFunctionCodeCommand,
  ListFunctionsCommand,
  DeleteFunctionCommand,
  FunctionConfiguration
} from "@aws-sdk/client-lambda";

// Configurações do Lambda
const region = process.env.AWS_REGION || 'us-east-1';
const lambdaClient = new LambdaClient({ region });

/**
 * Invoca uma função Lambda
 * @param functionName - Nome da função Lambda a ser invocada
 * @param payload - Dados a serem enviados para a função (objeto JSON)
 * @param invocationType - Tipo de invocação (RequestResponse, Event, DryRun)
 */
export async function invokeLambda(
  functionName: string,
  payload: Record<string, any>,
  invocationType: 'RequestResponse' | 'Event' | 'DryRun' = 'RequestResponse'
) {
  try {
    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: Buffer.from(JSON.stringify(payload)),
      InvocationType: invocationType
    });

    const response = await lambdaClient.send(command);
    
    if (response.Payload) {
      const responsePayload = Buffer.from(response.Payload).toString('utf-8');
      try {
        return JSON.parse(responsePayload);
      } catch (e) {
        return responsePayload;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Erro ao invocar função Lambda ${functionName}:`, error);
    throw new Error(`Falha ao invocar Lambda: ${error.message}`);
  }
}

/**
 * Lista todas as funções Lambda disponíveis
 */
export async function listLambdaFunctions() {
  try {
    const command = new ListFunctionsCommand({});
    const response = await lambdaClient.send(command);
    
    if (response.Functions) {
      return response.Functions.map((fn: FunctionConfiguration) => ({
        name: fn.FunctionName,
        arn: fn.FunctionArn,
        runtime: fn.Runtime,
        description: fn.Description,
        lastModified: fn.LastModified,
        memorySize: fn.MemorySize,
        timeout: fn.Timeout
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao listar funções Lambda:', error);
    throw new Error(`Falha ao listar funções: ${error.message}`);
  }
}

/**
 * Cria uma nova função Lambda
 * @param functionName - Nome da função
 * @param zipFile - Buffer contendo o arquivo ZIP com o código da função
 * @param handler - Nome do manipulador (ex: 'index.handler')
 * @param role - ARN do papel IAM que a função Lambda assumirá
 * @param runtime - Runtime da função (ex: 'nodejs18.x')
 */
export async function createLambdaFunction(
  functionName: string,
  zipFile: Buffer,
  handler: string,
  role: string,
  runtime: string = 'nodejs18.x'
) {
  try {
    const command = new CreateFunctionCommand({
      FunctionName: functionName,
      Code: {
        ZipFile: zipFile
      },
      Handler: handler,
      Role: role,
      Runtime: runtime,
      Description: `Lambda function for AviatorStore: ${functionName}`,
      Timeout: 30,
      MemorySize: 128,
      Publish: true
    });
    
    const response = await lambdaClient.send(command);
    return response;
  } catch (error) {
    console.error(`Erro ao criar função Lambda ${functionName}:`, error);
    throw new Error(`Falha ao criar função Lambda: ${error.message}`);
  }
}

/**
 * Atualiza o código de uma função Lambda existente
 * @param functionName - Nome da função Lambda
 * @param zipFile - Buffer contendo o arquivo ZIP com o código atualizado
 */
export async function updateLambdaFunction(
  functionName: string,
  zipFile: Buffer
) {
  try {
    const command = new UpdateFunctionCodeCommand({
      FunctionName: functionName,
      ZipFile: zipFile,
      Publish: true
    });
    
    const response = await lambdaClient.send(command);
    return response;
  } catch (error) {
    console.error(`Erro ao atualizar função Lambda ${functionName}:`, error);
    throw new Error(`Falha ao atualizar função Lambda: ${error.message}`);
  }
}

/**
 * Remove uma função Lambda
 * @param functionName - Nome da função Lambda a ser removida
 */
export async function deleteLambdaFunction(functionName: string) {
  try {
    const command = new DeleteFunctionCommand({
      FunctionName: functionName
    });
    
    const response = await lambdaClient.send(command);
    return response;
  } catch (error) {
    console.error(`Erro ao remover função Lambda ${functionName}:`, error);
    throw new Error(`Falha ao remover função Lambda: ${error.message}`);
  }
}