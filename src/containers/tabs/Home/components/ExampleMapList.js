import * as React from 'react'
import { NativeModules, Platform } from 'react-native'
import { View, StyleSheet, FlatList, Alert } from 'react-native'

import NavigationService from '../../../../containers/NavigationService'
import Thumbnails from '../../../../components/Thumbnails'
import { scaleSize, Toast } from '../../../../utils'
import { Utility, OnlineService, EngineType } from 'imobile_for_javascript'
import { ConstPath,ExampleMapData } from '../../../../constains'
const openNativeSampleCode = Platform.OS === 'ios' ? NativeModules.SMSampleCodeBridgeModule : NativeModules.IntentModule

const defalutImageSrc = require('../../../../assets/public/mapImage0.png')
const vectorMap = '数据可视化', ObliquePhoto = '倾斜摄影', gl = 'GL地图瓦片', overLay = '影像叠加矢量地图', map3D = '三维场景'


export default class ExampleMapList extends React.Component {

//   props: {
//     setLoading: () => {},
//   }

//   constructor(props) {
//     super(props)
//     this.islogin = false
//     this.unzip = true
//     this.ziping = false
//     this.downloaded = false
//     this.progress = null
//     this.downlist = []
//     this.state = {
//       maplist: [],
//     }
//   }


//   componentDidMount() {
//     (async function () {
//       await this.mapexist()
//     }).bind(this)()
//   }

//   cancel = async zipfile => {
//     await Utility.deleteFile(zipfile)
//     let downitem = await this.getDownitem(GLOBAL.downitemname)
//     downitem.downloaded(true)
//   }


//   mapexist = async () => {
//     let testData
//     if(Platform.OS==="android"){
//       testData=ExampleMapData.testData_android
//     }
//     if(Platform.OS==='ios'){
//       testData=ExampleMapData.testData_ios
//     }
//     for (let index = 0; index < testData.length; index++) {
//       let exist = await Utility.fileIsExistInHomeDirectory(testData[index].path)
//       exist ? testData[index].backgroundcolor = null : testData[index].backgroundcolor = "#A3A3A3"
//       exist ? testData[index].opacity = 0 : testData[index].opacity = 0.6
//     }
//     this.setState({ maplist: testData })
//   }


//   _itemClick = async item => {
//     let path, exist, filePath, outPath, fileName, openPath
//     switch (item.key) {
//       case vectorMap:
//       path = item.path
//       filePath = await Utility.appendingHomeDirectory(item.filePath)
//       outPath = await Utility.fileIsExistInHomeDirectory(item.outPath)
//       fileName = item.fileName
//         exist = await Utility.fileIsExistInHomeDirectory(path)
//         if (exist) {
//           openNativeSampleCode.open("Visual")
//         } else {
//           this.alertDown(filePath, fileName, outPath, vectorMap)
//         }
//         break
//       case map3D:
//       path = item.path
//       filePath = await Utility.appendingHomeDirectory(item.filePath)
//       outPath = await Utility.fileIsExistInHomeDirectory(item.outPath)
//       fileName = item.fileName
//       openPath=await Utility.appendingHomeDirectory(item.openPath)
//         exist = await Utility.fileIsExistInHomeDirectory(path)
//         if (exist) {
//           // NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
//           NavigationService.navigate('Map3D', { path: openPath, isExample: true })
//         } else {
//           this.alertDown(filePath, fileName, outPath, map3D)
//         }
//         break
//       case ObliquePhoto:
//       path = item.path
//       filePath = await Utility.appendingHomeDirectory(item.filePath)
//       outPath = await Utility.fileIsExistInHomeDirectory(item.outPath)
//       fileName = item.fileName
//       openPath=await Utility.appendingHomeDirectory(item.openPath)
//         exist = await Utility.fileIsExistInHomeDirectory(path)
//         if (exist) {
//           NavigationService.navigate('Map3D', { path: openPath, isExample: true })
//         } else {
//           this.alertDown(filePath, fileName, outPath, key)
//         }
//         break
//       case gl:
//         path = item.path
//         filePath = await Utility.appendingHomeDirectory(item.filePath)
//         outPath = await Utility.fileIsExistInHomeDirectory(item.outPath)
//         fileName = item.fileName
//         openPath = await Utility.appendingHomeDirectory(item.openPath)
//         exist = await Utility.fileIsExistInHomeDirectory(path)
//         if (exist) {
//           // NavigationService.navigate('MapView', { type: '', path: path, isExample: true })
//           NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
//         } else {
//           this.alertDown(filePath, fileName, outPath, gl)
//         }
//         break
//       case overLay:
//         path = item.path
//         filePath = await Utility.appendingHomeDirectory(item.filePath)
//         outPath = await Utility.fileIsExistInHomeDirectory(item.outPath)
//         fileName = item.fileName
//         openPath = await Utility.appendingHomeDirectory(item.openPath)
//         exist = await Utility.fileIsExistInHomeDirectory(path)
//         if (exist) {
//           // NavigationService.navigate('MapView', { type: '', path: path, isExample: true })
//           NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
//         } else {
//           this.alertDown(filePath, fileName, outPath, overLay)
//         }
//         break
//     }
//   }

//   downloading = async progress => {
//     try {
//       let mProgress
//       if (progress instanceof Object) {
//         mProgress = progress.progress
//       } else {
//         mProgress = progress
//       }
//       if (mProgress > 0 && mProgress > this.progress) {
//         if (!this.downloaded) {
//           let downitem = await this.getDownitem(GLOBAL.downitemname)
//           this.progress = mProgress
//           downitem.updateprogress(mProgress)
//           // console.log(mProgress)
//         }
//       }
//     } catch (e) {
//       this.progress = null
//       Toast.show('下载失败')
//     }
//   }

//   onComplete = async result => {
//     // console.log("success")
//     let downitem = await this.getDownitem(GLOBAL.downitemname)
//     this.downloaded = true
//     this.progress = null
//     try {
//       if (this.unzip) {
//         this.unzip = false
//         Toast.show("文件解压中,请等待")
//         // console.log("zip")
//         this.ziping = true
//         let result = await Utility.unZipFile(this.zipfile, this.targetdir)
//         if (result) {
//           GLOBAL.downitemname = ''
//           Alert.alert(
//             "温馨提示",
//             "文件解压完成",
//             [
//               {
//                 text: "确定", onPress: () => {
//                   downitem.hideProgress()
//                   Utility.deleteFile(this.zipfile)
//                 },
//               },
//             ],
//             { cancelable: true }
//           )
//         } else {
//           this.unzip = false
//           await Utility.deleteFile(this.zipfile)
//           Alert.alert(
//             "温馨提示",
//             "文件解压失败，是否重新下载",
//             [
//               { text: "确定", onPress: () => { this.download(this.zipfile, this.downfilename) } },
//               { text: "取消", onPress: () => { this.cancel(this.zipfile) } },
//             ],
//             { cancelable: true }
//           )
//         }
//       }
//     } catch (error) {
//       if (this.unzip) {
//         this.unzip = false
//         Alert.alert(
//           "温馨提示",
//           "文件解压失败，是否重新下载",
//           [
//             { text: "确定", onPress: () => { this.download(this.zipfile, this.downfilename) } },
//             { text: "取消", onPress: () => { this.cancel(this.zipfile) } },
//           ],
//           { cancelable: true }
//         )
//       }
//     }
//   }

//   downloadFailure = async error => {
//     Toast.show('下载失败')
//   }

//   download = async (filePath, fileName) => {
//     Toast.show("开始下载")
//     this.progress = null
//     this.OnlineService = new OnlineService()
//     let result = await this.OnlineService.login("imobile1234", "imobile")
//     if (result) {
//       this.OnlineService.download(filePath, fileName, {
//         onProgress: this.downloading,
//         onComplete: this.onComplete,
//         onFailure: this.downloadFailure,
//       })
//     }
//     else {
//       Alert.alert(
//         "温馨提示",
//         "下载失败，请检查网路",
//         [
//           { text: "确定", onPress: () => { } },
//         ],
//         { cancelable: true }
//       )
//     }
//   }

//   alertDown = async (filePath, fileName, outPath, key) => {
//     if (this.progress) {
//       Alert.alert(
//         "温馨提示",
//         "有文件正在下载中，请稍后",
//         [
//           { text: "确定", onPress: () => { }, style: "cancel" },
//         ],
//         { cancelable: false }
//       )
//     }
//     else {
//       this.targetdir = outPath
//       this.zipfile = filePath
//       this.downfilename = fileName
//       GLOBAL.downitemname = key
//       this.downloaded = false
//       this.unzip = true
//       Alert.alert(
//         "温馨提示",
//         "本地实例文件不存在是否下载文件",
//         [
//           { text: "确定", onPress: () => this.download(filePath, fileName) },
//           { text: "取消", onPress: () => { }, style: "cancel" },
//         ],
//         { cancelable: true }
//       )
//     }
//   }

//   downList = (child, key) => {
//     let item = { name: key, ref: child }
//     this.downlist.push(item)
//   }

//   getDownitem = key => {
//     for (let index = 0; index < this.downlist.length; index++) {
//       if (key === this.downlist[index].name) {
//         return this.downlist[index].ref
//       }
//     }
//   }

//   _renderItem = ({ item }) => {
//     console.log('aa')
//     // let key = item.key
//     // let src = defalutImageSrc
//     // let backgroundcolor = item.backgroundcolor
//     // let opacity = item.opacity
//     // switch (key) {
//     //   case vectorMap:
//     //     src = require('../../../../assets/public/beijing.png')
//     //     break
//     //   case map3D:
//     //     src = require('../../../../assets/public/map3D.png')
//     //     break
//     //   case ObliquePhoto:
//     //     src = require('../../../../assets/public/ObliquePhoto.png')
//     //     break
//     //   case gl:
//     //     src = require('../../../../assets/public/VectorMap.png')
//     //     break
//     //   case overLay:
//     //     src = require('../../../../assets/public/VectorMap.png')
//     //     break
//     //   default:
//     //     src = require('../../../../assets/public/VectorMap.png')
//     //     break
//     // }
//     // return (
//     //   <Thumbnails ref={ref => this.downList(ref, key)} title={key} src={src} btnClick={() => this._itemClick(item)} backgroundcolor={backgroundcolor} opacity={opacity} />
//     // )
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.state.maplist}
//           renderItem={this._renderItem}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//         // keyboardShouldPersistTaps={'always'}
//         />
//       </View>
//     )
//   }
// }
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     paddingHorizontal: scaleSize(20),
//     flexDirection: 'column',
//   },
// })
constructor(props) {
  super(props)
  this.islogin = false
  this.unzip = true
  this.ziping = false
  this.downloaded = false
  this.progress = null
  this.downlist = []
  this.state = {
    maplist: [],
  }
}


