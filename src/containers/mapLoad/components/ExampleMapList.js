import * as React from 'react'
import { NativeModules, Platform, DeviceEventEmitter } from 'react-native'
import { View, StyleSheet, FlatList, Alert } from 'react-native'

import NavigationService from '../../../containers/NavigationService'
import Thumbnails from '../../../components/Thumbnails'
import { scaleSize, Toast } from '../../../utils'
import { Utility, OnlineService, EngineType } from 'imobile_for_javascript'
import { ConstPath, EventConst } from '../../../constains'
const openNativeSampleCode = Platform.OS === 'ios' ? NativeModules.SMSampleCodeBridgeModule : NativeModules.IntentModule

const defalutImageSrc = require('../../../assets/public/mapImage0.png')
const vectorMap = '数据可视化', map3D = '三维场景', ObliquePhoto = '倾斜摄影', gl = 'GL地图瓦片', overLay = '影像叠加矢量地图'


export default class ExampleMapList extends React.Component {
  constructor(props) {
    super(props)
    this.islogin = false
    this.unzip = true
    this.downloaded = false
    this.progeress = 0
    this.downlist = []
    this.state = {
      maplist: []
    }
  }


  componentDidMount () {
    (async function () {
      let that = this
      await this.mapexist()
      try {
        DeviceEventEmitter.addListener(EventConst.ONLINE_SERVICE_DOWNLOADING, async function (progeress) {
          if (progeress > 0 && progeress >that.progeress) {
            if (!that.downloaded) {
              let downitem = await that.getDownitem(GLOBAL.downitemname)
              that.progeress = progeress
              downitem.updateprogress(that.progeress)
            }
          }
        })
        DeviceEventEmitter.addListener(EventConst.ONLINE_SERVICE_DOWNLOADED, async function (result) {
              console.log("success")
              that.downloaded = true
              that.progeress = 0

              setTimeout(()=>{
                if(that.unzip){
                  that.unzip=false
                  Alert.alert(
                    "温馨提示",
                    "文件下载完成，是否解压",
                    [
                      { text: "确定", onPress: () => {that.unZipFile(that.zipfile, that.targetdir)} },
                      { text: "取消", onPress: async() => {
                        Utility.deleteZip(zipfile)
                        that.mapexist()
                       } }
                    ],
                    { cancelable: false }
                  )
               }
              },1000)

        
        })
        DeviceEventEmitter.addListener(EventConst.ONLINE_SERVICE_DOWNLOADFAILURE, async function (result) {
          // let downitem = await that.getDownitem(GLOBAL.downitemname)
          // Alert.alert(
          //   "温馨提示",
          //   "文件下载失败， 是否重新下载",
          //   [
          //     { text: "确定", onPress: () => {that.download(that.downpath,downfilename)} },
          //     { text: "取消", onPress: () => {downitem.updateprogress(100)} }
          //   ],
          //   { cancelable: true }
          // )
          console.log("faile")
        
        })

      } catch (error) {
        Toast.show('下载失败')
      }
    }).bind(this)()

  }

  mapexist = async () => {
    let testData = [
      { key: vectorMap, path: ConstPath.SampleDataPath + '/hotMap/hotMap.smwu' },
      { key: gl, path: ConstPath.SampleDataPath + '/Changchun/Changchun.smwu' },
      { key: overLay, path: ConstPath.SampleDataPath + '/DOM/DOM.smwu' },
      { key: map3D, path: ConstPath.SampleDataPath + '/CBD/CBD.smwu' },
      // { key: ObliquePhoto, path: ConstPath.SampleDataPath + '/MaSai/MaSai.sxwu' },
    ]
    for (let index = 0; index < testData.length; index++) {
      let exist = await Utility.fileIsExistInHomeDirectory(testData[index].path)
      exist ? testData[index].backgroundcolor = null : testData[index].backgroundcolor = "#A3A3A3"
    }
    this.setState({ maplist: testData })
  }


