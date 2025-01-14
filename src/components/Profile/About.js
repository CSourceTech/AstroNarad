import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9; 
const CARD_HEIGHT = CARD_WIDTH * 0.23;

const cardsData = [
    { id: 1, title: "Check For Updates", image: Images.Updates },
    { id: 2, title: "Privacy Policy", image: Images.Privacy },
    { id: 3, title: "Terms and Conditions", image: Images.Terms },
];

const About = () => {
    const navigation = useNavigation();

    const navigate_back = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={navigate_back}>
                    <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>About</Text>
            </View>

            <View style={styles.bannerContainer}>
                <View style={styles.circle}></View>
                <Text style={styles.bannerTitle}>Astro NARAD</Text>
                <Text style={styles.bannerVersion}>Version 1.0</Text>
            </View>

            <View style={styles.cardContainer}>
                {cardsData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.banner}>
                            <Image source={card.image} style={styles.bannerImage} />
                            <Text style={styles.bannerText}>{card.title}</Text>
                            <TouchableOpacity>
                                <Image source={Images.ArrowRight} style={styles.arrowIcon} />
                            </TouchableOpacity>
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
        backgroundColor: "#F4F1F5",
    },
    header: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F1F5',
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
    },
    iconContainer: {
        marginRight: 10,
    },
    HeaderIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerText: { 
        color: '#656565',
        fontSize: 18,
        fontWeight: '600',
        left: width * 0.30,
    },
    bannerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFC107',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: width * 0.9,
        paddingVertical: 30,
        alignSelf: 'center',
        marginVertical: 30,
        position: 'relative',
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#7D7D7D',
        position: 'absolute',
        top: -40,
    },
    bannerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFFFFF",
        marginTop: 40,
        textAlign: 'center',
    },
    bannerVersion: {
        fontSize: 14,
        color: "#FFFFFF",
        marginTop: 5,
        textAlign: 'center',
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        justifyContent: 'center',
        marginTop: height * 0.015,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    bannerImage: {
        width: width * 0.15,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    bannerText: {
        fontSize: 16,
        fontWeight: '700',
        color: "#07162C",
        flex: 1,
        marginHorizontal: 10,
        textAlign: 'left',
    },
    arrowIcon: {
        width: width * 0.081,
        height: height * 0.025,
        resizeMode: 'contain',
        tintColor: '#A5A2A2',
    },
});

export default About;
