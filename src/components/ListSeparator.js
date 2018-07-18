/*
 Copyright © SuperMap. All rights reserved.
 Author: Yang Shanglong
 E-mail: yangshanglong@supermap.com
 */

import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../styles'
import { scaleSize } from '../utils'
import PropTypes from 'prop-types'

export default class ListSeparator extends React.Component {

  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    mode: PropTypes.string,
    color: PropTypes.string,
  }

  static defaultProps = {
    mode: 'horizontal',
  }

  render() {
    if (this.props.mode === 'vertical') {
      return (
        <View style={[
          styles.vSeparator,
          this.props.color && { backgroundColor: this.props.color },
          this.props.height && { height: this.props.height },
          this.props.width && { width: this.props.width },
        ]} />
      )
    } else {
      return (
        <View style={[
          styles.hSeparator,
          this.props.color && { backgroundColor: this.props.color },
          this.props.height && { height: this.props.height },
          this.props.width && { width: this.props.width },
        ]} />
      )
    }
  }
}

const styles = StyleSheet.create({
  hSeparator: {
    flex: 1,
    height: scaleSize(1),
    marginHorizontal: 0,
    backgroundColor: color.background,
  },
  vSeparator: {
    // flex: 1,
    width: scaleSize(1),
    backgroundColor: color.background,
  },
})

ListSeparator.mode = {
  VERTICAL: 'vertical',     // 纵向的分割线
  HORIZONTAL: 'horizontal', // 横向的分割线
}