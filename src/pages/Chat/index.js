import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, Text, KeyboardAvoidingView, Platform, ScrollView, Image, Keyboard } from 'react-native';
import OpenAI from "openai";
import { MaterialIcons } from '@expo/vector-icons'

import { OPENAI_API_KEY } from '@env';

import {
  Container,
  TextContainer,
  InputContainer,
  Input,
  InputButton,
  MessageContainer,
} from './styles'


const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const Chat = ({ route }) => {
  const { legalNature, segment, userName } = route.params;
  let gptPrompt = `Sofia é uma assistente virtual integrada à plataforma de aprendizado Capacita, direcionada a Microempreendedores Individuais (MEI) e Microempresas (ME). Seu papel vai além de responder a dúvidas técnicas; ela também auxilia os usuários na navegação pela plataforma. Após o usuário completar um questionário inicial, Sofia fornece assistência personalizada, sugerindo cursos alinhados ao perfil do usuário, baseado nas informações coletadas sobre seu negócio e conhecimento prévio. Os usuários podem escolher entre áudio, texto ou vídeo para consumir o conteúdo dos cursos, desenvolvidos para ser breves, diretos e fáceis de entender.
      Após a conclusão de cada módulo, o usuário pode interagir com Sofia para esclarecer dúvidas residuais, e ela pode oferecer recomendações de conteúdo adicional para aprimorar ainda mais o aprendizado e o desenvolvimento do negócio. Sofia está sempre disponível através de um botão no canto inferior da tela, pronta para esclarecer dúvidas pontuais e oferecer sugestões relevantes de cursos, considerando o progresso e as necessidades específicas de cada usuário na plataforma Capacita. Ao final de cada interação, Sofia recomendará um curso em um novo parágrafo, isolado e objetivo, escolhendo entre: Introdução à Finanças, Introdução à Contabilidade, Contabilidade, Planejamento Financeiro, Valor do Dinheiro, Matemática financeira, Impostos, Finanças Corporativas.
      Dê uma resposta sucinta, de acordo com as seguintes informações do usuário: Nome = ${userName}, Segmento de atuação = ${segment}, Natureza Jurídica = ${legalNature}`

  gptPrompt = gptPrompt + "Segmento de atuação = " + segment + " - Natureja jurídica = " + legalNature

  const [isIntroduction, setIsIntroduction] = useState(true)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([])
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const scrollViewRef = useRef()

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const handleSendText = async () => {
    if (isIntroduction) setIsIntroduction(false)

    setMessages((prevMessages) => [...prevMessages, inputText])

    setInputText('')
    setIsLoading(true)
    try {
      const response = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": gptPrompt },
        { "role": "user", "content": inputText }],
        //model: "gpt-4-turbo-preview",
        model: "gpt-3.5-turbo",
      });

      // if (!response.ok) {
      //   throw new Error('Erro na requisição');
      // }

      const data = response.choices[0].message.content;

      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setMessages((prevMessages) => [...prevMessages, 'Desculpe, ocorreu um erro.']);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined /* do nothing */
      }
    >
      <Container
        isIntroduction={isIntroduction}
      >
        <TextContainer
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          {isIntroduction
            ? <>
              <Text style={{ fontSize: 24 }} >
                Olá, sou a Sofia!
              </Text>

              <Text style={{ fontSize: 20 }} >
                Em que posso lhe ajudar?
              </Text>

              {!isKeyboardVisible &&
                <Image
                  source={require('../../../assets/Chat/sofia-big.png')}
                  style={{
                    marginTop: 40,
                    width: 280,
                    height: 280
                  }}
                />
              }
            </>
            : <ScrollView
              ref={scrollViewRef}
              style={{
                flex: 1,
                minWidth: '100%',
              }}
            >
              {messages.map((message, index) => {
                const isUser = index % 2 == 0

                return (
                  <MessageContainer
                    isUser={isUser}
                    key={index}
                  >
                    <Text
                      style={{
                        color: isUser ? '#fff' : '#000'
                      }}
                    >
                      {message}
                    </Text>
                  </MessageContainer>
                )
              })}
              {isLoading && (
                <View style={{ alignItems: 'flex-start', margin: 20 }}>
                  <ActivityIndicator size="large" color="green" />
                </View>
              )}

            </ScrollView>
          }
        </TextContainer>

        <InputContainer>
          <Input
            keyboardAppearance='dark'
            onChangeText={setInputText}
            value={inputText}
          />

          <InputButton
            onPress={handleSendText}
          >
            <MaterialIcons name='arrow-right' size={44} color='#fff' style={{ height: 44, width: 44 }} />
          </InputButton>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Chat