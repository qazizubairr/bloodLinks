import Background from '../components/Background'
import ProfileLogo from '../components/ProfileLogo'
import Header from '../components/Header'
import Button from '../components/Button'
//import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function MyProfile() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const onUpdatePressed = () => {
        // Logic to update the user's profile in the backend
        console.log('Profile updated successfully!');
    };
    useEffect(() => {
        fetch("http://192.168.1.7:8000/Myprofile", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            })
            .then(async (response) => {
                if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                console.log("Error:", errorData);
                alert(errorData.error || "Failed to fetch profile");
                return;
                }

                return response.json();
            })
            .then((data) => {
                if (data) {
                console.log("Fetched profile:", data);
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setPassword(data.password);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                alert("An error occurred while fetching your profile");
            })
            , []
    });

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>My Profile</Header>
            <ProfileLogo />

            <View style={styles.container}>
                <Text style={styles.title}>My Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={[password]}
                    onChangeText={setPassword}
                    keyboardType="phone-pad"
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
