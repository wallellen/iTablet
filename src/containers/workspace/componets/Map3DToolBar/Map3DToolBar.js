import * as React from 'react'
import styles from './styles'
import {
  View,
  TouchableOpacity,
  Text,
  SectionList,
  FlatList,
} from 'react-native'
import { SScene } from 'imobile_for_reactnative'
import { Toast } from '../../../../utils'
export default class Map3DToolBar extends React.Component {
  props: {
    type: string,
    data: Array,
    setfly: () => {},
  }
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      type: props.type,
      analystresult: 0,
    }
  }
  // eslint-disable-next-line
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        data: nextProps.data,
      })
    }
  }

  changeBaseMap = (url, type, name) => {
    switch (type) {
      case 'terrainLayer':
        SScene.addTerrainLayer(url, name)
        break
      case 'WMTS':
        SScene.addLayer3D(url, type, name, 'JPG_PNG', 96.0, true).then(
          result => {
            if (result) {
              Toast.show('添加成功')
            } else {
              Toast.show('添加失败')
            }
          },
        )
        break
      case 'l3dBingMaps':
        SScene.addLayer3D(url, type, name, 'JPG_PNG', 96.0, true).then(
          result => {
            if (result) {
              Toast.show('添加成功')
            } else {
              Toast.show('添加失败')
            }
          },
        )
        break
      default:
        Toast.show('底图不存在')
        break
    }
  }
  // .then(
  //   result => {
  //     if (result) {
  //       Toast.show('添加成功')
  //     } else {
  //       Toast.show('添加失败，请检查网络')
  //     }
  //   },
  // )
  setAnalystResult = data => {
    this.setState({
      analystresult: data,
    })
  }

  renderListItem = ({ item, index }) => {
    if (this.props.type === 'MAP3D_BASE') {
      if (item.show) {
        return (
          <TouchableOpacity
            onPress={() => this.changeBaseMap(item.url, item.type, item.name)}
          >
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )
      } else {
        return <View />
      }
    }
    if (this.props.type === 'MAP3D_ADD_LAYER') {
      return (
        <TouchableOpacity onPress={item.action()}>
          <Text style={styles.item}>{item.title}</Text>
        </TouchableOpacity>
      )
    }
    if (this.props.type === 'MAP3D_TOOL_FLYLIST') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.setfly(index)
          }}
        >
          <Text style={styles.item}>{item.title}</Text>
        </TouchableOpacity>
      )
    }
    return <View />
  }

  renderListSectionHeader = ({ section }) => {
    if (this.props.type === 'MAP3D_BASE') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.refreshList(section)
          }}
        >
          <Text style={styles.sectionHeader}>{section.title}</Text>
        </TouchableOpacity>
      )
    }
    if (this.props.type === 'MAP3D_ADD_LAYER') {
      return <View />
    }
    if (this.props.type === 'MAP3D_TOOL_FLYLIST') {
      return <Text style={styles.sectionHeader}>{section.title}</Text>
    }
  }

  renderItemSeparatorComponent = () => {
    return <View style={styles.Separator} />
  }
  refreshList = section => {
    let newData = this.state.data
    for (let index = 0; index < section.data.length; index++) {
      section.data[index].show = !section.data[index].show
    }
    newData[section.index] = section
    this.setState({
      data: newData.concat(),
    })
  }

  renderItem = ({ item }) => {
    item.name = item.name.toUpperCase()
    if (
      item.name === 'SMUSERID' ||
      item.name === 'MODELNAME' ||
      item.name === 'LONGITUDE' ||
      item.name === 'LATITUDE' ||
      item.name === 'ALTITUDE'
    ) {
      return (
        <TouchableOpacity style={styles.row}>
          <View style={styles.key}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        </TouchableOpacity>
      )
    } else if (
      (item.name === 'DESCRIPTION' && item.value !== '') ||
      item.name === 'NAME'
    ) {
      return (
        <TouchableOpacity style={styles.row}>
          <View style={styles.key}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return <View />
    }
  }

  render() {
    if (this.props.type === 'MAP3D_ATTRIBUTE') {
      return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      )
    } else if (this.props.type === 'MAP3D_TOOL_DISTANCEMEASURE') {
      return (
        <View style={styles.analystView}>
          <Text style={styles.name}>总距离:</Text>
          <Text style={styles.result}>{this.state.analystresult + ' 米'}</Text>
        </View>
      )
    } else if (this.props.type === 'MAP3D_TOOL_SUERFACEMEASURE') {
      return (
        <View style={styles.analystView}>
          <Text style={styles.name}>总面积:</Text>
          <Text style={styles.result}>
            {this.state.analystresult + ' 平方米'}
          </Text>
        </View>
      )
    } else {
      return (
        <SectionList
          sections={this.state.data}
          renderItem={this.renderListItem}
          renderSectionHeader={this.renderListSectionHeader}
          SectionSeparatorComponent={this.renderItemSeparatorComponent}
          keyExtractor={(item, index) => index}
        />
      )
    }
  }
}