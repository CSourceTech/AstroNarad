import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageBackground,
} from 'react-native';
import Images from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const EditCard = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const navigate_back = () => {
    navigation.navigate('Profile');
  };

  const navigate_to_AddCard = () => {
    navigation.navigate('AddCard');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = () => {
    toggleModal();
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

      <ScrollView style={styles.ScrollView}>
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

          <View style={styles.EditCardDetails}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Himakiran"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Card Number"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.columnContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Expiry Date"
                  placeholderTextColor="#aaa"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Cvv"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>
          </View>

          <View style={styles.CardEditButtons}>
            <TouchableOpacity style={styles.DeleteButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.EditButton}
              onPress={navigate_to_AddCard}>
              <Text style={styles.CancelbuttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheetContainer}>
              <Text style={styles.modalTitle}>Delete Card</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to delete the card?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleLogout}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={toggleModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 100,
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
  EditCardDetails: {
    alignSelf: 'center',
    flex: 1,
    marginTop: height * 0.03,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#83958E',
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    color: 'black',
  },
  columnContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  CardEditButtons: {
    flexDirection: 'row',
    gap: width * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    // bottom: height * 0.1,
    top: '3%',
  },
  DeleteButton: {
    backgroundColor: '#656565',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  EditButton: {
    backgroundColor: '#C0CCC7',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  CancelbuttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteButton: {
    backgroundColor: '#4D4D4D',
    paddingVertical: 12,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#D9E3E1',
    paddingVertical: 12,
    borderRadius: 8,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditCard;
