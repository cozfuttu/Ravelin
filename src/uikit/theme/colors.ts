import { Colors } from './types'

export const baseColors = {
  failure: '#ED4B9E',
  primary: '#158bce',
  primaryBright: '#00E0A0',
  primaryDark: '#00E0A0',
  secondary: '#fa607f',
  success: '#00E0A0',
  warning: '#FFB237',
}

export const brandColors = {
  binance: '#F0B90B',
}

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: '#ffffff',
  background: '#0b2522',
  menu: '#081c1a',
  backgroundDisabled: '#9D9D9D',
  contrast: '#FFFFFF',
  invertedContrast: '#191326',
  input: '#0b2522',
  primaryDark: '#0098A1',
  tertiary: '#00000000',
  text: '#e9e9e9',
  textDisabled: '#fff',
  textSubtle: '#00E0A0',
  borderColor: '#00E0A0',
  card: 'transparent',
  transparent: 'transparent',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
  },
}

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: '#132e38',
  secondary: '#ffffff',
  menu: '#081c1a',
  backgroundDisabled: '#ffffff',
  contrast: '#FFFFFF',
  invertedContrast: '#191326',
  input: '#132e38',
  tertiary: '#0d1f22',
  text: '#e9e9e9',
  textDisabled: '#000000',
  textSubtle: '#00E0A0',
  borderColor: '#00E0A0',
  card: 'transparent',
  transparent: 'transparent',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
  },
}
