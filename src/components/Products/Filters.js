// import React, { useState } from "react";
// import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// const { width } = Dimensions.get("window");

// const cardFilterData = [
//     { id: '1', title: 'All' },
//     { id: '2', title: 'Stones' },
//     { id: '3', title: 'Pendants' },
//     { id: '4', title: 'Gems' },
// ];

// const Filters = () => {
//     const [selectedFilter, setSelectedFilter] = useState(null);

//     return (
//         <View style={styles.container}>
//             <View style={styles.row}>
//                 {cardFilterData.map((item) => {
//                     const isSelected = selectedFilter === item.id;

//                     return (
//                         <TouchableOpacity
//                             key={item.id}
//                             style={[
//                                 styles.filterCard,
//                                 isSelected ? styles.selectedCard : styles.unselectedCard
//                             ]}
//                             onPress={() => setSelectedFilter(item.id)}
//                         >
//                             <View style={styles.filterContent}>
//                                 <Text
//                                     style={[
//                                         styles.cardFilterText,
//                                         isSelected ? styles.selectedText : styles.unselectedText
//                                     ]}
//                                 >
//                                     {item.title}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//     },
//     row: {
//         flexDirection: 'row',
//         gap: 10,
//         paddingHorizontal: width * 0.05, 
//         marginTop: 15,
//     },
//     filterCard: {
//         borderRadius: 36,
//         elevation: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         borderWidth: 1,
//         borderColor: "#00000030",
//         paddingVertical: width * 0.02, 
//         flex: 1, 
//         alignItems: 'center',
//     },
//     selectedCard: {
//         backgroundColor: '#656565',
//     },
//     unselectedCard: {
//         backgroundColor: '#EBEEF2', 
//     },
//     filterContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     cardFilterText: {
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
//     selectedText: {
//         color: 'white', 
//     },
//     unselectedText: {
//         color: '#656565',
//     },
// });

// export default Filters;


import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Filters = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filterData, setFilterData] = useState([]); 
    const token = useSelector(state => state.auth.value.accessToken); 

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            // const response = await fetch('https://astrotalk-pink.vercel.app/api/product-category', {
                const response = await fetch('http://35.174.44.86:8000/api/product-category', {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'accesstoken': token,
                }
            });

            const data = await response.json();
            if (data && data.length > 0) {
                setFilterData(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {filterData.map((item) => {
                    const isSelected = selectedFilter === item.category_id;

                    return (
                        <TouchableOpacity
                            key={item.category_id}
                            style={[
                                styles.filterCard,
                                isSelected ? styles.selectedCard : styles.unselectedCard
                            ]}
                            onPress={() => setSelectedFilter(item.category_id)}
                        >
                            <View style={styles.filterContent}>
                                <Text
                                    style={[
                                        styles.cardFilterText,
                                        isSelected ? styles.selectedText : styles.unselectedText
                                    ]}
                                >
                                    {item.category_name}
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
