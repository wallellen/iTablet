/*
 Copyright © SuperMap. All rights reserved.
 Author: Yangshanglong
 E-mail: yangshanglong@supermap.com
 */

import * as React from 'react'
import { View } from 'react-native'
import { ConstInfo } from '../../../../constants'
import { Toast } from '../../../../utils'
import { LayerAttributeTable } from '../../components'
import { SMap } from 'imobile_for_reactnative'

export default class LayerSelectionAttribute extends React.Component {
  props: {
    navigation: Object,
    currentAttribute: Object,
    currentLayer: Object,
    map: Object,
    layerSelection: Object,
    setCurrentAttribute: () => {},
    setLayerAttributes: () => {},
    setLoading: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSourceList: [],
      openList: {},
      attributes: [],
      tableTitle: [],
      // tableHead: ['名称', '属性值'],
      tableHead: [],
      tableData: [],
      // type: params && params.type || '',
    }

    this.currentFieldInfo = []
    this.currentFieldIndex = -1
    this.currentPage = 0
    this.pageSize = 20
    this.isInit = true // 初始化，防止多次加载
    this.noMore = false // 判断是否加载完毕
  }

  componentDidMount() {
    this.isInit = true
    this.getAttribute()
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.layerSelection) !==
      JSON.stringify(this.props.layerSelection)
    ) {
      this.isInit = true
      this.noMore = false
      this.getAttribute()
    }
  }

  componentWillUnmount() {
    this.props.setCurrentAttribute({})
  }

  setLoading = isLoading => {
    if (this.props.setLoading && typeof this.props.setLoading === 'function') {
      this.props.setLoading(isLoading)
    }
  }

  getAttribute = (cb = () => {}) => {
    if (!this.props.layerSelection.layerInfo.path) return
    this.setLoading(true)
    ;(async function() {
      try {
        let attributes = await SMap.getSelectionAttributeByLayer(
          this.props.layerSelection.layerInfo.path,
          this.currentPage,
          this.pageSize,
        )
        if (attributes && attributes.length > 0) {
          this.props.setCurrentAttribute(attributes[0])
          let tableHead = []
          attributes[0].forEach(item => {
            if (item.fieldInfo.caption.toString().toLowerCase() === 'smid') {
              tableHead.unshift(item.fieldInfo.caption)
            } else {
              tableHead.push(item.fieldInfo.caption)
            }
          })
          if (this.currentPage > 0) {
            attributes = JSON.parse(
              JSON.stringify(this.state.attributes),
            ).concat(attributes)
          }
          this.setState(
            {
              attributes: attributes,
              // attributes: attributes,
              tableHead: tableHead,
            },
            () => {
              this.isInit = false
            },
          )
        }
        cb && cb()
        this.setLoading(false)
      } catch (e) {
        cb && cb()
        this.setLoading(false)
      }
    }.bind(this)())
  }

  selectRow = (data, index) => {
    if (!data || index < 0) return
    this.currentFieldInfo = data
    this.currentFieldIndex = index
  }

  /** 下拉刷新 **/
  refresh = (cb = () => {}) => {
    this.currentPage = 0
    this.getAttribute(cb)
  }

  /** 加载更多 **/
  loadMore = (cb = () => {}) => {
    if (this.isInit || this.noMore) return
    this.currentPage += 1
    this.getAttribute(attribute => {
      cb && cb()
      if (!attribute || attribute.length <= 0) {
        this.noMore = true
        Toast.show(ConstInfo.ALL_DATA_ALREADY_LOADED)
        this.currentPage--
      }
    })
  }

  /** 修改表格中的值的回调 **/
  changeAction = data => {
    if (
      this.props.setLayerAttributes &&
      typeof this.props.setLayerAttributes === 'function'
    ) {
      // 单个对象属性和多个对象属性数据有区别
      let isSingleData = typeof data.cellData !== 'object'
      this.props.setLayerAttributes([
        {
          mapName: this.props.map.currentMap.name,
          layerPath: this.props.layerSelection.layerInfo.path,
          fieldInfo: [
            {
              name: isSingleData ? data.rowData.name : data.cellData.name,
              value: data.value,
            },
          ],
          params: {
            // index: int,      // 当前对象所在记录集中的位置
            filter: `SmID=${
              isSingleData
                ? this.state.attributes[0][0].value
                : data.rowData[0].value
            }`, // 过滤条件
            cursorType: 2, // 2: DYNAMIC, 3: STATIC
          },
        },
      ])
    }
  }

  renderTable = () => {
    if (!this.state.attributes || this.state.attributes.length === 0)
      return <View />
    return (
      <LayerAttributeTable
        ref={ref => (this.table = ref)}
        data={
          this.state.attributes.length > 1
            ? this.state.attributes
            : this.state.attributes[0]
        }
        tableHead={
          this.state.attributes.length > 1
            ? this.state.tableHead
            : ['名称', '属性值']
        }
        widthArr={this.state.attributes.length === 1 && [100, 100]}
        refresh={cb => this.refresh(cb)}
        loadMore={cb => this.loadMore(cb)}
        hasInputText={this.state.attributes.length > 1}
        changeAction={this.changeAction}
        indexColumn={0}
        type={
          this.state.attributes.length > 1
            ? LayerAttributeTable.Type.MULTI_DATA
            : LayerAttributeTable.Type.SINGLE_DATA
        }
      />
    )
  }

  render() {
    // return (
    //   <Container
    //     ref={ref => (this.container = ref)}
    //     headerProps={{
    //       title: '属性',
    //       navigation: this.props.navigation,
    //     }}
    //     style={styles.container}
    //   >
    //     {this.state.attributes && this.state.attributes.length > 0 ? (
    //       this.renderTable()
    //     ) : (
    //       <View style={{ flex: 1 }} />
    //     )}
    //   </Container>
    // )

    return this.renderTable()
  }
}