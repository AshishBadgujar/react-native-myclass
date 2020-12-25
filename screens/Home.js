import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { DataTable, List } from 'react-native-paper';
import Header from '../components/Header';

const Home = () => {
    const [sort, setSort] = useState('All')
    const [expanded, setExpanded] = useState(false)
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
    return (
        <>
            <Header name="Home" />
            <List.Section title="Sort with class">
                <List.Accordion
                    title={sort}
                    expanded={expanded}
                    onPress={() => setExpanded(!expanded)}
                >
                    <List.Item title="All"
                        onPress={() => {
                            setSort('All')
                            setExpanded(false)
                        }} />
                    <List.Item title="1st"
                        onPress={() => {
                            setSort("1")
                            setExpanded(false)
                        }} />
                    <List.Item title="2nd"
                        onPress={() => {
                            setSort("2")
                            setExpanded(false)
                        }} />
                    <List.Item title="3rd"
                        onPress={() => {
                            setSort("3")
                            setExpanded(false)
                        }} />
                    <List.Item title="4th"
                        onPress={() => {
                            setSort("4")
                            setExpanded(false)
                        }} />
                    <List.Item title="5th"
                        onPress={() => {
                            setSort("5")
                            setExpanded(false)
                        }} />
                    <List.Item title="6th"
                        onPress={() => {
                            setSort("6")
                            setExpanded(false)
                        }} />
                    <List.Item title="7th"
                        onPress={() => {
                            setSort("7")
                            setExpanded(false)
                        }} />
                    <List.Item title="8th"
                        onPress={() => {
                            setSort("8")
                            setExpanded(false)
                        }} />
                </List.Accordion>
            </List.Section>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric>Std</DataTable.Title>
                    <DataTable.Title numeric>Total</DataTable.Title>
                    <DataTable.Title numeric>Payed</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={studList}
                    renderItem={({ item }) => {
                        if (item.std == sort || sort == "All") {
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.std}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.totalFees}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.payedFees}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        }
                    }}
                    onRefresh={() => setRefreshing(true)}
                    refreshing={refreshing}
                />
            </DataTable>
        </>
    );
}


export default Home;