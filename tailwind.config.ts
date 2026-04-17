import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/blocks/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1B2316",
        foreground: "#FFFFFF",
        primary: "#222C1D",
        secondary: "#FFFFFF",
        accent: "#FFF84E",
        admimprimary: "#FAFAF5",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in-from-left": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        growStem: {
          "0%": { pathLength: "0", opacity: "0" },
          "100%": { pathLength: "1", opacity: "1" },
        },
        growLeafLeft: {
          "0%": { pathLength: "0", opacity: "0" },
          "30%": { pathLength: "0", opacity: "0" },
          "100%": { pathLength: "1", opacity: "1" },
        },
        growLeafRight: {
          "0%": { pathLength: "0", opacity: "0" },
          "30%": { pathLength: "0", opacity: "0" },
          "100%": { pathLength: "1", opacity: "1" },
        },
        growLeafTopLeft: {
          "0%": { pathLength: "0", opacity: "0" },
          "60%": { pathLength: "0", opacity: "0" },
          "100%": { pathLength: "1", opacity: "1" },
        },
        growLeafTopRight: {
          "0%": { pathLength: "0", opacity: "0" },
          "60%": { pathLength: "0", opacity: "0" },
          "100%": { pathLength: "1", opacity: "1" },
        },
        floatingLeaf: {
          "0%": {
            transform: "translateY(-10vh) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(110vh) rotate(360deg)",
            opacity: "0",
          },
        },
        dropdown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-delay": "fade-in 0.5s ease-out 0.3s forwards",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "fade-in-from-left": "fade-in-from-left 0.5s ease-out",
        "grow-stem": "growStem 2s ease-out infinite",
        "grow-leaf-left": "growLeafLeft 2s ease-out infinite",
        "grow-leaf-right": "growLeafRight 2s ease-out infinite",
        "grow-leaf-top-left": "growLeafTopLeft 2s ease-out infinite",
        "grow-leaf-top-right": "growLeafTopRight 2s ease-out infinite",
        "floating-leaf-0": "floatingLeaf 15s linear infinite",
        "floating-leaf-1": "floatingLeaf 20s linear infinite",
        "floating-leaf-2": "floatingLeaf 25s linear infinite",
        dropdown: 'dropdown 0.5s ease-out'
      },
    },
  },
  plugins: [],
} satisfies Config;
