import { Express, Request, Response } from "express";
import * as AWS from "./aws";
import * as fs from "fs";
import * as path from "path";
import { Readable } from "stream";

/**
 * Registra rotas relacionadas aos serviços AWS
 */
export function registerAWSRoutes(app: Express) {
  
  // Obter configuração AWS
  app.get("/api/aws/config", (req, res) => {
    try {
      const config = AWS.getAWSConfig();
      res.json({
        configured: config.configured,
        region: config.region
      });
    } catch (error) {
      console.error("Erro ao obter configuração AWS:", error);
      res.status(500).json({ 
        message: "Erro ao obter configuração AWS", 
        error: error.message 
      });
    }
  });
  
  // Rota para upload de arquivos para o S3
  app.post("/api/aws/s3/upload", async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }
      
      const uploadedFile = req.files.file;
      const fileKey = `uploads/${Date.now()}-${uploadedFile.name}`;
      
      // Upload para o S3
      const fileUrl = await AWS.uploadFile(
        fileKey,
        uploadedFile.data,
        uploadedFile.mimetype
      );
      
      res.json({
        success: true,
        message: "Arquivo enviado com sucesso",
        fileKey,
        fileUrl
      });
    } catch (error) {
      console.error("Erro ao fazer upload para S3:", error);
      res.status(500).json({ 
        message: "Erro ao fazer upload para S3", 
        error: error.message 
      });
    }
  });
  
  // Rota para listar arquivos no S3
  app.get("/api/aws/s3/list", async (req, res) => {
    try {
      const prefix = req.query.prefix as string || "";
      const files = await AWS.listFiles(prefix);
      
      res.json({
        success: true,
        files
      });
    } catch (error) {
      console.error("Erro ao listar arquivos do S3:", error);
      res.status(500).json({ 
        message: "Erro ao listar arquivos do S3", 
        error: error.message 
      });
    }
  });
  
  // Rota para excluir arquivo do S3
  app.delete("/api/aws/s3/files/:key", async (req, res) => {
    try {
      const key = req.params.key;
      await AWS.deleteFile(key);
      
      res.json({
        success: true,
        message: `Arquivo ${key} excluído com sucesso`
      });
    } catch (error) {
      console.error(`Erro ao excluir arquivo ${req.params.key}:`, error);
      res.status(500).json({ 
        message: "Erro ao excluir arquivo", 
        error: error.message 
      });
    }
  });
  
  // Rota para listar distribuições CloudFront
  app.get("/api/aws/cloudfront/distributions", async (req, res) => {
    try {
      const distributions = await AWS.listDistributions();
      
      res.json({
        success: true,
        distributions
      });
    } catch (error) {
      console.error("Erro ao listar distribuições CloudFront:", error);
      res.status(500).json({ 
        message: "Erro ao listar distribuições CloudFront", 
        error: error.message 
      });
    }
  });
  
  // Rota para invalidar cache do CloudFront
  app.post("/api/aws/cloudfront/invalidate", async (req, res) => {
    try {
      const { distributionId, paths } = req.body;
      
      if (!distributionId || !paths || !Array.isArray(paths)) {
        return res.status(400).json({ 
          message: "Dados inválidos. Forneça distributionId e um array de paths" 
        });
      }
      
      const invalidation = await AWS.invalidateCache(distributionId, paths);
      
      res.json({
        success: true,
        message: "Invalidação de cache iniciada com sucesso",
        invalidation
      });
    } catch (error) {
      console.error("Erro ao invalidar cache CloudFront:", error);
      res.status(500).json({ 
        message: "Erro ao invalidar cache CloudFront", 
        error: error.message 
      });
    }
  });
  
  // Rota para listar funções Lambda
  app.get("/api/aws/lambda/functions", async (req, res) => {
    try {
      const functions = await AWS.listLambdaFunctions();
      
      res.json({
        success: true,
        functions
      });
    } catch (error) {
      console.error("Erro ao listar funções Lambda:", error);
      res.status(500).json({ 
        message: "Erro ao listar funções Lambda", 
        error: error.message 
      });
    }
  });
  
  // Rota para invocar uma função Lambda
  app.post("/api/aws/lambda/invoke/:functionName", async (req, res) => {
    try {
      const { functionName } = req.params;
      const payload = req.body;
      
      const result = await AWS.invokeLambda(functionName, payload);
      
      res.json({
        success: true,
        message: `Função ${functionName} invocada com sucesso`,
        result
      });
    } catch (error) {
      console.error(`Erro ao invocar função Lambda ${req.params.functionName}:`, error);
      res.status(500).json({ 
        message: `Erro ao invocar função Lambda ${req.params.functionName}`, 
        error: error.message 
      });
    }
  });
  
  // Rota de simulação para processar pedido via Lambda (para demonstração)
  app.post("/api/orders/process", async (req, res) => {
    try {
      const orderData = req.body;
      
      // Verificar dados mínimos
      if (!orderData.orderId || !orderData.items || !orderData.customerInfo) {
        return res.status(400).json({ 
          message: "Dados de pedido incompletos" 
        });
      }
      
      // Na produção, chamaríamos a função Lambda
      // Em desenvolvimento, simulamos o comportamento da função
      const processingTime = Math.floor(Math.random() * 500) + 100; // 100-600ms
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      const paymentStatus = 'approved';
      const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;
      
      res.json({
        success: true,
        orderId: orderData.orderId,
        status: 'processed',
        message: 'Pedido processado com sucesso',
        paymentStatus,
        transactionId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      res.status(500).json({ 
        message: "Erro ao processar pedido", 
        error: error.message 
      });
    }
  });
}