componentDidMount() {
  (async function () {
    await this.mapexist()
  }).bind(this)()
}

cancel = async zipfile => {
  await Utility.deleteFile(zipfile)
  let downitem = await this.getDownitem(GLOBAL.downitemname)
  downitem.downloaded(true)
}


mapexist = async () => {
    let testData
    if(Platform.OS==="android"){
      testData=ExampleMapData.testData_android.data
    }
    if(Platform.OS==='ios'){
      testData=ExampleMapData.testData_ios.data
    }
    for (let index = 0; index < testData.length; index++) {
      let exist = await Utility.fileIsExistInHomeDirectory(testData[index].path)
      exist ? testData[index].backgroundcolor = null : testData[index].backgroundcolor = "#A3A3A3"
      exist ? testData[index].opacity = 0 : testData[index].opacity = 0.6
    }
    this.setState({ maplist: testData })
}

  _itemClick = async item => {
    let path, exist, filePath, outPath, fileName, openPath
    switch (item.key) {
      case vectorMap:
      path = item.path
      filePath = await Utility.appendingHomeDirectory(item.filePath)
      outPath = await Utility.appendingHomeDirectory(item.outPath)
      fileName = item.fileName
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          openNativeSampleCode.open("Visual")
        } else {
          this.alertDown(filePath, fileName, outPath, vectorMap)
        }
        break
      case map3D:
      path = item.path
      filePath = await Utility.appendingHomeDirectory(item.filePath)
      outPath = await Utility.appendingHomeDirectory(item.outPath)
      fileName = item.fileName
      openPath=await Utility.appendingHomeDirectory(item.openPath)
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          // NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
          NavigationService.navigate('Map3D', { path: openPath, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, map3D)
        }
        break
      case ObliquePhoto:
      path = item.path
      filePath = await Utility.appendingHomeDirectory(item.filePath)
      outPath = await Utility.appendingHomeDirectory(item.outPath)
      fileName = item.fileName
      openPath=await Utility.appendingHomeDirectory(item.openPath)
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          NavigationService.navigate('Map3D', { path: openPath, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, ObliquePhoto)
        }
        break
      case gl:
        path = item.path
        filePath = await Utility.appendingHomeDirectory(item.filePath)
        outPath = await Utility.appendingHomeDirectory(item.outPath)
        fileName = item.fileName
        openPath = await Utility.appendingHomeDirectory(item.openPath)
        exist = await Utility.fileIsExistInHomeDirectory(path)
        if (exist) {
          // NavigationService.navigate('MapView', { type: '', path: path, isExample: true })
          NavigationService.navigate('MapView', { path: openPath, type: "", DSParams: { server: path, engineType: EngineType.UDB }, isExample: true })
        } else {
          this.alertDown(filePath, fileName, outPath, gl)
        }
        break
      case overLay:
        path = item.path
        filePath = await Utility.appendingHomeDirectory(item.filePath)
        outPath = await Utility.appendingHomeDirectory(item.outPath)
        fileName = item.fileName
        openPath = await Utility.appendingHomeDirectory(item.openPath)
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
downloading = async progress => {
  try {
    let mProgress
    if (progress instanceof Object) {
      mProgress = progress.progress
    } else {
      mProgress = progress
    }
    if (mProgress > 0 && mProgress > this.progress) {
      if (!this.downloaded) {
        let downitem = await this.getDownitem(GLOBAL.downitemname)
        this.progress = mProgress
        downitem.updateprogress(mProgress)
        // console.log(mProgress)
      }
    }
  } catch (e) {
    Toast.show('下载失败')
  }
}

onComplete = async result => {
  
  // console.log("success")
  this.downloaded = true
  this.progress = null
  try {
    if (this.unzip) {
      this.unzip = false
      Toast.show("文件解压中,请等待")
      // console.log("zip")
      this.ziping = true
      
      let result = await Utility.unZipFile(this.zipfile, this.targetdir)
      if (result) {
        let downitem = await this.getDownitem(GLOBAL.downitemname)
        downitem.hideProgress()
        GLOBAL.downitemname = ''
        Alert.alert(
          "温馨提示",
          "文件解压完成",
          [
            { text: "确定", onPress: () => { Utility.deleteFile(this.zipfile) } },
          ],
          { cancelable: true }
        )
      }
    }
  } catch (error) {
    if (this.unzip) {
      this.unzip = false
      Alert.alert(
        "温馨提示",
        "文件解压失败，是否重新下载",
        [
          { text: "确定", onPress: () => { this.download(this.zipfile, this.downfilename) } },
          { text: "取消", onPress: () => { this.cancel(this.zipfile) } },
        ],
        { cancelable: true }
      )
    }
  }
}

downloadFailure = async error => {
  Toast.show('下载失败')
}

download = async (filePath, fileName) => {
  Toast.show("开始下载")
  this.progress = null
  this.OnlineService = new OnlineService()
  let result = await this.OnlineService.login("imobile1234", "imobile")
  if (result) {
    this.OnlineService.download(filePath, fileName, {
      onProgress: this.downloading,
      onComplete: this.onComplete,
      onFailure: this.downloadFailure,
    })
  }
  else {
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
  if (this.progress) {
    Alert.alert(
      "温馨提示",
      "有文件正在下载中，请稍后",
      [
        { text: "确定", onPress: () => { }, style: "cancel" },
      ],
      { cancelable: false }
    )
  }
  else {
    this.targetdir = outPath
    this.zipfile = filePath
    this.downfilename = fileName
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
  let item = { name: key, ref: child }
  this.downlist.push(item)
}

getDownitem = key => {
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
  let opacity = item.opacity
  switch (key) {
    case vectorMap:
      src = require('../../../../assets/public/beijing.png')
      break
    case map3D:
      src = require('../../../../assets/public/map3D.png')
      break
    case ObliquePhoto:
      src = require('../../../../assets/public/ObliquePhoto.png')
      break
    case gl:
      src = require('../../../../assets/public/VectorMap.png')
      // path = ConstPath.SampleDataPath + '/Changchun/Changchun.smwu'
      break
    case overLay:
      src = require('../../../../assets/public/VectorMap.png')
      break
    default:
      src = require('../../../../assets/public/VectorMap.png')
      break
  }
  return (
    <Thumbnails ref={ref => this.downList(ref, key)} title={key} src={src} btnClick={() => this._itemClick(item)} backgroundcolor={backgroundcolor} opacity={opacity} />
  )
}

render() {
  return (
    <View style={styles.container}>
    <FlatList
          data={this.state.maplist}
          renderItem={this._renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        />
    </View>
  )
  }
}

const styles = StyleSheet.create({
container: {
  backgroundColor: 'white',
  flex: 1,
  paddingHorizontal: scaleSize(20),
  flexDirection: 'column',
},
})
