import React, { Component } from 'react'
import { Container } from '../../components'
import { MAP_MODULE } from '../../constants'
import { MapToolbar } from '../../containers/workspace/components'
import Layer3DItem from './Layer3DItem'
import { View, TouchableOpacity, Text, SectionList, Image } from 'react-native'
import styles from './styles'
import { LayerManager_tolbar } from '../mtLayerManager/components'
export default class Map3DToolBar extends Component {
  props: {
    navigation: Object,
    type: string,
    data: Array,
    refreshLayer3dList: () => {},
    setCurrentLayer3d: () => {},
    layer3dList: Array,
    device: Object,
    currentLayer3d: Object,
  }
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.layer3dList,
      toHeightItem: {},
    }
  }
  // eslint-disable-next-line
  //   componentWillReceiveProps(nextProps) {
  //     if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
  //       this.setState({
  //         data: nextProps.data,
  //       })
  //     }
  //   }

  renderListItem = ({ item, index }) => {
    let itembtnStyle =
      this.state.toHeightItem.index === index &&
      this.state.toHeightItem.itemName === item.name
        ? { backgroundColor: '#4680DF' }
        : { backgroundColor: 'transparent' }
    if (item.isShow) {
      return (
        <TouchableOpacity
          style={[styles.itemBtn, itembtnStyle]}
          onPress={() => {
            this.setState({
              toHeightItem: { itemName: item.name, index: index },
            })
            this.props.setCurrentLayer3d && this.props.setCurrentLayer3d(item)
          }}
        >
          <Layer3DItem
            item={item}
            getlayer3dToolbar={this.getlayer3dToolbar}
            device={this.props.device}
          />
        </TouchableOpacity>
      )
    } else {
      return <View />
    }
  }

  renderListSectionHeader = ({ section }) => {
    let image = section.visible
      ? (image = require('../../assets/mapEdit/icon_spread.png'))
      : (image = require('../../assets/mapEdit/icon_packUP.png'))
    return (
      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          this.refreshList(section)
        }}
      >
        <Image source={image} style={styles.selection} />
        <Text style={styles.sectionsTitle}>{section.title}</Text>
      </TouchableOpacity>
    )
  }

  // renderItemSeparatorComponent = () => {}

  getlayer3dToolbar = () => {
    return this.layer3dToolbar
  }

  refreshList = section => {
    let newData = this.state.data
    for (let index = 0; index < section.data.length; index++) {
      section.data[index].isShow = !section.data[index].isShow
    }
    section.visible = !section.visible
    newData[section.index] = section
    this.setState({
      data: newData.concat(),
    })
  }

  renderSelection = () => {
    return (
      <SectionList
        sections={this.state.data}
        renderItem={this.renderListItem}
        // ItemSeparatorComponent={this._renderItemSeparator}
        renderSectionHeader={this.renderListSectionHeader}
        keyExtractor={(item, index) => index}
        onRefresh={this.props.refreshLayer3dList}
        refreshing={false}
      />
    )
  }
  renderToolBar = () => {
    return (
      <MapToolbar
        navigation={this.props.navigation}
        initIndex={1}
        type={'MAP_3D'}
      />
    )
  }

  renderLayerToolbar = () => {
    return <LayerManager_tolbar ref={ref => (this.layer3dToolbar = ref)} />
  }

  render() {
    return (
      <Container
        style={styles.container}
        ref={ref => (this.container = ref)}
        headerProps={{
          title: MAP_MODULE.MAP_3D,
          navigation: this.props.navigation,
          withoutBack: true,
        }}
        bottomBar={this.renderToolBar()}
        bottomProps={{ type: 'fix' }}
      >
        {this.renderLayerToolbar()}
        {this.renderSelection()}
      </Container>
    )
  }
}
