/*
 Copyright © SuperMap. All rights reserved.
 Author: Yangshanglong
 E-mail: yangshanglong@supermap.com
 */

import * as React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button, RadioGroup, TextBtn } from '../../../../components'
import { Toast } from '../../../../utils'

import styles from './styles'

export default class LocationView extends React.Component {
  props: {
    currentIndex: number,
    style?: any,
    backHide?: boolean,
    locateToTop?: () => {},
    locateToBottom?: () => {},
    locateToPosition?: () => {},
  }

  static defaultProps = {
    data: [],
    backHide: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
    }

    this.options = [
      {
        title: '相对位置',
        value: 'relative',
        hasInput: true,
        keyboardType: 'numeric',
      },
      {
        title: '绝对位置',
        value: 'absolute',
        hasInput: true,
        keyboardType: 'numeric',
      },
    ]
    this.currentData = {}
  }

  show = isShow => {
    if (isShow !== undefined && this.state.isShow !== isShow) {
      this.setState({
        isShow: isShow,
      })
    } else {
      this.setState(prevState => ({
        isShow: !prevState.isShow,
      }))
    }
  }

  locateToTop = () => {
    if (
      this.props.locateToTop &&
      typeof this.props.locateToTop === 'function'
    ) {
      this.props.locateToTop({
        type: 'top',
        index: 0,
      })
    }
  }

  locateToBottom = () => {
    if (
      this.props.locateToBottom &&
      typeof this.props.locateToBottom === 'function'
    ) {
      this.props.locateToBottom({
        type: 'top',
        index: 0,
      })
    }
  }

  locateToPosition = () => {
    if (
      this.props.locateToPosition &&
      typeof this.props.locateToPosition === 'function'
    ) {
      if (
        this.currentData &&
        this.currentData.value &&
        this.currentData.inputValue >= 0
      ) {
        this.props.locateToPosition({
          type: this.currentData.value,
          index: this.currentData.inputValue,
        })
      } else {
        Toast.show('请选择定位信息')
      }
    }
    this.show(false)
  }

  renderTop = () => {
    return (
      <View style={styles.topView}>
        <Text style={styles.text}>{'当前位置 ' + this.props.currentIndex}</Text>
      </View>
    )
  }

  renderButtons = () => {
    return (
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          titleStyle={styles.buttonTitle}
          title="定位到首位"
          onPress={this.locateToTop}
        />
        <Button
          style={styles.button}
          titleStyle={styles.buttonTitle}
          title="定位到末行"
          onPress={this.locateToBottom}
        />
      </View>
    )
  }

  renderOptions = () => {
    return (
      <View style={styles.options}>
        <RadioGroup
          data={this.options}
          column={1}
          onSubmitEditing={data => {
            this.currentData = data
          }}
        />
      </View>
    )
  }

  renderBottom = () => {
    return (
      <View style={styles.bottomButtons}>
        <TextBtn btnText="取消" btnClick={() => this.show(false)} />
        <TextBtn btnText="定位" btnClick={this.locateToPosition} />
      </View>
    )
  }

  render() {
    if (!this.state.isShow) return null
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView style={{ flex: 1 }}>
          {this.renderTop()}
          {this.renderButtons()}
          {this.renderOptions()}
        </ScrollView>
        {this.renderBottom()}
      </View>
    )
  }
}