import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Images from "../../assets/Images";
import { ScrollView } from "react-native-gesture-handler";
import PhoneInput from 'react-native-phone-number-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Picker } from '@react-native-picker/picker';
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const AccountSettings = () => {
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(21);
    const [dob, setDob] = useState(new Date());
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [timeOfBirth, setTimeOfBirth] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.value.accessToken);
    const route = useRoute();
    const { ProfileName, DateofBirth, sex, Pob, Tob, mail, mobile } = route.params;

    const navigate_back = () => {
        navigation.navigate('Profile');
    }

    // useEffect(() => {
    //     if (profileData) {
    //       console.log('Received profile data:', profileData);
    //     }
    //   }, [profileData]);

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    const handleSaveChanges = async () => {
        const profileData = {
            name,
            // email,
            // phone: phone,
            // password,
            gender,
            date_of_birth: dob.toISOString().split('T')[0], 
            // age,
            profile_image: "http://example.com/profile.jpg",
            place_of_birth: placeOfBirth,
            time_of_birth: timeOfBirth,
            place_latitude: "28.34534",
            place_longitude: "71.34534"
        };
            console.log(profileData);
        try {
            const response = await fetch('http://35.174.44.86:8000/api/profile', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'accesstoken': token
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                console.error('Failed to save profile data. Status:', response.status);
                alert("Failed to save profile data. Please try again.");
                return;
            }

            const data = await response.json();
            console.log('Profile updated successfully:', data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile data:', error);
            alert("Error saving profile data. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={navigate_back}>
                    <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>My Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput                         
                        style={styles.input}
                        placeholder= {ProfileName}
                        placeholderTextColor="black"
                        value ={name}
                        onChangeText={setName}/>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput                         
                        style={styles.input}
                        placeholder= {mail}
                        placeholderTextColor="black"
                        // value={email}
                        // onChangeText={setEmail} 
                    />
                </View>

                <View style={styles.PhoneNumberinputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.phoneRow}>
                        <PhoneInput
                            defaultCode="IN"
                            layout="first"
                            containerStyle={styles.phoneInputContainer}
                            textContainerStyle={styles.phoneTextContainer}
                            textInputProps={{ color: 'black' }}
                            placeholder="Enter your Number"
                            // value={phone}
                            // onChangeFormattedText={setPhone}
                        />
                        <TouchableOpacity style={styles.changeButton}>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordRow}>
                        <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={true}
                        // value={password}
                        // onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.changeButton}>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.dateText}>
                            {dob.toLocaleDateString("en-GB")}
                        </Text>
                    </TouchableOpacity>
                    
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Age</Text>
                    <View style={styles.ageControls}>
                        <TouchableOpacity style={styles.ageButton} onPress={() => setAge(age > 0 ? age - 1 : 0)}>
                            <Text style={styles.ageButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.ageInput} value={String(age + ' years')} editable={false} />
                        <TouchableOpacity style={styles.ageButton} onPress={() => setAge(age + 1)}>
                            <Text style={styles.ageButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View> 

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Place of Birth</Text>
                    <TextInput                         
                        style={styles.input}
                        placeholder= {Pob}
                        placeholderTextColor="black"
                        value={placeOfBirth}
                        onChangeText={setPlaceOfBirth} />
                </View>

                <View style={styles.LabelInputGroup}>
                    <Text style={styles.label}>Time of Birth</Text>
                    <TextInput                         
                        style={styles.input}
                        placeholder= {Tob}
                        placeholderTextColor="black"
                        value={timeOfBirth}
                        onChangeText={setTimeOfBirth}/>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F1F5",
    },
    header: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F1F5',
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
    },
    iconContainer: {
        marginRight: 10,
    },
    HeaderIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerText: {
        color: '#656565',
        fontSize: 18,
        fontWeight: '600',
        left: width * 0.25,
    },
    formContainer: {
        paddingHorizontal: width * 0.05,
        paddingBottom: 100,
        marginTop: height * 0.020,
    },
    inputGroup: {
        marginBottom: 20,
    },
    PhoneNumberinputGroup: {
        top: height * 0.01,
    },
    LabelInputGroup: {
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        color: '#83958E',
        fontWeight: '500',
        marginBottom: 5,
    },
    dateText: {
        color: 'black',
        top: height * 0.015,
    },
    input: {
        backgroundColor: "white",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        fontSize: 16,
        color: "black",
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneInputContainer: {
        width: responsiveWidth(75),
        height: responsiveHeight(7),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 0, 
    },
    phoneTextContainer: {
        borderRadius: 12,
        backgroundColor: 'white',
        paddingHorizontal: 0, 
        paddingVertical: 0,   
        margin: 0,            
    },
    changeButton: {
        marginLeft: 10,
    },
    changeText: {
        color: "#2F80ED",
        fontWeight: '600',
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: "white",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    picker: {
        height: 48,
    },
    ageControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ageButton: {
        padding: 10,
        // backgroundColor: '#ddd',
        backgroundColor: "white",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ageButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    ageInput: {
        backgroundColor: "white",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        textAlign: 'center',
        color: 'black'
    },
    footer: {
        bottom: width* 0.060,
        width: '100%',
        paddingHorizontal: width * 0.05,
    },
    button: {
        backgroundColor: "#656565",
        paddingVertical: height * 0.02,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AccountSettings;



