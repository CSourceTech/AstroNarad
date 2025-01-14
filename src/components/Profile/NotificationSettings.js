import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Switch } from 'react-native';
import Images from "../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const NotificationSettings = () => {
    const navigation = useNavigation();
    
    const [settings, setSettings] = useState({
        generalNotifications: false,
        sound: false,
        vibrations: false,
        taskReminder: false,
        billReminder: false,
        promotionsDiscounts: false,
        newContentAvailable: false,
        appUpdate: false,
    });

    const toggleSwitch = (settingName) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [settingName]: !prevSettings[settingName],
        }));
    };

    const navigate_back = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconContainer} onPress={navigate_back}>
                    <Image source={Images.arrowLeft} style={styles.HeaderIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notification</Text>
            </View>

            <ScrollView>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Common</Text>
                </View>


                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>General Notifications</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.generalNotifications ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('generalNotifications')}
                                value={settings.generalNotifications}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

             
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Sound</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.sound ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('sound')}
                                value={settings.sound}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Vibrations</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.vibrations ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('vibrations')}
                                value={settings.vibrations}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Services</Text>
                </View>

                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Task Reminder</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.taskReminder ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('taskReminder')}
                                value={settings.taskReminder}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Bill Reminder</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.billReminder ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('billReminder')}
                                value={settings.billReminder}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>Promotions & Discounts</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.promotionsDiscounts ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('promotionsDiscounts')}
                                value={settings.promotionsDiscounts}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Others</Text>
                </View>

               
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>New Content Available</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.newContentAvailable ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('newContentAvailable')}
                                value={settings.newContentAvailable}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>

                
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoText}>App Update</Text>
                        <View style={styles.switchContainer}>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={settings.appUpdate ? "white" : "#f4f3f4"}
                                onValueChange={() => toggleSwitch('appUpdate')}
                                value={settings.appUpdate}
                                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    inputGroup: {
        marginBottom: 20,
        paddingHorizontal: width * 0.05,
    },
label: {
        fontSize: 16,
        color: '#656565',
        fontWeight: '700',
    },
    info: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd', 
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#83958E',
        flex: 1,
        marginLeft: width * 0.05,
        paddingVertical: 4,
    },
    arrowIcon: {
        width: width * 0.081,
        height: height * 0.025,
        resizeMode: 'contain',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.015,
    },
    textOn: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: 'green',
    },
    textOff: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: 'red',
    },

})

export default NotificationSettings;
