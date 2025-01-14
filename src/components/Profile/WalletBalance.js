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

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const WalletBalance = () => {
  const navigation = useNavigation();

  const navigate_back = () => {
    navigation.navigate('Profile');
  };

  const navigate_to_EditCard = () => {
    navigation.navigate('EditCard');
  };

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

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardDetails}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
                }}
                style={styles.visaLogo}
                resizeMode="contain"
              />
              <Text style={styles.BalanceTitle}>Card Balance</Text>
            </View>
            <Text style={styles.cardBalance}>₹540.50</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>CARD NUMBER</Text>
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          </View>

          <View style={styles.cardDetails}>
            <View>
              <Text style={styles.cardLabel}>CARD HOLDER</Text>
              <Text style={styles.cardInfo}>Himakiran</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>VALID</Text>
              <Text style={styles.cardInfo}>12/25</Text>
            </View>
          </View>
        </View>
        <View style={styles.Buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={navigate_to_EditCard}>
            <Text style={styles.buttonText}>Add New Card</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  cardContainer: {
    flex: 1,
    marginVertical: height * 0.03,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardHeader: {
    width: width * 0.9,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // padding: 15,
    padding: width * 0.01,
    backgroundColor: '#f1c232',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // bottom: height* 0.024,
    bottom: '12%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardNumber: {
    color: '#07162C',
    fontWeight: '500',
    fontSize: 11,
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  cardLabel: {
    color: '#515D6B',
    fontSize: 9.6,
    fontWeight: '400',
  },
  BalanceTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    bottom: height * 0.018,
    right: width * 0.03,
  },
  cardInfo: {
    color: '#07162C',
    fontSize: 16,
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    alignSelf: 'flex-end',
    bottom: height * 0.02,
    right: width * 0.03,
  },
  cardBalanceContainer: {
    right: width * 0.1,
  },
  Details: {
    bottom: height * 0.01,
  },
  visaLogo: {
    width: 50,
    height: 20,
    tintColor: 'white',
    left: width * 0.03,
  },
  Buttoncontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f1c232',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletBalance;
