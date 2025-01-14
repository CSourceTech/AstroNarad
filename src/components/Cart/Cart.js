import React,{useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

// const Cart = () => {
//   const navigation = useNavigation();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const token = useSelector(state => state.auth.value.accessToken);


//   const navigate_to_back = () => {
//     navigation.navigate('ProductDesc');
//   };

//   const navigate_to_Address = () => {
//     navigation.navigate('DeliveryAddress');
//   };

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await fetch('http://35.174.44.86:8000/api/cart', {
//           method: 'GET',
//           headers: {
//             accept: '*/*',
//             accesstoken: token,
//           },
//         });
//         const json = await response.json();
//         if (json.data) {
//           setCartItems(json.data);
//           setTotalAmount(json.total_amount);
//         }
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };
//     fetchCartItems();
//   }, []);

//   const deliveryInfo = [
//     {label: 'Delivery', amount: '₹199'},
//     {label: 'Savings', amount: '₹550'},
//     { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* <TouchableOpacity
//           style={styles.arrowBackground}
//           onPress={navigate_to_back}>
//           <Image source={Images.arrowLeft} style={styles.headerIcon} />
//         </TouchableOpacity> */}

//         <View style={styles.inputWrapper}>
//           <TextInput
//             style={styles.input}
//             placeholder="Search Services.."
//             placeholderTextColor="#aaa"
//           />
//           <TouchableOpacity style={styles.arrowContainer}>
//             <Image source={Images.RightArrow} style={styles.rightArrowIcon} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.ScrollView}>
//         <View style={styles.cartInfoContainer}>
//           <Text style={styles.cartText}>
//             {cartItems.length} Items in the Cart
//           </Text>
//         </View>
//         <View style={styles.deliveryInfoContainer}>
//           <Text style={styles.deliveryText}>📍 1.3km</Text>
//           <Text style={styles.deliveryText}>🕒 15 - 20 mins</Text>
//         </View>

//         {/* Cart Items */}
//         <View style={styles.cardContainer}>
//           {cartItems.map(item => (
//             <View key={item.cart_data_id} style={styles.card}>
//               <View style={styles.cardContent}>
//                 <Image source={{ uri: item.image }} style={styles.productImage} />
//                 <View>
//                   <Text style={styles.productName}>{item.name}</Text>
//                   <Text style={styles.productPrice}>₹{item.price_in_rupee}</Text>
//                 </View>
//                 <View style={styles.discountContainer}>
//                   <Text style={styles.discountText}>Quantity - {item.quantity}</Text>
//                   <View style={styles.discountButtons}>
//                     <TouchableOpacity style={styles.discountButton}>
//                       <Text style={styles.discountSymbol}>-</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.discountButton}>
//                       <Text style={styles.discountSymbol}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const token = useSelector(state => state.auth.value.accessToken);

  const navigate_to_back = () => {
    navigation.navigate('ProductDesc');
  };

  const navigate_to_Address = () => {
    navigation.navigate('DeliveryAddress');
  };

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

  const incrementQuantity = async (cart_data_id) => {
    const updatedItems = cartItems.map(item => {
      if (item.cart_data_id === cart_data_id) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        updateCartOnServer(updatedItem.cart_data_id, updatedItem.quantity); // Send update to server
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotalAmount(updatedItems);
  };

  const decrementQuantity = async (cart_data_id) => {
    const updatedItems = cartItems.map(item => {
      if (item.cart_data_id === cart_data_id && item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        updateCartOnServer(updatedItem.cart_data_id, updatedItem.quantity); // Send update to server
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotalAmount(updatedItems);
  };

  const updateCartOnServer = async (cart_data_id, quantity) => {
    try {
      await fetch('http://35.174.44.86:8000/api/update-cart', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          accesstoken: token,
        },
        body: JSON.stringify({ cart_data_id, quantity }),
      });
    } catch (error) {
      console.error('Error updating cart on server:', error);
    }
  };

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price_in_rupee * item.quantity, 0);
    setTotalAmount(total);
  };

  const deliveryInfo = [
    { label: 'Delivery', amount: '₹199' },
    { label: 'Savings', amount: '₹550' },
    { label: 'Total', amount: `₹${totalAmount.toFixed(2)}` },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Search Services.."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.arrowContainer}>
            <Image source={Images.RightArrow} style={styles.rightArrowIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.ScrollView}>
        <View style={styles.cartInfoContainer}>
          <Text style={styles.cartText}>
            {cartItems.length} Items in the Cart
          </Text>
        </View>
        <View style={styles.deliveryInfoContainer}>
          <Text style={styles.deliveryText}>📍 1.3km</Text>
          <Text style={styles.deliveryText}>🕒 15 - 20 mins</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.cardContainer}>
          {cartItems.map(item => (
            <View key={item.cart_data_id} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>₹{item.price_in_rupee}</Text>
                </View>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>Quantity - {item.quantity}</Text>
                  <View style={styles.discountButtons}>
                    <TouchableOpacity
                      style={styles.discountButton}
                      onPress={() => decrementQuantity(item.cart_data_id)}
                    >
                      <Text style={styles.discountSymbol}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.discountButton}
                      onPress={() => incrementQuantity(item.cart_data_id)}
                    >
                      <Text style={styles.discountSymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
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
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={navigate_to_Address}>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 44,
    flex: 1,
    paddingHorizontal: width * 0.03,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#000',
    paddingVertical: height * 0.01,
  },
  arrowContainer: {
    // width: width * 0.1,
    // height: width * 0.1,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#FCBC05',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrowIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  ScrollView: {
    paddingBottom: 100,
  },
  cartInfoContainer: {
    paddingVertical: height * 0.02,
  },
  cartText: {
    fontSize: width * 0.05,
    color: '#333',
    fontWeight: '600',
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 20,
    // paddingHorizontal: width * 0.04,
    // paddingVertical: height * 0.015,
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '700',
    bottom: '2%',
    color: '#6F7F95',
  },
  cardContainer: {
    marginTop: height * 0.02,
  },
  card: {
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
    justifyContent: 'space-between',
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
  },
  discountContainer: {
    alignItems: 'flex-end',
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
});

export default Cart;
