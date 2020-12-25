import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Card } from 'react-native-paper'

const FeesDetails = ({ route }) => {
    const { payedArray } = route.params
    return (
        <>
            <FlatList
                data={payedArray}
                renderItem={({ item }) => {
                    return (
                        <Card style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                            padding: 20,
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{item.amount} ₹</Text>
                                <Text>{item.date}</Text>
                            </View>
                        </Card>
                    )
                }}
            />
        </>
    )
}

export default FeesDetails
