import React, {useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get("window");

const RecentAstrologers = () => {
    const [astrologers, setAstrologers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.value.accessToken);
  
    useEffect(() => {
      const fetchData = async () => {
        if (token) {
          try {
            const response = await fetch('http://35.174.44.86:8000/api/astrologers', {
              method: 'GET',
              headers: {
                accept: 'application/json',
                accesstoken: token,
              },
            });
            const data = await response.json();
            setAstrologers(data);
          } catch (error) {
            console.error('Error fetching astrologers:', error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [token]);
  
    const navigation = useNavigation();
  
    const navigate_to_AstroDesc = (name, about, experience, type, language_known, rating, id, charge, total_time_spent_on_message, total_time_spent_on_call) => {
      navigation.navigate('RecentAstrologerDesc', { astrologerName: name, info: about, exp: experience, expert: type, lang: language_known, Rating: rating, Id: id , cost: charge, on_Chat: total_time_spent_on_message, on_Call: total_time_spent_on_call});
    };
  
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (astrologers.length === 0) {
      return <Text style={{ textAlign: 'center', marginTop: 20 }}>No astrologers available.</Text>;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          {astrologers.map((astrologer) => (
            <TouchableOpacity
              key={astrologer.id}
              style={styles.card}
              onPress={() => navigate_to_AstroDesc(astrologer.name, astrologer.about, astrologer.experience, astrologer.type, astrologer.language_known, astrologer.rating, astrologer.id, astrologer.charge, astrologer.total_time_spent_on_call, astrologer.total_time_spent_on_message )}
            >
              <View style={styles.header1}>
                <View style={styles.HeaderTitle}>
                  <Text style={styles.title}>{astrologer.expertise}</Text>
                </View>
              </View>
              <View style={styles.AstrologersDetails}>
                <Text style={styles.Name}>{astrologer.name}</Text>
                <Text style={styles.Duration}>₹{astrologer.charge}/Min</Text>
                {/* <Text style={styles.Duration}>₹{astrologer.total_time_spent_on_message}</Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F1F5',
        padding: width * 0.03,
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: 'white',
        // width: width * 0.4, 
        // height: height * 0.19,
        width: 150,
        height: 150,
        padding: width * 0.04,
        marginHorizontal: width * 0.02, 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        marginTop: height * 0.01,
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: '10%',
        right: '5%'
    },
    title: {
        fontSize: width * 0.035, 
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 5,
        backgroundColor: '#656565',
        borderRadius: 15,
        right: '10%'
    },
    AstrologersDetails: {
        // top: height * 0.08,
        top: 75,
    },
    Name: {
        fontSize: width * 0.035, 
        fontWeight: '400',
        color: 'black',
        padding: 5,
        borderRadius: 15,
        right: '10%'
    },
    Duration: {
        fontSize: width * 0.035, 
        fontWeight: '500',
        color: '#0D0D0D',
        padding: 5,
        borderRadius: 15,
        right: '10%'
    },
    image: {
        width: width * 0.42,
        height: height * 0.20, 
        borderRadius: 10, 
        marginBottom: 10, 
        bottom: '20%',
        right: '8%'
    },
    HeaderTitle: {
        position: 'absolute',
    }

});

export default RecentAstrologers;
