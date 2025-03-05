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
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import { confirmPasswordValidator } from '../helpers/confirmPasswordValidator'
import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'native-base'


export default function RegisterScreen() {
    const navigation = useNavigation();
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmpassword, setConfirmPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    console.log("Api Call");
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    const confirmpasswordError = confirmPasswordValidator(password.value, confirmpassword.value)


    if (emailError || passwordError || nameError || phoneError || confirmpasswordError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmpassword, error: confirmpasswordError })
      return
    }
    else {
        await fetch("http://192.168.1.7:8000/signup", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              email: email.value,
              phone: phone.value,
              password: password.value,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                // If response status is not OK, parse and display the error
                const errorData = await response.json();
                console.log("Error:", errorData);
                alert(errorData.error || "Signup failed");
                return;
              }
          
              return response.json(); // Parse JSON if successful
            })
            .then((data) => {
              if (data) {
                console.log("Signup successful:", data);
                navigation.navigate("LoginScreen"); // Navigate to login if successful
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
        <Header>Create Account</Header>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
          keyboardType="default"
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
          keyboardType="email-address"
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
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          keyboardType="default"
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirmpassword.value}
          onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
          error={!!confirmpassword.error}
          errorText={confirmpassword.error}
          keyboardType="default"
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text style={styles.account}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

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
