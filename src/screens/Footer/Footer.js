import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Images from '../../assets/Images';

const Footer = () => {
  return (
    <View style={styles.footer}>
      
      <TouchableOpacity style={styles.footerItem}>
        <Image
          source={Images.Home} 
          style={[styles.icon, styles.selectedIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Image
          source={Images.Cart}
          style={[styles.icon, styles.selectedIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Image
          source={Images.Message}
          style={[styles.icon, styles.selectedIcon]}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Image
          source={Images.Profile}
          style={[styles.icon, styles.selectedIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  footerItem: {
    alignItems: 'center',
  },
  // Selected Styles
  selectedIcon: {
    tintColor: '#656565',
  },
});

export default Footer;
