import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import Questionnaire from '../pages/Questionnaire'
import Subject from '../pages/Subject'
import MyTabs from './app.routes'

const Auth = createNativeStackNavigator()

const AuthRoutes = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='Welcome'
  >
    <Auth.Screen name='Welcome' component={Welcome} />
    <Auth.Screen name='Questionnaire' component={Questionnaire} />
    <Auth.Screen name='Subject' component={Subject} />
    <Auth.Screen name='Tab' component={MyTabs} />
  </Auth.Navigator>
);

export default AuthRoutes
