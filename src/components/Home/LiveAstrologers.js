import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const LiveAstrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector(state => state.auth.value.accessToken);

  const scrollX = useRef(new Animated.Value(0)).current; 
  const direction = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    if (token) {
      fetchAstrologers();
    }
  }, [token]);

  const fetchAstrologers = async () => {
    try {
      const response = await fetch(
        // 'https://astrotalk-pink.vercel.app/api/astrologers',
        'http://35.174.44.86:8000/api/astrologers',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            accesstoken: token,
          },
        },
      );
      const data = await response.json();
      setAstrologers(data);
    } catch (error) {
      console.error('Error fetching astrologers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const scrollLeftToRight = Animated.timing(scrollX, {
      toValue: width * 0.6,  
      duration: 4000,        
      useNativeDriver: true,
    });

    const scrollRightToLeft = Animated.timing(scrollX, {
      toValue: -width * 0.6,  
      duration: 4000,         
      useNativeDriver: true,
    });

    Animated.loop(
      Animated.sequence([
        scrollLeftToRight,  
        Animated.delay(2000),
        scrollRightToLeft,  
        Animated.delay(2000),
      ])
    ).start();
  }, [scrollX]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentOffset={{ x: scrollX }}
      >
        {astrologers.map(astrologer => (
          <View key={astrologer.id} style={styles.card}>
            <View style={styles.header1}>
              <Text style={styles.title}>{astrologer.title1 || 'NEW'}</Text>
            </View>
            <View style={styles.header}>
              <Text style={styles.subtitle}>{astrologer.expertise}</Text>
              <Text
                style={[
                  styles.name,
                  {
                    fontSize: astrologer.name.length > 6 ? width * 0.03 : width * 0.038,
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {astrologer.name}
              </Text>
              <Text style={styles.description}>{astrologer.type}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
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
    backgroundColor: '#C4C4C4',
    // width: width * 0.3,
    width: 120,
    height: 200,
    // height: height * 0.25,
    padding: width * 0.04,
    marginHorizontal: width * 0.02,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D7D7D7',
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '10%',
    right: '5%',
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
    fontWeight: '700',
  },
  description: {
    fontSize: width * 0.035,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});

export default LiveAstrologers;







// import React from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

// const { width, height } = Dimensions.get("window");

// const cardData = [
//     { id: 1, title1: 'New', title2: 'Love', name: 'Ritu Sharma', description: 'lorem' },
//     { id: 2, title1: 'New', title2: 'Marriage', name: 'Ritu Sharma', description: 'lorem' },
//     { id: 3, title1: 'New', title2: 'Tarot', name: 'Ritu Sharma', description: 'lorem' },
//     { id: 4, title1: 'New', title2: 'Love', name: 'Ritu Sharma', description: 'lorem' },
//     { id: 5, title1: 'New', title2: 'Marriage', name: 'Ritu Sharma', description: 'lorem' },
// ];

// const LiveAstrologers = () => {
//     return (
//         <View style={styles.container}>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
//                 {cardData.map((card) => (
//                     <View key={card.id} style={styles.card}>
//                         <View style={styles.header1}>
//                         <Text style={styles.title}>{card.title1}</Text>
//                         </View>
//                         <View style={styles.header}>
//                             <Text style={styles.subtitle}>{card.title2}</Text>
//                             <Text style={styles.name}>{card.name}</Text>
//                             {/* <Text style={styles.description}>{card.description}</Text> */}
//                         </View>
//                     </View>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F4F1F5',
//         padding: width * 0.02,
//     },
//     scrollContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     card: {
//         backgroundColor: '#C4C4C4',
//         width: width * 0.3,
//         height: height * 0.25,
//         padding: width * 0.04,
//         marginHorizontal: width * 0.02,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#D7D7D7'
//     },
//     header1: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         bottom: '10%',
//         right: '5%'
//     },
//     header: {
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         top: '25%',
//       },
//     title: {
//         fontSize: width * 0.05,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         marginBottom: height * 0.01,
//         padding: 6,
//         fontSize: 13,
//         backgroundColor: '#656565',
//         borderRadius: 8,
//     },
//     subtitle: {
//         fontSize: width * 0.04,
//         color: '#FFFFFF',
//         marginBottom: height * 0.01,
//         alignSelf: 'center',
//         backgroundColor: '#FFFFFF33',
//         padding: 6,
//         borderRadius: 12,
//     },
//     name: {
//         fontSize: width * 0.038,
//         color: '#FFFFFF',
//         marginBottom: height * 0.01,
//         alignSelf: 'center',
//         fontWeight: '700'
//     },
//     description: {
//         fontSize: width * 0.035,
//         color: '#FFFFFF',
//         alignSelf: 'center',
//     },
// });

// export default LiveAstrologers;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import {useSelector} from 'react-redux';

// const {width, height} = Dimensions.get('window');

// const LiveAstrologers = () => {
//   const [astrologers, setAstrologers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = useSelector(state => state.auth.value.accessToken);

//   useEffect(() => {
//     if (token) {
//       fetchAstrologers();
//     }
//   }, [token]);

//   const fetchAstrologers = async () => {
//     try {
//       const response = await fetch(
//         'https://astrotalk-pink.vercel.app/api/astrologers',
//         {
//           method: 'GET',
//           headers: {
//             accept: 'application/json',
//             accesstoken: token,
//           },
//         },
//       );
//       const data = await response.json();
//       setAstrologers(data);
//     } catch (error) {
//       console.error('Error fetching astrologers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}>
//         {astrologers.map(astrologer => (
//           <View key={astrologer.id} style={styles.card}>
//             <View style={styles.header1}>
//               <Text style={styles.title}>{astrologer.title1 || 'NEW'}</Text>
//             </View>
//             <View style={styles.header}>
//                 {/* <Image source={{uri: astrologers.profile_image}}/> */}
//               <Text style={styles.subtitle}>{astrologer.expertise}</Text>
//               {/* <Text style={styles.name}>{astrologer.name}</Text> */}
//               <Text
//                 style={[
//                   styles.name,
//                   {
//                     fontSize:
//                       astrologer.name.length > 6 ? width * 0.03 : width * 0.038,
//                   },
//                 ]}
//                 numberOfLines={1} 
//                 ellipsizeMode="tail" 
//               >
//                 {astrologer.name}
//               </Text>

//               <Text style={styles.description}>{astrologer.type}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F1F5',
//     padding: width * 0.02,
//   },
//   scrollContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#C4C4C4',
//     width: width * 0.3,
//     height: height * 0.25,
//     padding: width * 0.04,
//     marginHorizontal: width * 0.02,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#D7D7D7',
//   },
//   header1: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     bottom: '10%',
//     right: '5%',
//   },
//   header: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     top: '25%',
//   },
//   title: {
//     fontSize: width * 0.05,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: height * 0.01,
//     padding: 6,
//     fontSize: 13,
//     backgroundColor: '#656565',
//     borderRadius: 8,
//   },
//   subtitle: {
//     fontSize: width * 0.04,
//     color: '#FFFFFF',
//     marginBottom: height * 0.01,
//     alignSelf: 'center',
//     backgroundColor: '#FFFFFF33',
//     padding: 6,
//     borderRadius: 12,
//   },
//   name: {
//     fontSize: width * 0.038,
//     color: '#FFFFFF',
//     marginBottom: height * 0.01,
//     alignSelf: 'center',
//     fontWeight: '700',
//   },
//   description: {
//     fontSize: width * 0.035,
//     color: '#FFFFFF',
//     alignSelf: 'center',
//   },
// });

// export default LiveAstrologers;

