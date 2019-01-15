import { StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils'
// const SCREEN_WIDTH = Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    backgroundColor: '#F0F0F0',
  },
  header: {
    // width: SCREEN_WIDTH * 0.762,
    flex: 1,
    // backgroundColor:"red",
    height: scaleSize(50),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaleSize(50),
  },
  userImg: {
    width: scaleSize(30),
    // flex:1,
    height: scaleSize(30),
  },
  userView: {
    flex: 1,
    // width: scaleSize(30),
    // flex:6,
    // height: scaleSize(30),
    borderRadius: scaleSize(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C4C4C',
    marginLeft: scaleSize(30),
  },
  headTitle: {
    flex: 6.5,
    // width: scaleSize(500),
    height: scaleSize(60),
    color: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: scaleSize(30),
    // fontFamily: 'CenturyGothic',
  },
  moreImg: {
    width: scaleSize(30),
    height: scaleSize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modulelist: {
    flex: 1,
  },
})
