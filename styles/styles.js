import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const bg = 'rgba(0,0,0,0.1)';
const gutter = width * .03;
const vunit = 30;

export const styles = StyleSheet.create({
  container: {
    flex: 1, // fills entire screen
    backgroundColor: bg,
  },
  headline: {
    marginLeft: gutter,
    marginTop: vunit,
    fontSize: 20,
  },
  form: {
    flexDirection: 'row',
    marginTop: vunit,
  },
  input: {
    height: vunit,
    width: width/1.8,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginLeft: gutter,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0CD699',
    height: vunit,
    width: width/3,
    marginLeft: gutter,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  btnTxt: {
    lineHeight: vunit
  },
  list: {
    marginTop: vunit,
    marginLeft: gutter,
    width: width/1.06,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  listItem: {
    borderColor: 'gray',
    borderTopWidth: 1,
    height: vunit * 1.25,
    paddingLeft: gutter,
    paddingRight: gutter,
  },
  listItemText: {
    lineHeight: vunit * 1.25,
  }
});
