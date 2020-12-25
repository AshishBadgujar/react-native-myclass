import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {
    const [text, setText] = useState('')
    const [studList, setStudList] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        getStudents();
        return () => {
            setRefreshing(false)
        }
    }, [refreshing])
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
    const listClick = (stud) => {
        navigation.navigate('searchStack', { screen: "studDetails", params: { student: stud } })
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Student name"
                    value={text}
                    onChangeText={(text) => setText(text)}
                    style={{ margin: 20 }}
                />
                <FlatList
                    data={studList}
                    renderItem={({ item }) => {
                        if (item.name.toLowerCase().includes(text.toLowerCase())) {
                            return (
                                <Card
                                    style={{ margin: 2, padding: 12 }}
                                    onPress={() => listClick(item)}
                                >
                                    <Text>{item.name}</Text>
                                </Card>
                            )
                        }
                    }}
                    onRefresh={() => setRefreshing(true)}
                    refreshing={refreshing}
                />
            </View>
        </>
    )
}

export default Search
