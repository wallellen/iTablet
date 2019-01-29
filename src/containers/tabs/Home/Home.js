import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  StatusBar,
  NativeModules,
} from 'react-native'
import { Container, Dialog } from '../../../components'
import { ModuleList } from './components'
import styles from './styles'
// import { scaleSize } from '../../../utils'
import Toast from '../../../utils/Toast'
import { SScene, SMap, SOnlineService } from 'imobile_for_reactnative'
import FileTools from '../../../native/FileTools'
import ConstPath from '../../../constants/ConstPath'
import HomePopupModal from './HomePopupModal'
import NavigationService from '../../NavigationService'
import UserType from '../../../constants/UserType'
const appUtilsModule = NativeModules.AppUtils
export default class Home extends Component {
  props: {
    nav: Object,
    latestMap: Object,
    currentUser: Object,
    setShow: () => {},
    device: Object,
    downList: any,
    importSceneWorkspace: () => {},
    importWorkspace: () => {},
    closeWorkspace: () => {},
    openWorkspace: () => {},
    setUser: () => {},
    setDownInformation: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      isDownloaded: false,
      modalIsVisible: false,
      dialogCheck: false,
    }
  }

  componentDidMount() {
    this._initStatusBarVisible()
  }

  _initStatusBarVisible = async () => {
    let result = await AsyncStorage.getItem('StatusBarVisible')
    let statusBarVisible = result === 'true'
    // this.setState({ statusBarVisible:statusBarVisible }) /** 初始化状态栏可不可见*/
    StatusBar.setHidden(statusBarVisible)
  }
  _onImportWorkspace = async (fileDirPath, toPath, isFisrtImportWorkspace) => {
    try {
      if (fileDirPath !== undefined) {
        if (isFisrtImportWorkspace === true) {
          this.container && this.container.setLoading(true, '导入数据中...')
        }
        await FileTools.copyFile(fileDirPath, toPath)
        let arrFilePath = await FileTools.getFilterFiles(fileDirPath, {
          smwu: 'smwu',
          sxwu: 'sxwu',
        })
        let filePath = arrFilePath[0].filePath
        let is3D = await SScene.is3DWorkspace({ server: filePath })
        if (is3D === true) {
          let result = await this.props.importSceneWorkspace({
            server: filePath,
          })
          if (result === true) {
            // Toast.show('导入3D成功')
          } else {
            Toast.show('导入3D失败')
          }
        } else {
          let result = await SMap.importWorkspaceInfo({
            server: filePath,
            type: 9,
          })

          if (result.length === 0) {
            Toast.show('导入失败')
          }
        }
      }
    } catch (e) {
      Toast.show('导入失败')
    } finally {
      if (isFisrtImportWorkspace === true) {
        this.container && this.container.setLoading(false)
      }
    }
  }
  headRender() {
    let userImg = require('../../../assets/home/icon_mine_select.png')
    let moreImg = require('../../../assets/home/icon_else_selected.png')
    const title = 'SuperMap iTablet'
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.userView}>
          <Image source={userImg} style={styles.userImg} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>{title}</Text>
        <TouchableOpacity>
          <Image
            resizeMode={'contain'}
            source={moreImg}
            style={styles.moreImg}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
  _closeModal = () => {
    this.setState({ modalIsVisible: false })
  }

  _onLogin = () => {
    this._closeModal()
    NavigationService.navigate('Mine')
  }
  _onRegister = () => {
    this._closeModal()
    NavigationService.navigate('Register')
  }

  _onSetting = () => {
    this._closeModal()
    // StatusBar.setHidden(true,'slide')
    NavigationService.navigate('Setting')
  }

  _onAbout = () => {
    this._closeModal()
    NavigationService.navigate('AboutITablet')
  }

  _onToggleAccount = () => {
    this._closeModal()
    NavigationService.navigate('ToggleAccount')
  }

  _onLogout = () => {
    if (this.container) {
      this.container.setLoading(true, '注销中...')
    }
    try {
      if (this.props.currentUser.userType !== UserType.PROBATION_USER) {
        SOnlineService.logout()
      }
      this.props.closeWorkspace(async () => {
        let customPath = await FileTools.appendingHomeDirectory(
          ConstPath.CustomerPath + ConstPath.RelativeFilePath.Workspace,
        )
        this.props.setUser({
          userName: 'Customer',
          userType: UserType.PROBATION_USER,
        })
        this._closeModal()
        if (this.container) {
          this.container.setLoading(false)
        }
        // NavigationService.navigate('Mine')
        NavigationService.reset('Tabs')
        this.props.openWorkspace({ server: customPath })
      })
    } catch (e) {
      if (this.container) {
        this.container.setLoading(false)
      }
    }
  }

  showDialog = value => {
    this.dialog.setDialogVisible(value)
  }

  getMoudleItem = (
    confirm,
    cancel,
    downloadData,
    currentUserName,
    dialogCheck,
  ) => {
    this.dialogConfirm = confirm
    this.dialogCancel = cancel
    this.downloadData = downloadData
    this.currentUserName = currentUserName
    this.setState({ dialogCheck: dialogCheck })
  }

  getExit = () => {
    return this.exit
  }

  exitConfirm = async () => {
    try {
      // await this._onLogout()
      await appUtilsModule.AppExit()
    } catch (error) {
      Toast.show('退出失败')
    }
  }

  confirm = () => {
    let confirm = this.dialogConfirm ? this.dialogConfirm : () => {}
    confirm && confirm(this.downloadData, this.state.dialogCheck)
  }

  cancel = () => {
    let cancel = this.dialogCancel ? this.dialogCancel : () => {}
    cancel && cancel(this.state.dialogCheck)
  }

  renderDialogChildren = () => {
    let Img = this.state.dialogCheck
      ? require('../../../assets/home/Frenchgrey/icon_check_selected.png')
      : require('../../../assets/home/Frenchgrey/icon_check.png')
    return (
      <View style={styles.dialogHeaderView}>
        <Image
          source={require('../../../assets/home/Frenchgrey/icon_prompt.png')}
          style={styles.dialogHeaderImg}
        />
        <Text style={styles.promptTtile}>是否下载示例数据 ？</Text>
        <TouchableOpacity
          style={styles.checkView}
          onPress={() => {
            let newdialogCheck = !this.state.dialogCheck
            this.setState({ dialogCheck: newdialogCheck })
          }}
        >
          <Image source={Img} style={styles.checkImg} />
          <Text style={styles.dialogCheck}>不再提示</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderExitDialogChildren = () => {
    return (
      <View style={styles.dialogHeaderView}>
        <Image
          source={require('../../../assets/home/Frenchgrey/icon_prompt.png')}
          style={styles.dialogHeaderImg}
        />
        <Text style={styles.promptTtile}>确定退出iTablet ？</Text>
      </View>
    )
  }

  renderDialog = () => {
    return (
      <Dialog
        ref={ref => (this.dialog = ref)}
        type={'modal'}
        confirmAction={this.confirm}
        confirmBtnTitle={'下载'}
        cancelBtnTitle={'取消'}
        // backgroundStyle={styles.dialogBackground}
        opacity={0.85}
        opacityStyle={styles.opacityView}
        style={styles.dialogBackground}
        confirmTitleStyle={styles.btnTitle}
        cancelTitleStyle={styles.btnTitle}
        cancelAction={this.cancel}
      >
        {this.renderDialogChildren()}
      </Dialog>
    )
  }

  renderExitDialog = () => {
    return (
      <Dialog
        ref={ref => (this.exit = ref)}
        type={'modal'}
        confirmBtnTitle={'确定'}
        cancelBtnTitle={'取消'}
        confirmAction={this.exitConfirm}
        opacity={0.85}
        opacityStyle={styles.opacityView}
        style={styles.dialogBackground}
      >
        {this.renderExitDialogChildren()}
      </Dialog>
    )
  }

  _renderModal = () => {
    let isLogin = this.props.currentUser.password !== undefined
    return (
      <HomePopupModal
        isLogin={isLogin}
        onLogin={this._onLogin}
        onRegister={this._onRegister}
        onToggleAccount={this._onToggleAccount}
        onLogout={this._onLogout}
        onSetting={this._onSetting}
        onAbout={this._onAbout}
        modalVisible={this.state.modalIsVisible}
        onCloseModal={this._closeModal}
        topNavigatorBarImageId={this.topNavigatorBarImageId}
        getExit={this.getExit}
      />
    )
  }

  render() {
    let isLogin =
      this.props.currentUser.userName !== undefined &&
      this.props.currentUser.password !== undefined
    let userImg = isLogin
      ? {
        uri:
            'https://cdn3.supermapol.com/web/cloud/84d9fac0/static/images/myaccount/icon_plane.png',
      }
      : this.props.currentUser.userType !== undefined
        ? require('../../../assets/home/system_default_header_image.png')
        : require('../../../assets/tabBar/tab_user.png')
    let moreImg = require('../../../assets/home/Frenchgrey/icon_else_selected.png')
    return (
      <Container
        ref={ref => (this.container = ref)}
        headerProps={{
          title: 'SuperMap iTablet',
          headerLeft: (
            <TouchableOpacity
              style={styles.userView}
              onPress={() => {
                this.topNavigatorBarImageId = 'left'
                this.setState({ modalIsVisible: true })
              }}
            >
              <Image source={userImg} style={styles.userImg} />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              onPress={() => {
                this.topNavigatorBarImageId = 'right'
                this.setState({ modalIsVisible: true })
              }}
              style={styles.moreView}
            >
              <Image
                resizeMode={'contain'}
                source={moreImg}
                style={styles.moreImg}
              />
            </TouchableOpacity>
          ),
        }}
        style={styles.container}
      >
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ModuleList
            ref={ref => (this.modulelist = ref)}
            importWorkspace={this._onImportWorkspace}
            setDownInformation={this.props.setDownInformation}
            currentUser={this.props.currentUser}
            styles={styles.modulelist}
            device={this.props.device}
            downList={this.props.downList}
            showDialog={this.showDialog}
            getMoudleItem={this.getMoudleItem}
          />
          {this._renderModal()}
          {this.renderDialog()}
          {this.renderExitDialog()}
        </View>
      </Container>
    )
  }
}
