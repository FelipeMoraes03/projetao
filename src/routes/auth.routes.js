import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import Questionnaire from '../pages/Questionnaire'

const Auth = createNativeStackNavigator()

const AuthRoutes = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='Questionnaire'
  >
    <Auth.Screen name='Welcome' component={Welcome} />
    <Auth.Screen name='Questionnaire' component={Questionnaire} />
  </Auth.Navigator>
);

export default AuthRoutes
