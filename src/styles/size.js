import { Dimensions, Platform } from 'react-native'
import { scaleSize } from '../utils'

const screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / 2,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
}

const fontSize = {
  fontSizeXl: scaleSize(44),
  fontSizeLg: scaleSize(40),
  fontSizeMd: scaleSize(36),
  fontSizeSm: scaleSize(32),
  fontSizeXs: scaleSize(28),
}

const layoutSize = {
  horizonWidth: 15,
  verticalHeight: 15,
}

export default {
  screen,
  fontSize,
  layoutSize,
}
