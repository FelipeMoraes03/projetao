import { useCallback, useState } from 'react'
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import {
  Container,
  Option,
  OptionText,
  OptionCheck,
  Button,
  ButtonText
} from './styles';

const Task = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { optionIndex } = route.params

  const [optionSelected, setOptionSelected] = useState(-1)

  const handleOptionSelection = useCallback((index) => {
    setOptionSelected(index)
    navigation.navigate('Lesson', { optionIndex })
  }, [navigation, optionsNames])

  const optionsNames = [
    ['Introdução a Contabilidade', 'Demontrações Contábeis', 'Controle Fluxo de Caixa', 'Introdução a gestão do Capital de Giro'],
    ['Introdução a Formação de Preço', 'Métodos de Formar Preço', 'Estratégias de Preço', 'Gestão de Preço'],
    ['Fundamentos da Matemática Financeira', 'Avaliação de métricas e Investimentos', 'Planejamneto e Tomada decisões Financeiras', 'Gestão de Riscos Financeiros'],
    ['Introdução aos Sistemas de Amortização', 'Sistema de Amortização Constante', 'Sistema de Amortização Francês  -SAF ou Tabela Price', 'Gestão de Emprestimos e Financiamento']
  ]

  return (
    <Container>
      <Text style={{ fontSize: 24, marginBottom: 64 }} >Precificação</Text>

      {
        Array.from({ length: 4 }).map((_, index) => {
          return (
            <Option
              onPress={() => handleOptionSelection(index)}
              disabled={index !== 0}
              key={index}
              style={
                index !== 0 && { marginTop: 16 }
              }
              isBlocked={index !== 0}
            >
              <OptionText>{optionsNames[optionIndex][index]}</OptionText>

              <OptionCheck
                optionSelected={optionSelected === index}
              >
                {optionSelected === index && <MaterialIcons name='check' size={15} color='#fff' />}
              </OptionCheck>
            </Option>
          )
        })
      }

      <Button>
        <ButtonText>Avaliação de progresso</ButtonText>
      </Button>
    </Container>
  )
}

export default Task