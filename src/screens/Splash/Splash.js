import React, {useRef,useEffect} from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, Animated } from "react-native";
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Splash = () => {
    const navigation= useNavigation();

    const handlenavigate = () => {
        navigation.navigate('Login');
    }

    const handlenavigateSignUp = () => {
        navigation.navigate('SignUp');
    }

    const opacity = useRef(new Animated.Value(1)).current; 


    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.5, 
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1, 
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);



    return (
        <>
            <View style={styles.container}>
                <Image source={Images.Background} style={styles.Background}/>
                {/* <Image source={Images.SivaLogo} style={styles.logo} resizeMode="contain"/> */}
                <Animated.Image
                    source={Images.SivaLogo}
                    style={[styles.logo, { opacity }]}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Astro NARAD</Text>
                    <Text style={styles.subtitle}>Consult Online Astrologers Anytime</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.signInButton} onPress={handlenavigate}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={styles.SignUp}>Don't have an account? <Text onPress={handlenavigateSignUp} style={styles.signUp2}>SignUp</Text></Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f1c232',
        backgroundColor: "#E9AD00",
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
        opacity: 0.25,
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
    SignUp: {
        // fontSize: 16,
        // fontWeight: 'bold',
        // color: '#404040',
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        fontWeight: '800',
        top: 15
    },
    signUp2: {
        color: 'red',
        fontWeight:'900'
    }
});

export default Splash;
