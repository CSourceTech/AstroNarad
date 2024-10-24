import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get("window");

const cardData = [
    { id: 1, image: require('../../assets/DailyHoroscope.png'), description: 'Daily Horoscope' },
    { id: 2, image: require('../../assets/Tarot.png'), description: 'Tarrot Cards' },
    { id: 3, image: require('../../assets/FreeKundali.png'), description: 'Free Kundali' },
    { id: 4, image: require('../../assets/KundaliMatching.png'), description: 'Kundali Matching' },
    { id: 5, image: require('../../assets/KundaliMatching.png'), description: 'Kundali Matching' }, 
];

const Services = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cardData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.header}>
                            <Image source={card.image} style={styles.image} resizeMode="contain"/>
                            <Text style={styles.description}>{card.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1F5',
        padding: width * 0.05,
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        width: width * 0.3, 
        height: height * 0.25,
        padding: width * 0.04,
        marginHorizontal: width * 0.02, 
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F4F4F4',

        backgroundColor: 'white', 
        // elevation: 3, // Adjust elevation for shadow depth

        // shadowOpacity: 0.25, // Shadow opacity
        // shadowRadius: 3.5, // Shadow radius
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
        width: '100%', 
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
        width: width * 0.3,
        fontWeight: '600',
        fontSize: 22,
        color: '#1E1E1E',
        textAlign: 'center', 
    },
});

export default Services;
