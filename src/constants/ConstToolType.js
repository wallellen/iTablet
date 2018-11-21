/**
 * 地图功能列表（右侧）对应的标识符
 */
import { scaleSize } from '../utils'
export default {
  // Map
  MAP_BASE: 'MAP_BASE',
  MAP_ADD_LAYER: 'MAP_ADD_LAYER',
  MAP_ADD_DATASET: 'MAP_ADD_DATASET',
  MAP_SYMBOL: 'MAP_SYMBOL',
  MAP_COLLECTION: 'MAP_COLLECTION',

  MAP_COLLECTION_POINT: 'MAP_COLLECTION_POINT',
  MAP_COLLECTION_LINE: 'MAP_COLLECTION_LINE',
  MAP_COLLECTION_REGION: 'MAP_COLLECTION_REGION',

  // MAP_COLLECTION_POINT_POINT: 'MAP_COLLECTION_POINT_POINT',
  // MAP_COLLECTION_POINT_GPS: 'MAP_COLLECTION_POINT_GPS',
  // MAP_COLLECTION_LINE_POINT: 'MAP_COLLECTION_LINE_POINT',
  // MAP_COLLECTION_LINE_GPS_POINT: 'MAP_COLLECTION_LINE_GPS_POINT',
  // MAP_COLLECTION_LINE_GPS_PATH: 'MAP_COLLECTION_LINE_GPS_PATH',
  // MAP_COLLECTION_LINE_FREE_DRAW: 'MAP_COLLECTION_LINE_FREE_DRAW',
  // MAP_COLLECTION_REGION_POINT: 'MAP_COLLECTION_REGION_POINT',
  // MAP_COLLECTION_REGION_GPS_POINT: 'MAP_COLLECTION_REGION_GPS_POINT',
  // MAP_COLLECTION_REGION_GPS_PATH: 'MAP_COLLECTION_REGION_GPS_PATH',
  // MAP_COLLECTION_REGION_FREE_DRAW: 'MAP_COLLECTION_REGION_FREE_DRAW',
  MAP_EDIT_POINT: 'MAP_EDIT_POINT',
  MAP_EDIT_LINE: 'MAP_EDIT_LINE',
  MAP_EDIT_REGION: 'MAP_EDIT_REGION',
  MAP_EDIT_TAGGING: 'MAP_EDIT_TAGGING',
  MAP_TOOL: 'MAP_TOOL',
  MAP_STYLE: 'MAP_STYLE',

  // 工具视图高度级别
  HEIGHT: [scaleSize(100), scaleSize(150), scaleSize(250), scaleSize(500)],
}