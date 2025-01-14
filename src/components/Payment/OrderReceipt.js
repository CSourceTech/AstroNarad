import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const OrderReceipt = () => {
  const navigation = useNavigation();
  const [tickScale] = useState(new Animated.Value(0));
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const token = useSelector(state => state.auth.value.accessToken);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://35.174.44.86:8000/api/cart', {
          method: 'GET',
          headers: {
            accept: '*/*',
            accesstoken: token,
          },
        });
        const json = await response.json();
        if (json.data) {
          setCartItems(json.data);
          setTotalAmount(json.total_amount);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);


  const navigate_to_back = () => {
    navigation.navigate('OrderSummary');
  };

  const navigate_to_Track = () => {
    navigation.navigate('Track');
  }

  React.useEffect(() => {
    Animated.spring(tickScale, {
      toValue: 1,
      friction: 2,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const deliveryInfo = [
    {label: 'Delivery', amount: '₹199'},
    {label: 'Savings', amount: '₹550'},
    { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBackground}
          onPress={navigate_to_back}
        >
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thank You</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}>

      <View style={styles.OrderTitle}>
        <Text style={styles.OrderText}>
          We’ve received the payment & dispatched your order.
        </Text>
      </View>

      <Animated.View style={[styles.tickContainer, { transform: [{ scale: tickScale }] }]}>
        <Image source={Images.TickPayment} style={styles.tickImage} />
      </Animated.View>


      <View style={styles.summaryCard}>
      <View style={styles.summaryItem}>
        <Text style={styles.cardTitle}>Order Summary</Text>
        <Text style={styles.summaryLabel}>ID: 27796430</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Items</Text>
          <Text style={styles.summaryValue}>{cartItems.length}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryAmount}>₹ 99</Text>
        </View>
        {deliveryInfo.map((info, index) => (
              <View key={index} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{info.label}</Text>
                <Text style={styles.summaryAmount}>{info.amount}</Text>
              </View>
            ))}
        {/* <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Price</Text>
          <Text style={styles.summaryValue}>₹ 1647</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>₹ 299</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryValue}>₹ 199</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹ 1898</Text>
        </View> */}
      </View>

        </ScrollView>

        <View style={styles.TrackCard}>
          <View style={styles.column}>
                <Text style={styles.TrackLabel}>🕒 Your order will reach you in 18 min.</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={navigate_to_Track} >
            <Text style={styles.checkoutButtonText}>
              Track Order
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackground: {
    backgroundColor: 'white',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  headerIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#656565',
    fontSize: 18,
    fontWeight: '600',
    left: width * 0.2,
  },
  scrollViewContent: {
    paddingBottom: 200, // Ensure no overlap with footer
  },
  OrderTitle: {
    marginTop: 40,
    alignSelf: 'center',
    width: '80%',
  },
  OrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B3551',
    textAlign: 'center',
  },
  tickContainer: {
    marginTop: 60,
    alignSelf: 'center',
    width: 90,          
    height: 90,         
    borderRadius: 60,    
    backgroundColor: '#FCBC05',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tickImage: {
    width: 40,
    height: 40,
    tintColor: 'white', 
  },
  summaryCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B3551',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#656565',
  },
  summaryValue: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#656565',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B3551',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B3551',
  },

  TrackCard: {
    // backgroundColor: '#fff',
    // padding: width * 0.04,
    // borderRadius: 10,
    // marginVertical: height * 0.02,
    // // alignItems: 'center',
    // flexDirection: 'column',

    position: 'absolute',
    bottom: -15,
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.01,
    alignItems: 'center',
    width: '110%',
  },
  TrackItem: {
    // alignItems: 'center',
  },
  column: {
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
  },
  TrackLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#656565',
  },
  summaryAmount: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#656565',
  },
  checkoutButton: {
    backgroundColor: '#656565',
    padding: width * 0.03,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
    width: '100%',
  },
  checkoutButtonText: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderReceipt;
