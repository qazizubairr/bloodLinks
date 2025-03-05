import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { locationValidator } from '../helpers/locationValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import { bloodtypeValidator } from '../helpers/bloodtypeValidator'
import { mydateValidator } from '../helpers/mydateValidator'
import { emailValidator } from '../helpers/emailValidator'
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export default function CreateNotification() {
    const navigation = useNavigation();
    const [desc, setDescription] = useState({ value: 'Blood Request', error: '' })
    const [bloodtype, setBloodType] = useState({ value: '', error: '' })
    const [location, setLocation] = useState({ value: '', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [mydate, setDate] = useState({ value: '', error: '' })


    const onCreatePressed = async () => {
        console.log("Api Call");
        const phoneError = phoneValidator(phone.value)
        const locationError = locationValidator(location.value)
        const bloodtypeError = bloodtypeValidator(bloodtype.value)
        const emailError = emailValidator(email.value)
        const mydateError = mydateValidator(mydate.value)



        if (phoneError || locationError || bloodtypeError || emailError || mydateError) {
            setPhone({ ...phone, error: phoneError })
            setLocation({ ...location, error: locationError })
            setBloodType({ ...bloodtype, error: bloodtypeError })
            setEmail({ ...email, error: emailError })
            setDate({ ...mydate, error: mydateError })

            return
        }
        else {
            await fetch("http://192.168.1.7:8000/CreateNotification", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    desc: desc.value,
                    bloodtype: bloodtype.value,
                    location: location.value,
                    phone: phone.value,
                    email: email.value,
                    mydate: mydate.value,
                }),
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
                    alert(errorData.error || "Failed to create notification");
                    return null;
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                    console.log("Notification created successfully:", data);
                    navigation.navigate("Dashboard");
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    alert("An error occurred while creating the notification.");
                });

        }

    }

    return (
        <ScrollView>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Create Notification</Header>

                <TextInput
                    label="Description"
                    returnKeyType="next"
                    value={desc.value}
                    onChangeText={(text) => setDescription({ value: text, error: '' })}
                    autoCapitalize="none"
                />



                <TextInput
                    label="Blood Type"
                    returnKeyType="next"
                    value={bloodtype.value}
                    onChangeText={(text) => setBloodType({ value: text, error: '' })}
                    error={!!bloodtype.error}
                    errorText={bloodtype.error}

                />
                <TextInput
                    label="Location"
                    returnKeyType="next"
                    value={location.value}
                    onChangeText={(text) => setLocation({ value: text, error: '' })}
                    error={!!location.error}
                    errorText={location.error}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Phone Number"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={(text) => setPhone({ value: text, error: '' })}
                    error={!!phone.error}
                    errorText={phone.error}
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                    keyboardType="numeric"
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address" s
                />
                <TextInput
                    label="Date"
                    returnKeyType="next"
                    value={mydate.value}
                    onChangeText={(text) => setDate({ value: text, error: '' })}
                    autoCapitalize="none"
                />
                <Button
                    mode="contained"
                    onPress={onCreatePressed}
                    style={{ marginTop: 24 }}
                >
                    Create Notification
                </Button>

            </Background>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    account: {
        fontSize: 13,
        color: 'blue',
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
