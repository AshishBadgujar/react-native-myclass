import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';

export class Form extends Component {
    state = {
        name: '',
        std: null,
        school: '',
        admission: '',
        mob: null,
        totalFees: null,
        payedFees: null,
        payedFeesArray: [{ date: '', amount: null }]
    }
    handleSubmit = async () => {
        try {
            var tempArray = [];
            let array = await AsyncStorage.getItem("myClassStud")
            array = JSON.parse(array)
            if (array != null) {
                tempArray = array;
            }
        } catch (error) {
            console.log(error)
        }
        if (this.state.name == "" || this.state.std == null || this.state.admission == "" || this.state.school == "" || this.state.mob == null || this.state.totalFees == null || this.state.payedFees == null) {
            Alert.alert('OPPS!', 'Please add all fields !', [{ text: 'OK', onPress: () => console.log('error') }])
        } else {
            this.setState({
                payedFeesArray: [{ date: this.state.admission, amount: this.state.payedFees }]
            })
            try {
                tempArray.push(this.state)
                let strTempArray = JSON.stringify(tempArray)
                await AsyncStorage.setItem("myClassStud", strTempArray)
                Alert.alert('Great !', 'Form successfully submitted !', [{ text: 'OK', onPress: () => console.log('success') }])
                this.setState({
                    name: '',
                    std: null,
                    school: '',
                    admission: '',
                    mob: null,
                    totalFees: null,
                    payedFees: null,
                    payedFeesArray: [{ date: '', amount: null }]
                })
                this.props.navigation.navigate('home')
            } catch (error) {
                console.log(error)
            }
        }
    }
    render() {
        return (
            <>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <Header name="Admission Form" />
                    <ScrollView>
                        <View>
                            <TextInput
                                label="Name"
                                value={this.state.name}
                                theme={{ colors: { primary: "#333" } }}
                                style={{ margin: 10 }}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    label="std"
                                    value={this.state.std}
                                    keyboardType="numeric"
                                    theme={{ colors: { primary: "#333" } }}
                                    style={{ margin: 10, width: "20%" }}
                                    onChangeText={(text) => this.setState({ std: text })}
                                />
                                <TextInput
                                    label="Date"
                                    value={this.state.admission}
                                    theme={{ colors: { primary: "#333" } }}
                                    style={{ margin: 10, width: "40%" }}
                                    onChangeText={(text) => this.setState({ admission: text })}
                                />
                            </View>
                            <TextInput
                                label="School Name"
                                value={this.state.school}
                                theme={{ colors: { primary: "#333" } }}
                                style={{ margin: 10 }}
                                onChangeText={(text) => this.setState({ school: text })}
                            />
                            <TextInput
                                label="Mobile Number"
                                value={this.state.mob}
                                keyboardType="numeric"
                                theme={{ colors: { primary: "#333" } }}
                                style={{ margin: 10, width: "70%" }}
                                onChangeText={(text) => this.setState({ mob: text })}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    label="Total Fees"
                                    value={this.state.totalFees}
                                    keyboardType="numeric"
                                    theme={{ colors: { primary: "#333" } }}
                                    style={{ margin: 10, width: "40%" }}
                                    onChangeText={(text) => this.setState({ totalFees: text })}
                                />
                                <TextInput
                                    label="Payed Fees"
                                    value={this.state.payedFees}
                                    keyboardType="numeric"
                                    theme={{ colors: { primary: "#333" } }}
                                    style={{ margin: 10, width: "40%" }}
                                    onChangeText={(text) => this.setState({ payedFees: text })}
                                />
                            </View>
                            <Button mode="contained" color="#27409a" style={{ marginVertical: 10, marginHorizontal: 70 }} onPress={this.handleSubmit} >Submit</Button>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </>
        )
    }
}

export default Form

