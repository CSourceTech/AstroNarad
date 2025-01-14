import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get("window");

const cardFilterData = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Love' },
    { id: '3', title: 'Relationship' },
    { id: '4', title: 'Marriage' },
];

const Filters = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {cardFilterData.map((item) => {
                    const isSelected = selectedFilter === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.filterCard,
                                isSelected ? styles.selectedCard : styles.unselectedCard
                            ]}
                            onPress={() => setSelectedFilter(item.id)}
                        >
                            <View style={styles.filterContent}>
                                <Text
                                    style={[
                                        styles.cardFilterText,
                                        isSelected ? styles.selectedText : styles.unselectedText
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: width * 0.03, 
        marginTop: 15,
    },
    filterCard: {
        borderRadius: 36,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: "#00000030",
        paddingVertical: width * 0.02, 
        flex: 1, 
        alignItems: 'center',
    },
    selectedCard: {
        backgroundColor: '#656565',
    },
    unselectedCard: {
        backgroundColor: '#EBEEF2', 
    },
    filterContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardFilterText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    selectedText: {
        color: 'white', 
    },
    unselectedText: {
        color: '#656565',
    },
});

export default Filters;
