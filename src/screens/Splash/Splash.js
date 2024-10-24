import React from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Splash = () => {
    const navigation= useNavigation();

    const handlenavigate = () => {
        navigation.navigate('Login');
    }

    return (
        <>
            <View style={styles.container}>
                <Image source={Images.Background} style={styles.Background}/>
                <Image source={Images.SivaLogo} style={styles.logo} resizeMode="contain"/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Astro NARAD</Text>
                    <Text style={styles.subtitle}>Consult Online Astrologers Anytime</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.signInButton} onPress={handlenavigate}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1c232',
        // backgroundColor: 'RGB: (204, 185, 107)',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    logo: {
        width: width * 0.6,
        height: height * 0.3, 
        position: 'absolute',
    },
    textContainer: {
        marginTop: 20, 
        alignItems: 'center',
        position: 'absolute',
        bottom: "25%", 
    },
    Background: {
        opacity: 0.45,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white', 
    },
    subtitle: {
        fontSize: 16,
        color: '#000', 
        fontWeight: "800",
        marginTop: 8, 
    },
    footerContainer: {
        position: 'absolute',
        bottom: 50,  
        left: "12%", 
        width: "75%",
        paddingVertical: 32,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    signInButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: "100%",  
    },
    signInText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Splash;
