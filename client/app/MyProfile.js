import Background from '../components/Background'
import ProfileLogo from '../components/ProfileLogo'
import Header from '../components/Header'
import Button from '../components/Button'
//import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react'
// import { ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native';

export default function MyProfile() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const onUpdatePressed = async () => {
        try {
            console.log("Updating profile...");
    
            const response = await fetch("http://192.168.1.110:8000/UpdateMyprofile", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error updating profile:", errorData);
                alert(errorData.error || "Failed to update profile");
                return;
            }
    
            console.log("Profile updated successfully");
            navigation.navigate("Dashboard");
    
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while updating your profile");
        }
    };
    useEffect(() => {
        fetch("http://192.168.1.7:8000/Notification", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            })
            .then(async (response) => {
                if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: "Unknown error occurred" };
                }
                console.error("Error:", errorData);
                alert(errorData.error || "Failed to fetch notifications");
                return null;
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                console.log("Fetched notifications:", data);
                // setMyList(data); // Ensure `data` is properly set
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                alert("An error occurred while fetching notifications");
            });

    }, []);

    return (
        <ScrollView>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Header>My Profile</Header>

                <ProfileLogo />

                <View style={styles.container}>
                    {/* <Text style={styles.title}>My Profile</Text> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Blood Type"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        value={password}
                        onChangeText={setPassword}

                    />

                </View>
                <Button
                    mode="contained"
                    onPress={onUpdatePressed}
                    style={{ marginTop: 24 }}
                >
                    Update Profile
                </Button>

            </Background>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
});

