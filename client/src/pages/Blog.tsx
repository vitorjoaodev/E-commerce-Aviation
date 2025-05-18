import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, TagIcon, Clock, User } from 'lucide-react';

// Dados de exemplo para posts de blog
const blogPosts = [
  {
    id: 1,
    title: "A História do Avro Lancaster: Uma Lenda da Aviação",
    slug: "historia-avro-lancaster",
    excerpt: "Descubra a fascinante história por trás do icônico bombardeiro britânico da Segunda Guerra Mundial, o Avro Lancaster.",
    content: "O Avro Lancaster é uma das aeronaves mais icônicas implantadas na Segunda Guerra Mundial. Sua forma inconfundível e o rugido de seus quatro motores Rolls Royce Merlin só podem ser experimentados ao ver os dois exemplares ainda em condições de voo no mundo. Um está na Inglaterra e outro está baseado no Museu Canadense de Aviação de Guerra em Hamilton, Ontário...",
    image: "https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg",
    author: "João Silva",
    date: "2024-05-10",
    readTime: "8 min",
    category: "História da Aviação",
    tags: ["lancaster", "segunda guerra", "história", "aviões militares"]
  },
  {
    id: 2,
    title: "Como a Boeing Mudou a História da Aviação Comercial",
    slug: "boeing-historia-aviacao-comercial",
    excerpt: "Um olhar sobre como o Boeing 747 'Jumbo Jet' revolucionou as viagens aéreas e conectou o mundo.",
    content: "O Boeing 747 'Jumbo Jet' mudou o mundo, incentivando viagens aéreas para as massas e permitindo voos sem escalas entre cidades distantes em todo o mundo. Em fevereiro de 1969, o primeiro 747 - número de série 001 sobrevoou o estado de Washington Ocidental...",
    image: "https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL_lifestyle1.jpg",
    author: "Maria Oliveira",
    date: "2024-05-05",
    readTime: "10 min",
    category: "Aviação Comercial",
    tags: ["boeing", "747", "aviação comercial", "jumbo jet"]
  },
  {
    id: 3,
    title: "O Futuro da Moda Inspirada em Aviação",
    slug: "futuro-moda-aviacao",
    excerpt: "Tendências emergentes na moda que celebram o legado da aviação e inspiram as próximas gerações.",
    content: "A moda inspirada na aviação tem um apelo atemporal que continua a evoluir com as novas tendências e tecnologias. Desde os casacos de bombardeiro vintage até as camisetas modernas com designs de aeronaves clássicas, a influência da aviação na moda permanece forte...",
    image: "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-BOEING-flight-jacket.jpg",
    author: "Carlos Mendes",
    date: "2024-04-28",
    readTime: "6 min",
    category: "Moda & Estilo",
    tags: ["moda", "tendências", "estilo aviador", "jaquetas de voo"]
  },
  {
    id: 4,
    title: "Mulheres Pioneiras na História da Aviação",
    slug: "mulheres-pioneiras-aviacao",
    excerpt: "Conheça as histórias inspiradoras das mulheres que desafiaram convenções e fizeram história nos céus.",
    content: "A Beechcraft foi fundada no Kansas em 1932 pelo casal Walter Beech e Olive Ann Beech. Na época, Olive Ann Beech ganhou mais prêmios, nomeações e citações do que qualquer outra mulher na história da aviação. Mas ela não estava sozinha. Mulheres como Amelia Earhart, Bessie Coleman e Jacqueline Cochran abriram caminho nos céus quando poucos acreditavam que mulheres poderiam pilotar...",
    image: "https://redcanoebrands.com/wp-content/uploads/2015/10/M-SST-BEECH-01-NY-LG_detail.jpg",
    author: "Ana Carolina Santos",
    date: "2024-04-20",
    readTime: "12 min",
    category: "História da Aviação",
    tags: ["mulheres na aviação", "pioneiras", "história", "beechcraft"]
  }
];

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filtrar posts por categoria
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Extrair categorias únicas
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  return (
    <>
      <Helmet>
        <title>Blog | Aviator Store - Histórias e Inspirações da Aviação</title>
        <meta name="description" content="Explore histórias fascinantes sobre aviação, moda inspirada em aeronaves clássicas e o legado dos pioneiros que conquistaram os céus." />
        <meta property="og:title" content="Blog | Aviator Store" />
        <meta property="og:description" content="Histórias e inspirações da aviação para os aventureiros modernos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aviatorstore.com/blog" />
        <meta property="og:image" content="https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg" />
      </Helmet>

      <section className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Histórias fascinantes sobre aviação, moda inspirada em aeronaves clássicas e o legado dos pioneiros que conquistaram os céus.
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {categories.map((category, index) => (
                <TabsTrigger key={index} value={category} className="capitalize">
                  {category === "all" ? "Todas" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden h-full flex flex-col">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="font-bold text-xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    {t('blog.readMore')}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}