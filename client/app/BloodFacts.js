import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Header from '../components/Header';
import { TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Button from '../components/Button'
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';


const tableData = {
    tableHead: ['BLOOD GROUP', 'DONATE TO', 'ACCEPT FROM'],
    widthArr: [140, 235, 230],
    tableData: [
        ['A+', 'A+, AB+', 'A+, A-, O+, O-'],
        ['A-', 'A+ , A- , AB+ , AB-', 'A-, O-'],
        ['B+', 'B+, AB+', 'B+, B-, O+, O-'],
        ['B-', 'B+, B-, AB+, AB-', 'B-, O-'],
        ['AB+', 'AB+', 'ANYONE'],
        ['AB-', 'AB+, AB-', 'AB-, A-, B-, O-'],
        ['O+', 'A+, B+, O+, AB+', 'O+, O-'],
        ['O-', 'ANYONE', 'O-'],
    ],
};
const BloodFacts = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(tableData);

    return (

        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>BLOOD COMPATIBILITY</Header>
            <ScrollView>
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                        <Table borderStyle={{ borderWidth: 6, borderColor: 'teal' }}>

                            <Row data={data.tableHead} style={styles.head} textStyle={styles.headText}
                                widthArr={data.widthArr} />
                            <Rows data={data.tableData} textStyle={styles.text}
                                widthArr={data.widthArr} />
                        </Table>
                    </ScrollView>

                </View>
            </ScrollView>
        </Background>


    )
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, justifyContent: 'center', backgroundColor: '' },
    head: { height: 82, backgroundColor: 'firebrick' },
    headText: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: 'white' },
    text: { margin: 6, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'red' },
})
// const styles1 = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         top: 10 + getStatusBarHeight(),
//         left: 4,
//     },
//     image: {
//         width: 24,
//         height: 24,
//     },
// })
export default BloodFacts