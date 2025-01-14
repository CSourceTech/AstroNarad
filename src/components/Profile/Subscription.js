import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const Subscription = () => {
  const navigation = useNavigation();
  const [inputType, setInputType] = useState("Mothly Plan");

  const navigate_back = () => {
    navigation.navigate('Profile');
  };

  const benefits = [
    {id: 1, text: 'Remove All Ads', image: require('../../assets/Tick.png')},
    {
      id: 2,
      text: 'New monthly contents',
      image: require('../../assets/Tick.png'),
    },
    {
      id: 3,
      text: 'Get detailed reports each month',
      image: require('../../assets/Tick.png'),
    },
    {
      id: 4,
      text: '100+ guided Astrology covering love,marriage,relationship and much more',
      image: require('../../assets/Tick.png'),
    },
    {
      id: 5,
      text: 'Exclusive early access to new feature and contents.',
      image: require('../../assets/Tick.png'),
    },
    {
      id: 6,
      text: 'Monitor and access your entire usage history to date',
      image: require('../../assets/Tick.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={Images.Background}
          style={styles.Background}></ImageBackground>
        <View style={styles.ArrowBackground}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={navigate_back}>
            <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Subscription</Text>
        </View>
      </View>

      <ScrollView style={styles.ScrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'Mothly Plan' && styles.selectedOption,
            ]}
            onPress={() => setInputType('Mothly Plan')}>
            <Text style={styles.buttonText}>Mothly Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'Yearly Plan' && styles.selectedOption,
            ]}
            onPress={() => setInputType('Yearly Plan')}>
            <Text style={styles.buttonText}>Yearly Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planDetails}>
          <Text style={styles.month}>1 month - Elite</Text>
          <Text style={styles.price}>₹ 1200</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscription Benefits</Text>
        </View>

        <View style={styles.columnContainer}>
          {benefits.map(benefit => (
            <View style={styles.rowContainer} key={benefit.id}>
              <View style={styles.ArrowContainer}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Tick.png')}
                    style={styles.RightArrowicon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.Benefits}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity>
          <View style={styles.Logoutinfo}>
            <View style={styles.LogoutItem}>
              <Text style={styles.LogoutText}>Continue</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
  },
  Background: {
    opacity: 0.5,
    width: '108%',
    // height: height * 0.13,
    height: '108%',
    position: 'absolute',
  },
  ArrowBackground: {
    backgroundColor: 'white',
    width: width * 0.08,
    borderRadius: 10,
  },
  header: {
    backgroundColor: '#f1c232',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 10,
  },
  HeaderIcon: {
    width: width * 0.05,
    height: width * 0.09,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  headingContainer: {
    bottom: '20%',
  },
  heading: {
    fontWeight: '700',
    color: 'white',
    fontSize: width * 0.08,
    textAlign: 'center',
  },
  ScrollView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionButton: {
    width: width * 0.4,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#dcdcdc',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#07162C',
  },
  planDetails: {
    backgroundColor: '#f1c232',
    padding: 18,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    width: '80%',
  },
  month: {
    color: '#EAF4EF',
    fontWeight: '500',
    fontSize: 15,
  },
  price: {
    color: '#EAF4EF',
    fontWeight: '700',
    fontSize: 24,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#07162C',
  },
  titleContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingHorizontal: width * 0.03,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  ArrowContainer: {
    width: width * 0.1,
    height: width * 0.1,
    marginLeft: width * 0.05,
    padding: 8,
    borderRadius: 20,
  },
  RightArrowicon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  Benefits: {
    color: '#515D6B',
    fontSize: width * 0.04,
    fontWeight: '500',
    width: '80%',
  },
  Logoutinfo: {
    backgroundColor: '#656565',
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  LogoutItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: width * 0.34,
    borderBottomColor: '#ddd',
  },
  LogoutText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: 'white',
  },
});

export default Subscription;
