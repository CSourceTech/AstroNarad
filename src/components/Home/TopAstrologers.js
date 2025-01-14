import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get("window");

const cardData = [
    { id: 1, image: require('../../assets/TopAstrologers.png'), title1: 'Love'},
    { id: 2, image: require('../../assets/TopAstrologers.png'), title1: 'Love'},
];

const TopAstrologers = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cardData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.header1}>
                        <Image source={card.image} style={styles.image} resizeMode="contain"/>
                        <View style={styles.HeaderTitle}>
                             <Text style={styles.title}>{card.title1}</Text>
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
        padding: width * 0.01,
        marginTop: 5
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        // backgroundColor: '#C4C4C4',
        width: 150,
        height: 200,
        // width: width * 0.4, 
        // height: height * 0.15,
        padding: width * 0.04,
        marginHorizontal: width * 0.02, 
        borderRadius: 999,
        borderBottomEndRadius: 999,
        borderTopRightRadius: 999,
        // borderWidth: 1,
        // borderColor: '#D7D7D7',
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: '10%',
        right: '5%'
    },
    title: {
        fontSize: width * 0.030, 
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 6,
        backgroundColor: '#656565',
        borderRadius: 8,
        // right: '10%'
        left: '5%'
    },
    image: {
        // width: width * 0.42,
        // height: height * 0.20, 
        width: 150,
        height: 220,
        borderRadius: 999, 
        marginBottom: 10, 
        bottom: '50%',
        // right: '8%'
    },
    HeaderTitle: {
        position: 'absolute',
    }

});

export default TopAstrologers;
