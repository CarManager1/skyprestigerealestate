import type { PropertyType } from './types'

export const BRAND = {
  name: 'SkyPrestige',
  fullName: 'SkyPrestige Realestate',
  tagline: 'Imobiliária de Prestígio',
  description:
    'Uma curadoria de imóveis de exceção — apartamentos, moradias e penthouses selecionados para quem procura viver acima da média.',
  phone: '+351 210 000 000',
  phoneHref: '+351210000000',
  email: 'contacto@skyprestige.pt',
  whatsapp: '+351 910 000 000',
  address: 'Avenida da Liberdade 250, 1250-149 Lisboa',
  hours: 'Segunda a Sábado · 09h00 – 19h00',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/sobre', label: 'Sobre Nós' },
  { href: '/contacto', label: 'Contacto' },
] as const

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'escritorio', label: 'Escritório' },
  { value: 'loja', label: 'Loja' },
  { value: 'terreno', label: 'Terreno' },
]

export const CITIES = [
  'Lisboa',
  'Cascais',
  'Oeiras',
  'Sintra',
  'Porto',
  'Vila Nova de Gaia',
  'Faro',
  'Albufeira',
]

export const STATS = [
  { value: '18+', label: 'Anos de experiência' },
  { value: '420+', label: 'Imóveis transacionados' },
  { value: '€380M', label: 'Em vendas fechadas' },
  { value: '98%', label: 'Clientes satisfeitos' },
]

export const VALUES = [
  {
    title: 'Curadoria Exigente',
    description:
      'Só aceitamos no nosso portefólio imóveis que cumprem os mais altos padrões de localização, construção e potencial de valorização.',
  },
  {
    title: 'Discrição & Confiança',
    description:
      'Trabalhamos com total confidencialidade, protegendo a privacidade de compradores, vendedores e investidores.',
  },
  {
    title: 'Rede Internacional',
    description:
      'Ligamos clientes portugueses e internacionais através de uma rede de parceiros em toda a Europa.',
  },
  {
    title: 'Acompanhamento Total',
    description:
      'Da primeira visita à escritura, um consultor dedicado acompanha cada etapa do processo.',
  },
]

export const FAQS = [
  {
    question: 'Como posso agendar uma visita a um imóvel?',
    answer:
      'Basta preencher o formulário de contacto na página do imóvel ou ligar diretamente para a nossa equipa. Respondemos em menos de 24 horas.',
  },
  {
    question: 'A SkyPrestige trabalha com compradores internacionais?',
    answer:
      'Sim. Temos experiência a acompanhar clientes de fora de Portugal em todo o processo, incluindo apoio jurídico e fiscal através de parceiros de confiança.',
  },
  {
    question: 'Como funciona a avaliação de um imóvel para venda?',
    answer:
      'Realizamos uma avaliação gratuita e sem compromisso, com base em dados de mercado, localização e características do imóvel.',
  },
  {
    question: 'Que comissão cobra a SkyPrestige?',
    answer:
      'A comissão é definida caso a caso consoante o tipo de mandato. Contacte-nos para uma proposta personalizada.',
  },
]

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = Object.fromEntries(
  PROPERTY_TYPES.map((t) => [t.value, t.label])
) as Record<PropertyType, string>
