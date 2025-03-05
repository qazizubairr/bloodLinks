
import Background from '../components/Background'

import Header from '../components/Header'
import Button from '../components/Button'
//import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
//import { theme } from '../core/theme'
import React, { useState } from 'react';
import Logo from '../components/NoticeboardLogo'
import { View, Text, TextInput, StyleSheet, ScrollView  } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// import { ScrollView } from 'native-base'

//import { red100 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'

export default function NoticeBoard() {
  const navigation = useNavigation();

  // const [description, setDescription] = useState('');
  // const [bloodType, setBloodType] = useState('');
  // const [location, setLocation] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [date, setdate] = useState('');
  const [myList, setMyList] = useState([{ description: "", bloodType: "", location: "", phone: "", email: "", date: "", }])

  // const onUpdatePressed = async () => {
  //     console.log("update")
  //     await fetch("http://192.168.1.110:8000/UpdateMyprofile", {
  //         method: "post",
  //         headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //         },

  //         //make sure to serialize your JSON body
  //         body: JSON.stringify({
  //             name: name,
  //             email: email,
  //             phone: phone,
  //             password: password,
  //         })
  //     })
  //         .then((response) => {
  //             //do something awesome that makes the world a better place
  //             // navigation.reset({
  //             //   index: 0,
  //             //   routes: [{ name: 'LoginScreen' }],
  //             // })
  //             navigation.navigate("Dashboard")
  //         })
  //         .catch(err => { console.log(err) })
  //     // Logic to update the user's profile in the backend
  //     console.log('Profile updated successfully!');

  // };
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
            setMyList(data); // Ensure `data` is properly set
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("An error occurred while fetching notifications");
        });
  },[]);

  return (

    <Background>
      {/* <div
        style={{
          backgroundColor: 'blue',
          width: '100px',
          height: '100px'
        }}
      /> */}



      <BackButton goBack={navigation.goBack} />



      <Header>Notice Board</Header>
      <ScrollView>
        <Logo />





        {


          myList.map(item => <Text key={item.phone} style={{ fontSize: 16, padding: 30 }}>
            DESCRIPTION: {item.description} , LOCATION: {item.location} , PHONE: {item.phone} , EMAIL: {item.email} , BLOOD-TYPE: {item.bloodType} , DATE: {item.date}</Text>)


        }



        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("CreateNotification")
          }
        >
          Create Notification
        </Button>






      </ScrollView>
    </Background>






  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 2,
  //   padding: 16,
  // },
  // container: {
  //   flex: 1,
  //   paddingTop: StatusBar.currentHeight,
  // },
  // scrollView: {
  //   backgroundColor: 'pink',
  //   marginHorizontal: 20,
  // },

  list: {
    fontSize: 18,
    padding: 20,
    //color: theme.colors.primary,
  },

  //   title: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     marginBottom: 16,
  //   },
  //   input: {
  //     height: 40,
  //     borderColor: 'gray',
  //     borderWidth: 1,
  //     marginBottom: 16,
  //     paddingHorizontal: 10,
  //   },
});



