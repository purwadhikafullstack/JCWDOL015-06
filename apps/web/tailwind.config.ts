import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(134, 60%, 35%)',
        'primary-foreground': 'hsl(0, 0%, 98%)',
        success: 'hsl(100, 60%, 31%)',
        'success-foreground': 'hsl(0, 0%, 98%)',
        info: 'hsl(210, 100%, 90%)',
        'info-foreground': 'hsl(0, 0%, 98%)',
        'badge-success-background': 'hsla(60, 40%, 87%, 60%)',
        'badge-success-foreground': 'hsl(103, 53%, 42%)',
        'badge-danger-background': 'hsla(0, 73%, 87%, 60%)',
        'badge-danger-foreground': 'hsl(14, 88%, 54%)',
        border: 'hsl(240, 5.9%, 90%)',
        input: 'hsl(240, 5.9%, 90%)',
        ring: 'hsl(240, 10%, 3.9%)',
        danger: '#dc2626'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui({})]
};
export default config;
