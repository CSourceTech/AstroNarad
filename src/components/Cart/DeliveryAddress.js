import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

const DeliveryAddress = () => {
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
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Another Rd, City, State, ZIP',
      phone: '+9876543210',
      location: '1.3km',
      duration: '15-20 min',
      type: 'OFFICE',
    },
  ];

  const deliveryInfo = [
    {label: 'Delivery', amount: '₹199'},
    {label: 'Savings', amount: '₹550'},
    { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
  ];

  const navigate_to_back = () => {
    navigation.navigate('Cart');
  };

  const navigate_to_Payment = () => {
    navigation.navigate('Payment');
  };

  const handleEditAddress = index => {
    console.log(`Edit address at index: ${index}`);
  };

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
        <Text style={styles.headerText}>Delivery Address</Text>
      </View>

      <ScrollView style={styles.ScrollView}>
        {/* <View style={styles.rowpath}>
                <Text style={styles.rowpathText}>🛒 Cart</Text>
                <Text style={styles.rowpathText}>📍 Address</Text>
                <Text style={styles.rowpathText}>💵 Payment</Text>
            </View> */}
        <View style={styles.rowpath}>
          <Text style={styles.rowpathText}>🛒 Cart</Text>
          <View style={styles.separator} />
          <Text style={styles.rowpathText}>📍 Address</Text>
          <View style={styles.separator} />
          <Text style={styles.rowpathText}>💵 Payment</Text>
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
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditAddress(index)}>
              <Text style={styles.editButtonText}>✎</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNewAddress}>
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>

        {/* <View style={styles.summaryCard}>
                {deliveryInfo.map((info, index) => (
                    <View key={index} style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>{info.label}</Text>
                        <Text style={styles.summaryAmount}>{info.amount}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={navigate_to_Payment}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity> */}

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
            onPress={navigate_to_Payment}>
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
  ScrollView: {
    paddingBottom: 100,
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
    backgroundColor: '#d3d3d3', // Grey color
    marginHorizontal: width * 0.02,
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
  // summaryCard: {
  //     backgroundColor: '#fff',
  //     padding: width * 0.04,
  //     borderRadius: 10,
  //     marginVertical: height * 0.04,
  //     flexDirection: 'row',
  //     justifyContent: 'space-around',
  //     alignItems: 'center',
  // },
  // summaryItem: {
  //     alignItems: 'center',
  // },
  // summaryLabel: {
  //     fontSize: width * 0.045,
  //     color: '#333',
  // },
  // summaryAmount: {
  //     fontSize: width * 0.045,
  //     fontWeight: 'bold',
  // },
  // checkoutButton: {
  //     backgroundColor: '#656565',
  //     padding: width * 0.04,
  //     borderRadius: 10,
  //     alignItems: 'center',
  //     marginVertical: height * 0.02,
  // },
  // checkoutButtonText: {
  //     fontSize: width * 0.045,
  //     color: '#fff',
  //     fontWeight: 'bold',
  // },
  summaryCard: {
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
});

export default DeliveryAddress;
