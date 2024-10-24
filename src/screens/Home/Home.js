import React from "react";
import { View, Text, Image, StyleSheet, Dimensions , ScrollView, TouchableOpacity, Pressable} from 'react-native';
import Images from "../../assets/Images";
import LiveAstrologers from "../../components/Home/LiveAstrologers";
import HoroscopeOfTheDay from "../../components/Home/HoroscopeOfTheDay";
import Services from "../../components/Home/Services";
import TopAstrologers from "../../components/Home/TopAstrologers";
import Footer from "../Footer/Footer";

const { width, height } = Dimensions.get("window");

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                 <Image source={Images.Background} style={styles.Background}/>
                <View style={styles.iconContainer}>
                    <Image source={Images.HomeProfile} style={styles.profileIcon} />
                    <View>
                        <Text style={styles.greet}>Good Morning!</Text>
                        <Text style={styles.user}>User🤚</Text>
                    </View>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Explore the Path to your Spirit.</Text>
                </View>

                <TouchableOpacity style={styles.premiumCard}>
                    <View style={styles.premiumContent}>
                        <Text style={styles.premiumText}>Premium</Text>
                        <Image source={Images.Premium} style={styles.premiumIcon} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.categoryContainer}>
                      <Text style={styles.category}>Live Astrologers</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <LiveAstrologers/>
                
                <HoroscopeOfTheDay/>

                <View style={styles.categoryContainer}>
                      <Text style={styles.Servicecategory}>Services</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <Services/>

                <View style={styles.categoryContainer}>
                      <Text style={styles.category}>Top Astrologers</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>Filters</Text>
                    </TouchableOpacity>
                </View>

                <TopAstrologers/>



                </ScrollView>

            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'background: #F4F1F5',
    },
    Background: {
        opacity: 0.5,
        width: "100%",
        height: height * 0.30,
        position: 'absolute'
    },
    header: {
        backgroundColor: '#f1c232',
        paddingHorizontal: width * 0.05, 
        paddingVertical: height * 0.03, 
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02, 
    },
    profileIcon: {
        width: width * 0.1, 
        height: width * 0.1, 
        resizeMode: 'contain',
        marginRight: width * 0.03, 
    },
    greet: {
        fontWeight: "700",
        fontSize: width * 0.045, 
        color: 'black',
    },
    user: {
        fontWeight: "700",
        fontSize: width * 0.045, 
        color: 'white',
    },
    headingContainer: {
        top: '10%'
    },
    heading: {
        fontWeight: '700',
        color: 'white',
        fontSize: 32,
        width: '90%'
    },
    premiumCard: {
        backgroundColor: 'white',
        borderRadius: 47,
        padding: width * 0.01, 
        marginTop: height * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        width: '35%', 
        alignSelf: 'flex-end', 
        bottom: height * 0.2,
    },
    premiumContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', 
    },
    premiumText: {
        fontSize: width * 0.04, 
        color: 'black',
        fontWeight: '600',
        marginRight: width * 0.02, 
    },
    premiumIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    scroll: {
        paddingBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 10,
      },
      category: {
        fontSize: width * 0.050,
        fontWeight: '700',
        color: '#656565',
      },
      Servicecategory: {
        fontSize: width * 0.050,
        fontWeight: '700',
        color: '#1E1E1E',
      },
      viewAll: {
        fontSize: 14,
        fontWeight: "400",
        color: '#0D0D0D',
      },
});

export default Home;
