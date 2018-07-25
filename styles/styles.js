import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const bg = 'rgba(0,0,0,0.2)';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // fills entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bg,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  box: {
    backgroundColor: 'yellow',
    height: 30,
    width: width/3,
  }
});
