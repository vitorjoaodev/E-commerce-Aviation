// Exporta todos os serviços AWS em um único módulo
export * from './s3';
export * from './cloudfront';
export * from './lambda';

// Exporta um objeto com todos os serviços agrupados
import * as S3 from './s3';
import * as CloudFront from './cloudfront';
import * as Lambda from './lambda';

export const AWS = {
  S3,
  CloudFront,
  Lambda
};

// Informações sobre a configuração AWS
export const getAWSConfig = () => {
  return {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ? '***************' : undefined,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? '***************' : undefined,
    },
    configured: !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION)
  };
};