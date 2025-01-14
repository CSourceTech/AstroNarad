import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const WishList = () => {
  const navigation = useNavigation();
  const [inputType, setInputType] = useState("WishList");

  const navigate_to_back = () => {
    navigation.navigate('ProductDesc');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBackground}
          onPress={navigate_to_back}>
          <Image source={Images.arrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'WishList' && styles.selectedOption,
            ]}
            onPress={() => setInputType('WishList')}>
            <Text style={styles.buttonText}>WishList</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              inputType === 'Chat' && styles.selectedOption,
            ]}
            onPress={() => setInputType('Chat')}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search Services.."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity>
          <Image source={Images.Voice} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.ArrowContainer}>
          <TouchableOpacity>
            <Image source={Images.RightArrow} style={styles.RightArrowicon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.noProductsContainer}>
        <Image source={Images.WishList} style={styles.WishList} />
        <Text style={styles.noProductsTitle}>No Products for you.</Text>
        <Text style={styles.noProductsMessage}>
          You don't have any messages yet. Begin a new conversation with fellow
          car enthusiasts.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackground: {
    backgroundColor: 'white',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  headerIcon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 20,
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
  inputWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 44,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    marginTop: height * 0.02,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#000',
    paddingVertical: 0,
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
    marginLeft: width * 0.03,
    marginTop: 4,
  },
  ArrowContainer: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
    marginLeft: width * 0.03,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FCBC05',
  },
  RightArrowicon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
    bottom: height * 0.002,
    marginRight: width * 0.1,
  },
  noProductsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  WishList: {
    width: 278,
    height: 207,
  },
  noProductsTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  noProductsMessage: {
    fontSize: 14,
    fontWeight: '500',
    width: '90%',
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default WishList;
