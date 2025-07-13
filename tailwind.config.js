const smallerUnits = {
	'0px': '0',
	'1px': '0.0625rem',
	'2px': '0.125rem',
	'3px': '0.1875rem',
	'4px': '0.25rem',
	'5px': '0.3125rem',
	'6px': '0.375rem',
	'7px': '0.4375rem',
	'8px': '0.5rem',
	'9px': '0.5625rem',
	'10px': '0.625rem',
	'11px': '0.6875rem',
	'12px': '0.75rem',
	'13px': '0.8125rem',
	'14px': '0.875rem',
	'15px': '0.9375rem',
	'16px': '1rem',
	'17px': '1.0625rem',
	'18px': '1.125rem',
	'19px': '1.1875rem',
	'0p': '0',
	'1p': '0.0625em',
	'2p': '0.125em',
	'3p': '0.1875em',
	'4p': '0.25em',
	'5p': '0.3125em',
	'6p': '0.375em',
	'7p': '0.4375em',
	'8p': '0.5em',
	'9p': '0.5625em',
	'10p': '0.625em',
	'11p': '0.6875em',
	'12p': '0.75em',
	'13p': '0.8125em',
	'14p': '0.875em',
	'15p': '0.9375em',
	'16p': '1em',
	'17p': '1.0625em',
	'18p': '1.125em',
	'19p': '1.1875em'
}

const extraSizes = {
	...smallerUnits,
	'content': '67.5rem',
	'20px': '1.250rem',
	'24px': '1.5rem',
	'25px': '1.563rem',
	'28px': '1.75rem',
	'30px': '1.875rem',
	'40px': '2.5rem',
	'50px': '3.125rem',
	'60px': '3.75rem',
	'80px': '5rem',
	'100px': '6.25rem',
	'120px': '7.5rem',
	'150px': '9.375rem',
	'180px': '11.25rem',
	'200px': '12.5rem',
	'250px': '15.625rem',
	'300px': '18.75rem',
	'320px': '20rem',
	'400px': '25rem',
	'500px': '31.25rem',
	'600px': '37.5rem',
	'700px': '43.75rem',
	'720px': '45rem',
	'760px': '47.5rem',
	'1440px': '90rem',
	'1700px': '106.25rem',
	'2000px': '125rem',

	'20p': '1.250em',
	'24p': '1.5em',
	'25p': '1.563em',
	'28p': '1.75em',
	'30p': '1.875em',
	'40p': '2.5em',
	'50p': '3.125em',
	'60p': '3.750em',
	'80p': '5em',
	'100p': '6.250em',
	'120p': '7.5em',
	'150p': '9.375em',
	'180p': '11.25em',
	'200p': '12.5em',
	'250p': '15.625em',
	'300p': '18.75em',
	'320p': '20em',
	'400p': '25em',
	'500p': '31.25em',
	'600p': '37.5em',
	'700p': '43.750em',
	'720p': '45em',
	'760px': '47.5em',
	'1440p': '90em',
	'1700p': '106.25em',
	'2000p': '125rem',


	'expand': 'calc( ((( var(--parent-columns, 12) + var(--parent-unit, 5)) / var(--parent-columns, 12))*100%) * (var(--expand-unit, 1)/var(--parent-columns, 12)) )',
	'header-height': 'var(--headerHeight, 0px)',
	'px-rem': 'calc(calc(var(--px-override, var(--px, 1)) / 16) * 1rem)',
	'px-em': 'calc(calc(var(--px-override, var(--px, 1)) / 16) * 1em)',
	'vh': 'calc((var(--vh, 1vh) * var(--vh-multiplier, 100)) + var(--vh-offset, 0px))'
}


