import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Modal, Portal, Provider, TextInput } from 'react-native-paper';

const StudDetails = ({ navigation, route }) => {
    const { student } = route.params
    const [visible, setVisible] = useState(false)
    const [fees, setFees] = useState(null)
    const [studList, setStudList] = useState([]);
    useEffect(() => {
        getStudents();
    }, [])
    const getStudents = async () => {
        try {
            let array = await AsyncStorage.getItem("myClassStud")
            array = JSON.parse(array)
            if (array != null) {
                setStudList(array)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const goFeesDetails = () => {
        navigation.navigate('feesDetails', { payedArray: student.payedFeesArray })
    }
    const asyncSet = async (array) => {
        array = JSON.stringify(array)
        await AsyncStorage.setItem("myClassStud", array)
    }
    const deleteStud = () => {
        let newArray = studList.filter((item) => {
            return item.name != student.name
        })
        asyncSet(newArray)
        Alert.alert('Done!', 'Student Deleted successfully !', [{ text: 'OK', onPress: () => console.log('done') }])
        navigation.navigate('home')
    }
    const updateFees = () => {
        var date = new Date()
        if (fees != '0' && fees != null) {
            studList.forEach((stud) => {
                if (stud.name == student.name) {
                    student.payedFeesArray.push({ amount: fees, date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` })
                    stud.payedFeesArray.push({ amount: fees, date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` });
                    stud.payedFees = Number(stud.payedFees) + Number(fees)
                    student.payedFees = stud.payedFees
                }
            });
            asyncSet(studList)
        }
        setFees('')
    }
    return (
        <>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Name : </Text>{student.name}</Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Std : </Text>{student.std}</Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >School : </Text>{student.school}</Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Admission Date : </Text>{student.admission}</Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Mobile Number : </Text>{student.mob}</Text>
                    <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Total Fees : </Text>{student.totalFees}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginVertical: 10 }}><Text style={{ fontWeight: "bold" }} >Payed Fees : </Text>{student.payedFees}</Text>
                        <Button mode="text" color="#27409a" onPress={() => setVisible(true)} style={{ marginVertical: 10, marginHorizontal: 70 }} >Edit</Button>
                    </View>
                    <Button mode="outlined" color="#27409a" style={{ marginVertical: 10, marginHorizontal: 70 }} onPress={() => goFeesDetails()}>Fees Details</Button>
                    <Button mode="contained" color="red" style={{ marginVertical: 10, marginHorizontal: 70 }} onPress={() => deleteStud()}>Delete</Button>
                </View>
            </ScrollView>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: "white", padding: 20, margin: 30 }}>
                        <TextInput
                            label="Payed Fees"
                            mode="flat"
                            keyboardType="numeric"
                            value={fees}
                            theme={{ colors: { primary: "#333" } }}
                            style={{ margin: 15 }}
                            onChangeText={(text) => setFees(text)}
                        />
                        <Button mode="outlined" color="#27409a" onPress={() => {
                            updateFees()
                            setVisible(false)
                        }} style={{ marginVertical: 15, marginHorizontal: 70 }}>Save</Button>
                    </Modal>
                </Portal>
            </Provider>
        </>
    )
}

export default StudDetails
