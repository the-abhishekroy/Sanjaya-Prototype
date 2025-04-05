/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0ea5e9",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDown: 'slideDown 0.2s ease-out',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'farm-background': "url('/images/farm-bg.jpg')",
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      maxWidth: {
        'md': '28rem',
        '6xl': '72rem',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|ring|shadow|from|to)-(blue|green|purple|amber|rose|cyan)-400/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|shadow|from|to)-(green|gray)-(400|500|600|700|800|900)/,
      variants: ['hover', 'focus', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|shadow|from|to)-(purple|amber|green|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|shadow|from|to)-(amber|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|shadow|from|to)-(rose|red|orange|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|from|to)-(rose|gray)-(400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /(bg|text|ring|from|to)-(cyan|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|from|to)-(cyan|emerald|rose|amber|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|from|to)-(blue|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(bg|text|ring|border)-(blue|green|emerald|red|gray)-(400|500|600|700|800|900)/,
      variants: ['hover', 'focus', 'disabled'],
    },
    {
      pattern: /(bg|text|ring|from|to)-(violet|green|gray)-(300|400|500|600|700|800|900)/,
      variants: ['hover', 'group-hover'],
    },
  ],
}

