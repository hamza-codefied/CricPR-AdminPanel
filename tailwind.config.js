/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        black: '#000000',
        white: '#FFFFFF',
        red: '#D70505',
        border: '#B0B0B0',
        
        // Brand colors
        primary: {
          DEFAULT: '#0E795D',
          dark: '#01411C',
        },
        secondary: '#01411C',
        selectedTeam: '#E2EDEA',
        
        // Text colors
        fieldText: '#2E3037',
        lightText: '#909090',
        hintText: '#717171',
        subtitleText: '#666666',
        labelText: '#989898',
        greyText: '#6C7278',
        
        // UI/Lines
        unSelectedTab: '#B9C0C9',
        horizontalLine: '#DEDEDE',
        frame: '#E8F2FE',
        loginBackground: '#F9F9F9',
        loginButtonGradientEnd: '#15B58B',
        
        // ShadCN theme colors mapped to CricPR
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primaryShadcn: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondaryShadcn: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        borderShadcn: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'cricket-gradient': 'linear-gradient(135deg, #0E795D, #01411C)',
        'login-top-gradient': 'linear-gradient(180deg, #50E4BD, #FFFFFF)',
        'primary-button-gradient': 'linear-gradient(90deg, #0E795D, #15B58B)',
      },
    },
  },
  plugins: [],
}

