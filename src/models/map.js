import { fromJS } from 'immutable'
import { REHYDRATE } from 'redux-persist'
import { handleActions } from 'redux-actions'
import { SMap, SScene } from 'imobile_for_reactnative'
import { FileTools } from '../native'
import { Toast } from '../utils'
import { ConstPath } from '../constants'
import fs from 'react-native-fs'
// import xml2js from 'react-native-xml2js'
// let parser = new xml2js.Parser()
// Constants
// --------------------------------------------------
export const OPEN_WORKSPACE = 'OPEN_WORKSPACE'
export const GET_MAPS = 'GET_MAPS'
export const SET_LATEST_MAP = 'SET_LATEST_MAP'
export const SET_MAP_VIEW = 'SET_MAP_VIEW'
export const SET_CURRENT_MAP = 'SET_CURRENT_MAP'
export const OPEN_TEMPLATE = 'OPEN_TEMPLATE'
export const SET_TEMPLATE = 'SET_TEMPLATE'
export const SET_CURRENT_TEMPLATE_INFO = 'SET_CURRENT_TEMPLATE_INFO'
export const GET_SYMBOL_TEMPLATES = 'GET_SYMBOL_TEMPLATES'
// const Fs = require('react-native-fs')
let isExporting = false

// Actions
// --------------------------------------------------
// 打开工作空间
export const openWorkspace = (params, cb = () => {}) => async dispatch => {
  try {
    let result = await SMap.openWorkspace(params)
    await dispatch({
      type: OPEN_WORKSPACE,
      payload: params || {},
    })
    cb && cb(result)
    return result
  } catch (e) {
    await dispatch({
      type: OPEN_WORKSPACE,
      payload: {},
    })
    cb && cb(false)
    return false
  }
}

// 关闭工作空间
export const closeWorkspace = (cb = () => {}) => async dispatch => {
  try {
    // await SMap.closeDatasource()
    let result = await SMap.closeWorkspace()
    await dispatch({
      type: OPEN_WORKSPACE,
      payload: {},
    })
    cb && cb(result)
    return result
  } catch (e) {
    await dispatch({
      type: OPEN_WORKSPACE,
      payload: {},
    })
    cb && cb(false)
    return false
  }
}

// 打开地图
export const openMap = (params, cb = () => {}) => async (
  dispatch,
  getState,
) => {
  try {
    if (
      params === null ||
      params === undefined ||
      (!params.title && !params.name) ||
      !params.path
    )
      return
    let absultePath = await FileTools.appendingHomeDirectory(params.path)
    let userName = getState().user.toJS().currentUser.userName || 'Customer'
    let moduleName = GLOBAL.Type
    // let paths = params.path.split('/')
    let module = params.module || ''
    let fileName = params.name || params.title
    let isCustomerPath = params.path.indexOf(ConstPath.CustomerPath) >= 0
    let importResult = await SMap.openMapName(fileName, module, !isCustomerPath)
    // let expFilePath = await FileTools.appendingHomeDirectory(params.path.substr(0, params.path.lastIndexOf('.')) + '.exp')
    let expFilePath =
      absultePath.substr(0, absultePath.lastIndexOf('.')) + '.exp'

    // let expIsExist = await FileTools.fileIsExist(expFilePath)
    // if (expIsExist) {
    //   fs.readFile(expFilePath).then(data => {
    //     parser.parseString(data, async (err, result) => {
    //       let openMapResult = importResult && await SMap.openMap(params.title)
    //       if (openMapResult) {
    //         let mapInfo = await SMap.getMapInfo()
    //         await dispatch({
    //           type: SET_CURRENT_MAP,
    //           payload: mapInfo || {},
    //         })
    //       }
    //       cb && cb(result)
    //       return result
    //     })
    //   })
    // } else {
    //   let result = importResult && await SMap.openMap(params.title)
    //   if (result) {
    //     let mapInfo = await SMap.getMapInfo()
    //     await dispatch({
    //       type: SET_CURRENT_MAP,
    //       payload: mapInfo || {},
    //     })
    //   }
    //   cb && cb(result)
    //   return result
    // }
    let openMapResult = importResult && (await SMap.openMap(fileName))
    let mapInfo = await SMap.getMapInfo()
    if (openMapResult) {
      let expIsExist = await FileTools.fileIsExist(expFilePath)
      if (expIsExist) {
        let data = await fs.readFile(expFilePath)
        Object.assign(mapInfo, JSON.parse(data), { path: params.path })
        await dispatch({
          type: SET_CURRENT_MAP,
          payload: mapInfo || {},
          extData: {
            userName,
            moduleName,
          },
        })
        cb && cb(mapInfo)
        return mapInfo
      }
    } else {
      // await dispatch({
      //   type: SET_CURRENT_MAP,
      //   payload: mapInfo || {},
      // })
      // cb && cb(mapInfo)
      return openMapResult
    }
  } catch (e) {
    cb && cb(false)
    return false
  }
}

