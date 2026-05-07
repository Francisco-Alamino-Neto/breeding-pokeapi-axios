import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
  },

  leftContainer: {
    width: '40%',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,
  },

  rightContainer: {
    width: '60%',

    paddingRight: 10,
  },
});