import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';

export default function Help() {
  const navigation = useNavigation();

    return (

        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Help</Header>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text style={styles.title}>Help</Text> */}
                    <Text style={styles.sectionTitle}>FAQs</Text>
                    <Text style={styles.question}>Q: How often can I donate blood?</Text>
                    <Text style={styles.answer}>
                        A: In most countries, you can donate blood every 8 to 12 weeks.
                    </Text>
                    <Text style={styles.question}>Q: What are the eligibility criteria for blood donation?</Text>
                    <Text style={styles.answer}>
                        A: The eligibility criteria may vary, but typically include factors such as age, weight, overall health, and medical history.
                    </Text>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.contact}>Email: info@blooddonationapp.com</Text>
                    <Text style={styles.contact}>Phone: 123-456-7890</Text>

                </View>
            </ScrollView>
        </Background>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    answer: {
        fontSize: 16,
        marginLeft: 16,
        marginTop: 4,
    },
    contact: {
        fontSize: 16,
        marginTop: 8,
    },
});

