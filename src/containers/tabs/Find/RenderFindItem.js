/*
  Copyright © SuperMap. All rights reserved.
  Author: lu cheng dong
  E-mail: 756355668@qq.com
*/
import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './Styles'
import { Toast } from '../../../utils/index'
import NavigationService from '../../NavigationService'
import RNFS from 'react-native-fs'
import { FileTools } from '../../../native'
import ConstPath from '../../../constants/ConstPath'
import { color } from '../../../styles'
export default class RenderFindItem extends Component {
  props: {
    data: Object,
    user: Object,
  }

  constructor(props) {
    super(props)
    this.state = {
      progress: '下载',
      isDownloading: false,
    }
  }

  _navigator = uri => {
    NavigationService.navigate('MyOnlineMap', {
      uri: uri,
    })
  }
  _nextView = async () => {
    if (this.props.data.type === 'WORKSPACE') {
      if (this.props.data.serviceStatus === 'UNPUBLISHED') {
        let dataId = this.props.data.id
        let dataUrl = 'https://www.supermapol.com/web/datas/' + dataId + '.json'
        this._navigator(dataUrl)
      } else {
        Toast.show('服务没有公开，无权限浏览')
      }
    } else {
      let info = this.props.data.type + '数据无法浏览'
      Toast.show(info)
    }
  }
  _downloadFile = async () => {
    if (
      this.props.user &&
      this.props.user.currentUser &&
      this.props.user.currentUser.userName &&
      this.props.user.currentUser.userName !== ''
    ) {
      if (this.state.isDownloading) {
        Toast.show('正在下载...')
        return
      }
      Toast.show('开始下载')
      this.setState({ progress: '下载中...', isDownloading: true })
      let dataId = this.props.data.id
      let dataUrl =
        'https://www.supermapol.com/web/datas/' + dataId + '/download'
      let fileName = this.props.data.fileName
      let appHome = await FileTools.appendingHomeDirectory()
      let fileDir =
        appHome +
        ConstPath.UserPath +
        this.props.user.currentUser.userName +
        '/' +
        ConstPath.RelativePath.ExternalData
      let exists = await RNFS.exists(fileDir)
      if (!exists) {
        await RNFS.mkdir(fileDir)
      }
      let filePath = fileDir + fileName
      const downloadOptions = {
        fromUrl: dataUrl,
        toFile: filePath,
        background: true,
        // begin: result => {
        //
        // },
        progress: res => {
          let value = ((res.bytesWritten / res.contentLength) * 100).toFixed(0)
          // console.warn("value:"+value)
          let progress = '下载:' + value + '%'
          if (this.state.progress !== progress) {
            this.setState({ progress: progress })
          }
        },
      }
      try {
        const ret = RNFS.downloadFile(downloadOptions)
        ret.promise
          .then(async result => {
            if (result.statusCode === 200) {
              Toast.show('下载成功')
              this.setState({ progress: '下载完成', isDownloading: false })
              await FileTools.unZipFile(filePath, fileDir)
              FileTools.deleteFile(filePath)
            }
          })
          .catch(() => {
            Toast.show('下载失败')
            FileTools.deleteFile(filePath)
            this.setState({ progress: '下载', isDownloading: false })
          })
      } catch (e) {
        Toast.show('网络错误')
        FileTools.deleteFile(filePath)
        this.setState({ progress: '下载', isDownloading: false })
      }
    } else {
      Toast.show('登录后可下载')
    }
  }
  render() {
    let date = new Date(this.props.data.lastModfiedTime)
    let year = date.getFullYear() + '/'
    let month = date.getMonth() + 1 + '/'
    let day = date.getDate() + ''
    let hour = date.getHours() + ':'
    if (hour.length < 3) {
      hour = '0' + hour
    }
    let minute = date.getMinutes() + ''
    if (minute.length < 2) {
      minute = '0' + minute
    }
    let time = year + month + day + ' ' + hour + minute
    let size =
      this.props.data.size / 1024 / 1024 > 0.1
        ? (this.props.data.size / 1024 / 1024).toFixed(2) + 'MB'
        : (this.props.data.size / 1024).toFixed(2) + 'K'
    let fontColor = color.font_color_white
    return (
      <View>
        <View style={styles.itemViewStyle}>
          <TouchableOpacity
            onPress={() => {
              this._nextView()
            }}
          >
            <Image
              resizeMode={'stretch'}
              style={styles.imageStyle}
              source={{ uri: this.props.data.thumbnail }}
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text
              style={[styles.restTitleTextStyle, { color: fontColor }]}
              numberOfLines={2}
            >
              {this.props.data.fileName}
            </Text>
            <View style={styles.viewStyle2}>
              <Image
                style={[styles.imageStyle2, { tintColor: fontColor }]}
                resizeMode={'contain'}
                source={require('../../../assets/tabBar/tab_user.png')}
              />
              <Text
                style={[styles.textStyle2, { color: fontColor }]}
                numberOfLines={1}
              >
                {this.props.data.nickname}
              </Text>
            </View>
            <View style={[styles.viewStyle2, { marginTop: 5 }]}>
              <Image
                style={[styles.imageStyle2, { tintColor: fontColor }]}
                resizeMode={'contain'}
                source={require('../../../assets/tabBar/find-time.png')}
              />
              <Text
                style={[styles.textStyle2, { color: fontColor }]}
                numberOfLines={1}
              >
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 100,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{ fontSize: 12, textAlign: 'center', color: fontColor }}
              numberOfLines={1}
            >
              {size}
            </Text>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                this._downloadFile()
              }}
            >
              <Image
                style={{ width: 35, height: 35, tintColor: fontColor }}
                source={require('../../../assets/tabBar/find_download.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                width: 100,
                color: fontColor,
              }}
              numberOfLines={1}
            >
              {this.state.progress}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.downloadStyle}
          onPress={() => {
            this._downloadFile()
          }}
        >
          <Text
            style={[
              styles.downloadTextStyle,
              { width: 100, right: 80, textAlign: 'left' },
            ]}
            numberOfLines={1}
          >
            大小:
            {size}
          </Text>
          <Text style={styles.downloadTextStyle} numberOfLines={1}>
            {this.state.progress}
          </Text>
        </TouchableOpacity>*/}
        <View style={styles.separateViewStyle} />
      </View>
    )
  }
}
