import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { constUtil, scaleSize } from '../../utils'
import { ListSeparator } from '../../components'
import PropTypes from 'prop-types'

import MT_Btn from './MT_Btn'

const WIDTH = constUtil.WIDTH
const ITEM_HEIGHT = 0.75 * 1.4 * 0.1 * WIDTH
const ITEM_WIDTH = ITEM_HEIGHT
const BORDERCOLOR = constUtil.USUAL_SEPARATORCOLOR

const ADD_LAYER = 'add_layer'
const COLLECTION = 'collection'
const DATA_EDIT = 'data_edit'
const MAP_MANAGER = 'map_manager'
const DATA_MANAGER = 'data_manager'
const ANALYST = 'analyst'
const TOOLS = 'tools'

let show = false//
let oldPress = null
let type = ''

export const MAP_LOCAL = 'MAP_LOCAL'
export const MAP_3D = 'MAP_3D'

export default class MT_BtnList extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    POP_List: PropTypes.func,
    dataCollection: PropTypes.func,
    layerManager: PropTypes.func,
    dataManager: PropTypes.func,
    addLayer: PropTypes.func,
  }

  static defaultProps = {
    type: MAP_LOCAL,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: props.type === MAP_LOCAL
        ? [
          { key: '新建图层', image: require('../../assets/map/icon-add-layer.png'), btnClick: this._addLayer },
          { key: '数据采集', image: require('../../assets/map/icon-data-collection.png'), btnClick: this._dataCollection },
          { key: '数据编辑', image: require('../../assets/map/icon-data-edit.png'), btnClick: this._dataEdit },
          { key: '地图管理', image: require('../../assets/map/icon-map-management.png'), btnClick: this._layerManager },
          { key: '数据管理', image: require('../../assets/map/icon-data-manangement.png'), btnClick: this._dataManager },
          { key: '数据分析', image: require('../../assets/public/analyst.png'), btnClick: this._analyst },
          { key: '工具', image: require('../../assets/public/tools.png'), btnClick: this._tools },
        ]
        : [{ key: '地图管理', image: require('../../assets/map/icon-map-management.png'), btnClick: this._layerManager }],
    }
  }

  _showManager = newPress => {
    if (oldPress && (oldPress === newPress)) {
      show = !show
    } else if ((newPress === ADD_LAYER || newPress === COLLECTION || newPress === MAP_MANAGER || newPress === DATA_MANAGER) && show) {
      show = false
      type = newPress
      oldPress = newPress
    } else {
      show = true
      type = newPress
      oldPress = newPress
    }
  }

  _addLayer = () => {
    this._showManager(ADD_LAYER)
    this.props.POP_List && this.props.POP_List(false, null)
    this.props.addLayer && this.props.addLayer()
  }

  _dataCollection = () => {
    this._showManager(COLLECTION)
    this.props.POP_List && this.props.POP_List(false, null)
    this.props.dataCollection && this.props.dataCollection()
  }

  _dataEdit = () => {
    this._showManager(DATA_EDIT)
    this.props.POP_List && this.props.POP_List(show, type)
  }

  _layerManager = () => {
    this._showManager(MAP_MANAGER)
    this.props.POP_List && this.props.POP_List(false, null)
    this.props.layerManager && this.props.layerManager()
  }

  _dataManager = () => {
    this._showManager(DATA_MANAGER)
    this.props.POP_List && this.props.POP_List(false, null)
    this.props.dataManager && this.props.dataManager()
  }

  _analyst = () => {
    this._showManager(ANALYST)
    this.props.POP_List && this.props.POP_List(show, type)
  }

  _tools = () => {
    this._showManager(TOOLS)
    this.props.POP_List && this.props.POP_List(show, type)
  }

  _renderItem = ({ item }) => {
    let key = item.key
    let image = item.image
    let btnClick = item.btnClick
    // let width = (ITEM_WIDTH < WIDTH / this.state.data.length) ? WIDTH / this.state.data.length : ITEM_WIDTH
    let width = (ITEM_WIDTH < WIDTH / 6) ? WIDTH / 6 : ITEM_WIDTH
    return (
      <View style={[styles.item, { width: width }]}>
        <MT_Btn BtnText={key} BtnImageSrc={image} BtnClick={btnClick} />
      </View>
    )
  }
  
  _renderItemSeparatorComponent = () => {
    return <ListSeparator mode={ListSeparator.mode.VERTICAL} />
  }

  _keyExtractor = item => item.key

  render() {
    const data = this.state.data
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
          keyExtractor={this._keyExtractor}
          horizontal={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  container: {
    height: scaleSize(100),
    width: '100%',
    backgroundColor: constUtil.USUAL_GREEN,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderColor: BORDERCOLOR,
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    zIndex: 100,
  },
})