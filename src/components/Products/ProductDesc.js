import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Modal, FlatList } from "react-native";
import Images from "../../assets/Images";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../../Redux/cartSlice";

const { width, height } = Dimensions.get("window");

const ProductDesc = () => {
    const [quantity, setQuantity] = useState(1); 
    const [modalVisible, setModalVisible] = useState(false); 
    const navigation = useNavigation();
    const route = useRoute();
    const {item} =  route.params;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const token = useSelector(state => state.auth.value.accessToken);

    const navigate_to_back = () => {
        navigation.navigate('Products'); 
    };

    // const navigate_to_Cart = () => {
    //     navigation.navigate('Cart')
    // }

    const navigate_to_Cart = async () => {
        try {
            const response = await fetch('http://35.174.44.86:8000/api/cart', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'accesstoken': token,
                },
                body: JSON.stringify({
                    product_id: item.product_id, 
                    category_id: item.category_id,  
                    quantity: cart.find((cartItem) => cartItem.id === item.id)?.quantity || 1, 
                }),
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log('Cart updated successfully:', result);
                navigation.navigate('Cart');  
            } else {
                console.error('Error updating cart:', result);
            }
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };
    

    const handleWishlist = () => {
        alert('Added to Wishlist'); 
        navigation.navigate('WishList');
    };
    

    // const increaseQuantity = () => setQuantity(prev => prev + 1);

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    }
    // const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
        if (item.quantity <= 1) {
            navigation.navigate('Products');  
        }
    }

    const reviews = [
        { id: 1, title: "Great product!", rating: 5, comment: "Really loved the quality and color." },
        { id: 2, title: "Good value", rating: 4, comment: "Decent product for the price, fast delivery." },
        { id: 3, title: "Could be better", rating: 3, comment: "The product is good but color is slightly different." },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
           <View style={styles.header}>
                <Image source={Images.Background} style={styles.backgroundImage} />
                <TouchableOpacity onPress={navigate_to_back} style={styles.backButton}>
                    <Image source={Images.arrowLeft} style={styles.headerIcon} />
                </TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.background} />
                <TouchableOpacity style={styles.shareButton}>
                    <Image source={Images.share} style={styles.shareIcon} />
                </TouchableOpacity>
                {/* <View style={styles.rowContainer}>
                    <Image source={Images.gallery} style={styles.galleryImg} />
                </View> */}
                <View style={styles.colors}>
                    <Image source={Images.colors} style={styles.colorsImg} />
                </View>
            </View>

            {/* <ScrollView> */}
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <View style={styles.costContainer}>
                    <Text style={styles.price}>₹ {item.price_in_rupee}</Text>
                    {/* {cart.map((item) => {
                    <View  style={styles.quantityContainer}>
                        <Pressable style={styles.quantityButton} onPress={() => decreaseQuantity(item)}>
                            <Text style={styles.quantityText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Pressable style={styles.quantityButton} onPress={() => increaseQuantity(item)}>
                            <Text style={styles.quantityText}>+</Text>
                        </Pressable>
                    </View>
                    })} */}

                    {cart.map((cartItem) => (
                     cartItem.id === item.id && (
                    <View key={cartItem.id} style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(cartItem)}>
                            <Text style={styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{cartItem.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(cartItem)}>
                            <Text style={styles.quantityText}>+</Text>
                        </TouchableOpacity>
                    </View>
                     )
                    ))}
                        </View>
                    </View>

            <View style={styles.ratingColumn} >
                <Text style={styles.ratingStar}>4.9 ★</Text>
            </View>

            <View style={styles.detailsRow}>
                <Text style={styles.detailText}>₹ Free Delivery</Text>
                <Text style={styles.detailText}>🕒 20-30 mins</Text>
                <Text style={styles.detailText}>★ 4.5</Text>
            </View>

            <View style={styles.aboutContainer}>
                <Text style={styles.aboutTitle}>About</Text>
                <Text style={styles.aboutText}>{item.description}</Text>
            </View>

            <View style={styles.ReviewContainer}>
                <Text style={styles.aboutTitle}>Review ({reviews.length})</Text>
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>{item.title}</Text>
                            <Text style={styles.reviewRating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
                            <Text style={styles.reviewComment}>{item.comment}</Text>
                        </View>
                    )}
                />
            </View>

            {/* {cart.map((cartItem) => (
            <View style={styles.addToCartContainer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => setModalVisible(true)}>
                <TouchableOpacity style={styles.addToCartButton} onPress={navigate_to_Cart} >
                    <Text style={styles.addToCartText}>Add to Cart ( {cartItem.quantity} ITEMS )</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlist}>
                        <Text style={styles.wishlistText}>Add to Wishlist</Text>
                    </TouchableOpacity>
            </View>
            ))} */}

            </ScrollView>

            <View style={styles.bottomSheet}>
            {cart.map((cartItem) => (
                     cartItem.id === item.id && (
                    <View key={cartItem.id} style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(cartItem)}>
                            <Text style={styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{cartItem.quantity}</Text>
                        <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(cartItem)}>
                            <Text style={styles.quantityText}>+</Text>
                        </TouchableOpacity>
                    </View>
                     )
                    ))}
            {cart.map((cartItem) => (
        <TouchableOpacity style={styles.ChatButton} onPress={navigate_to_Cart} >
        <View style={styles.BottomSheetrow}>
            <Image source={Images.Message} style={styles.Bottomimage} />
            <Text style={styles.bottomButtonText}>Add To Cart ( {cartItem.quantity} ITEMS )</Text>
          </View>
        </TouchableOpacity>
            ))}
        <TouchableOpacity style={styles.CallButton} onPress={handleWishlist} >
        <View style={styles.BottomSheetrow}>
        <Image source={Images.Like_WishList} style={styles.Like_WishListimage} />
          </View>
        </TouchableOpacity>
      </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F1F5",
    },
    header: {
        paddingTop: height * 0.05,
        paddingBottom: height * 0.02,
        backgroundColor: "#f1c232",
        alignItems: "center",
        paddingHorizontal: width * 0.05,
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: height * 0.47,
        opacity: 0.5,
    },
    backButton: {
        position: "absolute",
        top: height * 0.03,
        left: width * 0.05,
    },
    headerIcon: {
        width: 24,
        height: 24,
    },
    background: {
        width: width * 0.9,  
        height: height * 0.3,  
        resizeMode: 'contain',  
        alignSelf: 'center',  
        marginVertical: height * 0.02,  
    },

    galleryImg: {
        width: width * 0.2,  
        height: width * 0.4, 
        resizeMode: 'contain',  
        alignSelf: 'center',  
        marginTop: height * 0.02,  
    },
    shareButton: {
        position: "absolute",
        top: height * 0.03,
        right: width * 0.05,
    },
    shareIcon: {
        width: 24,
        height: 24,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: height * 0.090,
        position: 'absolute'
    },
    colors: {
        // marginVertical: height * 0.02,
        alignItems: "center",
    },
    colorsImg: {
        width: width * 0.4,
        height: width * 0.14,
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
    },
    productTitle: {
        fontSize: 32,
        fontWeight: "700",
        color: '#171621',
        flex: 1,
    },
    ratingColumn: {
        flexDirection: 'column',
        paddingHorizontal: 28,
        bottom: height * 0.040,
    },
    costContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    price: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.01,
    },
    quantityButton: {
        // width: width * 0.08,
        // height: width * 0.08,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "grey",
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 35,
    },
    quantityText: {
        fontSize: 18,
        color: 'black'
    },
    quantity: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: width * 0.03,
        color: '#656565',
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        // marginVertical: height * 0.02,
    },
    ratingStar: {
        fontSize: 18,
        fontWeight: '500',
        color: "#171621",
    },
    detailText: {
        fontSize: 15,
        fontWeight: '400',
        color: "#878787",
    },
    aboutContainer: {
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.025,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: height * 0.01,
        color: '#171621'
    },
    aboutText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#757575",
    },
    ReviewContainer: {
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.010,
    },
    reviewContainer: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    reviewTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: '#171621'
    },
    reviewRating: {
        color: "#f1c232",
        marginVertical: 5,
    },
    reviewComment: {
        fontSize: 14,
        color: "#555",
    },
    addToCartContainer: {
        padding: width * 0.05,
    },
    addToCartButton: {
        backgroundColor: '#656565',
        paddingVertical: height * 0.015,
        borderRadius: 5,
        alignItems: "center",
    },
    addToCartText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    wishlistButton: {
        backgroundColor: "#e0e0e0",
        paddingVertical: height * 0.015,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    wishlistText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 10,
      },
      costMin: {
        color: '#738385'
      },
      MinCost: {
        fontSize: 18,
        fontWeight: '800',
        color: '#656565'
      },
      CallButton: {
        width: width * 0.15,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#C0CCC7',
        alignItems: 'center',
      },
      ChatButton:{
        width: width * 0.4,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#656565',
        alignItems: 'center',
      },
      BottomSheetrow: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
      },
      bottomButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        width: 100,
      },
      Bottomimage: {
        width: 24,
        height: 24,
        marginRight: 5,
        resizeMode: 'contain',
        tintColor: 'white'
      },
      Like_WishListimage: {
        width: 30,
        height: 30,
        marginRight: 5,
        resizeMode: 'contain',
        tintColor: 'white',
        top: 10,
        left: 6,
        tintColor: 'grey'
      },
});

export default ProductDesc;
