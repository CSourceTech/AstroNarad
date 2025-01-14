import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const DailyHoroscope = () => {
  const navigation = useNavigation();
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [dailyHoroscopeData, setDailyHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.value.accessToken);

  const navigate_to_back = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    fetchHoroscopeData(token);
  }, [token]);

  const fetchHoroscopeData = async (token) => {
    try {
      const [horoscopeResponse, dailyHoroscopeResponse] = await Promise.all([
        fetch('http://35.174.44.86:8000/api/horoscope', {
          method: 'GET',
          headers: {
            accept: '*/*',
            accesstoken: token,
          },
        }),
        fetch('http://35.174.44.86:8000/api/daily-horoscope?zodiac_sign=Aries&date=2024-09-03', {
          method: 'GET',
          headers: {
            accept: '*/*',
            accesstoken: token,
          },
        }),
      ]);

      const horoscopeData = await horoscopeResponse.json();
      const dailyHoroscopeData = await dailyHoroscopeResponse.json();

      setHoroscopeData(horoscopeData);
      setDailyHoroscopeData(dailyHoroscopeData);
    } catch (error) {
      console.error('Error fetching horoscope data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const data = [
    {id: 1, image: Images.Nikunj, text: 'Himakiran'},
    {id: 2, image: Images.Lacie, text: 'Lacie'},
    {id: 3, image: Images.Arman, text: 'Arman'},
    {id: 4, image: Images.Shirley, text: 'Shirley'},
  ];

  return (
    <View style={styles.container}>
        <ScrollView>
      <View style={styles.header}>
      <Image source={Images.Background} style={styles.backgroundImage} />
        <TouchableOpacity onPress={navigate_to_back} style={styles.backButton}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Image source={Images.share} style={styles.shareIcon} />
        </TouchableOpacity>
        <View style={styles.GreetingContainer}>
          <Text style={styles.Greeting}>Hello Himakiran</Text>
          <Text style={styles.Date}>February, 15 2023 - 09:41 AM</Text>
        </View>

        <View style={styles.gridContainer}>
          {data.map(item => (
            <View key={item.id} style={styles.gridItem}>
              <View style={styles.imageBorder}>
                <Image source={item.image} style={styles.image} />
              </View>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.HoroscopeContainer}>
          <Text style={styles.Name}>Himakiran</Text>
          <Text style={styles.Date}>{dailyHoroscopeData?.zodiac_sign} - Single</Text>
        </View>

        <View style={styles.ZodiacimageBorder}>
          <Image source={Images.Nikunj} style={styles.UserZodiac} />
        </View>

        {horoscopeData ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>SUN SIGN</Text>
            <Text style={styles.infoValue}>Gemini</Text>
            <Text style={styles.infoLabel}>MOON SIGN</Text>
            <Text style={styles.infoValue}>Cancer</Text>
            <Text style={styles.infoLabel}>RISING SIGN</Text>
            <TouchableOpacity style={styles.findOutButton}>
              <Text style={styles.findOutText}>Find Out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>ELEMENT</Text>
            <Text style={styles.infoValue}>Air</Text>
            <Text style={styles.infoLabel}>POLARITY</Text>
            <Text style={styles.infoValue}>Masculine</Text>
            <Text style={styles.infoLabel}>MODALITY</Text>
            <Text style={styles.infoValue}>Mutable</Text>
          </View>
        </View>
                  ) : (
                    <ActivityIndicator size="large" color="white" />
                  )}

        <TouchableOpacity style={styles.knowMoreButton}>
          <Text style={styles.knowMoreText}>Know More</Text>
        </TouchableOpacity>

        <View style={styles.HoroscopeDetails}>
          <View style={styles.HoroscopeHeading}>
            <Text style={styles.Heading}>Your horoscope for today</Text>
            <Text style={styles.HoroscopeDate}>{dailyHoroscopeData?.date}</Text>
          </View>
          <View style={styles.ExportContainer}>
            <TouchableOpacity>
              <Image source={Images.export} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.workDetails}>
          <Image source={Images.briefcase} style={styles.icon} />
          <Text style={styles.workText}>Work</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.percentageText}>34%</Text>
          <Image source={Images.play} style={styles.icon} />
        </View>

        <View style={styles.descriptionContainer}>
          {/* <Text style={styles.descriptionText}>
            Having gained eight years of experience in divination arts, I have
            helped more than a thousand people overcome difficulties and realize
            their deepest desires. I specialize in love relationships and life
            purpose, uncovering hidden patterns and energies with the help of
            tarot cards, matrix of fate, and runes. I have a warm and sensitive
            approach to my work. I create a safe space for exploring the deepest
            problems and blocks on the way to finding answers and fulfilling
            dreams of my clients. If you are looking for guidance in matters of
            the heart or other life challenges, I am the guide to help you find
            your way.
          </Text> */}
          <Text style={styles.descriptionText}>{dailyHoroscopeData.horoscope}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
  },
  header: {
    paddingTop: height * 0.05,
    paddingBottom: height * 0.099,
    backgroundColor: '#9D7500',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  backgroundImage: {
    position: "absolute",
    width: "110%",
    height: height * 1.5,
    opacity: 0.3,
},
  backButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  shareButton: {
    position: 'absolute',
    top: height * 0.03,
    right: width * 0.05,
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  GreetingContainer: {
    bottom: 20,
  },
  Greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  Date: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 33,
  },
  gridItem: {
    // width: width * 0.2,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageBorder: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.18) / 2,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: (width * 0.16) / 2,
    resizeMode: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  Name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ZodiacimageBorder: {
    width: width * 0.24,
    height: width * 0.24,
    borderRadius: (width * 0.28) / 2,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
  },
  UserZodiac: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.16) / 2,
    resizeMode: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    marginBottom: 30,
    bottom: 70,
  },
  infoColumn: {
    // alignItems: "center",
  },
  infoLabel: {
    fontSize: 11.73,
    fontWeight: '600',
    color: '#C8C8C8',
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 11.78,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  findOutButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  findOutText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  knowMoreButton: {
    backgroundColor: '#F1C232',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    bottom: 90,
  },
  knowMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  HoroscopeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.95,
    marginBottom: 30,
  },
  HoroscopeHeading: {
    bottom: 50,
  },
  Heading: {
    fontWeight: '700',
    fontSize: 18.36,
    color: '#FFFFFF',
  },
  HoroscopeDate: {
    fontWeight: '400',
    fontSize: 14,
  },
  ExportContainer: {
    bottom: 40,
  },
  workDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.95,
    gap: 10,
    // marginBottom: 20,
    bottom: 50,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  workText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#D3A15A',
    borderRadius: 4,
    // marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressBar: {
    width: '34%', 
    height: '100%',
    backgroundColor: '#F7C55E', 
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'justify',
    bottom: 50,
    width: width * 0.95,
  },
});

export default DailyHoroscope;
