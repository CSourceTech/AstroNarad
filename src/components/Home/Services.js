import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const cardData = [
    { id: 1, image: require('../../assets/DailyHoroscope.png'), description: 'Daily Horoscope', screen: 'DailyHoroscope' },
    { id: 2, image: require('../../assets/Tarot.png'), description: 'Tarrot Cards', screen: 'TarrotCards' },
    { id: 3, image: require('../../assets/FreeKundali.png'), description: 'Free Kundali', screen: 'FreeKundali' },
    { id: 4, image: require('../../assets/KundaliMatching.png'), description: 'Kundali Matching', screen: 'KundaliMatching' },
    { id: 5, image: require('../../assets/KundaliMatching.png'), description: 'Kundali Matching', screen: 'KundaliMatching' }, 
];

const Services = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cardData.map((card) => (
                    <TouchableOpacity 
                        key={card.id} 
                        style={styles.card} 
                        onPress={() => navigateToScreen(card.screen)}
                    >
                        <View style={styles.header}>
                            <Image source={card.image} style={styles.image} resizeMode="contain" />
                            <Text style={styles.description}>{card.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1F5',
        padding: width * 0.01,
        marginTop: 5
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        // width: width * 0.3, 
        // height: height * 0.25,
        width: 130,
        height: 190,
        // width: '18%',
        // height: '100%',
        padding: width * 0.01,
        marginHorizontal: width * 0.02, 
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F4F4F4',
        backgroundColor: 'white', 
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.02, 
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    image: {
        width: '50%', 
        height: height * 0.15, 
        borderRadius: 10, 
        marginBottom: 10, 
    },
    title: {
        fontSize: 14, 
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 6,
        backgroundColor: '#656565',
        borderRadius: 8,
    },
    subtitle: {
        fontSize: 12, 
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        backgroundColor: '#FFFFFF33',
        padding: 6,
        borderRadius: 12,
        textAlign: 'center', 
    },
    description: {
        // width: width * 0.3,
        fontWeight: '600',
        fontSize: 20,
        color: '#1E1E1E',
        textAlign: 'center', 
        bottom: 20,
    },
});

export default Services;
