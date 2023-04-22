import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './Screens/Home';
// import Search from './Screens/Search';



export default function App() {
  
  return (
    <SafeAreaProvider>
      <Home/>
    </SafeAreaProvider>
  );
}