// 保存地图地图
export const saveMap = (params = {}, cb = () => {}) => async (
  dispatch,
  getState,
) => {
  try {
    // if (!params.mapName) return
    let result = await SMap.saveMapName(
      params.mapName,
      params.nModule || '',
      params.addition,
      params.isNew,
    )
    let userName = getState().user.toJS().currentUser.userName || 'Customer'
    let path = await FileTools.appendingHomeDirectory(
      ConstPath.UserPath +
        userName +
        '/' +
        ConstPath.RelativePath.Map +
        params.mapName +
        '.xml',
    )
    if (!params.isNew) {
      await dispatch({
        type: SET_CURRENT_MAP,
        payload: { path, name: params.mapName },
        extData: {
          userName,
          moduleName: GLOBAL.Type,
        },
      })
    }
    cb && cb()
    return result
  } catch (e) {
    cb && cb()
    return null
  }
}

// 关闭地图
export const closeMap = (cb = () => {}) => async dispatch => {
  try {
    await SMap.closeMap()
    await SMap.removeMap(-1) // 移除所有地图
    await SMap.closeDatasource()
    await dispatch({
      type: SET_CURRENT_MAP,
      payload: {},
    })
    cb && cb()
  } catch (e) {
    cb && cb()
  }
}

// 获取当前工作空间的地图列表
export const getMaps = (cb = () => {}) => async dispatch => {
  try {
    let maps = await SMap.getMaps()
    await dispatch({
      type: GET_MAPS,
      payload: maps || [],
    })
    cb && cb(maps)
  } catch (e) {
    await dispatch({
      type: GET_MAPS,
      payload: [],
    })
    cb && cb(false)
  }
}

export const setLatestMap = (params, cb = () => {}) => async dispatch => {
  await dispatch({
    type: SET_LATEST_MAP,
    payload: params || {},
  })
  cb && cb()
}

export const setMapView = (params, cb = () => {}) => async dispatch => {
  await dispatch({
    type: SET_MAP_VIEW,
    payload: params || {},
  })
  cb && cb()
}

export const setCurrentMap = (params, cb = () => {}) => async dispatch => {
  // let result = params && await SMap.importWorkspace(params)
  await dispatch({
    type: SET_CURRENT_MAP,
    payload: params || {},
  })
  cb && cb()
}

// 导出模版
export const exportWorkspace = (params, cb = () => {}) => async (
  dispatch,
  getState,
) => {
  if (isExporting) {
    Toast.show('请稍后再试')
    return false
  }
  isExporting = true
  let userName = getState().user.toJS().currentUser.userName || 'Customer'
  let workspace = getState().map.toJS().workspace
  let path = params.outPath,
    fileName = '',
    fileNameWithoutExtention = '',
    parentPath = '',
    zipPath = ''
  let result = false
  if (!path) {
    fileName = workspace.server.substr(workspace.server.lastIndexOf('/') + 1)
    fileNameWithoutExtention = fileName.substr(0, fileName.lastIndexOf('.'))
    parentPath = await FileTools.appendingHomeDirectory(
      ConstPath.UserPath +
        userName +
        '/' +
        ConstPath.RelativePath.Temp +
        fileNameWithoutExtention,
    )
    path = parentPath + '/' + fileName
  }
  // 导出工作空间
  if (params.maps && params.maps.length > 0) {
    let fileReplace =
      params.fileReplace === undefined ? true : params.fileReplace
    result = await SMap.exportWorkspace(params.maps, path, fileReplace)
  }
  // 压缩工作空间
  if (result) {
    zipPath = parentPath + '.zip'
    result = await FileTools.zipFile(parentPath, zipPath)
  }
  // 删除导出的工作空间
  await FileTools.deleteFile(parentPath)
  isExporting = false
  cb && cb(result, zipPath)
}
//导出工作空间
export const exportmap3DWorkspace = (params, cb = () => {}) => async (
  dispatch,
  getState,
) => {
  // return
  let userName = getState().user.toJS().currentUser.userName || 'Customer'
  if (params.name) {
    if (isExporting) {
      Toast.show('请稍后再试')
      return false
    }
    isExporting = true
    let path = await FileTools.appendingHomeDirectory(
      ConstPath.UserPath +
        userName +
        '/' +
        ConstPath.RelativePath.Temp +
        params.name,
    )
    let result = await SScene.export3DScenceName(params.name, path)
    if (result) {
      let zipPath = path + '.zip'
      result = await FileTools.zipFile(path, zipPath)
      if (result) {
        await FileTools.deleteFile(path)
        Toast.show('导出成功,开始分享')
        isExporting = false
        cb && cb(result, zipPath)
      }
    } else {
      Toast.show('导出失败')
    }
    // let result = await SScene.is3DWorkspace({ server: params.server })
    // if (result) {
    //   let result2 = await SScene.import3DWorkspace({ server: params.server })
    //   if (result2) {
    //     Toast.show('倒入成功')
    //   } else {
    //     Toast.show('倒入失败')
    //   }
    // } else {
    //   Toast.show('倒入失败')
    // }
  }
}
//到入三维工作空间
export const importSceneWorkspace = params => async (dispatch, getState) => {
  let userName = getState().user.toJS().currentUser.userName || 'Customer'
  // console.log(userName)
  // return
  if (userName !== 'Customer') {
    let path = await FileTools.appendingHomeDirectory(
      ConstPath.UserPath + userName,
    )
    await SScene.setCustomerDirectory(path)
  }
  if (params.server) {
    let result = await SScene.is3DWorkspace({ server: params.server })
    if (result) {
      let result2 = await SScene.import3DWorkspace({ server: params.server })
      if (result2) {
        Toast.show('导入成功')
      } else {
        Toast.show('导入失败')
      }
    } else {
      Toast.show('导入失败')
    }
  }
}

