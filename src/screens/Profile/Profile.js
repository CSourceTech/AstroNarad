import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator
} from 'react-native';
import Images from '../../assets/Images';
import Footer from '../Footer/Footer';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginStatus, setToken } from '../../Redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.value.accessToken);

  // useEffect(() => {
  //   if (token) {
  //     fetchProfileData();
  //   }
  // }, [token]);
  

  // const fetchProfileData = async () => {
  //   try {
  //     const response = await fetch('http://35.174.44.86:8000/api/profile', {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'accesstoken': token,
  //       }
  //     });
  
  //     if (!response.ok) {
  //       console.error('Failed to fetch profile data. Status:', response.status);
  //       return;
  //     }
  
  //     const data = await response.json();
  //     setProfileData(data);
  //   } catch (error) {
  //     console.error('Error fetching profile data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (!profileData) {
  //   return <Text>Failed to load profile data.</Text>;
  // }

  const navigate_to_Accounts = () => {
    navigation.navigate('AccountSettings', {
      ProfileName : profileData?.name,
      DateofBirth : profileData?.date_of_birth,
      sex : profileData?.gender,
      Pob : profileData?.place_of_birth,
      Tob : profileData?.time_of_birth,
      mail : profileData?.email,
      mobile : profileData?.phone,
     });
  };

  const navigate_to_Subscription = () => {
    navigation.navigate('Subscription');
  };

  const navigate_to_NotificationSettings = () => {
    navigation.navigate('NotificationSettings');
  };

  const navigate_to_WalletBalance = () => {
    navigation.navigate('WalletBalance');
  };

  const navigate_to_Refer = () => {
    navigation.navigate('Refer');
  };

  const navigate_to_HelpCenter = () => {
    navigation.navigate('HelpCenter');
  };

  const navigate_to_About = () => {
    navigation.navigate('About');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLogout = async () =>  {
    try {
      await AsyncStorage.removeItem('accessToken');
      console.log('Token removed successfully');
      
      dispatch(changeLoginStatus(false));
      dispatch(setToken(null));
      toggleModal();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <Image source={Images.ProfilePic} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIconContainer}>
            <Image source={Images.Edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.NameContainer}>
          {/* <Text style={styles.Name}>{profileData.name}</Text> */}
          <Text style={styles.Name}>{profileData?.name || "Loading..."}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userText}>Age : 23 y</Text>
          <Text style={styles.userText}>Gender : {profileData?.gender}</Text>
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_Subscription}>
            <Image source={Images.Subscription} style={styles.infoIcon} />
            <Text style={styles.infoText}>Subscription</Text>
            <Text style={styles.plan}>Monthly Plan</Text>
            <TouchableOpacity onPress={navigate_to_Subscription}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_Accounts}>
            <Image source={Images.Account} style={styles.infoIcon} />
            <Text style={styles.infoText}>Account Settings</Text>
            <TouchableOpacity onPress={navigate_to_Accounts}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_WalletBalance}>
            <Image source={Images.Wallet} style={styles.infoIcon} />
            <Text style={styles.infoText}>Wallet Balance</Text>
            <TouchableOpacity onPress={navigate_to_WalletBalance}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <TouchableOpacity style={styles.infoItem}>
            <Image source={Images.Language} style={styles.infoIcon} />
            <Text style={styles.infoText}>Language Settings</Text>
            <TouchableOpacity>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_NotificationSettings}>
            <Image source={Images.Notification} style={styles.infoIcon} />
            <Text style={styles.infoText}>Notification Settings</Text>
            <TouchableOpacity onPress={navigate_to_NotificationSettings}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem}>
            <Image source={Images.Payments} style={styles.infoIcon} />
            <Text style={styles.infoText}>Payment Methods</Text>
            <TouchableOpacity>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_Refer}>
            <Image source={Images.Refer} style={styles.infoIcon} />
            <Text style={styles.infoText}>Refer & Earn</Text>
            <TouchableOpacity onPress={navigate_to_Refer}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_HelpCenter}>
            <Image source={Images.Help} style={styles.infoIcon} />
            <Text style={styles.infoText}>Help Center</Text>
            <TouchableOpacity onPress={navigate_to_HelpCenter}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem} onPress={navigate_to_About}>
            <Image source={Images.About} style={styles.infoIcon} />
            <Text style={styles.infoText}>About</Text>
            <TouchableOpacity onPress={navigate_to_About}>
              <Image source={Images.ArrowRight} style={styles.arrowIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.Logoutinfo}>
            <View style={styles.LogoutItem}>
              <Text style={styles.LogoutText}>Logout</Text>
              <Image source={Images.logout} style={styles.logoutIcon} />
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheetContainer}>
              <Text style={styles.modalTitle}>Sign Out</Text>
              <Text style={styles.modalMessage}>Do you want to log out?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleLogout}>
                  <Text style={styles.buttonText}>Log Out</Text>
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

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1F5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    resizeMode: 'cover',
  },
  editIconContainer: {
    bottom: 35,
    left: 40,
    borderRadius: 15,
  },
  editIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
  },
  NameContainer: {
    bottom: height * 0.035,
  },
  Name: {
    fontWeight: '700',
    fontSize: 26,
    color: '#07162C',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    // marginBottom: 20,
    bottom: height * 0.03,
  },
  userText: {
    fontSize: width * 0.04,
    fontWeight: '400',
    color: '#838B95',
    // marginBottom: 5,
  },
  info: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  Logoutinfo: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  LogoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: width * 0.34,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  infoIcon: {
    width: width * 0.071,
    height: height * 0.028,
    resizeMode: 'contain',
  },
  logoutIcon: {
    width: width * 0.051,
    height: height * 0.023,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  infoText: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#07162C',
    flex: 1,
    marginLeft: width * 0.05,
    paddingVertical: 4,
  },
  plan: {
    fontWeight: '500',
    fontSize: 16,
    color: '#838B95',
  },
  LogoutText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: 'white',
    flex: 1,
  },
  arrowIcon: {
    width: width * 0.081,
    height: height * 0.025,
    resizeMode: 'contain',
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

export default Profile;
