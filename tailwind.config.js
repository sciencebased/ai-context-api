/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#05070d",
          800: "#0a0e1a",
          700: "#0f1424",
          600: "#161c33",
        },
        neon: {
          pink: "#ff2d95",
          magenta: "#ff00d4",
          cyan: "#00f0ff",
          blue: "#3b8bff",
          lime: "#a6ff00",
          yellow: "#fff200",
          purple: "#9d00ff",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        display: ["Orbitron", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 12px #00f0ff, 0 0 32px rgba(0,240,255,0.35)",
        "neon-pink": "0 0 12px #ff2d95, 0 0 32px rgba(255,45,149,0.35)",
        "neon-lime": "0 0 12px #a6ff00, 0 0 32px rgba(166,255,0,0.30)",
      },
      animation: {
        "scanline": "scanline 6s linear infinite",
        "glitch": "glitch 2.6s infinite steps(1)",
        "float-slow": "float 9s ease-in-out infinite",
        "grid-pan": "grid-pan 18s linear infinite",
        "blink": "blink 1.1s steps(2, start) infinite",
        "tick": "tick 4s ease-in-out infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glitch: {
          "0%,92%,100%": { transform: "translate(0,0)", filter: "none" },
          "93%": { transform: "translate(-2px,1px)", filter: "hue-rotate(20deg)" },
          "94%": { transform: "translate(2px,-1px)" },
          "95%": { transform: "translate(-1px,2px)", filter: "hue-rotate(-30deg)" },
          "96%": { transform: "translate(1px,-2px)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "60px 60px, 60px 60px" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        tick: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
