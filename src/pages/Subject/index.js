import { useCallback, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  Option,
  OptionText,
  OptionCheck,
  Button,
  ButtonText,
  ArrowContainer,
  Dot,
  DotContainer,
  MessageContainer,
  Modal,
  GreyContainer
} from './styles';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const tutorialTexts = [
  'Oi, eu sou a Sofia, a assistente de finanças da Enpi. Hoje, estou aqui para te apresentar como o nosso app funciona, vamos nessa?',
  'Essa é a página de trilhas, onde você encontrará temas cruciais para um bom entendimento das finanças do seu negócio. Você pode iniciar por aquele que mais é importante para você no momento, ou seguir a trilha da maneira que construímos, a escolha será sempre sua.',
  'Ao clicar em um tema, você terá acesso a diversas aulas curtas sobre o assunto. As aulas são disponibilizadas em formato de áudio, texto e vídeo e você pode aprender quando e como quiser!',
  'Ah, se sentir dúvidas durante o processo, não se preocupe! Entrando no chat você pode conversar comigo. Posso te ajudar com qualquer dúvida sobre os assuntos, o seu negócio, ou mesmo o app, você só precisa enviar a sua pergunta.',
  'Para falar comigo, você sempre irá usar a Enpicoin, moeda que utilizamos para gerar respostas especializadas para as suas questões. Com 1 Enpicoin você consegue me enviar 30 mensagens, e você recebe novos Enpicoins após finalizar atividades.',
  'Os Enpicoins acabaram e você precisa conversar comigo? Sem problemas, você pode comprar quantos enpicoins precisar ou assinar o nosso plano premium, onde você recebe enpicoins adicionais todos os meses.\n\nIsso é tudo que você precisa saber para aproveitar a Enpi. Agora, vamos aprender?'
]

const Subject = ({ route }) => {
  const navigation = useNavigation()

  const [optionSelected, setOptionSelected] = useState(-1)

  const [section, setSection] = useState(0)

  const [userName, getUserName] = useState()


  _retriveData = async () => {
    try {
      const userName = await AsyncStorage.getItem('user')
      getUser = userName
      return userName
    } catch (error) {
      console.log('error', error)
    }
  }


  _retriveData().then((userName) => getUserName(userName))


  const handleOptionSelection = useCallback((index) => {
    setOptionSelected(index)
    const optionIndexSubject = index
    navigation.navigate('Task', { optionIndexSubject })
  }, [navigation, optionsNames])

  const optionsNames = ['Introdução à Contabilidade', 'Formação de Preço', 'Matemática Financeira', 'Sistemas de Amortização']

  return (
    <>
      {route.params?.showTutorial &&
        <Modal>
          <DotContainer>
            {Array.from({ length: 6 }).map((_, index) => <Dot isSelected={index <= section} key={index} />)}
          </DotContainer>

          <View
            style={{ alignItems: 'center' }}
          >
            <View
              style={{ flexDirection: 'row', marginBottom: 24 }}
            >
              <Image source={require('../../../assets/Chat/sofia.png')} />

              <MessageContainer>
                <Text>{tutorialTexts[section]}</Text>
              </MessageContainer>
            </View>

            {section == 4 && <Image source={require('../../../assets/Profile/coin.png')} />}
          </View>

          {section == 5
            ? <View
              style={{ alignItems: 'center' }}
            >
              <TouchableOpacity
                style={{ paddingHorizontal: 24, paddingVertical: 20, backgroundColor: '#10E873', borderRadius: 10 }}
                onPress={() => navigation.navigate('Questionnaire')}
              >
                <Text style={{ fontSize: 18 }} >Iniciar a minha jornada</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingHorizontal: 40, paddingVertical: 12, backgroundColor: '#D9D9D9', borderRadius: 10, marginTop: 20 }}
                onPress={() => setSection(section - 1)}
              >
                <Text style={{ fontSize: 12 }} >Voltar</Text>
              </TouchableOpacity>
            </View>
            : <ArrowContainer isStart={section == 0}>
              {
                section != 0 &&
                <TouchableOpacity
                  style={{ paddingHorizontal: 24, paddingVertical: 8, backgroundColor: '#D9D9D9', borderRadius: 10 }}
                  onPress={() => setSection(section - 1)}
                >
                  <MaterialIcons name='arrow-back' size={40} color='#09190E' style={{ height: 40, width: 40 }} />
                </TouchableOpacity>
              }

              <TouchableOpacity
                style={{ paddingHorizontal: 24, paddingVertical: 8, backgroundColor: '#10E873', borderRadius: 10 }}
                onPress={() => setSection(section + 1)}
              >
                <MaterialIcons name='arrow-forward' size={40} color='#09190E' style={{ height: 40, width: 40 }} />
              </TouchableOpacity>
            </ArrowContainer>
          }
        </Modal>
      }

      <Container
        showTutorial={route.params?.showTutorial}
      >
        {!route.params?.showTutorial &&
          <GreyContainer>
            <View
              style={{ flexDirection: 'row' }}
            >
              <Image source={require('../../../assets/Chat/sofia.png')} />

              <MessageContainer>
                <Text>Bom dia {userName}! O que vamos aprender hoje?</Text>
              </MessageContainer>
            </View>
          </GreyContainer>
        }

        {
          Array.from({ length: 4 }).map((_, index) => {
            return (
              <Option
                onPress={() => handleOptionSelection(index)}
                disabled={index == 0}
                key={index}
                style={
                  { marginTop: 16 }
                }
                isBlocked={index == 0}
              >
                <OptionText>{optionsNames[index]}</OptionText>

                <OptionCheck
                // optionSelected={optionSelected === index}
                >
                  {/* {optionSelected === index && <MaterialIcons name='check' size={15} color='#fff' />} */}
                </OptionCheck>
              </Option>
            )
          })
        }
      </Container>
    </>
  )
}

export default Subject