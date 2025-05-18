import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, TagIcon, Clock, User, ChevronLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dados de exemplo para posts de blog
const blogPosts = [
  {
    id: 1,
    title: "A História do Avro Lancaster: Uma Lenda da Aviação",
    slug: "historia-avro-lancaster",
    excerpt: "Descubra a fascinante história por trás do icônico bombardeiro britânico da Segunda Guerra Mundial, o Avro Lancaster.",
    content: `
      <p class="mb-4">O Avro Lancaster é uma das aeronaves mais icônicas implantadas na Segunda Guerra Mundial. Sua forma inconfundível e o rugido de seus quatro motores Rolls Royce Merlin só podem ser experimentados ao ver os dois exemplares ainda em condições de voo no mundo. Um está na Inglaterra e outro está baseado no Museu Canadense de Aviação de Guerra em Hamilton, Ontário.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Origens do Design</h2>
      <p class="mb-4">O Lancaster foi projetado pelo talentoso engenheiro aeronáutico Roy Chadwick e entrou em serviço com o Comando de Bombardeio da RAF em 1942. Era uma evolução do seu antecessor, o Avro Manchester, que sofria de problemas de confiabilidade em seus motores.</p>
      <p class="mb-4">Com envergadura de 31 metros e comprimento de 21 metros, o Lancaster podia transportar uma impressionante carga de bombas de até 6.350 kg. Isto incluía a massiva bomba "Grand Slam" de 10.000 kg, a mais pesada usada durante a guerra.</p>
      
      <div class="my-8">
        <img 
          src="https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg" 
          alt="Avro Lancaster em voo" 
          class="rounded-lg w-full"
        />
        <p class="text-sm text-gray-500 mt-2">Um dos raros Avro Lancaster ainda em condições de voo atualmente.</p>
      </div>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Impacto na Guerra</h2>
      <p class="mb-4">Os Lancasters formaram a espinha dorsal do esforço de bombardeio estratégico britânico contra a Alemanha nazista. Ao longo da guerra, eles voaram mais de 156.000 missões e lançaram mais de 600.000 toneladas de bombas.</p>
      <p class="mb-4">Conhecido por sua resistência e confiabilidade, o Lancaster teve uma taxa de perdas notavelmente baixa em comparação com outros bombardeiros contemporâneos. Sua considerável capacidade defensiva e habilidade de voar em grandes formações ofereciam alguma proteção contra caças inimigos e fogo antiaéreo.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Legado</h2>
      <p class="mb-4">O Lancaster deixou um legado duradouro na história da aviação. Após a guerra, muitos foram convertidos para uso civil, realizando reconhecimento fotográfico, pesquisa meteorológica e voos de busca e resgate.</p>
      <p class="mb-4">Hoje, o Lancaster permanece como um símbolo da resiliência e engenhosidade britânicas durante um dos períodos mais desafiadores da história moderna. Em homenagem a esta icônica aeronave, nossa camiseta Avro Lancaster de manga comprida apresenta as cores da cauda do CGVRA no braço superior esquerdo e vem em nossa cor Azul da Força Aérea.</p>
    `,
    image: "https://redcanoebrands.com/wp-content/uploads/2019/10/M-LST-AVL-NY_lifestyle1.jpg",
    author: {
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Historiador de aviação e escritor especializado em aeronaves militares da Segunda Guerra Mundial."
    },
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
    content: `
      <p class="mb-4">O Boeing 747 'Jumbo Jet' mudou o mundo, incentivando viagens aéreas para as massas e permitindo voos sem escalas entre cidades distantes em todo o mundo. Em fevereiro de 1969, o primeiro 747 - número de série 001 sobrevoou o estado de Washington Ocidental.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">A Visão de Juan Trippe e Joe Sutter</h2>
      <p class="mb-4">O 747 nasceu da visão de Juan Trippe, então CEO da Pan American World Airways, que queria um avião significativamente maior que qualquer outro em serviço. A Boeing aceitou o desafio, e o engenheiro-chefe Joe Sutter liderou a equipe que criaria o que seria conhecido como "o rei dos céus".</p>
      
      <div class="my-8">
        <img 
          src="https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL_lifestyle1.jpg" 
          alt="Boeing 747 em voo" 
          class="rounded-lg w-full"
        />
        <p class="text-sm text-gray-500 mt-2">O icônico perfil do Boeing 747 revolucionou as viagens aéreas comerciais.</p>
      </div>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Uma Fábrica para Um Avião</h2>
      <p class="mb-4">O 747 era tão grande que a Boeing teve que construir uma nova fábrica em Everett, Washington - a maior edificação por volume no mundo na época - apenas para montá-lo. Esta instalação massiva continua sendo usada hoje para a produção de aeronaves Boeing de fuselagem larga.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Revolução nas Viagens Aéreas</h2>
      <p class="mb-4">Com capacidade para transportar mais de 400 passageiros, o 747 reduziu drasticamente o custo por assento das viagens aéreas. Isto permitiu que as companhias aéreas oferecessem passagens mais baratas, tornando as viagens intercontinentais acessíveis para um segmento muito maior da população mundial.</p>
      <p class="mb-4">O design de dois andares do 747, com sua icônica "corcova", também introduziu o conceito de classes diferentes dentro da mesma aeronave. A área superior frequentemente abrigava lounges de primeira classe ou assentos premium, estabelecendo um novo padrão para viagens de luxo.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Legado Duradouro</h2>
      <p class="mb-4">Ao longo de mais de cinco décadas de produção, o Boeing 747 se tornou um símbolo de engenharia e inovação americanas. Embora sua produção tenha terminado em 2022, o 747 deixou um legado indelével no mundo da aviação e na forma como as pessoas viajam e se conectam globalmente.</p>
      <p class="mb-4">Nossa camiseta Boeing celebra este gigante marco na Aviação, homenageando a visão e engenhosidade que conectou o mundo de maneiras que antes pareciam impossíveis.</p>
    `,
    image: "https://redcanoebrands.com/wp-content/uploads/2018/11/M-SST-BOEING-CA-SL_lifestyle1.jpg",
    author: {
      name: "Maria Oliveira",
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Engenheira aeronáutica e consultora especializada em história da aviação comercial."
    },
    date: "2024-05-05",
    readTime: "10 min",
    category: "Aviação Comercial",
    tags: ["boeing", "747", "aviação comercial", "jumbo jet"]
  }
];

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const [match, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const currentLanguage = i18n.language || 'pt';
  
  useEffect(() => {
    if (params && params.slug) {
      const foundPost = blogPosts.find(p => p.slug === params.slug);
      setPost(foundPost || null);
      
      if (foundPost) {
        // Encontrar posts relacionados por categoria ou tags
        const related = blogPosts
          .filter(p => p.id !== foundPost.id)
          .filter(p => p.category === foundPost.category || 
                    p.tags.some(tag => foundPost.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [params]);

  if (!post) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('blog.postNotFound')}</h1>
        <p className="mb-8">{currentLanguage === 'pt' ? 
          'O artigo que você está procurando não foi encontrado.' : 
          'The article you are looking for could not be found.'}</p>
        <Button asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Aviator Store Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag: string) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <div className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <TagIcon className="w-4 h-4 mr-1" />
              {post.category}
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="prose prose-lg max-w-none mb-12" 
                 dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="border-t border-border pt-6 mt-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground mr-2">{t('blog.sharePost')}:</span>
                  <Button variant="outline" size="icon" aria-label="Share on Facebook">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{t('blog.recentPosts')}</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((rPost) => (
                      <div key={rPost.id} className="flex items-start space-x-4">
                        <img 
                          src={rPost.image} 
                          alt={rPost.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                            <Link href={`/blog/${rPost.slug}`}>
                              {rPost.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(rPost.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">{t('blog.tags')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Link 
                          key={tag} 
                          href={`/blog?tag=${tag}`}
                          className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}