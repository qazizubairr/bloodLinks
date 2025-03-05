import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'native-base'

export default function LoginScreen() {
    const navigation = useNavigation();
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    console.log("Api Call");
    // navigation.navigate("Dashboard");
    //this.props.navigation.replace('AfterLogin');
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    if (phoneError || passwordError) {
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else {
        console.log('ddf')
        await fetch("http://192.168.1.7:8000/login", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: phone.value,
              password: password.value,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                // If response status is not OK (e.g., 401 Unauthorized), throw an error
                const errorData = await response.json();
                console.log("Error:", errorData); 
                alert(errorData.error);
                return;
              }
          
              return response.json(); 
            })
            .then((data) => {
              if (data) {
                console.log("Success:", data);
                navigation.navigate("Dashboard"); 
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
    }


    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />

        <Header>Welcome back.</Header>
        <TextInput
          label="Phone Number"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TextInput
          label="Password"
          returnKeyType="next"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          autoCapitalize="none"
          keyboardType="default"
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>

          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text style={styles.forgot}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

      </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'blue',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
