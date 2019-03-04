import { StyleSheet } from 'react-native'
import { scaleSize, setSpText } from '../../utils'
import { color } from '../../styles'
export default StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    height: scaleSize(80),
    backgroundColor: '#505050',
    paddingLeft: scaleSize(20),
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: scaleSize(79),
    backgroundColor: 'transparent',
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(30),
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  selection: {
    width: scaleSize(40),
    height: scaleSize(40),
    // marginLeft: scaleSize(10),
  },
  sectionsTitle: {
    color: '#F0F0F0',
    fontSize: setSpText(26),
    marginLeft: scaleSize(25),
  },
  itemName: {
    fontSize: setSpText(26),
    marginLeft: scaleSize(55),
    // marginRight:scaleSize(30),
  },
  itemValue: {
    color: '#A0A0A0',
    marginRight: scaleSize(15),
    fontSize: setSpText(22),
  },
  itemSeparator: {
    // width: scaleSize(688),
    flex: 1,
    height: 1,
    backgroundColor: '#A0A0A0',
    // marginLeft: scaleSize(16),
  },
  selectImg: {
    width: scaleSize(60),
    height: scaleSize(60),
    // backgroundColor: 'pink',
  },
  visibleImg: {
    width: scaleSize(40),
    height: scaleSize(40),
    // backgroundColor: 'blue',
    // marginLeft: scaleSize(10),
  },
  type: {
    width: scaleSize(40),
    height: scaleSize(40),
    // backgroundColor: '#A0A0A0',
    marginLeft: scaleSize(55),
  },
  moreView: {
    width: scaleSize(60),
    height: scaleSize(60),
    // backgroundColor: 'red',
    position: 'absolute',
    right: scaleSize(30),
  },
  moreImg: {
    width: scaleSize(60),
    height: scaleSize(60),
  },
  itemBtn: {
    flex: 1,
    // backgroundColor:"#4680DF",
  },
  sectionFooter: {
    flex: 1,
    height: 1,
    backgroundColor: color.fontColorGray,
  },
})