  _itemClick = async (key) => {
    let path, exist, filePath, outPath, fileName, openPath
    switch (key) {
      case vectorMap:
        path = ConstPath.SampleDataPath + '/hotMap/hotMap.smwu'
        filePath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + 'hotMap.zip'
        outPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath)
        fileName = "hotMap"
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          openNativeSampleCode.open("Visual")
        } else {
          this.alertDown(filePath, fileName, outPath, vectorMap)
        }
        break
      case map3D:
        path = ConstPath.SampleDataPath + '/CBD/CBD.smwu'
        filePath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + "CBD.zip"
        outPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath)
        openPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + 'CBD/CBD.smwu'
        fileName = "CBD"
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, map3D)
        }
        break
      case ObliquePhoto:
        path = ConstPath.SampleDataPath + '/MaSai/MaSai.sxwu'
        filePath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + "MaSai.zip"
        outPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath)
        openPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + 'MaSai/MaSai.sxwu'
        fileName = "MaSai"
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          NavigationService.navigate('Map3D', { path: openPath, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, child)
        }
        break
      case gl:
        path = ConstPath.SampleDataPath + '/Changchun/Changchun.smwu'
        filePath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + "Changchun.zip"
        outPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath)
        openPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + 'Changchun/Changchun.smwu'
        fileName = "Changchun"
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          // NavigationService.navigate('MapView', { type: '', path: path, isExample: true })
          NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, gl)
        }
        break
      case overLay:
        path = ConstPath.SampleDataPath + '/DOM/DOM.smwu'
        filePath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + "DOM.zip"
        outPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath)
        openPath = await Utility.appendingHomeDirectory(ConstPath.SampleDataPath) + 'DOM/DOM.smwu'
        fileName = "DOM"
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          // NavigationService.navigate('MapView', { type: '', path: path, isExample: true })
          NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, overLay)
        }
        break
    }
  }
  unZipFile = async (zipfile, targetdir) => {
    console.log("zip")
    let result = await Utility.unZipFile(zipfile, targetdir)
    if (result.isUnZiped) {
      GLOBAL.downitemname = ''
      Alert.alert(
        "温馨提示",
        "文件解压完成",
        [
          { text: "确定", onPress: () => {Utility.deleteZip(zipfile)} },
        ],
        { cancelable: true }
      )
    }
    else {
      Alert.alert(
        "温馨提示",
        "文件解压失败，是否重新下载",
        [
          { text: "确定", onPress: () => {this.download(this.downpath,this.downfilename)} },
          { text: "取消", onPress: () => {Utility.deleteZip(zipfile) } }
        ],
        { cancelable: true }
      )
    }
  }



  download = async (filePath, fileName) => {
    Toast.show("开始下载")
    this.OnlineService = new OnlineService()
    let result = await this.OnlineService.login("jiushuaizhao1995@163.com", "z549451547")
    if (result) {
      this.OnlineService.download(filePath, fileName)
    } else {
      Alert.alert(
        "温馨提示",
        "下载失败，请检查网路",
        [
          { text: "确定", onPress: () => { } },
        ],
        { cancelable: true }
      )
    }
  }

  alertDown = async (filePath, fileName, outPath, key) => {
    if (this.progeress > 0) {
      Alert.alert(
        "温馨提示",
        "有文件正在下载中，请稍后下载",
        [
          { text: "确定", onPress: () => { }, style: "cancel" },
        ],
        { cancelable: false }
      )
    }
    else {
      this.targetdir = outPath
      this.zipfile = filePath
      this.downpath=filePath
      this.downfilename=fileName
      GLOBAL.downitemname = key
      this.downloaded = false
      this.unzip = true
      Alert.alert(
        "温馨提示",
        "本地实例文件不存在是否下载文件",
        [
          { text: "确定", onPress: () => this.download(filePath, fileName) },
          { text: "取消", onPress: () => { }, style: "cancel" },
        ],
        { cancelable: true }
      )
    }
  }

  downList = (child, key) => {
    item = { name: key, ref: child }
    this.downlist.push(item)
  }
  getDownitem = (key) => {
    for (let index = 0; index < this.downlist.length; index++) {
      if (key === this.downlist[index].name) {
        return this.downlist[index].ref
      }
    }
  }


  _renderItem = ({ item }) => {
    let key = item.key
    let src = defalutImageSrc
    let backgroundcolor = item.backgroundcolor
    switch (key) {
      case vectorMap:
        src = require('../../../assets/public/beijing.png')
        break
      case map3D:
        src = require('../../../assets/public/map3D.png')
        break
      case ObliquePhoto:
        src = require('../../../assets/public/ObliquePhoto.png')
        break
      case gl:
        src = require('../../../assets/public/VectorMap.png')
        path = ConstPath.SampleDataPath + '/Changchun/Changchun.smwu'
        break
      case overLay:
        src = require('../../../assets/public/VectorMap.png')
        break
      default:
        src = require('../../../assets/public/VectorMap.png')
        break
    }
    return (
      <Thumbnails ref={ref => this.downList(ref, key)} title={key} src={src} btnClick={() => this._itemClick(key)} backgroundcolor={backgroundcolor} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.maplist}
          renderItem={this._renderItem}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // item: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   height: 40,
  //   width: width,
  //   paddingLeft: 15,
  //   backgroundColor: color.grayLight,
  // },
  // container: {aa
  //   flex: 1,
  //   backgroundColor: 'white',
  //   alignSelf: 'center',
  // },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: scaleSize(20),
    flexDirection: 'column',
  },
})