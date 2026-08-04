export interface TechnologyCatalogItem {
  name: string;
  src: string | null;
  type?: 'frontend' | 'backend' | 'all';
}

export const technologyCatalog: TechnologyCatalogItem[] = [
  { name: 'HTML', src: '/assets/icons/technologies/html5.png', type: 'frontend' },
  { name: 'CSS', src: '/assets/icons/technologies/css.png', type: 'frontend' },
  { name: 'JavaScript', src: '/assets/icons/technologies/js.png', type: 'all' },
  { name: 'TypeScript', src: '/assets/icons/technologies/tss.png', type: 'all' },
  { name: 'SEO', src: '/assets/icons/technologies/seo_no_bg.png', type: 'frontend' },
  { name: 'Vue', src: '/assets/icons/technologies/vue.png', type: 'frontend' },
  { name: 'Nuxt', src: '/assets/icons/technologies/nuxt.png', type: 'frontend' },
  { name: 'Quasar', src: '/assets/icons/technologies/quasar.png', type: 'frontend' },
  { name: 'Nuxt UI', src: '/assets/icons/technologies/nuxt_ui.svg', type: 'frontend' },
  { name: 'Shadcn', src: '/assets/icons/technologies/shadcn.jpg', type: 'frontend' },
  { name: 'Tailwind', src: '/assets/icons/technologies/tailwind.svg', type: 'frontend' },
  { name: 'React', src: '/assets/icons/technologies/react.png', type: 'frontend' },
  { name: 'PHP', src: '/assets/icons/technologies/php.png', type: 'backend' },
  { name: 'Laravel', src: '/assets/icons/technologies/laravel.png', type: 'backend' },
  { name: 'SQL', src: '/assets/icons/technologies/sql.png', type: 'backend' },
  { name: 'ORM', src: '/assets/icons/technologies/orm.svg', type: 'backend' },
  { name: 'REST', src: '/assets/icons/technologies/rest.png', type: 'backend' },
  { name: 'gRPC', src: '/assets/icons/technologies/grpc.svg', type: 'backend' },
  { name: 'GraphQL', src: '/assets/icons/technologies/graphql.png', type: 'backend' },
  { name: 'WebSocket', src: '/assets/icons/technologies/websocket.svg', type: 'backend' },
  { name: 'Redis', src: '/assets/icons/technologies/redis.svg', type: 'backend' },
  { name: 'NX', src: '/assets/icons/technologies/nx.png', type: 'all' },
  { name: 'Node', src: '/assets/icons/technologies/node.png', type: 'backend' },
  { name: 'Express', src: '/assets/icons/technologies/express.webp', type: 'backend' },
  { name: 'Nest', src: '/assets/icons/technologies/nest.webp', type: 'backend' },
  { name: 'Adonis.js', src: '/assets/icons/technologies/adonis.png', type: 'backend' },
  { name: 'Bootstrap', src: '/assets/icons/technologies/bootstrap.png', type: 'frontend' },
  { name: 'Git', src: '/assets/icons/technologies/git.png' },
  { name: 'Docker', src: '/assets/icons/technologies/docker.png' },
  { name: 'Jenkins', src: '/assets/icons/technologies/jenkins.svg' },
  { name: 'GitHub Actions', src: '/assets/icons/technologies/github_actions.svg' },
  { name: 'Agile', src: '/assets/icons/technologies/agile.svg' },
  { name: 'Scrum', src: '/assets/icons/technologies/scrum.svg' },
  { name: 'AWS', src: '/assets/icons/technologies/aws.svg' },
  { name: 'Terraform', src: '/assets/icons/technologies/terraform.svg' },
  { name: 'SSR', src: '/assets/icons/technologies/ssr.svg', type: 'frontend' },
  { name: 'Shopify', src: '/assets/icons/technologies/shopify.svg', type: 'frontend' },
];

export function getTechnologiesByNames(names: string[]): TechnologyCatalogItem[] {
  return names.map((name) =>
    technologyCatalog.find((item) => item.name === name) ?? { name, src: null },
  );
}
