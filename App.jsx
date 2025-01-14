import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash/Splash';
import Login from './src/screens/Login/Login';
import Otp from './src/screens/Otp/Otp';
import DOB from './src/screens/DOB/DOB';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile/Profile';
import Message from './src/screens/Message/Message';
import Products from './src/screens/Products/Products';
import AccountSettings from './src/components/Profile/AccountSettings';
import Subscription from './src/components/Profile/Subscription';
import NotificationSettings from './src/components/Profile/NotificationSettings';
import WalletBalance from './src/components/Profile/WalletBalance';
import EditCard from './src/components/Profile/EditCard';
import AddCard from './src/components/Profile/AddCard';
import Refer from './src/components/Profile/Refer';
import HelpCenter from './src/components/Profile/HelpCenter';
import About from './src/components/Profile/About';
import ProductDesc from './src/components/Products/ProductDesc';
import Cart from './src/components/Cart/Cart';
import DeliveryAddress from './src/components/Cart/DeliveryAddress';
import Payment from './src/components/Payment/Payment';
import OrderSummary from './src/components/Payment/OrderSummary';
import OrderReceipt from './src/components/Payment/OrderReceipt';
import Track from './src/components/Track/Track';
import WishList from './src/components/Products/WishList';
import AstrologerDesc from './src/components/Message/AstrologerDesc';
import ChatScreen from './src/components/Products/ChatScreen';
import DailyHoroscope from './src/components/Home/DailyHoroscope';
import FreeKundali from './src/components/Home/FreeKundali';
import KundaliMatching from './src/components/Home/KundaliMatching';
import TarrotCards from './src/components/Home/TarrotCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken, changeLoginStatus} from './src/Redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import Call_Screen from './src/components/Message/Call_Screen';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import RecentAstrologerDesc from './src/components/Message/RecentAstologerDesc';
import RecentChatScreen from './src/components/Products/RecentChatScreen';
import SignUp from './src/screens/SignUp/SignUp';

if (!firebase.apps.length) {
  firebase.initializeApp();
}

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const LoginStatus = useSelector(state => state.auth.value.loginStatus);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('token', token);
        if (token) {
          getFCMToken();
          dispatch(setToken(token));
          dispatch(changeLoginStatus(true));
        }
      } catch (error) {
        console.error('Failed to retrieve token:', error);
      }
    };

    checkLoginStatus();
  }, [dispatch]);
  






  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Notification permissions granted:', authStatus);
    } else {
        console.log('Notification permissions not granted');
    }
};

// Get FCM token
const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        const accessToken = await AsyncStorage.getItem('accessToken')
        console.log('accessToken:', accessToken);

        // Send the token to your server to register this device for notifications
        const response = await fetch('http://35.174.44.86:8000/api/firebase-token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'accesstoken': accessToken,
          },
          body: JSON.stringify({
              firebase_device_token: token, // Send the FCM token to the server
          }),
      });
      console.log(response)
    } catch (error) {
        console.error('Error getting FCM token:', error);
    }
};

// Display notifications using Notifee
const displayNotification = async (remoteMessage) => {
    await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
            channelId: 'default',
            smallIcon: 'ic_launcher', // Replace with your app's icon
        },
    });
};

// Create notification channels for Android
const createNotificationChannels = async () => {
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
};

useEffect(() => {
    // Request permissions and set up notification channels
    requestUserPermission();
    createNotificationChannels();

    // Handle foreground notifications
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground notification:', remoteMessage);
        displayNotification(remoteMessage);
    });

    // Handle background notifications
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(
        async (remoteMessage) => {
            console.log('Background notification:', remoteMessage);
            displayNotification(remoteMessage);
        }
    );

    // Handle notifications when the app is opened from a terminated state
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log('Notification caused app to open:', remoteMessage);
                Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
            }
        });

    return () => {
    };
}, []);















  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LoginStatus ? 'Home' : 'Splash'}>
        {!LoginStatus ? (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="DOB"
              component={DOB}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DOB"
              component={DOB}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Message"
              component={Message}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Products"
              component={Products}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="AccountSettings"
              component={AccountSettings}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Subscription"
              component={Subscription}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettings}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="WalletBalance"
              component={WalletBalance}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="EditCard"
              component={EditCard}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="AddCard"
              component={AddCard}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Refer"
              component={Refer}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="HelpCenter"
              component={HelpCenter}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="About"
              component={About}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ProductDesc"
              component={ProductDesc}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="DeliveryAddress"
              component={DeliveryAddress}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="OrderReceipt"
              component={OrderReceipt}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Track"
              component={Track}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="WishList"
              component={WishList}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="AstrologerDesc"
              component={AstrologerDesc}
              options={{headerShown: false}}
            />

            <Stack.Screen
            name='RecentAstrologerDesc'
            component={RecentAstrologerDesc}
            options={{headerShown: false}}
            />

            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
             name='RecentChatScreen'
             component={RecentChatScreen}
             options={{headerShown: false}}
             />

            <Stack.Screen 
              name='DailyHoroscope'
              component={DailyHoroscope}
              options={{headerShown: false}}
            />

            <Stack.Screen 
              name='FreeKundali'
              component={FreeKundali}
              options={{headerShown: false}}
            />

            <Stack.Screen
             name='KundaliMatching'
             component={KundaliMatching}
             options={{headerShown: false}}
            />

            <Stack.Screen
             name='TarrotCards'
             component={TarrotCards}
             options={{headerShown: false}}
            /> 

            <Stack.Screen
             name='Call_Screen'
             component={Call_Screen}
             options={{headerShown: false}}
             />

          </>
        )}
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
