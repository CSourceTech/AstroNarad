import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash/Splash';
import Login from './src/screens/Login/Login';
import Otp from './src/screens/Otp/Otp';
import DOB from './src/screens/DOB/DOB';
import Home from './src/screens/Home/Home';


const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Onboarding'}>

        {/* <Stack.Screen 
          name='Splash'
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false}}
         />

         <Stack.Screen
           name='Otp'
           component={Otp}
           options={{headerShown: false}}
         />

         <Stack.Screen
           name='DOB'
           component={DOB}
           options={{headerShown: false}}
          /> */}

          <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown: false}}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
