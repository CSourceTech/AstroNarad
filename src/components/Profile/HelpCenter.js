import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Pressable } from 'react-native';
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9; 
const CARD_HEIGHT = CARD_WIDTH * 0.23;

const cardFilterData = [
    { id: '1', title: 'General' },
    { id: '2', title: 'Account' },
    { id: '3', title: 'Services' },
];


const faqsData = [
    { id: '1', question: 'How do I reset my password?', answer: 'To reset your password, go to Settings > Account > Reset Password.' },
    { id: '2', question: 'How to contact support ?', answer: 'You can reach out to our support team via email or live chat for quick assistance.' },
];

const HelpCenter = () => {
    const navigation = useNavigation();
    const [selectedCard, setSelectedCard] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    const handleExpandPress = (id) => {
        setExpandedCard(id === expandedCard ? null : id);
    };

    const navigate_back = () => {
        navigation.navigate('Profile');
    };

    const cardsData = [
        {
            id: 1,
            title: "Contact via email.",
            description: "To report an issue mail us",
            image: Images.email,
        },
        {
            id: 2,
            title: "Live Chat",
            description: "Use chat for quick solutions",
            image: Images.messages,
        }
    ];

    const handleCardPress = (id) => {
        setSelectedCard(id === selectedCard ? null : id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={navigate_back}>
                    <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Help Center</Text>
            </View>
            <ScrollView>
            <View style={styles.cardContainer}>
                {cardsData.map((card) => (
                    <View key={card.id} style={styles.card}>
                        <View style={styles.banner}>
                            <Image source={card.image} style={styles.bannerImage} />
                            <View style={styles.column}> 
                                <Text style={styles.bannerText}>{card.title}</Text>
                                <Text style={styles.bannerDesc}>{card.description}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={Images.ArrowRight} style={styles.arrowIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={styles.Secondcard}>
                    <View style={styles.Secondbanner}>
                        <Text style={styles.Heading}>Ask a question</Text>
                        <Text style={styles.SecondText}>Find answers to frequently asked questions.</Text>
                        <View style={styles.columnContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search for topic or question"
                            />
                        </View>

                        {/* Render Filter Cards */}
                        <View style={styles.filterContainer}>
                            {cardFilterData.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.filterCard,
                                        {
                                            backgroundColor: selectedCard === item.id ? '#A5A2A2' : '#E8E8E8',
                                        }
                                    ]}
                                    onPress={() => handleCardPress(item.id)}
                                >
                                    <Text style={styles.filterCardText}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                    <View style={styles.Questionscontainer}>
                            {faqsData.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={[
                                        styles.faqCard,
                                        { height: expandedCard === item.id ? CARD_HEIGHT * 1.3 : CARD_HEIGHT }
                                    ]}
                                    onPress={() => handleExpandPress(item.id)}
                                >
                                    <View style={styles.faqContent}>
                                        <Text style={styles.questionText}>{item.question}</Text>
                                        <Image
                                            source={Images.ArrowRight}
                                            style={[
                                                styles.arrowIcon,
                                                expandedCard === item.id && { transform: [{ rotate: "90deg" }] }
                                            ]}
                                        />
                                    </View>
                                    {expandedCard === item.id && (
                                        <Text style={styles.answerText}>{item.answer}</Text>
                                    )}
                                </Pressable>
                            ))}
                        </View>
                </View>

            </View>
            </ScrollView>
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
        backgroundColor: '#FFFFFF',
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
        fontSize: 16,
        fontWeight: '700',
        color: "#A5A2A2",
        textAlign: 'center',  
        marginRight: 10,
    },
    bannerDesc: {
        fontSize: 14,
        fontWeight: '500',
        color: "#343434",
        textAlign: 'center',  
        marginRight: 10,
    },
    bannerImage: {
        width: width * 0.15,  
        height: width * 0.08,
        resizeMode: 'contain',
        right: width * 0.060,
    },
    arrowIcon: {
        width: width * 0.081,
        height: height * 0.025,
        resizeMode: 'contain',
        left: width * 0.030,
        tintColor:'#A5A2A2',
    },
    column: {
        flexDirection: 'column'
    },
    Secondcard: {
        width: CARD_WIDTH,
        height: "65%", 
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    Secondbanner: {
        width: '100%', 
        alignItems: 'center', 
    },
    Heading: {
        fontSize: 16,
        fontWeight: '700',
        color: "#07162C",
        top: height * 0.030,
    },
    SecondText: {
        fontSize: 14,
        fontWeight: '500',
        color: "#838B95",
        textAlign: 'center',  
        width: '90%', 
        top: height * 0.040,
    },
    columnContainer: {
        flexDirection: 'row',
        gap: 10,
        top: height * 0.050,
    },
    textInput: {
        width: '60%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: height * 0.070,
    },
    filterCard: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    filterCardText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
    Questionscontainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        color: '#343434',
    },
    faqCard: {
        width: width * 0.8,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    faqContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343434',
    },
    answerText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#656565',
        marginTop: 10,
    },
});

export default HelpCenter;
