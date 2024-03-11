import { useCallback, useMemo, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import {
  ProfilePic,
  BusinessType,
  Container, 
  Details, 
  DetailsContainer, 
  DetailsTitle, 
  Name,
  CourseName,
  StudyBox,
} from './styles'

const Profile = () => {

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <ProfilePic source={require('../../../assets/Profile/picture.png')} />

        <View
          style={{
            marginLeft: 20
          }}
        >
          <Name>Isabela Maria</Name>
          <BusinessType>ME - Salão de beleza</BusinessType>
        </View>
      </View>

      <DetailsContainer>
        <DetailsTitle>Perfil</DetailsTitle>

        <Details>
          <Text style={{ fontWeight: 'bold' }} >Nome completo:</Text> Isabela Maria da Silva
        </Details>

        <Details>
          <Text style={{ fontWeight: 'bold' }} >Email:</Text> isamaria@gmail.com
        </Details>
      </DetailsContainer>

      <DetailsContainer>
        <DetailsTitle>Caps</DetailsTitle>

        <Image source={require('../../../assets/Profile/coin.png')} />
      </DetailsContainer>

      <DetailsContainer>
        <DetailsTitle>Estudos em progresso</DetailsTitle>

        <StudyBox>
          <Text style={{ fontSize: 14 }} >Introdução á finanças</Text>

          <Text style={{ fontSize: 12, marginTop: 6}} >O que são finanças?</Text>
        </StudyBox>
      </DetailsContainer>
    </Container>
  )
}

export default Profile