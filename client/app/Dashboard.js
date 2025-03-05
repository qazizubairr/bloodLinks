import React, { Component } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { ScrollView } from 'react-native'

// import { View, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const navigation = useNavigation();
  //static navigationOptions = {
  //name in Side-menu bar
  //drawerLabel: 'NoticeBoard',
  //    drawerIcon: ({tintColor}) => (
  //      tintColor === '#2EB6AE' ?
  //     <Image
  //        source={{ uri:('https://reactnative.dev/img/tiny_logo.png')}}
  //        style = {styles.icon}
  //     /> : null
  //   ),
  //};
  {
    return (

      <Background>
        {/* <View> */}

        <Header>BLOOD LINKS</Header>

        <Logo />
        <ScrollView>
          <Paragraph>
            Welcome to Blood Links!, Our aim is to provide people a platform where blood donors and blood needers can connect easily.
          </Paragraph>

          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("MyProfile")
            }
          >
            My Profile
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("CreateNotification")
            }
          >
            Create Notification
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("NoticeBoard")
            }
          >
            Notice Board
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("RegisterDonor")
            }
          >
            Register Donor
          </Button>

          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("MySettings")
            }
          >
            Settings
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("BloodFacts")
            }
          >
            Blood Facts
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("Help")
            }
          >
            Help
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'index' }],
              })
            }
          >
            Logout
          </Button>
        </ScrollView>
      </Background >

    )
  }
}
