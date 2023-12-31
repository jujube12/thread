import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 자주 쓰는 color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '85%': '85%',
        '90%': '90%'
      },
      borderWidth: {
        1: '1px'
      },
      spacing: {
        '37': '9.25rem',
        '38': '9.5rem',
        '65': '16.25rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem'
      },
      keyframes: {
        pageUp: {
          "100%": { transform: 'translateY(1rem)' }
        },
        commentPageUp: {
          "100%": { top: '1rem' }
        },
        editProfilePageUp: {
          "100%": { top: '1rem' }
        },
        followPageUp: {
          "100%": { top: '1rem' }
        }
      },
      animation: {
        pageUp: 'pageUp 500ms forwards',
        commentPageUp: 'commentPageUp 500ms forwards',
        editProfilePageUp: 'editProfilePageUp 500ms forwards',
        followPageUp: 'followPageUp 500ms forwards'
      }
    },
  },
  plugins: [],
}
export default config
