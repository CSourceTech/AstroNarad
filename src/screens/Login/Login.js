import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput, Alert, ScrollView } from "react-native";
import Images from "../../assets/Images";  
import { useNavigation } from "@react-navigation/native";
import { mobileOtp, sendOtp } from "../../Api/authService";

const { width } = Dimensions.get("window");

const Login = () => {
  const [inputType, setInputType] = useState("email"); 
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handlePhoneNumberChange = (text) => {
    setphone(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleBack = () => {
    navigation.navigate('Splash');
  };
  
  // const handleOtp = async () => {
  //   try {
  //     if (inputType === "phone" && phone) {
  //       await mobileOtp(email, phone); 
  //       navigation.navigate('Otp', { phone });
  //     } 
      
  //     else if (inputType === "email" && email) {
  //       await sendOtp(email, phone);
  //       navigation.navigate('Otp', { email });
  //     } 
      
  //     else {
  //       Alert.alert("Invalid Input", "Please enter a valid phone number or email.");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", error.message || "An error occurred while sending the OTP.");
  //   }
  // };

  const handleOtp = async () => {
    try {
      if (inputType === "phone" && phone) {
        await mobileOtp(phone); // Pass only phone
        navigation.navigate('Otp', { phone });
      } 
      else if (inputType === "email" && email) {
        await sendOtp(email); // Pass only email
        navigation.navigate('Otp', { email });
      } 
      else {
        Alert.alert("Invalid Input", "Please enter a valid phone number or email.");
      }
    } catch (error) {
      console.log(error.response?.data); // Debugging log
      Alert.alert("Error", error.response?.data?.message || "An error occurred while sending the OTP.");
    }
  };
  
  
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={Images.arrowLeft} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Explore the path to inner peace for your spirit.</Text>
        <Text style={styles.subText}>Explore the path to inner peace for your spirit.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            inputType === "phone" && styles.selectedOption, 
          ]}
          onPress={() => setInputType("phone")}
        >
          <Text style={styles.buttonText}>Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            inputType === "email" && styles.selectedOption,
          ]}
          onPress={() => setInputType("email")}
        >
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>

      {inputType === "phone" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Image source={Images.arrowdown} style={styles.arrowdownImage} />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Enter phone number"
              placeholderTextColor={'grey'}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
        </View>
      )}

      {inputType === "email" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
      )}

      <TouchableOpacity style={styles.footerButton} onPress={handleOtp}>
        <Text style={styles.footerButtonText}>Get OTP</Text>
      </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  arrowImage: {
    width: 24,
    height: 24,
  },
  scrollViewContent: {
    paddingBottom: 300, // Ensure no overlap with footer
  },
  textContainer: {
    padding: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "black",
    width: "85%",
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#555",
    textAlign: "center",
    color: "#838B95",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  optionButton: {
    width: width * 0.4,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#dcdcdc",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "black",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  arrowdownImage: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  phoneNumberInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
    top: '0.5%',
  },
  footerButton: {
    backgroundColor: '#656565',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    width: "90%",
    // top: "35%",
    top: 130,
    marginHorizontal: 20,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Login;
