import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Images from '../../assets/Images';
import { verifyOtp } from '../../Api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { changeLoginStatus, setEmail, setToken } from '../../Redux/authSlice';

const Otp = ({ route, navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(10); 
    const [timerActive, setTimerActive] = useState(true);
    const { phone, email } = route.params;
    const dispatch = useDispatch();

    const inputs = useRef([]);

    useEffect(() => {
        if (timer > 0 && timerActive) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer <= 0) {
            setTimerActive(false);
        }
    }, [timer, timerActive]);

    const handleChangeText = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index) => {
        const newOtp = [...otp];
        if (otp[index] === '') {
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        } else {
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleTextChange = (text, index) => {
        if (text.length === 0) {
            handleBackspace(index);
        } else {
            handleChangeText(text, index);
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace') {
            handleBackspace(index);
        }
    };

    const handleBack = () => {
        navigation.navigate('Login');
    };

    // const handleVerify = async () => {
    //     const otpCode = otp.join(''); 
    //     if (otpCode.length === 6) {
    //         try {
    //             const response = await verifyOtp(email, otpCode);
    //             console.log('OTP verified successfully:', response.data);
    //             alert("OTP verified successfully");
    //             navigation.navigate('DOB'); 
    //         } catch (error) {
    //             console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
    //             alert('Failed to verify OTP. Please try again.');
    //         }
    //     } else {
    //         alert("Please enter a valid 6-digit OTP.");
    //     }
    // };

    const handleVerify = () => {
        const otpCode = otp.join('');
        console.log('OTP:', otpCode);
        console.log('Mobile:', email);

        verifyOtp(email, otpCode)
        .then(async (response) => {
            console.log('Response Data:', JSON.stringify(response.data));

            try {
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
            } catch (error) {
                console.error('Failed to store token:', error);
              }
              dispatch(setToken(response.data.accessToken));
              dispatch(setEmail(response.data.email));
              dispatch(changeLoginStatus(true));

              navigation.navigate('DOB'); 
            })
            .catch(error => {
                console.error('OTP Verification Error:', error);
                setErrorMessage('Invalid OTP, Please try again.');
            });
              
    }

    const handleResend = () => {
        setTimer(60); 
        setTimerActive(true); 
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.BackContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={Images.arrowLeft} style={styles.Back} />
                </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Enter Pin Code</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code we just sent to your phone number {phone} or {email}</Text>
            </View>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
            </View>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleTextChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        ref={(el) => (inputs.current[index] = el)}
                    />
                ))}
            </View>
            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code?</Text>
                {!timerActive && (
                    <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendButton}>Send Again</Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify and Create Account</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    BackContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    Back: {
        width: 23,
        height: 20,
    },
    scrollContainer: {
        paddingBottom: 200,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 31.96,
        fontWeight: '700',
        color: "black",
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 10,
        fontWeight: '500',
        justifyContent: 'center',
        alignContent: "center",
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    otpContainer: {
        flexDirection: 'row',
        gap: 11,
        marginBottom: 20,
        justifyContent: 'center',
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        // left: "12%",
        // left: 10,
        color:'black',
    },
    resendContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    resendText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    resendButton: {
        fontSize: 16,
        color: '#007BFF',
    },
    button: {
        backgroundColor: '#656565',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: 'center',
        top: "40%",
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Otp;
