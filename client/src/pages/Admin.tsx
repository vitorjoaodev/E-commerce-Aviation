import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Helmet } from "react-helmet";
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [s3Files, setS3Files] = useState<string[]>([]);
  const [distributions, setDistributions] = useState<any[]>([]);
  const [lambdaFunctions, setLambdaFunctions] = useState<any[]>([]);
  const [awsConfig, setAwsConfig] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidationPaths, setInvalidationPaths] = useState<string>('/*');
  const [selectedDistribution, setSelectedDistribution] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Verifica se a AWS está configurada
  useEffect(() => {
    const checkAwsConfig = async () => {
      try {
        const response = await apiRequest('/api/aws/config', { method: 'GET' });
        setAwsConfig(response);
      } catch (error) {
        console.error('Erro ao verificar configuração AWS:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível verificar a configuração AWS.',
          variant: 'destructive'
        });
      }
    };

    checkAwsConfig();
  }, [toast]);

  // Função para listar arquivos do S3
  const listS3Files = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest('/api/aws/s3/list', { method: 'GET' });
      setS3Files(response?.files || []);
    } catch (error) {
      console.error('Erro ao listar arquivos S3:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível listar os arquivos do S3.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para listar distribuições CloudFront
  const listCloudFrontDistributions = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest('/api/aws/cloudfront/distributions', { method: 'GET' });
      setDistributions(response?.distributions || []);
      if (response?.distributions && response.distributions.length > 0) {
        setSelectedDistribution(response.distributions[0].id);
      }
    } catch (error) {
      console.error('Erro ao listar distribuições CloudFront:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível listar as distribuições CloudFront.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para listar funções Lambda
  const listLambdaFunctions = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest('/api/aws/lambda/functions', { method: 'GET' });
      setLambdaFunctions(response?.functions || []);
    } catch (error) {
      console.error('Erro ao listar funções Lambda:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível listar as funções Lambda.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manipula a seleção de arquivo
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Faz o upload de um arquivo para o S3
  const handleFileUpload = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: 'Aviso',
        description: 'Selecione um arquivo para fazer upload.',
        variant: 'default'
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      setIsUploading(true);
      
      const response = await fetch('/api/aws/s3/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Sucesso',
          description: 'Arquivo enviado com sucesso!',
          variant: 'default'
        });
        setSelectedFile(null);
        // Recarrega a lista de arquivos
        await listS3Files();
      } else {
        throw new Error(data.message || 'Erro ao fazer upload do arquivo');
      }
    } catch (error: any) {
      console.error('Erro ao fazer upload do arquivo:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível fazer upload do arquivo.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Invalidar cache do CloudFront
  const handleInvalidateCache = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!selectedDistribution) {
      toast({
        title: 'Aviso',
        description: 'Selecione uma distribuição CloudFront.',
        variant: 'default'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const paths = invalidationPaths.split(',').map(p => p.trim());
      
      const response = await apiRequest('/api/aws/cloudfront/invalidate', {
        method: 'POST',
        body: JSON.stringify({
          distributionId: selectedDistribution,
          paths
        })
      });
      
      toast({
        title: 'Sucesso',
        description: 'Invalidação de cache iniciada com sucesso!',
        variant: 'default'
      });
    } catch (error: any) {
      console.error('Erro ao invalidar cache:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível invalidar o cache.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simula o processamento de um pedido via Lambda
  const handleProcessOrder = async () => {
    try {
      setIsLoading(true);
      
      const mockOrder = {
        orderId: `ORD-${Date.now()}`,
        items: [
          { id: 1, name: 'Produto Teste', quantity: 1, price: 29.99 }
        ],
        customerInfo: {
          name: 'Cliente Teste',
          email: 'cliente@teste.com'
        },
        total: 29.99
      };
      
      const response = await apiRequest('/api/orders/process', {
        method: 'POST',
        body: JSON.stringify(mockOrder)
      });
      
      toast({
        title: 'Sucesso',
        description: `Pedido processado: ${response.orderId} - Status: ${response.status}`,
        variant: 'default'
      });
    } catch (error: any) {
      console.error('Erro ao processar pedido:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível processar o pedido.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administração AWS - AviatorX</title>
        <meta name="description" content="Painel de administração para integração com AWS" />
      </Helmet>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Administração AWS</h1>
        
        {!awsConfig.configured ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Configuração AWS</CardTitle>
              <CardDescription>A AWS não está configurada corretamente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Certifique-se de que as variáveis de ambiente AWS_ACCESS_KEY_ID, 
                AWS_SECRET_ACCESS_KEY e AWS_REGION estão configuradas.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="s3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="s3" onClick={listS3Files}>Armazenamento S3</TabsTrigger>
              <TabsTrigger value="cloudfront" onClick={listCloudFrontDistributions}>CDN CloudFront</TabsTrigger>
              <TabsTrigger value="lambda" onClick={listLambdaFunctions}>Funções Lambda</TabsTrigger>
            </TabsList>
            
            {/* Tab do S3 */}
            <TabsContent value="s3">
              <Card>
                <CardHeader>
                  <CardTitle>Armazenamento S3</CardTitle>
                  <CardDescription>
                    Gerencie arquivos no AWS S3
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Formulário de upload */}
                    <form onSubmit={handleFileUpload} className="flex flex-col sm:flex-row gap-4">
                      <Input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        disabled={!selectedFile || isUploading}
                      >
                        {isUploading ? 'Enviando...' : 'Fazer Upload'}
                      </Button>
                    </form>
                    
                    {/* Lista de arquivos */}
                    <div>
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-medium">Arquivos</h3>
                        <Button 
                          variant="outline" 
                          onClick={listS3Files} 
                          disabled={isLoading}
                        >
                          {isLoading ? 'Carregando...' : 'Atualizar'}
                        </Button>
                      </div>
                      
                      <div className="border rounded-md h-64 overflow-y-auto p-4">
                        {s3Files.length === 0 ? (
                          <p className="text-muted-foreground text-center mt-8">
                            {isLoading ? 'Carregando arquivos...' : 'Nenhum arquivo encontrado'}
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {s3Files.map((file, index) => (
                              <li key={index} className="text-sm border-b pb-1">
                                {file}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab do CloudFront */}
            <TabsContent value="cloudfront">
              <Card>
                <CardHeader>
                  <CardTitle>CDN CloudFront</CardTitle>
                  <CardDescription>
                    Gerencie distribuições e cache do CloudFront
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Distribuições */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Distribuições</h3>
                      
                      <div className="border rounded-md h-40 overflow-y-auto p-4 mb-6">
                        {distributions.length === 0 ? (
                          <p className="text-muted-foreground text-center mt-4">
                            {isLoading ? 'Carregando distribuições...' : 'Nenhuma distribuição encontrada'}
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {distributions.map((dist, index) => (
                              <li key={index} className="text-sm border-b pb-1">
                                <div className="flex justify-between">
                                  <span>{dist.domainName}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${dist.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {dist.enabled ? 'Ativo' : 'Inativo'}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ID: {dist.id}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    
                    {/* Formulário de invalidação de cache */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Invalidar Cache</h3>
                      
                      <form onSubmit={handleInvalidateCache} className="space-y-4">
                        <div>
                          <label htmlFor="distribution" className="block text-sm font-medium mb-1">
                            Distribuição
                          </label>
                          <select
                            id="distribution"
                            className="w-full border border-input bg-background p-2 rounded-md"
                            value={selectedDistribution}
                            onChange={(e) => setSelectedDistribution(e.target.value)}
                            disabled={distributions.length === 0}
                          >
                            {distributions.length === 0 ? (
                              <option value="">Nenhuma distribuição disponível</option>
                            ) : (
                              distributions.map((dist, index) => (
                                <option key={index} value={dist.id}>
                                  {dist.domainName} ({dist.id})
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="paths" className="block text-sm font-medium mb-1">
                            Caminhos (separados por vírgula)
                          </label>
                          <Input
                            id="paths"
                            value={invalidationPaths}
                            onChange={(e) => setInvalidationPaths(e.target.value)}
                            placeholder="/*,/images/*,/css/*"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Exemplo: /*, /images/*, /css/*
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          disabled={isLoading || distributions.length === 0}
                          className="w-full"
                        >
                          {isLoading ? 'Processando...' : 'Invalidar Cache'}
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab do Lambda */}
            <TabsContent value="lambda">
              <Card>
                <CardHeader>
                  <CardTitle>Funções Lambda</CardTitle>
                  <CardDescription>
                    Gerencie funções serverless na AWS Lambda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Lista de funções */}
                    <div>
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-medium">Funções</h3>
                        <Button 
                          variant="outline" 
                          onClick={listLambdaFunctions} 
                          disabled={isLoading}
                        >
                          {isLoading ? 'Carregando...' : 'Atualizar'}
                        </Button>
                      </div>
                      
                      <div className="border rounded-md h-40 overflow-y-auto p-4">
                        {lambdaFunctions.length === 0 ? (
                          <p className="text-muted-foreground text-center mt-4">
                            {isLoading ? 'Carregando funções...' : 'Nenhuma função encontrada'}
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {lambdaFunctions.map((fn, index) => (
                              <li key={index} className="text-sm border-b pb-1">
                                <div>{fn.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  Runtime: {fn.runtime}, Memória: {fn.memorySize}MB, Timeout: {fn.timeout}s
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    
                    {/* Testar função Lambda (Simulação) */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Testar processamento serverless</h3>
                      
                      <div className="border rounded-md p-4 bg-slate-50">
                        <p className="text-sm mb-4">
                          Este é um exemplo de como uma função Lambda pode processar pedidos em tempo real.
                          Pressione o botão abaixo para simular o processamento de um pedido.
                        </p>
                        
                        <Button 
                          onClick={handleProcessOrder} 
                          disabled={isLoading}
                          className="w-full"
                        >
                          {isLoading ? 'Processando...' : 'Simular Processamento de Pedido'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <p>
                    Para criar novas funções Lambda, use o console da AWS ou o AWS CLI.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
}