import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const Track = () => {
  const navigation = useNavigation();
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
    navigation.navigate('OrderReceipt');
  };

  const navigate_to_Home = () => {
    navigation.navigate('Home');
  };

  const deliveryInfo = [
    {label: 'Delivery', amount: '₹199'},
    {label: 'Savings', amount: '₹550'},
    { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
  ];

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBackground}
          onPress={navigate_to_back}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Track Order</Text>
      </View>

      <ImageBackground
        source={Images.Map}
        style={styles.backgroundImage}></ImageBackground>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.cardTitle}>DATE: 12 Apr 2022</Text>
          <Text style={styles.summaryLabel}>ID: 27796430</Text>
        </View>

        <View style={styles.statusColumn}>
          <View style={styles.iconContainerone}>
            <Image source={Images.OrderPlaced} style={styles.statusIcon} />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.summaryLabel}>Order Placed</Text>
            <Text style={styles.summaryValue}>8:12am</Text>
          </View>
        </View>

        <View style={styles.statusColumn}>
          <View style={styles.iconContainertwo}>
            <Image source={Images.ItemDisp} style={styles.statusIcon} />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.summaryLabel}>Item Dispatched</Text>
            <Text style={styles.summaryValue}>8:20am</Text>
          </View>
        </View>

        <View style={styles.statusColumn}>
          <View style={styles.iconContainerthree}>
            <Image source={Images.Delivered} style={styles.statusIcon} />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.summaryLabel}>Delivered</Text>
            <Text style={styles.summaryValue}>2956 New Delhi, 8:42 am</Text>
          </View>
        </View>
      </View>


    </View>

<View style={styles.summaryDetailCard}>
<View style={styles.column}>
  {deliveryInfo.map((info, index) => (
    <View key={index} style={styles.summaryDetailItem}>
      <Text style={styles.summaryDetailLabel}>{info.label}</Text>
      <Text style={styles.summaryDetailAmount}>{info.amount}</Text>
    </View>
  ))}
</View>
<TouchableOpacity
  style={styles.checkoutButton}
  onPress={navigate_to_Home}>
  <Text style={styles.checkoutButtonText}>Back To Home</Text>
</TouchableOpacity>
</View>
</>
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
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  overlayContent: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  summaryCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B3551',
  },
  statusColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainerone: {
    marginRight: 15,
    padding: 8,
    borderRadius: 25,
    backgroundColor: '#2F80ED',
  },
  iconContainertwo: {
    marginRight: 15,
    padding: 8,
    backgroundColor: '#F7700F',
    borderRadius: 25,
  },
  iconContainerthree: {
    marginRight: 15,
    padding: 8,
    backgroundColor: '#00C375',
    borderRadius: 25,
  },
  statusIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  statusInfo: {
    flexDirection: 'column',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#656565',
    marginBottom: 2,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: '#656565',
  },
  iconContainerOrderPlaced: {
    backgroundColor: '#2F80ED',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerItemDisp: {
    backgroundColor: '#F7700F',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerDelivered: {
    backgroundColor: '#00C375',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  summaryDetailCard: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    marginVertical: height * 0.02,
    alignItems: 'center',
    flexDirection: 'column',
  },
  summaryDetailItem: {
    alignItems: 'center',
  },
  column: {
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
  },
  summaryDetailLabel: {
    fontSize: width * 0.045,
    color: '#333',
  },
  summaryDetailAmount: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#656565'
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

export default Track;
