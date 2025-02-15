import React, { useCallback, useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, ScrollView, LogBox, View, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

import {
  Container,
  Title,
  Description,
  SelectContainer,
  SelectLabel,
  AdvanceButton,
  AdvanceButtonText,
  InputContainer,
  Input,
  Option,
  OptionText,
  GreyContainer,
  MessageContainer,
} from './styles'

const stagesConfig = [
  {
    items: [
      { label: 'MEI - Microempreendedor Individual', value: 'MEI' },
      { label: 'EI - Empresario Individual', value: 'EI' },
      { label: 'LTDA - Sociedade Limitada', value: 'LTDA' },
      { label: 'SLU - Sociedade Unipessoal Limitada', value: 'SLU' },
      { label: 'SS- Sociedade Simples Limitada e Pura', value: 'SS' },
    ]
  },
  {
    items: [
      { label: 'Comércio', value: 'Comércio' },
      { label: 'Indútria', value: 'Indústria' },
      { label: 'Serviços', value: 'Serviços' },
    ]
  },
  {
    label: "Qual dos seguintes termos representa a diferença entre a receita total e os custos totais de um negócio?",
    items: [
      'Lucro Líquido',
      'Margem de Lucro',
      'Fluxo de Caixa',
      'Despesas Operacionais',
    ],
    answerIndex: 0,
    fontSize: 16
  },
  {
    label: "Um microempreendedor deseja calcular a margem de lucro de seus produtos. Qual a fórmula para calcular a margem de lucro?",
    items: [
      'Margem de Lucro = (Receita Total - Custo Total) / Receita Total',
      'Margem de Lucro = (Receita Total - Custo Total) / Custo Total',
      'Margem de Lucro = (Receita Total / Custo Total) * 100',
      'Margem de Lucro = (Custo Total / Receita Total) * 100',
    ],
    answerIndex: 1,
    fontSize: 13
  },
  {
    label: "Ao expandir um negócio, é necessário decidir entre financiamento a curto ou longo prazo. Indique a opção verdadeira sobre o tema:",
    items: [
      'Financiamento de curto prazo geralmente tem taxas de juros mais baixas.',
      'Financiamento de longo prazo é mais adequado para necessidades de capital de giro de curto prazo.',
      'Financiamento de curto prazo é menos arriscado devido a obrigações de pagamento mais longas.',
      'Financiamento de longo prazo é apropriado para investimentos de curto prazo.',
    ],
    answerIndex: 1,
    fontSize: 11
  },
  {
    label: "Um microempreendedor está considerando diversificar seus investimentos. O que é mais apropriado para reduzir o risco do portfólio?",
    items: [
      'Investir todo o capital em ações de uma única empresa.',
      'Manter todo o capital em uma conta poupança.',
      'Diversificar o investimento em diferentes classes de ativos, como ações e títulos.',
      'Investir apenas em setores relacionados ao negócio principal.',
    ],
    answerIndex: 2,
    fontSize: 12
  }
]

const Questionnaire = () => {
  const navigation = useNavigation()

  const [legalNature, setLegalNature] = useState(null)
  const [segment, setSegment] = useState('')
  const [userName, setuserName] = useState('')

  const [openLegalNature, setOpenLegalNature] = useState(false)
  const [openLevel, setOpenLevel] = useState(false)

  const [stage, setStage] = useState(0)

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("user", userName);
    }

    catch (error) { console.log('error', error) }
  }

  const [optionSelected, setOptionSelected] = useState(-1)

  const handleOptionSelection = useCallback((indexLesson) => {
    setOptionSelected(indexLesson)
  }, [])

  const handleNextStage = useCallback(() => {
    if (stage == 0) {
      if (segment && legalNature) {
        setStage(stage + 1)
      }
    } else if (stagesConfig[stage+1].answerIndex == optionSelected) {
      if (stage < (stagesConfig.length)-2) {
        setStage(stage+1)
        setOptionSelected(-1)
      } else {
        const suggestedLesson = stage-1
        navigation.navigate('Tab', { segment, legalNature, userName, suggestedLesson })
        _storeData();
      }
    } else if (optionSelected >= 0) {
      const suggestedLesson = stage-1
      navigation.navigate('Tab', { segment, legalNature, userName, suggestedLesson })
      _storeData();
    }
  }, [stage, optionSelected, segment, legalNature, userName])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
        <Container marginTop={stage === 0 ? 0 : -52}>
        { stage === 0 && (<Title>Qual o seu perfil?</Title>) }
          <Description>
            {stage == 0
              ? 'Para melhor atender suas necessidades primeiro precisamos entender melhor sobre você, seu negócio e seus conhecimentos sobre finanças.'
              : <GreyContainer>
                  <View
                    style={{ flexDirection: 'row' }}
                  >
                    <Image source={require('../../../assets/Chat/sofia.png')} style={{marginTop : 40}}/>
                    <MessageContainer>            
                      <Text style={{textAlign: 'justify'}}>Vamos avaliar seu nível de conhecimento, assim podemos atender melhor as suas dúvidas e lhe indicar a uma aula adequada a suas necessidades atuais.</Text>
                    </MessageContainer>
                  </View>
                </GreyContainer>
            }
          </Description>

          <SelectContainer>
            {
              stage == 0
                ?
                <>

                  <SelectLabel>Nome</SelectLabel>
                  <InputContainer>
                    <Input
                      keyboardAppearance='dark'
                      onChangeText={newName => setuserName(newName)}
                      defaultValue={userName}
                      value={userName}
                    />
                  </InputContainer>

                  <SelectLabel>Natureza jurídica</SelectLabel>
                  <DropDownPicker
                    open={openLegalNature}
                    value={legalNature}
                    items={stagesConfig[0].items}
                    setOpen={setOpenLegalNature}
                    setValue={setLegalNature}
                    zIndex={3000} // Ensure this is greater for the upper picker
                    zIndexInverse={1000}
                    textStyle={{ color: 'grey' }}
                    placeholder='Selecione'
                  />

                  <SelectLabel>Segmento de atuação</SelectLabel>
                  <InputContainer>
                    <Input
                      keyboardAppearance='dark'
                      onChangeText={setSegment}
                      value={segment}
                    />
                  </InputContainer>

                  </>
            : <>
                <SelectLabel style={{ textAlign: 'center', marginTop: 15, fontWeight: 'bold'}}>
                  {stagesConfig[stage+1].label}
                </SelectLabel>
                <Container style={{ borderWidth: 0, marginTop:-9}}>
                  {
                    Array.from({ length: 4 }).map((_, index) => {
                      return (
                        <Option
                          onPress={() => handleOptionSelection(index)}
                          disabled={index < 0}
                          key={index}
                          style={
                            { marginTop: 10, borderColor: optionSelected === index ? '#10E873' : 'grey',  textAlign: 'justify'}
                          }
                          isBlocked={index < 0}
                        >
                          <OptionText 
                            style={{ fontSize:stagesConfig[stage+1].fontSize }}
                          > {stagesConfig[stage+1].items[index]} </OptionText>
                              {optionSelected === index && <MaterialIcons name='check' size={15} color='#10E873' />}
                        </Option>
                      )
                    })
                  }
                </Container>
              </>
    }
          </SelectContainer>
          <AdvanceButton onPress={handleNextStage} marginTop={stage === 0 ? 50 : 0}>
            <AdvanceButtonText>Avançar</AdvanceButtonText>
          </AdvanceButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Questionnaire
