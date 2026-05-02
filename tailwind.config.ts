
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'heebo': ['Heebo', 'sans-serif'],
				display: ['Rubik', 'Heebo', 'system-ui', 'sans-serif'],
				sans: ['Heebo', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'eyebrow': ['13px', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
				'meta': ['12px', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
				'display-hero': ['68px', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
				'display-l': ['48px', { lineHeight: '1.10', letterSpacing: '-0.020em' }],
				'display-m': ['44px', { lineHeight: '1.10', letterSpacing: '-0.020em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// === Sharaf Law redesign palette (Step 1) ===
				ink: { DEFAULT: '#1A1A1A', soft: '#4A4A4A', mute: '#6B6B6B' },
				rule: { DEFAULT: '#E5E5E5', soft: '#EFEFEF' },
				bg: { DEFAULT: '#FFFFFF', alt: '#FAFBFA', warm: '#F4F0E8' },
				brand: {
					DEFAULT: '#2D4A3A',
					deep: '#1F3528',
					soft: '#EAF1EC',
					ink: '#0F1F17',
					light: '#C9D7CD',
				},
				photo: '#EEEAE2',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				pill: '999px',
				floater: '16px',
				card: '20px',
				m: '24px',
				l: '28px',
				xl2: '32px',
			},
			boxShadow: {
				floater: '0 12px 40px rgba(20,40,30,0.12)',
				form: '0 24px 60px rgba(15,30,22,0.25)',
			},
			transitionTimingFunction: {
				default: 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.05)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'pulse-slow': 'pulse 2s infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
