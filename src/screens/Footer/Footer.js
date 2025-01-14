import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Images from '../../assets/Images';

const Footer = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const routeName = route.name;
    switch (routeName) {
      case 'Home':
        setSelectedItem('Home');
        break;
      case 'Products':
        setSelectedItem('Products');
        break;
      case 'Message':
        setSelectedItem('Message');
        break;
      case 'Profile':
        setSelectedItem('Profile');
        break;     
      default:
        setSelectedItem('');
    }
  }, [route]);

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footer}>
      
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleNavigate('Home')}
      >
        <Image
          source={ Images.Home } 
          style={[styles.icon, selectedItem === 'Home' && styles.selectedIcon]}
        />
        <Text style={[styles.footerText, selectedItem === 'Home' && styles.selectedText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleNavigate('Products')}
      >
        <Image
          source={Images.Cart}
          style={[styles.icon, selectedItem === 'Products' && styles.selectedIcon]}
        />
        <Text style={[styles.footerText, selectedItem === 'Products' && styles.selectedText]}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleNavigate('Message')}
      >
        <Image
          source={Images.Message}
          style={[styles.FavVendorIcon, selectedItem === 'Message' && styles.selectedIcon]}
        />
        <Text style={[styles.footerText, selectedItem === 'Message' && styles.selectedText]}>Message</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleNavigate('Profile')}
      >
        <Image
          source={Images.Profile}
          style={[styles.ProfileIcon, selectedItem === 'Profile' && styles.selectedIcon]}
        />
        <Text style={[styles.footerText, selectedItem === 'Profile' && styles.selectedText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    elevation: 10,
    width: '90%',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // footer: {
  //   flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   justifyContent: 'center',
  //   gap: 20,
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   padding: 10,
  //   borderRadius: 100,
  //   elevation: 5,
  //   width: '70%',
  //   left: "7%",
  //   bottom: '5%',
  //   // shadowColor: '#000',
  //   // shadowOffset: { width: 0, height: -1 },
  //   // shadowOpacity: 0.3,
  //   // shadowRadius: 10,
  // },
  icon: {
    width: 22,
    height: 22,
    tintColor: "grey"
  },
  FavVendorIcon: {
    width: 24,
    height: 22,
  },
  ProfileIcon: {
    width: 20,
    height: 24,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 15.06,
    letterSpacing: 0.4,
    top: 8,
    textAlign: 'left',
  },
  // Selected Styles
  selectedIcon: {
    tintColor: '#FF5733',
  },
  selectedText: {
    color: '#FF5733', 
    fontWeight: 'bold',
  },
});

export default Footer;
