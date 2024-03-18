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

const Profile = ({ route }) => {
  const { legalNature, segment, userName } = route.params;
  console.log("route.params", route.params)

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
          <Name>{userName}</Name>
          <BusinessType>{legalNature} - {segment}</BusinessType>
        </View>
      </View>

      <DetailsContainer>
        <DetailsTitle>Perfil</DetailsTitle>

        <Details>
          <Text style={{ fontWeight: 'bold' }} >Nome completo:</Text> {userName}
        </Details>

        <Details>
          <Text style={{ fontWeight: 'bold' }} >Email:</Text> isamaria@gmail.com
        </Details>
      </DetailsContainer>

      <DetailsContainer>
        <DetailsTitle>Caps</DetailsTitle>

        <View
          style={{ flexDirection: 'row' }}
        >
          <Text style={{ marginRight: 8, fontWeight: 'bold' }} >30</Text>
          
          <Image source={require('../../../assets/Profile/coin.png')} />
        </View>
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