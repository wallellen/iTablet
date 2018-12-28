import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native'
import { size } from '../../../../styles'
import { scaleSize } from '../../../../utils'
import constants from '../../constants'
import { ConstToolType } from '../../../../constants'

export default class MenuAlertDialog extends React.Component {
  props: {
    btnStyle: StyleSheet,
    btnTitleStyle: StyleSheet,
    backHide: any,
    existFullMap: () => {},
    showFullMap: () => {},
    getToolBarRef: () => {},
  }

  //单值
  uniqueMenuInfo = [
    {
      key: '表达式',
      btntitle: '表达式',
      action: () => {
        this.setSelectedMenu('表达式')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getThemeExpress(
            ConstToolType.MAP_THEME_PARAM_UNIQUE_EXPRESSION,
          )
        }
      },
    },
    {
      key: '颜色方案',
      btntitle: '颜色方案',
      action: () => {
        this.setSelectedMenu('颜色方案')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getUniqueColorScheme(
            ConstToolType.MAP_THEME_PARAM_UNIQUE_COLOR,
          )
        }
      },
    },
  ]

  //分段
  rangeMenuInfo = [
    {
      key: '表达式',
      btntitle: '表达式',
      action: () => {
        this.setSelectedMenu('表达式')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getThemeExpress(
            ConstToolType.MAP_THEME_PARAM_RANGE_EXPRESSION,
          )
        }
      },
    },
    {
      key: '分段方法',
      btntitle: '分段方法',
      action: () => {
        this.setSelectedMenu('分段方法')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getRangeMode(ConstToolType.MAP_THEME_PARAM_RANGE_MODE)
        }
      },
    },
    {
      key: '分段个数',
      btntitle: '分段个数',
      action: () => {
        this.setSelectedMenu('分段个数')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getRangeParameter(ConstToolType.MAP_THEME_PARAM_RANGE_PARAM)
        }
      },
    },
    {
      key: '颜色方案',
      btntitle: '颜色方案',
      action: () => {
        this.setSelectedMenu('颜色方案')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getRangeColorScheme(ConstToolType.MAP_THEME_PARAM_RANGE_COLOR)
        }
      },
    },
  ]

  //统一标签
  labelMenuInfo = [
    {
      key: '表达式',
      btntitle: '表达式',
      action: () => {
        this.setSelectedMenu('表达式')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getThemeExpress(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_EXPRESSION,
          )
        }
      },
    },
    {
      key: '背景形状',
      btntitle: '背景形状',
      action: () => {
        this.setSelectedMenu('背景形状')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getLabelBackShape(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_BACKSHAPE,
          )
        }
      },
    },
    {
      key: '背景颜色',
      btntitle: '背景颜色',
      action: () => {
        this.setSelectedMenu('背景颜色')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getLabelBackColor(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_BACKSHAPE_COLOR,
          )
        }
      },
    },
    // {
    //   key: '字体',
    //   btntitle: '字体',
    //   action: () => {
    //     this.setSelectedMenu('字体')
    //     this.setDialogVisible(false)

    //     const toolRef = this.props.getToolBarRef()
    //     if (toolRef) {
    //       toolRef.getLabelFontName(
    //         ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FONTNAME,
    //       )
    //     }
    //   },
    // },
    {
      key: '字号',
      btntitle: '字号',
      action: () => {
        this.setSelectedMenu('字号')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getLabelFontSize(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FONTSIZE,
          )
        }
      },
    },
    {
      key: '旋转角度',
      btntitle: '旋转角度',
      action: () => {
        this.setSelectedMenu('旋转角度')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getLabelFontRotation(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_ROTATION,
          )
        }
      },
    },
    {
      key: '颜色',
      btntitle: '颜色',
      action: () => {
        this.setSelectedMenu('颜色')
        this.setDialogVisible(false)

        const toolRef = this.props.getToolBarRef()
        if (toolRef) {
          toolRef.getLabelFontColor(
            ConstToolType.MAP_THEME_PARAM_UNIFORMLABEL_FORECOLOR,
          )
        }
      },
    },
  ]

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      childrens: [],
      visible: false,
      selectedMenu: '',
    }
  }

  getData = () => {
    let data
    switch (this.state.type) {
      case constants.THEME_UNIQUE_STYLE:
        data = this.uniqueMenuInfo
        break
      case constants.THEME_RANGE_STYLE:
        data = this.rangeMenuInfo
        break
      case constants.THEME_UNIFY_LABEL:
        data = this.labelMenuInfo
        break
      default:
        data = this.uniqueMenuInfo
        break
    }
    return data
  }

  showMenuDialog = () => {
    let data = this.getData()
    this.setState({
      visible: true,
      childrens: data,
    })
  }

  setMenuType = menuType => {
    this.setState({
      type: menuType,
      selectedMenu: '',
    })
  }

  setSelectedMenu(menu) {
    this.setState({
      selectedMenu: menu,
    })
  }

  setDialogVisible(visible) {
    visible !== this.state.visible && this.setState({ visible: visible })
    // if (visible) {
    //   this.props.showFullMap && this.props.showFullMap(true)
    // } else {
    //   this.props.showFullMap && this.props.showFullMap(false)
    // }
  }

  _onClose = () => {
    this.setState({ visible: false })
    // this.props.showFullMap && this.props.showFullMap(false)
  }

  renderItem(item) {
    if (this.state.selectedMenu == item.key) {
      return (
        <TouchableHighlight
          style={styles.selectedbtn}
          activeOpacity={0.9}
          underlayColor="#4680DF"
          // underlayColor = {'rgba(70,128,223,0.9)'}
          onPress={item.action}
        >
          <Text style={styles.btnTitle}>{item.btntitle}</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          style={styles.btn}
          activeOpacity={0.9}
          underlayColor="#4680DF"
          // underlayColor = {'rgba(70,128,223,0.9)'}
          onPress={item.action}
        >
          <Text style={styles.btnTitle}>{item.btntitle}</Text>
        </TouchableHighlight>
      )
    }
  }
  itemSeparator = () => {
    return <View style={styles.itemSeparator} />
  }
  render() {
    if (this.state.childrens.length === 0) return null
    if (this.state.type === '') return null
    let modalBackgroundStyle = {
      backgroundColor: 'rgba(105, 105, 105, 0.3)',
    }
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
          //点击物理按键需要隐藏对话框
          if (this.props.backHide) {
            this.setDialogVisible(false)
          }
        }}
      >
        <View style={[styles.container, modalBackgroundStyle]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flex: 1 }}
            onPress={this._onClose}
          >
            <View style={styles.mainTitle}>
              <View style={styles.dialogStyle}>
                <FlatList
                  data={this.state.childrens}
                  renderItem={({ item }) => this.renderItem(item)}
                  ItemSeparatorComponent={this.itemSeparator.bind(this)}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 40,
  },
  mainTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dialogStyle: {
    width: scaleSize(300),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(48,48,48,0.85)',
  },
  btnTitle: {
    color: 'white',
    fontSize: size.fontSize.fontSizeLg,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  selectedbtnTitle: {
    color: 'white',
    fontSize: size.fontSize.fontSizeLg,
    backgroundColor: '#4680DF',
    textAlign: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(80),
    backgroundColor: 'transparent',
    minWidth: scaleSize(100),
    width: scaleSize(300),
  },
  selectedbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(80),
    backgroundColor: '#4680DF',
    minWidth: scaleSize(100),
    width: scaleSize(300),
  },
  itemSeparator: {
    height: scaleSize(5),
    backgroundColor: 'transparent',
  },
})
