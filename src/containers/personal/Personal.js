import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Container, Button } from '../../components'
import { ConstPath } from '../../constants'
// import { Toast } from '../../utils'
import NavigationService from '../NavigationService'
import { SOnlineService, Utility } from 'imobile_for_reactnative'
import styles from './styles'

export default class Personal extends Component {
  props: {
    navigation: Object,
    user: Object,
    setUser: () => {},
    openWorkspace: () => {},
    closeWorkspace: () => {},
  }

  constructor(props) {
    super(props)
  }

  logout = () => {
    (async function() {
      try {
        await SOnlineService.logout()
        this.props.closeWorkspace(async () => {
          let customPath = await Utility.appendingHomeDirectory(
            ConstPath.CustomerPath + ConstPath.RelativeFilePath.Workspace,
          )
          await this.props.openWorkspace({ server: customPath })
          NavigationService.goBack()
          this.props.setUser()
        })
      } catch (e) {
        // Toast.show('退出登录失败')
        this.props.setUser()
      }
    }.bind(this)())
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        {this.renderHeaderItem({
          title: '头像',
          image: require('../../assets/public/icon-avatar-default.png'),
        })}
        {this.renderHeaderItem({
          title: '用户名',
          value: this.props.user.currentUser.userName,
        })}
        {this.renderHeaderItem({
          title: '手机号',
          value: this.props.user.currentUser.phone,
        })}
        {this.renderHeaderItem({
          title: '邮箱',
          value: this.props.user.currentUser.email,
        })}
      </View>
    )
  }

  renderHeaderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        {item.image ? (
          <Image
            style={styles.avatar}
            source={require('../../assets/public/icon-avatar-default.png')}
          />
        ) : (
          <Text style={styles.value}>{item.value}</Text>
        )}
      </View>
    )
  }

  renderLogout = () => {
    return (
      <Button
        style={styles.logoutBtn}
        title="退出登录"
        onPress={this.logout}
        activeOpacity={0.8}
        type="GRAY"
      />
    )
  }

  render() {
    return (
      <Container
        style={styles.container}
        ref={ref => (this.container = ref)}
        headerProps={{
          title: '个人资料',
          navigation: this.props.navigation,
        }}
      >
        {this.renderHeader()}
        {this.renderLogout()}
      </Container>
    )
  }
}
