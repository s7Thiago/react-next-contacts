import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        input: {
          'text-no-focus': '#efeeed', // cor da fonte sem foco
          'text-with-focus': '#333333', // cor da fonte com foco
          'border': '#333333', // cor da borda
          'border-no-focus': '#b5b5b5', // cor da borda
          invalid: {
            'font': '#eb4a46', // cor da fonte quando o input é inválido
            'border': '#eb4a46', // cor da borda quando o input é inválido
          }
        },
        button: {
          on: {
            'text-no-focus': '#ffffff', // cor da fonte do botão ativo sem foco
            'background': '#00c8b3', // cor do background do botão ativo
          },
          off: {
            'text-no-focus': '#dddcdc', // cor da fonte do botão inativo sem foco
            'background': '#f6f6f6', // cor do background do botão inativo

          }

        }
      }
    },
  },
  plugins: [],
}
export default config
