import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get("window");

const cardData = [
    { id: 1, title1: 'New', title2: 'Love', name: 'Ritu Sharma', description: 'lorem' },
    { id: 2, title1: 'New', title2: 'Marriage', name: 'Ritu Sharma', description: 'lorem' },
    { id: 3, title1: 'New', title2: 'Tarot', name: 'Ritu Sharma', description: 'lorem' },
    { id: 4, title1: 'New', title2: 'Love', name: 'Ritu Sharma', description: 'lorem' },
    { id: 5, title1: 'New', title2: 'Marriage', name: 'Ritu Sharma', description: 'lorem' },
];

const LiveAstrologers = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cardData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.header1}>
                        <Text style={styles.title}>{card.title1}</Text>
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.subtitle}>{card.title2}</Text>
                            <Text style={styles.name}>{card.name}</Text>
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
        backgroundColor: '#C4C4C4',
        width: width * 0.3, 
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
        bottom: '10%',
        right: '5%'
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: '25%',
      },
    title: {
        fontSize: width * 0.05, 
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        padding: 6,
        fontSize: 13,
        backgroundColor: '#656565',
        borderRadius: 8,
    },
    subtitle: {
        fontSize: width * 0.04, 
        color: '#FFFFFF',
        marginBottom: height * 0.01,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF33',
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
        fontSize: width * 0.035, 
        color: '#FFFFFF',
        alignSelf: 'center',
    },
});

export default LiveAstrologers;
