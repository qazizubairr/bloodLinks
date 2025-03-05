import React from "react";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native";

export default function Index() {
  const navigation = useNavigation();
  return (
    <ScrollView>
    <Background>
      <Logo />
      <Header>Blood Links</Header>

      <Paragraph>
        Welcome to Blood links, which makes easy to donate blood and find donors.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen' as never)}
        style={{}} 
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen' as never)}
        style={{}} 
      >
        Sign Up
      </Button>

    </Background>
  </ScrollView>
  );
}
