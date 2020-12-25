import React from 'react';
import Search from './screens/Search';
import Home from './screens/Home';
import Form from './screens/Form';
import StudDetails from './screens/StudDetails';
import FeesDetails from './screens/FeesDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: "#27409a",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="studDetails"
        component={StudDetails}
        options={{
          title: "Student Details",
          headerStyle: {
            backgroundColor: "#27409a",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="feesDetails"
        component={FeesDetails}
        options={{
          title: "Fees Details",
          headerStyle: {
            backgroundColor: "#27409a",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "white",
            activeBackgroundColor: "#1c2f71",
            inactiveBackgroundColor: "#27409a"
          }}
        >
          <Tab.Screen name="home" component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="searchStack" component={SearchStack}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="form" component={Form}
            options={{
              tabBarLabel: 'Form',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="create-sharp" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