const initialState = fromJS({
  latestMap: {},
  map: {},
  maps: [],
  currentMap: {},
  workspace: {},
})

export default handleActions(
  {
    [`${OPEN_WORKSPACE}`]: (state, { payload }) => {
      return state.setIn(['workspace'], fromJS(payload))
    },
    [`${SET_LATEST_MAP}`]: (state, { payload }) => {
      let newData = state.toJS().latestMap || []
      let isExist = false
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].path === payload.path) {
          newData[i] = payload
          let temp = newData[0]
          newData[0] = newData[i]
          newData[i] = temp
          isExist = true
          break
        }
      }
      if (!isExist && payload) {
        newData.unshift(payload)
      }
      return state.setIn(['latestMap'], fromJS(newData))
    },
    [`${SET_MAP_VIEW}`]: (state, { payload }) => {
      if (payload.workspace) {
        state.setIn(['workspace'], fromJS(payload.workspace))
      }
      if (payload.map) {
        state.setIn(['map'], fromJS(payload.map))
      }
      if (payload.mapControl) {
        state.setIn(['mapControl'], fromJS(payload.mapControl))
      }
      return state
    },
    [`${GET_MAPS}`]: (state, { payload }) => {
      return state.setIn(['maps'], fromJS(payload))
    },
    [`${SET_CURRENT_MAP}`]: (state, { payload, extData }) => {
      let newData = state.toJS().latestMap || {}
      if (extData) {
        if (!newData[extData.userName]) {
          newData[extData.userName] = {}
        }
        if (!newData[extData.userName][extData.moduleName]) {
          newData[extData.userName][extData.moduleName] = []
        }
        let isExist = false
        for (
          let i = 0;
          i < newData[extData.userName][extData.moduleName].length;
          i++
        ) {
          if (!payload.path) break
          if (
            newData[extData.userName][extData.moduleName][i].path ===
            payload.path
          ) {
            newData[extData.userName][extData.moduleName][i] = payload
            let temp = newData[extData.userName][extData.moduleName][0]
            newData[extData.userName][extData.moduleName][0] =
              newData[extData.userName][extData.moduleName][i]
            newData[extData.userName][extData.moduleName][i] = temp
            isExist = true
            break
          }
        }
        if (!isExist && payload && payload.path) {
          newData[extData.userName][extData.moduleName].unshift(payload)
        }

        return state
          .setIn(['currentMap'], fromJS(payload))
          .setIn(['latestMap'], fromJS(newData))
      } else {
        return state.setIn(['currentMap'], fromJS(payload))
      }
    },
    [REHYDRATE]: (state, { payload }) => {
      let data,
        payloadData = (payload && payload.map) || state.toJS()
      data = Object.assign({}, payloadData, {
        currentMap: {},
        maps: [],
        workspace: {},
      })
      return fromJS(data)
    },
  },
  initialState,
)
