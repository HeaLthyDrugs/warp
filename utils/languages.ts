import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiCplusplus,
  SiCss3,
  SiHtml5,
  SiPostgresql,
  SiJson,
  SiYaml,
  SiMarkdown
} from 'react-icons/si';
import { FaJava } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";

export const languageConfig = {
  javascript: { icon: SiJavascript, extension: 'js', color: '#F7DF1E' },
  typescript: { icon: SiTypescript, extension: 'ts', color: '#3178C6' },
  python: { icon: SiPython, extension: 'py', color: '#3776AB' },
  java: { icon: FaJava, extension: 'java', color: '#007396' },
  cpp: { icon: SiCplusplus, extension: 'cpp', color: '#00599C' },
  css: { icon: SiCss3, extension: 'css', color: '#1572B6' },
  html: { icon: SiHtml5, extension: 'html', color: '#E34F26' },
  sql: { icon: SiPostgresql, extension: 'sql', color: '#336791' },
  bash: { icon: SiGnubash, extension: 'sh', color: '#4EAA25' },
  json: { icon: SiJson, extension: 'json', color: '#000000' },
  yaml: { icon: SiYaml, extension: 'yml', color: '#CB171E' },
  markdown: { icon: SiMarkdown, extension: 'md', color: '#000000' }
} as const;

export type LanguageKey = keyof typeof languageConfig; 