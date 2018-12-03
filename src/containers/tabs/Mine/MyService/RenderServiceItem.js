import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import NavigationService from '../../../NavigationService'
import { Utility, SOnlineService } from 'imobile_for_reactnative'
import styles, { textHeight } from './Styles'
import { ConstPath } from '../../../../constants'
let publishMap = []

export default class RenderServiceItem extends Component {
  props: {
    imageUrl: string,
    mapName: string,
    sharedMapUrl: string,
    serviceNameAndFileName: Object,
    mapTileAndRestTitle: Object,
    isDownloading: boolean,
    downloadProgress: string,
  }

  defaultProps: {
    imageUrl: 'none',
    mapName: '地图名称',
    downloadDataUrl: 'none',
    sharedMapUrl: 'none',
  }

  constructor(props) {
    super(props)
    this.state = {
      progress: '',
      isDownloading: this.props.isDownloading,
    }
    this.download = {
      onProgress: this.downloadProgress,
      onResult: this.downloadResult,
    }
  }

  downloadProgress = progress => {
    if (typeof progress === 'number') {
      this._changeProgress(progress)
    }
  }

  downloadResult = result => {
    if (typeof result === 'boolean') {
      this._changeProgress('下载完成')
    } else {
      this._changeProgress('下载失败')
    }
  }

  _downloadMapFile = async mapTitle => {
    let restTitle = this.props.mapTileAndRestTitle[mapTitle]
    let onlineFileName = this.props.serviceNameAndFileName[restTitle]

    let savePath = await Utility.appendingHomeDirectory(
      ConstPath.UserPath + onlineFileName,
    )
    let isFileExist = await Utility.fileIsExist(savePath)
    if (isFileExist) {
      this._changeProgress('下载完成')
      return
    }
    let fileName = onlineFileName.substring(0, onlineFileName.length - 4)
    SOnlineService.downloadFile(savePath, fileName, this.download)
  }

  _changeProgress = result => {
    if (typeof result === 'number') {
      let progress = '下载' + result.toFixed(0) + '%'
      this.setState({ progress: progress })
    } else {
      this.setState({ progress: result, isDownloading: false })
    }
  }

  _navigator = async (mapUrl, restTitle) => {
    NavigationService.navigate('MapView', {
      wsData: {
        DSParams: {
          server: mapUrl,
          engineType: 225,
          driver: 'REST',
          alias: mapUrl,
        },
        layerIndex: 0,
        type: 'Datasource',
      },
      mapName: this.props.mapName,
      isExample: true,
    })
    if (publishMap.indexOf(restTitle) === -1) {
      let publish = await SOnlineService.changeServiceVisibility(
        restTitle,
        true,
      )
      if (typeof publish === 'boolean' && publish === true) {
        publishMap.push(restTitle)
      }
    }
  }

  render() {
    let mapUrl = this.props.sharedMapUrl
    let mapTitle = this.props.mapName
    let restTitle = this.props.mapTileAndRestTitle[mapTitle]
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.itemTopContainer}>
          <TouchableOpacity
            style={styles.itemTopInternalImageStyle}
            onPress={() => {
              this._navigator(mapUrl, restTitle)
            }}
          >
            <Image
              style={styles.itemTopInternalImageStyle}
              source={{
                url: this.props.imageUrl,
                credentials: 'include',
              }}
            />
          </TouchableOpacity>

          <View style={styles.itemTopInternalRightContainerStyle}>
            <Text
              style={[
                styles.textStyle,
                styles.fontLargeStyle,
                { lineHeight: 25 },
              ]}
            >
              {this.props.mapName}
            </Text>
            <View style={[styles.itemTopInternalRightBottomViewStyle]}>
              <TouchableOpacity
                style={styles.itemTopInternalRightBottomBottomViewStyle}
                onPress={() => {
                  this._navigator(mapUrl, restTitle)
                }}
              >
                <Text style={styles.textStyle}>浏览地图</Text>
              </TouchableOpacity>

              <View style={styles.itemTopInternalRightBottomBottomViewStyle}>
                <TouchableOpacity
                  style={{ width: 80, height: textHeight }}
                  onPress={() => {
                    this._changeProgress('下载中...')
                    this._downloadMapFile(mapTitle)
                  }}
                >
                  <Text style={styles.textStyle}>下载地图</Text>
                </TouchableOpacity>
                <Text style={[{ flex: 1 }, styles.textStyle]}>
                  {this.state.progress}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemBottomContainerStyle} />
      </View>
    )
  }
}
