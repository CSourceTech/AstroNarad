import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { Clipboard } from 'react-native'; 

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9; 
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const Refer = () => {
    const navigation = useNavigation();
    const [referralCode, setReferralCode] = useState("Astro NARAD.app/invite/ferd-a4ty7");

    const navigate_back = () => {
        navigation.navigate('Profile');
    };

    const copyToClipboard = () => {
        Clipboard.setString(referralCode); 
        Alert.alert("Copied!", "Referral code has been copied to clipboard."); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={navigate_back}>
                    <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Refer & Earn</Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Invite 5 people and get 35% off on premium plans.</Text>
                        <Image source={Images.ReferBanner} style={styles.bannerImage}/>
                    </View>
                </View>
                <View style={styles.Secondcard}>
                    <View style={styles.Secondbanner}>
                        <Text style={styles.Heading}>Invite Friends & Family</Text>
                        <Text style={styles.SecondText}>Copy the code below, share it with your friends.</Text>
                        <View style={styles.columnContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={referralCode}
                                onChangeText={setReferralCode}
                                // editable={false} 
                            />
                            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                                <Text style={styles.copyButtonText}>Copy Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.Buttoncontainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Buttoncontainer}>
                    <TouchableOpacity style={styles.sharebutton}>
                        <Text style={styles.sharebuttonText}>Share Via Whatsapp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

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
        left: width * 0.25,
    },
    cardContainer: {
        flex: 1,
        marginVertical: height * 0.030,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
        backgroundColor: '#f1c232',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        alignItems: 'center', 
    },
    banner: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
    },
    bannerText: {
        fontSize: 18,
        fontWeight: '700',
        color: "#FFFFFF",
        textAlign: 'center', 
        flex: 1, 
        marginRight: 10,
    },
    bannerImage: {
        width: width * 0.35,  
        height: width * 0.45,
        resizeMode: 'contain',
    },
    Secondcard: {
        width: CARD_WIDTH,
        height: "25%", 
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',  
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        alignItems: 'center',  
    },
    Secondbanner: {
        width: '100%', 
        alignItems: 'center', 
        top: 10,
    },
    Heading: {
        fontSize: 16,
        fontWeight: '700',
        color: "#07162C",
        bottom: height * 0.030,
    },
    SecondText: {
        fontSize: 14,
        fontWeight: '500',
        color: "#838B95",
        textAlign: 'center',  
        width: '90%', 
        bottom: height * 0.010,
    },
    columnContainer: {
        flexDirection: 'row',
        gap: 10,
        top: height * 0.010,
    },
    textInput: {
        width: '60%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        textAlign: 'center',
    },
    copyButton: {
        backgroundColor: '#515D6B',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
        height: height * 0.050,
    },
    copyButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    Buttoncontainer: {
        alignItems: 'center', 
        marginTop: 20,
      },
      button: {
        backgroundColor: '#515D6B',
        paddingVertical: 12,
        paddingHorizontal: 150,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      sharebuttonText: {
        color: '#515D6B',
        fontSize: 16,
        fontWeight: 'bold',
        // width: height * 0.20,
      },
      sharebutton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 90,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }

});

export default Refer;
