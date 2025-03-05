import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import SettingLogo from "../components/SettingLogo"
import BackButton from "../components/BackButton";
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function MySettings() {
  const navigation = useNavigation();

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <SettingLogo />
            <Header>Settings</Header>
            <Paragraph>
                Welcome to Blood Links Application Settings.
            </Paragraph>
            <ScrollView>

                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Profile')}
                >
                    Account Profile
                </Button>
                <Button
                    mode="contained"
                    onPress={() =>
                        navigation.navigate("RegisterDonor")
                    }
                >
                    Register Donor
                </Button>
            </ScrollView>
        </Background>
    )
}