module.exports = {
	prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./**/*.stories.{js,ts,jsx,tsx}"
  ],
	corePlugins: {
		container: false,
		preflight: false
	},
	theme: {
		namedGroups: ["primary", "secondary"],
		extend: {
			fontFamily: {
				'primary': ['"itc-american-typewriter"','"american-typewriter"', 'Georgia', '"Times"', '"Times New Roman"','serif'],
				'secondary': ["'Gothic A1'", 'Gothic A1', 'Arial', 'sans-serif'],
				'tertiary': ["'century-gothic'", 'century-gothic', "'Gothic A1'", 'Gothic A1', 'Arial', 'sans-serif'],
				'quaternary': ['Work Sans', "'Arial Black'", "'Impact'", 'Arial', 'sans-serif'],
				'inherit': ['inherit'],
				'code': ["'Courier New'", "'Courier'", "Courier New", "Courier", 'monospace', 'sans-serif']
			},
			fontSize: {
				'dynamic-up': 'clamp(calc((var(--fs-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs, var(--min-font-size)) / var(--max-width-constraint-small, var(--max-width-constraint))) * 100) * 1vw), calc((var(--fs, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'dynamic': 'clamp(calc((var(--fs-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs, var(--max-font-size)) / var(--max-width-constraint-small, var(--max-width-constraint))) * 100) * 1vw), calc((var(--fs, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'0': 'clamp(calc((var(--fs-0-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-0, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-0, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'1': 'clamp(calc((var(--fs-1-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-1, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-1, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'2': 'clamp(calc((var(--fs-2-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-2, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-2, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'3': 'clamp(calc((var(--fs-3-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-3, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-3, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'4': 'clamp(calc((var(--fs-4-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-4, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-4, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'5': 'clamp(calc((var(--fs-5-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-5, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-5, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'6': 'clamp(calc((var(--fs-6-mobile, var(--min-font-size)) / var(--base-font-size)) * 1rem), calc(((var(--fs-6, var(--max-font-size)) / var(--max-width-constraint)) * 100) * 1vw), calc((var(--fs-6, var(--max-font-size)) / var(--base-font-size)) * 1rem))',
				'inherit': ['inherit']
			},
			fontWeight: {
				hairline: 100,
				'extra-light': 100,
				thin: 200,
				light: 300,
				normal: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
				extrabold: 800,
				'extra-bold': 800,
				black: 900,
				'primary-light': 300,
				'primary-normal': 500,
				'primary-bold': 700,
				'secondary-light': 200,
				'secondary-normal': 500,
				'secondary-bold': 700,
				'tertiary-normal': 400,
				'tertiary-bold': 700,
				'quaternary-light': 200,
				'quaternary-normal': 300,
				'quaternary-bold': 700,
				'quaternary-black': 900,
				'inherit': 'inherit'
			},
			minWidth: {
				...extraSizes
			},
			maxWidth: {
				...extraSizes,
				'1/2': '50%',
				'1/3': '33.33333333333333%'
			},
			maxHeight: {
				...extraSizes,
				'header-offset': 'calc((var(--vh, 1vh) * var(--vh-multiplier, 100)) - var(--headerHeight, 0px) - var(--offset, 0px))'
			},
			minHeight: {
				...extraSizes,
				'header-offset': 'calc((var(--vh, 1vh) * var(--vh-multiplier, 100)) - var(--headerHeight, 0px) - var(--offset, 0px))'
			},
			height: {
				...extraSizes,
				'header-offset': 'calc((var(--vh, 1vh) * var(--vh-multiplier, 100)) - var(--headerHeight, 0px) - var(--offset, 0px))'
			},
			spacing: {
				...extraSizes,
				xs: '0.313em',
				sm: '0.625em',
				md: '1.250rem',
				DEFAULT: '1.250rem',
				lg: '1.875rem',
				xl: '2.500rem',
				xxl: '5.000em',
			},
			colors: {
				'inherit': 'inherit',
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#FFFFFF',
				'dark': '#1E1D1B',
				'dark-accent': '#282828',
				'black': '#000000',
				'primary': '#F2D42E',
				'primary-dark': '#AA8F08',
				'secondary': '#1E1D1B',
				'accent': '#0CA0DA',
				'accent-dark': '#DA0C52',
				'accent-accent': '#0CDAA7',
				'flex-temp': '#0CA0DA',
				'flex-power': '#DA0C52',
				'flex-solar': '#0CDAA7',
			},
			screens: {
				...extraSizes,
				xs: '23.75rem',
				sm: '35rem',
				md: '47.5rem',
				lg: '75rem',
				xl: '87.5rem'
			},
			opacity: {
				'1': '.01',
				'2': '.02',
				'3': '.03',
				'4': '.04',
				'5': '.05',
				'6': '.06',
				'7': '.07',
				'8': '.08',
				'9': '.09',
				'10': '.10',
				'11': '.11',
				'12': '.12',
				'13': '.13',
				'14': '.14',
				'15': '.15'
			  },
			  zIndex: {
				'1': 1,
				'2': 2,
				'3': 3,
				'4': 4,
				'5': 5,
				'6': 6,
				'7': 7,
				'8': 8,
				'9': 9,
				'10': 10,
				'20': 20,
				'25': 25,
				'50': 50,
				'100': 100,
				'1000': 1000
			  },
			  boxShadow: {
				'subtle-set': '0.063rem 0.063rem 0.063rem 0 rgba(0,0,0,0.05), inset 0.063rem 0.063rem 0.063rem 0 rgba(255,255,255,0.03)',
			  },
			  borderRadius: {
				...smallerUnits,
				'20px': '1.250rem',
				'30px': '1.875rem',
				'40px': '2.5rem',
				'50px': '3.125rem',
				'60px': '3.75rem',
				'80px': '5rem',
				'100px': '6.25rem',
				'120px': '7.5rem',
				'150px': '9.375rem',
				'200px': '12.5rem',
				'20p': '1.250em',
				'30p': '1.875em',
				'40p': '2.5em',
				'50p': '3.125em',
				'60p': '3.75em',
				'80p': '5em',
				'100p': '6.25em',
				'120p': '7.5em',
				'150p': '9.375em',
				'200p': '12.5em'
			  },

			borderWidth: {
				DEFAULT: '1px',
				'none': '0',
				...smallerUnits
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.container-xs': {
					maxWidth: '75rem'
				},
				'.container-sm': {
					maxWidth: '35rem'
				},
				'.container-md': {
					maxWidth: '47.5rem'
				},
				'.container': {
					maxWidth: '75rem'
				},
				'.container-lg': {
					maxWidth: '75rem'
				},
				'.container-xl': {
					maxWidth: '87.5rem'
				},
				'.container-extreme': {
					maxWidth: '106.25rem'
				}
			})
		}
	]
}
