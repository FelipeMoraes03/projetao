import { useCallback, useMemo, useState } from 'react'
import { Image, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  DotContainer,
  Dot,
  Button,
  GreyContainer,
  WhiteContainer,
  Title,
  Subtitle,
  MeetAppButton,
  JumpTutorialButton,
} from './styles'

const welcomeImages = {
  1: require('../../../assets/Welcome/welcome-1.png'),
  2: require('../../../assets/Welcome/welcome-2.png'),
  3: require('../../../assets/Welcome/welcome-3.png'),
}

const phrases = [
  {
    title: 'Bem vindo(a) ao Capacita!',
    subtitle: 'O lugar onde entender sobre as finanças do seu empreendimento se torna simples e respeita o seu tempo.'
  },
  {
    title: 'Aprenda e receba apoio',
    subtitle: 'Acesse quando e onde quiser as aulas e atividades que irão te ajudar a entender conceitos do mundo das finanças. Se precisar de ajuda, tenha o auxílio da Maria, a nossa Inteligência Artificial especialista em finanças para micro e pequenas empresas.'
  },
  {
    title: 'Vamos começar?',
    subtitle: 'Antes de tudo, precisamos entender como o aplicativo funciona.'
  }
]

const Welcome = () => {
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const [dotSelected, setDotSelected] = useState(0)

  const handleDotSelection = useCallback(() => {
    if (dotSelected < 2) {
      setDotSelected(dotSelected + 1)
    } else {
      // acaba tutorial
    }
  }, [dotSelected])

  return (
    <Container>
      <GreyContainer>
        <Image source={welcomeImages[dotSelected + 1]} />
      </GreyContainer>

      <WhiteContainer>
        <DotContainer>
          {Array.from({ length: 3 }).map((_, index) => <Dot dotSelected={dotSelected == index} key={index} />)}
        </DotContainer>
    
        <Title>{phrases[dotSelected].title}</Title>
    
        <Subtitle>{phrases[dotSelected].subtitle}</Subtitle>
        
        {
          dotSelected != 2
            ? <Button
                onPress={handleDotSelection}
              >
                <MaterialIcons name='arrow-forward' size={32} color='black' />
              </Button>
            : <>
                <MeetAppButton>
                  <Text style={{ fontSize: 14 }} >Quero conhecer o app</Text>
                </MeetAppButton>
          
                <JumpTutorialButton onPress={() => navigation.navigate('Questionnaire')}>
                  <Text style={{ fontSize: 11 }} >Pular tutorial</Text>
                </JumpTutorialButton>
              </>
        }
      </WhiteContainer>
    </Container>
  )
}

export default Welcome