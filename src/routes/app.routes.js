import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';

import Subject from '../pages/Subject'
import Chat from '../pages/Chat'
import Lesson from '../pages/Lesson'
import Task from '../pages/Task'
import Profile from '../pages/Profile'

const LessonStack = createNativeStackNavigator()

const LessonRoutes = () => (
  <LessonStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <LessonStack.Screen name='Subject' component={Subject} />
    <LessonStack.Screen name='Task' component={Task} />
    <LessonStack.Screen name='Lesson' component={Lesson} />
  </LessonStack.Navigator>
);

const Tab = createBottomTabNavigator()

function MyTabs() {
  const route = useRoute()
  const { segment, legalNature } = route.params
  
  return (
    <Tab.Navigator
      initialRouteName='LessonRoutes'
      screenOptions={{
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#09190E',
        },
      }}
    >
      <Tab.Screen 
        name='Chat' 
        component={Chat} 
        initialParams={{legalNature: legalNature, segment: segment}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
              <MaterialIcons name='chat-bubble' size={24} color={focused ? '#10E873' : '#FAF9F6'}  />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='LessonRoutes' 
        component={LessonRoutes} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
              <MaterialIcons name='menu-book' size={24} color={focused ? '#10E873' : '#FAF9F6'}  />
            </View>
          ),
        }}
      />

      <Tab.Screen 
        name='Profile' 
        component={Profile} 
        initialParams={{legalNature: legalNature, segment: segment}}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
              <MaterialIcons name='account-circle' size={24} color={focused ? '#10E873' : '#FAF9F6'}  />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MyTabs