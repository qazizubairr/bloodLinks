import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { locationValidator } from '../helpers/locationValidator'
import { ageValidator } from '../helpers/ageValidator'
import { bloodtypeValidator } from '../helpers/bloodtypeValidator'
import { lastDonatedValidator } from '../helpers/lastDonatedValidator'
import { idValidator } from '../helpers/idValidator'
// import { ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native';



export default function RegisterScreen() {
  const navigation = useNavigation();

    const [age, setAge] = useState({ value: '', error: '' })
    const [location, setLocation] = useState({ value: '', error: '' })
    const [bloodtype, setBloodType] = useState({ value: '', error: '' })
    const [lastDonated, setLastDonated] = useState({ value: '', error: '' })
    //const [UserId, setUserId] = useState({ value: '', error: '' })


    const onRegisterPressed = async () => {
        console.log("Api Call");
        const ageError = ageValidator(age.value)
        const locationError = locationValidator(location.value)
        const bloodtypeError = bloodtypeValidator(bloodtype.value)
        const lastDonatedError = lastDonatedValidator(lastDonated.value)
        //const UserIdError = idValidator(UserId.value)



        if (ageError || locationError || bloodtypeError || lastDonatedError) {
            setAge({ ...age, error: ageError })
            setLocation({ ...location, error: locationError })
            setBloodType({ ...bloodtype, error: bloodtypeError })
            setLastDonated({ ...lastDonated, error: lastDonatedError })
            //setUserId({ ...UserId, error: UserIdError })
            console.log("Api Call");
            return
        }
        else {
            await fetch("http://192.168.1.7:8000/RegisterDonor", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    age: age.value,
                    location: location.value,
                    bloodtype: bloodtype.value,
                    lastDonated: lastDonated.value,
                }),
                })
                .then(async (response) => {
                    if (!response.ok) {
                    // If response status is not OK, parse and display the error
                    const errorData = await response.json();
                    console.log("Error:", errorData);
                    alert(errorData.error || "Registration failed");
                    return;
                    }

                    return response.json(); 
                })
                .then((data) => {
                    if (data) {
                    console.log("Donor registration successful:", data);
                    navigation.navigate("Dashboard"); // Navigate to dashboard if successful
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });

        }

    }

    return (
        <ScrollView>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Register Donor</Header>

                <TextInput
                    label="Blood Type"
                    returnKeyType="next"
                    value={bloodtype.value}
                    onChangeText={(text) => setBloodType({ value: text, error: '' })}
                    error={!!bloodtype.error}
                    errorText={bloodtype.error}

                />
                <TextInput
                    label="Age"
                    returnKeyType="next"
                    value={age.value}
                    onChangeText={(text) => setAge({ value: text, error: '' })}
                    error={!!age.error}
                    errorText={age.error}
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                    keyboardType="numeric"
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
                    label="Blood Donated Last Time"
                    returnKeyType="next"
                    value={lastDonated.value}
                    onChangeText={(text) => setLastDonated({ value: text, error: '' })}
                    error={!!lastDonated.error}
                    errorText={lastDonated.error}
                    autoCapitalize="none"

                />
                <Button
                    mode="contained"
                    onPress={onRegisterPressed}
                    style={{ marginTop: 24 }}
                >
                    Register Donor
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
