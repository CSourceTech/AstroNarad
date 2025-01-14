import React, {useState,useEffect} from 'react';
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
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const Payment = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
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
    navigation.navigate('DeliveryAddress');
  };

  const navigate_to_Summary = () => {
    navigation.navigate('OrderSummary');
  };

  const addNewCard = () => {
    // Handle adding the card here
    console.log('Card Added:', {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      isDefault,
    });
    // Close the modal
    setModalVisible(false);
    // Reset the state
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setIsDefault(false);
  };

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
          onPress={navigate_to_back}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      {/* <ScrollView style={styles.ScrollView}> */}
      <ScrollView 
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}>
        {/* <View style={styles.rowpath}>
                <Text style={styles.rowpathText}>Cart</Text>
                <Text style={styles.rowpathText}>Address</Text>
                <Text style={styles.rowpathText}>Payment</Text>
            </View> */}

        <View style={styles.rowpath}>
          <Text style={styles.rowpathText}>🛒 Cart</Text>
          <View style={styles.separator} />
          <Text style={styles.rowpathText}>📍 Address</Text>
          <View style={styles.separator} />
          <Text style={styles.rowpathText}>💵 Payment</Text>
        </View>

        <View style={styles.cardContainer}>
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
          <View style={styles.Buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Add New Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.otherWaysTitle}>Other Way to Pay</Text>
        <View style={styles.otherPaymentsContainer}>
          <View style={styles.paymentOptionCard}>
            <Text style={styles.paymentOptionText}>UPI Transfer</Text>
          </View>
          <View style={styles.paymentOptionCard}>
            <Text style={styles.paymentOptionText}>Crypto Wallet</Text>
          </View>
          <View style={styles.paymentOptionCard}>
            <Text style={styles.paymentOptionText}>Gift Card</Text>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add a Credit or Debit Card</Text>
              <Text style={styles.modalSubtitle}>
                We accept major credit & debit cards.
              </Text>

              <Text style={styles.modalLabel}>Card Number</Text>
              <TextInput
                style={styles.textInput}
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor="#6F7F95"
                keyboardType="numeric"
              />

              <Text style={styles.modalLabel}>Name on Card</Text>
              <TextInput
                style={styles.textInput}
                value={cardName}
                onChangeText={setCardName}
                placeholderTextColor="#6F7F95"
                placeholder="John Doe"
              />

              <Text style={styles.modalLabel}>Expiry Date</Text>
              <View style={styles.expiryContainer}>
                <TextInput
                  style={[styles.textInput, styles.expiryInput]}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholder="MM/YY"
                  placeholderTextColor="#6F7F95"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.textInput, styles.expiryInput]}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="CVV"
                  placeholderTextColor="#6F7F95"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox value={isDefault} onValueChange={setIsDefault} />
                <Text style={styles.checkboxLabel}>Make this card default</Text>
              </View>

              <TouchableOpacity
                style={styles.addCardButton}
                onPress={addNewCard}>
                <Text style={styles.addCardButtonText}>Add New Card</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={navigate_to_Summary}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
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
  rowpath: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    padding: width * 0.02,
    borderRadius: 5,
  },
  rowpathText: {
    fontSize: width * 0.04,
    color: '#738385',
    fontWeight: '500',
    paddingHorizontal: width * 0.02,
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#d3d3d3',
    marginHorizontal: width * 0.02,
  },
  cardContainer: {
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
  Buttoncontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f1c232',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherWaysTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    marginVertical: height * 0.02,
    color: '#333',
  },
  otherPaymentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
  },
  paymentOptionCard: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: 'white',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: width * 0.04,
    width: '70%',
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#656565',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  checkoutButtonText: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
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
  line: {
    height: 1,
    width: width * 0.91,
    right: width * 0.15,
    backgroundColor: '#e0e0e0',
    marginVertical: height * 0.02,
  },
  typeContainer: {
    backgroundColor: '#656565',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  typeText: {
    color: '#fff',
    fontSize: width * 0.035,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  //   modalContent: {
  //     // width: width * 0.9,
  //     width: '100%',
  //     backgroundColor: 'white',
  //     borderRadius: 30,
  //     borderBottomLeftRadius: 0,
  //     borderBottomRightRadius: 0,
  //     padding: 20,
  //     top: '23%',
  //     height: '80%',
  //     alignItems: 'flex-start',
  //   },
  // modalContent: {
  //     width: '100%', // Set to 90% of screen width
  //     backgroundColor: 'white',
  //     borderRadius: 30,
  //     borderBottomLeftRadius: 0,
  //     borderBottomRightRadius: 0,
  //     padding: 20,
  //     top: height * 0.15, // Position from the top to be 15% of the screen height
  //     height: height * 0.8, // Set height to 80% of the screen height
  //     alignItems: 'flex-start',
  //     alignSelf: 'center', // Center horizontally
  //   },

  //   modalTitle: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     marginBottom: 10,
  //   },
  //   modalSubtitle: {
  //     fontSize: 14,
  //     marginBottom: 20,
  //   },
  //   modalLabel: {
  //     fontSize: 14,
  //     marginBottom: 5,
  //   },
  //   textInput: {
  //     height: 40,
  //     borderColor: '#ddd',
  //     borderWidth: 1,
  //     borderRadius: 5,
  //     paddingHorizontal: 10,
  //     width: '100%',
  //     marginBottom: 15,
  //   },
  //   expiryContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     width: '100%',
  //   },
  //   expiryInput: {
  //     flex: 1,
  //     marginRight: 10,
  //   },
  //   checkboxContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginBottom: 20,
  //   },
  //   checkboxLabel: {
  //     marginLeft: 10,
  //     fontSize: 14,
  //   },
  //   addCardButton: {
  //     backgroundColor: '#f1c232',
  //     paddingVertical: 10,
  //     paddingHorizontal: 20,
  //     borderRadius: 5,
  //     alignSelf: 'flex-end',
  //   },
  //   addCardButtonText: {
  //     color: 'white',
  //     fontWeight: 'bold',
  //   },
  //   closeButton: {
  //     marginTop: 10,
  //     color: 'blue',
  //     textAlign: 'center',
  //   },
  // modalContent: {
  //     width: '100%', // Set to 90% of screen width
  //     backgroundColor: 'white',
  //     borderRadius: 30,
  //     borderBottomLeftRadius: 0,
  //     borderBottomRightRadius: 0,
  //     padding: 20,
  //     top: "10%", // Position from the top to be 10% of the screen height
  //     // height: height * 0.75, // Set height to 75% of the screen height
  //     height: "100%",
  //     alignItems: 'flex-start',
  //     alignSelf: 'center', // Center horizontally
  //   },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    top: height * 0.2,
    maxHeight: height * 0.85,
    alignItems: 'flex-start',
    alignSelf: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#3B3551',
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6F7F95',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B3551',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  expiryInput: {
    flex: 1,
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#6F7F95',
  },
  addCardButton: {
    backgroundColor: '#656565',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  addCardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Payment;
