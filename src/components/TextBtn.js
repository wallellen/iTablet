import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as Util from '../utils/constUtil'

const WIDTH = 70
const textBlue = Util.USUAL_BLUE

export default class TextBtn extends React.Component {

  props: {
    width: number,
    height: number,
    btnText: string,
    btnClick: () => {},
    textStyle: any,
  }

  constructor(props) {
    super(props)
    
    this.state = {
      clicked: false,
    }
  }

  _btnClick = () => {
    // if (!this.state.clicked) {
    //   this.setState({ clicked: true });
    // }
    if (this.props.btnClick) {
      this.props.btnClick()
    }
  }

  render() {
    const containerWidth = this.props.width ? this.props.width : WIDTH
    const containerHeight = this.props.height ? this.props.height : null
    return (
      <View style={[styles.container,{width:containerWidth,height:containerHeight}]}>
        <TouchableOpacity accessible={true} accessibilityLabel={this.props.btnText} activeOpacity={0.8} style={styles.titleBtn} onPress={this._btnClick}>
          <Text style={[styles.btnText, this.props.textStyle]}>{this.props.btnText ? this.props.btnText : '按钮'}</Text>
          {/*<Text style={[styles.btnText, { color: this.state.clicked ? Util.USUAL_PURPLE : textBlue }]}>{this.props.btnText ? this.props.btnText : '按钮'}</Text>*/}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    // textDecorationLine: 'underline',
    fontSize: 17,
    color: Util.USUAL_BLUE,
    alignSelf: 'center',
  },
})