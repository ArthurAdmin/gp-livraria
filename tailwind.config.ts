import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"] ,
  theme: {
    extend: {
      colors: {
        "satin-black": "var(--gp-satin-black)",
        "cappuccino-brown": "var(--gp-cappuccino-brown)",
        "matte-champagne": "var(--gp-matte-champagne)",
        "nude-pink": "var(--gp-nude-pink)",
        "soft-olive": "var(--gp-soft-olive)",
        "sand-beige": "var(--gp-sand-beige)",
      },
      boxShadow: {
        "editorial": "0 24px 80px rgba(0, 0, 0, 0.40), 0 1px 0 rgba(230, 215, 181, 0.08)",
        "soft": "0 18px 60px rgba(0, 0, 0, 0.35)",
        "dark-glow": "0 0 40px rgba(230, 215, 181, 0.08)"
      },
      borderRadius: {
        "xl": "1.1rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#F5F5F5",
          },
        },
      },
      keyframes: {
        "float-in": {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "float-in": "float-in 650ms cubic-bezier(0.2, 0.9, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

