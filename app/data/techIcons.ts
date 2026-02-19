import { IconType } from 'react-icons'
import { 
  // Frontend Frameworks
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNuxtdotjs,

  // Languages  
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiPhp,
  SiRust,
  SiGo,
  SiSwift,
  SiKotlin,

  // Backend Frameworks
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiSpringboot,
  SiLaravel,
  SiRubyonrails,

  // Databases
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiSqlite,
  SiFirebase,
  SiSupabase,
  SiPrisma,

  // CSS & Styling
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiStyledcomponents,
  SiCss3,
  SiHtml5,

  // Build Tools
  SiWebpack,
  SiVite,
  SiEsbuild,

  // Cloud & Deployment  
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiAmazon,
  SiGooglecloud,
  SiHeroku,
  SiDigitalocean,

  // Developer Tools
  SiGit,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,

  // Testing
  SiJest,
  SiCypress,
  SiVitest,

  // State Management
  SiRedux,
  SiMobx,

  // Mobile Development
  SiFlutter,
  SiIonic,

  // APIs & Communication
  SiGraphql,
  SiApollographql,
  SiSocketdotio,

  // Package Managers
  SiNpm,
  SiYarn,
  SiPnpm,

  // IDEs & Editors
  SiIntellijidea,
  SiWebstorm,

  // OS
  SiMacos,
  SiLinux,
  SiUbuntu,

  // Other Tools
  SiFigma,
  SiPostman,
  SiNotion,
  SiSlack,
  SiDiscord,
} from 'react-icons/si'

export const techIcons: Record<string, IconType> = {
  // Frontend Frameworks
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Vue': SiVuedotjs,
  'Angular': SiAngular,
  'Svelte': SiSvelte,
  'Nuxt.js': SiNuxtdotjs,

  // Languages
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'C++': SiCplusplus,
  'PHP': SiPhp,
  'Rust': SiRust,
  'Go': SiGo,
  'Swift': SiSwift,
  'Kotlin': SiKotlin,

  // Backend Frameworks
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'NestJS': SiNestjs,
  'Django': SiDjango,
  'FastAPI': SiFastapi,
  'Flask': SiFlask,
  'Spring Boot': SiSpringboot,
  'Laravel': SiLaravel,
  'Ruby on Rails': SiRubyonrails,

  // Databases
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Redis': SiRedis,
  'SQLite': SiSqlite,
  'Firebase': SiFirebase,
  'Supabase': SiSupabase,
  'Prisma': SiPrisma,

  // CSS & Styling
  'Tailwind CSS': SiTailwindcss,
  
  'Bootstrap': SiBootstrap,
  'Sass': SiSass,
  
  'Styled Components': SiStyledcomponents,
  'CSS': SiCss3,
  
  'HTML': SiHtml5,
  'HTML5': SiHtml5,

  // Build Tools
  'Webpack': SiWebpack,
  'Vite': SiVite,
  'esbuild': SiEsbuild,

  // Cloud & Deployment
  'Vercel': SiVercel,
  'Netlify': SiNetlify,
  'AWS': SiAmazon,
  'Google Cloud': SiGooglecloud,
  
  'Cloudflare': SiCloudflare,
  'Heroku': SiHeroku,
  'DigitalOcean': SiDigitalocean,

  // Developer Tools
  'Git': SiGit,
  'GitHub': SiGithub,
  'GitLab': SiGitlab,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Jenkins': SiJenkins,
  'GitHub Actions': SiGithubactions,

  // Testing
  'Jest': SiJest,
  'Cypress': SiCypress,
  'Vitest': SiVitest,

  // State Management
  'Redux': SiRedux,
  'MobX': SiMobx,

  // Mobile Development
  'Flutter': SiFlutter,
  'Ionic': SiIonic,

  // APIs & Communication
  'GraphQL': SiGraphql,
  'Apollo': SiApollographql,
  'Socket.io': SiSocketdotio,

  // Package Managers
  'npm': SiNpm,
  'Yarn': SiYarn,
  'pnpm': SiPnpm,

  // IDEs & Editors
  'IntelliJ IDEA': SiIntellijidea,
  'WebStorm': SiWebstorm,

  // OS
  'macOS': SiMacos,
  'Linux': SiLinux,
  'Ubuntu': SiUbuntu,

  // Other Tools
  'Figma': SiFigma,
  'Postman': SiPostman,
  'Notion': SiNotion,
  'Slack': SiSlack,
  'Discord': SiDiscord,
}

// Aliases para normalizar variantes comunes (minúsculas keys)
const techAliases: Record<string, string> = {
  // React / Next
  'reactjs': 'React',
  'react.js': 'React',
  'nextjs': 'Next.js',

  // Vue
  'vue.js': 'Vue',
  'vuejs': 'Vue',

  // Tailwind / CSS
  'tailwindcss': 'Tailwind CSS',
  'tailwind': 'Tailwind CSS',
  'css3': 'CSS',

  // JS / TS
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',

  // Express
  'express.js': 'Express',
  'expressjs': 'Express',

  // Sass/SCSS
  'scss': 'Sass',

  // Cloud
  'gcp': 'Google Cloud',
  'google cloud platform': 'Google Cloud',
  'aws': 'AWS',
  'amazon': 'AWS',
  'amazon web services': 'AWS',
  'azure': 'Azure',
  'microsoft azure': 'Azure',
  'cloudflare': 'Cloudflare',

  // Misc
  'github actions': 'GitHub Actions',
  'intellij': 'IntelliJ IDEA',
  'webstorm': 'WebStorm',
}

const findIconByKey = (key: string): IconType | null => {
  if (!key) return null
  if (techIcons[key]) return techIcons[key]
  const found = Object.keys(techIcons).find(k => k.toLowerCase() === key.toLowerCase())
  return found ? techIcons[found] : null
}

// Obtiene el ícono normalizando aliases y mayúsculas
export const getTechIcon = (tech: string): IconType | null => {
  if (!tech) return null
  const normalizedKey = tech.trim().toLowerCase()
  const canonical = techAliases[normalizedKey]
  if (canonical) return findIconByKey(canonical)
  return findIconByKey(tech)
}

// Verifica existencia considerando aliases
export const hasTechIcon = (tech: string): boolean => {
  return getTechIcon(tech) !== null
}

// Obtener todas las tecnologías disponibles (claves canónicas)
export const getAvailableTechs = (): string[] => Object.keys(techIcons)
