import React, { Component } from 'react'
import { StyleSheet, View, PanResponder, Image } from 'react-native'
import { screen, scaleSize } from '../../../../utils'

const positionLeft = screen.deviceWidth

export default class TouchProgress extends Component {
  render() {
    return (
      <View style={styles.box} {...this._panResponder.panHandlers}>
        <View style={styles.container}>
          <View style={styles.line} />
          <View ref={ref => (this.panBtn = ref)} style={[styles.pointer]}>
            <Image
              style={[styles.image]}
              source={require('../../../../assets/function/icon_progress.png')}
            />
          </View>
        </View>
      </View>
    )
  }

  constructor(props) {
    super(props)
    this._previousLeft = 0
    this._panBtnStyles = {
      style: {
        left: this._previousLeft,
      },
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    })
  }

  _updateNativeStyles = () => {
    this.panBtn && this.panBtn.setNativeProps(this._panBtnStyles)
  }

  _handleStartShouldSetPanResponder = () => {
    // evt, gestureState
    return true
  }

  _handleMoveShouldSetPanResponder = () => {
    // evt, gestureState
    return true
  }

  _handlePanResponderMove = (evt, gestureState) => {
    let x = this._previousLeft + gestureState.dx
    this._panBtnStyles.style.left = x
    if (this._panBtnStyles.style.left <= 0) this._panBtnStyles.style.left = 0
    if (this._panBtnStyles.style.left >= positionLeft - scaleSize(50))
      this._panBtnStyles.style.left = positionLeft - scaleSize(50)
    this._updateNativeStyles()
  }

  _handlePanResponderEnd = (evt, gestureState) => {
    let x = this._previousLeft + gestureState.dx
    if (x <= 0) x = 0
    if (x >= positionLeft - scaleSize(50)) x = positionLeft - scaleSize(50)
    this._previousLeft = x
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#rgba(0, 0, 0, 0)',
    height: '100%',
    width: '100%',
  },
  container: {
    // backgroundColor: '#rgba(0, 0, 0, 0)',
    backgroundColor: 'white',
    flexDirection: 'column',
    height: scaleSize(40),
    justifyContent: 'center',
    width: '100%',
    left: 0,
    top: 0,
  },
  pointer: {
    position: 'absolute',
    top: -scaleSize(10),
  },
  line: {
    position: 'absolute',
    left: 0,
    height: scaleSize(10),
    width: '100%',
    backgroundColor: 'black',
  },
  image: {
    height: scaleSize(50),
    width: scaleSize(50),
  },
})