import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Images from '../../assets/Images';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';

const { width, height } = Dimensions.get("window");

const TopProducts = () => {
    const navigation = useNavigation();
    const [cardData, setCardData] = useState();
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.value.accessToken);
    const cart = useSelector((state) => state.cart.cart );
    console.log(cart);
    const dispatch = useDispatch();

    const addItemToCart = (item) => {
        dispatch(addToCart(item));
        console.log("Adding to cart:", item);
        navigation.navigate('ProductDesc', { item });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await fetch('https://astrotalk-pink.vercel.app/api/product/1', {
                    const response = await fetch('http://35.174.44.86:8000/api/product/1', {
                    method: 'GET',
                    headers: {
                        'accept': '*/*',
                        'accesstoken': token,
                    }
                });
                const data = await response.json();
                setCardData(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                {cardData?.map((item) => (
                    <View key={item.product_id} style={styles.card}>
                        <View style={styles.header1}>
                            <View style={styles.HeaderTitle}>
                                <Text style={styles.title}>{item.discount}% OFF</Text>
                            </View>
                            <Image source={{ uri: item.image }} style={styles.Producticon}/>
                        </View>
                        <View style={styles.AstrologersDetails}>
                            <Text style={styles.Name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price_in_rupee} / 500 Kt</Text>
                            <View style={styles.rowContainer}>
                                <Text style={styles.Cost}>{item.quality}</Text>
                                <TouchableOpacity onPress={() => addItemToCart(item)}>
                                    <Image source={Images.Cart} style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1F5',
        padding: width * 0.03,
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: 'white',
        // width: width * 0.4,
        // height: height * 0.26,
        width: '45%',
        padding: width * 0.04,
        marginHorizontal: width * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        marginTop: height * 0.01,
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: '10%',
        // right: '5%'
    },
    title: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 5,
        backgroundColor: '#656565',
        borderRadius: 15,
        right: 10,
        top: 5
    },
    Producticon: {
        width: 80, 
        height: 80, 
        resizeMode: 'contain', 
        borderRadius: 80, 
        left: 30,
        top: 15,
        marginTop: 10,
        position: 'absolute',
    },
    AstrologersDetails: {
        // marginTop: height * 0.1,
        marginTop: 80,
        top: 15
    },
    Name: {
        fontSize: width * 0.035,
        fontWeight: '400',
        color: 'black',
        padding: 5,
        borderRadius: 15,
        right: '10%'
    },
    price: {
        fontSize: width * 0.035,
        fontWeight: '301',
        color: '#0D0D0D',
        padding: 5,
        borderRadius: 15,
        right: '10%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Cost: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#0D0D0D',
        padding: 5,
        borderRadius: 15,
        right: '30%'
    },
    icon: {
        width: width * 0.06,
        height: width * 0.06,
        resizeMode: 'contain',
        marginLeft: width * 0.03,
        tintColor: 'grey'
    },
    image: {
        width: width * 0.42,
        height: height * 0.20,
        borderRadius: 10,
        marginBottom: 10,
        bottom: '20%',
        right: '8%'
    },
    HeaderTitle: {
        position: 'absolute',
    }
});

export default TopProducts;



// import React from 'react';
// import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get("window");

// const cardData = [
//     { id: 1,  title1: '15% OFF', name: 'Greeen Stone', price: '₹249 / 500 Kt', Cost: '₹499', image: require('../../assets/Cart.png') },
//     { id: 2, title1: '47% OFF', name: 'Red Blue Stone', price: '₹249 / 500 Kt', Cost: "₹299", image: require('../../assets/Cart.png')},
//     { id: 3, title1: '15% OFF', name: 'Greeen Stone', price: '₹249 / 500 Kt', Cost: '₹499', image: require('../../assets/Cart.png')},
//     { id: 4, title1: 'ON SALE', name: 'Red Blue Stone', price: '₹249 / 500 Kt', Cost: "₹399", image: require('../../assets/Cart.png')},
//     { id: 5, title1: '15% OFF', name: 'Greeen Stone', price: '₹249 / 500 Kt', Cost: '₹499', image: require('../../assets/Cart.png')},
//     { id: 6, title1: '47% OFF', name: 'Red Blue Stone', price: '₹249 / 500 Kt', Cost: "₹699", image: require('../../assets/Cart.png')},
// ];

// const TopProducts = () => {
//     const navigation = useNavigation();

//     const navigate_to_prodDesc = () => {
//         navigation.navigate('ProductDesc');
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.scrollContainer}>
//                 {cardData.map((card) => (
//                     <View key={card.id} style={styles.card}>
//                         <View style={styles.header1}>
//                             <View style={styles.HeaderTitle}>
//                                 <Text style={styles.title}>{card.title1}</Text>
//                             </View>
//                         </View>
//                         <View style={styles.AstrologersDetails}>
//                             <Text style={styles.Name}>{card.name}</Text>
//                             <Text style={styles.price}>{card.price}</Text>
//                             <View style={styles.rowContainer}>
//                                 <Text style={styles.Cost}>{card.Cost}</Text>
//                                <TouchableOpacity onPress={navigate_to_prodDesc}><Image source={card.image} style={styles.icon}/></TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 ))}
//             </View>
        
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F4F1F5',
//         padding: width * 0.05,
//     },
//     scrollContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         gap: 5,
//         flexWrap: 'wrap',
//     },
//     card: {
//         backgroundColor: 'white',
//         width: width * 0.4, 
//         height: height * 0.26,
//         padding: width * 0.04,
//         marginHorizontal: width * 0.02, 
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#D7D7D7',
//         marginTop: height * 0.01,
//     },
//     header1: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         bottom: '10%',
//         right: '5%'
//     },
//     title: {
//         fontSize: width * 0.035, 
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         padding: 5,
//         backgroundColor: '#656565',
//         borderRadius: 15,
//         right: '5%'
//     },
//     AstrologersDetails: {
//         // top: height * 0.1,
//         marginTop: height * 0.1,
//     },
//     Name: {
//         fontSize: width * 0.035, 
//         fontWeight: '400',
//         color: 'black',
//         padding: 5,
//         borderRadius: 15,
//         right: '10%'
//     },
//     price: {
//         fontSize: width * 0.035, 
//         fontWeight: '301',
//         color: '#0D0D0D',
//         padding: 5,
//         borderRadius: 15,
//         right: '10%'
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     Cost: {
//         fontSize: width * 0.035, 
//         fontWeight: '500',
//         color: '#0D0D0D',
//         padding: 5,
//         borderRadius: 15,
//         right: '30%'
//     },
//     icon: {
//         width: width * 0.06,
//         height: width * 0.06,
//         resizeMode: 'contain',
//         marginLeft: width * 0.03,
//     },
//     image: {
//         width: width * 0.42,
//         height: height * 0.20, 
//         borderRadius: 10, 
//         marginBottom: 10, 
//         bottom: '20%',
//         right: '8%'
//     },
//     HeaderTitle: {
//         position: 'absolute',
//     }

// });

// export default TopProducts;

