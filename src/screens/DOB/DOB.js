import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setBirthTime, setDateOfBirth } from '../../Redux/dobSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar} from "react-native-calendars"

const DOB = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTime, setShowTime] = useState(false);
    const dispatch = useDispatch();
    const dob = useSelector(state => state.dob.dateOfBirth);
    const dot = useSelector(state => state.dob.birthTime);

    useEffect(() => {
        const fetchStoredDOB = async () => {
            const storedDOB = await AsyncStorage.getItem('dateOfBirth');
            const storedTime = await AsyncStorage.getItem('birthTime');

            if (storedDOB && storedTime) {
                // If values exist, update Redux state and navigate to Home
                dispatch(setDateOfBirth(storedDOB));
                dispatch(setBirthTime(storedTime));
                navigation.navigate('Home'); // Skip DOB screen if data exists
            }
        };
        fetchStoredDOB();
    }, [dispatch, navigation]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        const formattedDate = currentDate.toDateString();
        dispatch(setDateOfBirth(formattedDate));
        AsyncStorage.setItem('dateOfBirth', formattedDate); // Save in AsyncStorage
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
        const formattedTime = currentTime.toLocaleTimeString();
        dispatch(setBirthTime(formattedTime));
        AsyncStorage.setItem('birthTime', formattedTime); // Save in AsyncStorage
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const showTimepicker = () => {
        setShowTime(true);
    };

    const navigate_to_Home = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.BackContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Images.arrowLeft} style={styles.Back} />
                </TouchableOpacity>
            </View>

             <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Enter Your DOB</Text>
                <Text style={styles.subtitle}>Enter Your Date of Birth For Further Process</Text>
            </View>

            <View style={styles.datePickerContainer}>
                <Text style={styles.dateText}>Date of Birth: {dob || date.toDateString()}</Text>
                <Button onPress={showDatepicker} title="Pick Your Date of Birth" />
            </View>

            {showDate && (
                                // <Calendar 
                                // value={date}
                                // mode="date"
                                // display="default"
                                // onChange={onChangeDate}
                                // maximumDate={new Date()}
                                // />
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                />
            )}

            <View style={styles.datePickerContainer}>
                <Text style={styles.dateText}>Birth Time (Optional): {dot || time.toLocaleTimeString()}</Text>
                <Button onPress={showTimepicker} title="Pick Your Birth Time" />
            </View>

            {showTime && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={navigate_to_Home}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    BackContainer: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 },
    Back: { width: 23, height: 20 },
    scrollContainer: {
        paddingBottom: 200,
    },
    headerContainer: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 32, fontWeight: 'bold', color: 'black' },
    subtitle: { fontSize: 13, color: '#888395', marginTop: 10, fontWeight: '500', textAlign: 'center' },
    datePickerContainer: { alignItems: 'center', marginTop: 20 },
    dateText: { fontSize: 16, marginBottom: 10, fontWeight: 'bold', color: 'black' },
    button: {
        backgroundColor: '#656565',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: 'center',
        top: '40%',
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default DOB;
