/*
 Copyright © SuperMap. All rights reserved.
 Author: Yangshanglong
 E-mail: yangshanglong@supermap.com
 */
import * as React from 'react'
import { View } from 'react-native'
import { Container, Input, TextBtn } from '../../components'
import { color } from '../../styles'
import styles from './styles'

export default class InputPage extends React.Component {
  props: {
    navigation: Object,
    nav: Object,
  }

  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state
    this.cb = params && params.cb
    this.state = {
      value: params && params.value ? params.value : '',
      placeholder: params && params.placeholder ? params.placeholder : '',
      headerTitle: params && params.headerTitle ? params.headerTitle : '',
      btnTitle: params && params.btnTitle ? params.btnTitle : '确定',
    }
  }

  confirm = () => {
    this.input && this.input.blur()
    this.cb && this.cb(this.state.value)
  }

  render() {
    return (
      <Container
        ref={ref => (this.container = ref)}
        style={styles.container}
        headerProps={{
          title: this.state.headerTitle,
          navigation: this.props.navigation,
          headerRight: (
            <TextBtn
              btnText={this.state.btnTitle}
              textStyle={styles.headerBtnTitle}
              btnClick={this.confirm}
            />
          ),
        }}
      >
        <View style={styles.subContainer}>
          <Input
            ref={ref => (this.input = ref)}
            accessible={true}
            accessibilityLabel={'输入框'}
            inputStyle={styles.input}
            placeholder={this.state.placeholder}
            placeholderTextColor={color.themePlaceHolder}
            value={this.state.value + ''}
            onChangeText={text => {
              this.setState({
                value: text,
              })
            }}
            returnKeyType={'done'}
            showClear
          />
        </View>
      </Container>
    )
  }
}