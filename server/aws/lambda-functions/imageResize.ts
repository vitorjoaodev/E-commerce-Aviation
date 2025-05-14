import { Handler } from 'aws-lambda';
import { S3Event } from 'aws-lambda';

/**
 * Função Lambda para processar e redimensionar imagens
 * 
 * Esta função é acionada quando uma nova imagem é carregada no S3
 * Ela redimensiona a imagem em múltiplos tamanhos e salva as versões redimensionadas
 */
export const handler: Handler = async (event: S3Event, context) => {
  try {
    console.log('Evento S3 recebido:', JSON.stringify(event));
    
    // Extrair informações do bucket e da chave do arquivo
    const records = event.Records || [];
    
    const processedImages = [];
    
    for (const record of records) {
      const bucket = record.s3.bucket.name;
      const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
      
      console.log(`Processando imagem: s3://${bucket}/${key}`);
      
      // Verificar se é uma imagem
      if (!key.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        console.log(`Arquivo não é uma imagem: ${key}`);
        continue;
      }
      
      // Aqui ocorreria o real processamento da imagem:
      // 1. Download da imagem original do S3
      // 2. Redimensionamento para múltiplos tamanhos (ex: thumb, medium, large)
      // 3. Upload das versões redimensionadas para o S3
      
      // Simulação de processamento
      const processingTime = Math.floor(Math.random() * 1000) + 500; // 500-1500ms
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Adicionar informações da imagem processada
      processedImages.push({
        bucket,
        originalKey: key,
        sizes: {
          thumb: key.replace(/(\.[^.]+)$/, '-thumb$1'),
          medium: key.replace(/(\.[^.]+)$/, '-medium$1'),
          large: key.replace(/(\.[^.]+)$/, '-large$1')
        },
        success: true
      });
    }
    
    // Retornar informações sobre as imagens processadas
    return {
      success: true,
      message: `Processados ${processedImages.length} arquivos`,
      processedImages,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao processar imagens:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};