import { StyleSheet, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { GetContext } from './src/context/app-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {


  return (
    <GestureHandlerRootView style={styles.container}>
      <GetContext>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </GetContext>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
