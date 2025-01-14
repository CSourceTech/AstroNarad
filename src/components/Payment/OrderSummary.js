import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const OrderSummary = () => {
  const navigation = useNavigation();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
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
    navigation.navigate('Payment');
  };

  const navigate_to_Receipt = () => {
    navigation.navigate('OrderReceipt');
  }

  // const cartItems = [
  //   {id: 1, name: 'Red Stone', weight: '1.5 kt', price: 499, discount: '₹50'},
  //   // { id: 2, name: "Black Stone", weight: "250kt", price: 699, discount: '₹70' },
  //   // { id: 3, name: "Green Stone", weight: "300kt", price: 299, discount: '₹30' },
  //   // { id: 4, name: "Black Stone", weight: "250kt", price: 699, discount: '₹70' },
  //   // { id: 5, name: "Green Stone", weight: "300kt", price: 299, discount: '₹30' },
  //   // { id: 6, name: "Black Stone", weight: "250kt", price: 699, discount: '₹70' },
  //   // { id: 7, name: "Green Stone", weight: "300kt", price: 299, discount: '₹30' },
  //   // { id: 8, name: "Black Stone", weight: "250kt", price: 699, discount: '₹70' },
  //   // { id: 9, name: "Green Stone", weight: "300kt", price: 299, discount: '₹30' },
  // ];

  const deliveryInfo = [
    {label: 'Delivery', amount: '₹199'},
    {label: 'Savings', amount: '₹550'},
    { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
  ];

  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, City, State, ZIP',
      phone: '+1234567890',
      location: '1.3km',
      duration: '15-20 min',
      type: 'HOME',
    },
    // { id: 2, name: 'Jane Smith', address: '456 Another Rd, City, State, ZIP', phone: '+9876543210', location: '1.3km', duration: '15-20 min', type: 'OFFICE' },
  ];

  const handleAddNewAddress = () => {};

  const handleSelectAddress = index => {
    setSelectedAddressIndex(selectedAddressIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBackground}
          onPress={navigate_to_back}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Summary</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}>
        <View style={styles.cartInfoContainer}>
          <Text style={styles.cartText}>
            🛒 {cartItems.length} Items in the Cart
          </Text>
        </View>

        <View style={styles.cardContainer}>
          {cartItems.map(item => (
            <View key={item.id} style={styles.Cartcard}>
              <View style={styles.cardContent}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productWeight}>{item.weight}</Text>
                  <Text style={styles.productPrice}>₹{item.price_in_rupee}</Text>
                </View>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>Quantity - {item.quantity}</Text>
                  {/* <View style={styles.discountButtons}>
                    <TouchableOpacity style={styles.discountButton}>
                      <Text style={styles.discountSymbol}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.discountButton}>
                      <Text style={styles.discountSymbol}>+</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.cartInfoContainer}>
          <Text style={styles.cartText}>📍 Delivery address</Text>
        </View>

        {addresses.map((address, index) => (
          <View key={address.id} style={styles.addressCard}>
            <TouchableOpacity
              onPress={() => handleSelectAddress(index)}
              style={styles.checkboxContainer}>
              <View
                style={[
                  styles.checkbox,
                  selectedAddressIndex === index && styles.checkboxChecked,
                ]}>
                {selectedAddressIndex === index && (
                  <Text style={styles.tick}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.addressContent}>
              <Text style={styles.addressText}>{address.name}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressText}>{address.phone}</Text>
              <View style={styles.line} />
              <View style={styles.rowcontainer}>
                <Text style={styles.addressText}>📍 {address.location}</Text>
                <Text style={styles.addressText}>🕒 {address.duration}</Text>
                <View style={styles.typeContainer}>
                  <Text style={styles.typeText}>{address.type}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>✎</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.cartInfoContainer}>
          <Text style={styles.cartText}>💵 Payment method</Text>
        </View>

        <View style={styles.CreditCardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardDetails}>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
                  }}
                  style={styles.visaLogo}
                  resizeMode="contain"
                />
                <Text style={styles.BalanceTitle}>Card Balance</Text>
              </View>
              <Text style={styles.cardBalance}>₹540.50</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>CARD NUMBER</Text>
              <Text style={styles.cardNumber}>**** **** **** 1234</Text>
            </View>

            <View style={styles.cardDetails}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardInfo}>Himakiran</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>VALID</Text>
                <Text style={styles.cardInfo}>12/25</Text>
              </View>
            </View>
          </View>
        </View>


      </ScrollView>

      <View style={styles.summaryCard}>
          <View style={styles.column}>
            {deliveryInfo.map((info, index) => (
              <View key={index} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{info.label}</Text>
                <Text style={styles.summaryAmount}>{info.amount}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={navigate_to_Receipt}>
            <Text style={styles.checkoutButtonText}>
              Place Your Order and Pay
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
  cartInfoContainer: {
    paddingVertical: height * 0.02,
  },
  cartText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6F7F95',
    fontWeight: '600',
  },
  cardContainer: {
    marginTop: height * 0.02,
  },
  Cartcard: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 30,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productName: {
    fontSize: width * 0.045,
    color: '#333',
    right: 30,
    fontWeight: '600',
  },
  productWeight: {
    fontSize: width * 0.04,
    color: '#777',
  },
  productPrice: {
    fontSize: width * 0.045,
    // color: '#FCBC05',
    fontWeight: 'bold',
    right: 20,
  },
  discountContainer: {
    // alignItems: 'flex-end',
    // left: 10,
  },
  discountText: {
    fontSize: width * 0.04,
    color: 'red',
  },
  discountButtons: {
    flexDirection: 'row',
    marginTop: height * 0.01,
  },
  discountButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  discountSymbol: {
    fontSize: width * 0.05,
    color: 'white',
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 10,
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: width * 0.02,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#738385',
    borderRadius: 5,
    backgroundColor: 'transparent',
    bottom: '25%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FCBC05',
  },
  tick: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    bottom: '10%',
  },
  addressContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  addressText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  line: {
    height: 1,
    width: width * 0.91,
    right: width * 0.15,
    backgroundColor: '#e0e0e0',
    marginVertical: height * 0.02,
  },
  typeContainer: {
    backgroundColor: '#6C7C93',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    left: width * 0.1,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  rowcontainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'flex-end',
    // justifyContent: 'space-between'
  },
  editButton: {
    backgroundColor: '#6C7C93',
    borderRadius: 10,
    padding: 5,
    bottom: '5%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: width * 0.035,
  },
  addButton: {
    backgroundColor: '#FCBC05',
    borderRadius: 10,
    padding: 10,
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  summaryCard: {
    // backgroundColor: '#fff',
    // padding: width * 0.04,
    // borderRadius: 10,
    // marginVertical: height * 0.02,
    // alignItems: 'center',
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
  summaryItem: {
    alignItems: 'center',
  },
  column: {
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: width * 0.045,
    color: '#333',
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
  CreditCardContainer: {
    flex: 1,
    marginVertical: height * 0.03,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardHeader: {
    width: width * 0.9,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // padding: 15,
    padding: width * 0.01,
    backgroundColor: '#f1c232',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // bottom: height* 0.024,
    bottom: '12%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardNumber: {
    color: '#07162C',
    fontWeight: '500',
    fontSize: 11,
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  cardLabel: {
    color: '#515D6B',
    fontSize: 9.6,
    fontWeight: '400',
  },
  BalanceTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    bottom: height * 0.018,
    right: width * 0.03,
  },
  cardInfo: {
    color: '#07162C',
    fontSize: 16,
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    alignSelf: 'flex-end',
    bottom: height * 0.02,
    right: width * 0.03,
  },
  cardBalanceContainer: {
    right: width * 0.1,
  },
  Details: {
    bottom: height * 0.01,
  },
  visaLogo: {
    width: 50,
    height: 20,
    tintColor: 'white',
    left: width * 0.03,
  },
});

export default OrderSummary;
