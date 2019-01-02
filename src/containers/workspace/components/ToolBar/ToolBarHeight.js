import { ConstToolType } from '../../../../constants'

function getToorbarHeight(orientation, type) {
  let height
  switch (type) {
    case ConstToolType.MAP3D_SYMBOL:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[2]
      } else {
        height = ConstToolType.HEIGHT[0]
      }
      break
    case ConstToolType.MAP3D_TOOL:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[1]
      } else {
        height = ConstToolType.HEIGHT[0]
      }
      break
    case ConstToolType.MAP_COLLECTION_START:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[2]
      } else {
        height = ConstToolType.HEIGHT[0]
      }
      break
    case ConstToolType.MAP_3D_START:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[1]
      } else {
        height = ConstToolType.HEIGHT[0]
      }
      break
    case ConstToolType.MAP_SYMBOL:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[3]
      } else {
        height = ConstToolType.THEME_HEIGHT[4]
      }
      break
    case ConstToolType.MAP_TOOL:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[3]
      } else {
        height = ConstToolType.THEME_HEIGHT[2]
      }
      break
    case ConstToolType.MAP_EDIT_TAGGING:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[3]
      } else {
        height = ConstToolType.THEME_HEIGHT[2]
      }
      break
    case ConstToolType.MAP_THEME_START:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[0]
      } else {
        height = ConstToolType.THEME_HEIGHT[0]
      }
      break
    case ConstToolType.MAP_THEME_CREATE:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[0]
      } else {
        height = ConstToolType.THEME_HEIGHT[0]
      }
      break
    case ConstToolType.MAP_THEME_ADD_UDB:
    case ConstToolType.MAP_THEME_PARAM_CREATE_DATASETS:
    case ConstToolType.MAP_THEME_PARAM_CREATE_EXPRESSION:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[6]
      } else {
        height = ConstToolType.THEME_HEIGHT[3]
      }
      break
    case ConstToolType.MAP_THEME_PARAM_UNIQUE_EXPRESSION:
    case ConstToolType.MAP_THEME_PARAM_RANGE_EXPRESSION:
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_EXPRESSION:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[4]
      } else {
        height = ConstToolType.THEME_HEIGHT[3]
      }
      break
    case ConstToolType.MAP_THEME_PARAM_UNIQUE_COLOR:
    case ConstToolType.MAP_THEME_PARAM_RANGE_COLOR:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[4]
      } else {
        height = ConstToolType.THEME_HEIGHT[3]
      }
      break
    case ConstToolType.MAP_THEME_PARAM_RANGE_MODE:
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_BACKSHAPE:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[2]
      } else {
        height = ConstToolType.THEME_HEIGHT[0]
      }
      break
    case ConstToolType.MAP_THEME_PARAM:
    case ConstToolType.MAP_THEME_PARAM_RANGE_PARAM:
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FONTSIZE:
      height = 0
      break
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_BACKSHAPE_COLOR:
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FONTNAME:
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FORECOLOR:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.THEME_HEIGHT[7]
      }
      break
    case ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_ROTATION:
      height = ConstToolType.THEME_HEIGHT[0]
      break
    case ConstToolType.MAP3D_CIRCLEFLY:
      height = ConstToolType.HEIGHT[0]
      break
    case ConstToolType.MAP_EDIT_START:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[2]
      } else {
        height = ConstToolType.HEIGHT[0]
      }
      break
    case ConstToolType.MAP_STYLE:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[1]
      }
      break
    case ConstToolType.LINECOLOR_SET:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[1]
      }
      break
    case ConstToolType.POINTCOLOR_SET:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[1]
      }
      break
    case ConstToolType.REGIONBEFORECOLOR_SET:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[1]
      }
      break
    case ConstToolType.REGIONAFTERCOLOR_SET:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.THEME_HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[1]
      }
      break
    case ConstToolType.GRID_STYLE:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[4]
      } else {
        height = ConstToolType.HEIGHT[4]
      }
      break
    case ConstToolType.MAP3D_WORKSPACE_LIST:
      if (orientation === 'PORTRAIT') {
        height = ConstToolType.HEIGHT[3]
      } else {
        height = ConstToolType.HEIGHT[2]
      }
      break
  }
  return height
}

export default {
  getToorbarHeight,
}