import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Images from "../../assets/Images";
import Filters from "../../components/Products/Filters";
import TopProducts from "../../components/Products/TopProducts";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "../Footer/Footer";

const { width, height } = Dimensions.get("window");

const Products = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Images.Background} style={styles.Background}/>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Shop the Latest Trends.</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Shop.."
                    placeholderTextColor="#aaa"
                />
               <TouchableOpacity><Image source={Images.Voice} style={styles.icon} /></TouchableOpacity>
               <View style={styles.ArrowContainer}>
                    <TouchableOpacity><Image source={Images.RightArrow} style={styles.RightArrowicon}/></TouchableOpacity>
               </View>
            </View>
            

            <View style={styles.categoryContainer}>
                <Text style={styles.category}>Product Category</Text>
            </View>

            <Filters/>

            <View style={styles.categoryContainer}>
                <Text style={styles.category}>Top Products</Text>
                <TouchableOpacity>
                        <Text style={styles.viewAll}>Filters</Text>
                    </TouchableOpacity>
            </View>
            
            <TopProducts/>
        
            </ScrollView>
            <Footer/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1F5', 
    },
    Background: {
        opacity: 0.5,
        // width: "100%",
        width: width * 0.999,
        // height: height * 0.1,
        height: 88,
        position: 'absolute',
    },
    header: {
        backgroundColor: '#f1c232',
        paddingHorizontal: width * 0.05, 
        paddingVertical: height * 0.005, 
        // justifyContent: 'space-between',
    },
    headingContainer: {
        top: '10%',
    },
    heading: {
        fontWeight: '700',
        color: 'white',
        fontSize: width * 0.08, 
        width: '90%',
    },
    scroll: {
        paddingBottom: 100,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 44,
        paddingHorizontal: width * 0.03, 
        paddingVertical: height * 0.015, 
        marginTop: height * 0.02,
        marginHorizontal: width * 0.02, 
    },
    input: {
        flex: 1,
        fontSize: width * 0.04, 
        color: '#000',
        paddingVertical: 0, 
    },
    icon: {
        width: width * 0.06,
        height: width * 0.06,
        resizeMode: 'contain',
        marginLeft: width * 0.03,
    },
    ArrowContainer: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
        marginLeft: width * 0.03,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#FCBC05'
    },
    RightArrowicon: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain',
        bottom: height * 0.002,
        marginRight: width * 0.1,
    },
    category: {
        fontSize: width * 0.050,
        fontWeight: '700',
        color: '#171621',
      },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20,
      },
      viewAll: {
        fontSize: 14,
        fontWeight: "400",
        color: '#0D0D0D',
      },
});

export default Products;
