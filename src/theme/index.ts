export const colors = {
  primary: '#C67C4E',
  primaryLight: '#FBF0E9',
  black: '#050505',
  dark: '#313131',
  darker: '#131313',
  text: '#242424',
  grey: '#A2A2A2',
  greyLight: '#E3E3E3',
  chip: '#EDEDED',
  tile: '#F4F4F4',
  bg: '#F9F9F9',
  white: '#FFFFFF',
  star: '#FBBE21',
  promoTag: '#ED5151',
  promoBg: '#947257',
  green: '#36C07E',
};

export const fonts = {
  regular: 'Sora_400Regular',
  medium: 'Sora_500Medium',
  semibold: 'Sora_600SemiBold',
  bold: 'Sora_700Bold',
};

export const formatPrice = (value: number, digits = 2) => `$ ${value.toFixed(digits)}`;
