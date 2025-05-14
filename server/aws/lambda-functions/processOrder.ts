import { Handler } from 'aws-lambda';

/**
 * Função Lambda para processar pedidos
 * 
 * Esta função processa o pagamento e atualiza o inventário ao receber um novo pedido
 */
export const handler: Handler = async (event, context) => {
  try {
    console.log('Processando pedido:', JSON.stringify(event));
    
    // Extrair dados do pedido
    const { orderId, items, customerInfo, paymentInfo } = event;
    
    // Verificar dados obrigatórios
    if (!orderId || !items || !customerInfo) {
      throw new Error('Dados de pedido incompletos');
    }
    
    // Simulação de processamento (em uma aplicação real, aqui ocorreria:)
    // 1. Processamento do pagamento
    // 2. Atualização do inventário
    // 3. Envio de confirmação por e-mail
    const processingTime = Math.floor(Math.random() * 500) + 100; // 100-600ms
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Resultado do processamento
    const success = Math.random() > 0.05; // 95% de sucesso
    
    if (!success) {
      throw new Error('Falha no processamento do pagamento');
    }
    
    // Simular status de pagamento
    const paymentStatus = 'approved';
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    // Retornar o resultado do processamento
    return {
      success: true,
      orderId,
      status: 'processed',
      message: 'Pedido processado com sucesso',
      paymentStatus,
      transactionId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};