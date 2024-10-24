import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import Images from '../../assets/Images';

const { width, height } = Dimensions.get("window");

const cardData = [
    { id: 1, title2: 'Horoscope Of The Day', title3: 'Unveil Your Fate Now', description: 'Read Now' },
    { id: 2, title2: 'Horoscope Of The Day', title3: 'Unveil Your Fate Now', description: 'Read Now' },
    { id: 3, title2: 'Horoscope Of The Day', title3: 'Unveil Your Fate Now', description: 'Read Now' },
];

const HoroscopeOfTheDay = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cardData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <Text style={styles.title}>{card.title2}</Text>
                        <Image source={Images.HoroscopeImg} style={styles.Background}/>
                        <View style={styles.header}>
                            <Text style={styles.subtitle}>{card.title3}</Text>
                            <View style={styles.Readbutton}>
                            <TouchableOpacity><Text style={styles.description}>{card.description}</Text></TouchableOpacity>
                            </View>
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
        backgroundColor: '#656565',
        borderWidth: 1,
        width: width * 0.85, 
        height: height * 0.25,
        padding: width * 0.04,
        marginHorizontal: width * 0.02, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7'
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: '3%',
        right: '5%'
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    title: {
        fontWeight: '500',
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        padding: 6,
        fontSize: 13.16,
        borderRadius: 8,
    },
    Background: {
        opacity: 1,
        left: '43%',
        width: width * 0.52,
        height: height * 0.25,
        position: 'absolute'
    },
    subtitle: {
        fontSize: 19.73,
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        fontWeight: '700',
        width: '60%',
        padding: 6,
        borderRadius: 12,
    },
    name: {
        fontSize: width * 0.038, 
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        alignSelf: 'center',
        fontWeight: '700'
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
        color: '#835C5C',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 25
    },
    Readbutton: {
        width: '30%',
    },
});

export default HoroscopeOfTheDay;
