import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { Readable } from "stream";

// Configurações do S3
const region = process.env.AWS_REGION || 'us-east-1';
const s3Client = new S3Client({ region });

// Bucket padrão para armazenamento de arquivos
const DEFAULT_BUCKET = 'aviator-store-assets';

/**
 * Faz upload de um arquivo para o S3
 * @param fileKey - Caminho/nome do arquivo no S3
 * @param fileContent - Buffer, Readable ou blob do arquivo
 * @param contentType - MIME type do arquivo
 * @param bucket - Nome do bucket (opcional, usa o padrão se não especificado)
 */
export async function uploadFile(
  fileKey: string,
  fileContent: Buffer | Readable | Blob,
  contentType: string,
  bucket: string = DEFAULT_BUCKET
): Promise<string> {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucket,
        Key: fileKey,
        Body: fileContent,
        ContentType: contentType
      }
    });

    await upload.done();
    
    // Retorna a URL do arquivo
    return `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error('Erro ao fazer upload para o S3:', error);
    throw new Error(`Falha ao fazer upload do arquivo: ${error.message}`);
  }
}

/**
 * Obtém um arquivo do S3
 * @param fileKey - Caminho/nome do arquivo no S3
 * @param bucket - Nome do bucket (opcional, usa o padrão se não especificado)
 */
export async function getFile(
  fileKey: string,
  bucket: string = DEFAULT_BUCKET
): Promise<Readable> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: fileKey
    });

    const response = await s3Client.send(command);
    return response.Body as Readable;
  } catch (error) {
    console.error('Erro ao obter arquivo do S3:', error);
    throw new Error(`Falha ao obter o arquivo: ${error.message}`);
  }
}

/**
 * Deleta um arquivo do S3
 * @param fileKey - Caminho/nome do arquivo no S3
 * @param bucket - Nome do bucket (opcional, usa o padrão se não especificado)
 */
export async function deleteFile(
  fileKey: string,
  bucket: string = DEFAULT_BUCKET
): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: fileKey
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Erro ao deletar arquivo do S3:', error);
    throw new Error(`Falha ao deletar o arquivo: ${error.message}`);
  }
}

/**
 * Lista os arquivos em um diretório do S3
 * @param prefix - Prefixo para filtrar os arquivos (como um diretório)
 * @param bucket - Nome do bucket (opcional, usa o padrão se não especificado)
 */
export async function listFiles(
  prefix: string,
  bucket: string = DEFAULT_BUCKET
): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix
    });

    const response = await s3Client.send(command);
    
    if (response.Contents) {
      return response.Contents.map(item => item.Key).filter(Boolean) as string[];
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao listar arquivos do S3:', error);
    throw new Error(`Falha ao listar arquivos: ${error.message}`);
  }
}

/**
 * Gera uma URL pré-assinada para acesso a um arquivo específico
 * @param fileKey - Caminho/nome do arquivo no S3
 * @param bucket - Nome do bucket (opcional, usa o padrão se não especificado)
 * @param expiresInSeconds - Tempo de expiração da URL em segundos (padrão: 3600 = 1 hora)
 */
export function getFileUrl(
  fileKey: string,
  bucket: string = DEFAULT_BUCKET
): string {
  return `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;
}