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
  const { optionIndexSubject } = route.params

  const [optionSelected, setOptionSelected] = useState(-1)

  const handleOptionSelection = useCallback((indexLesson) => {
    setOptionSelected(indexLesson)
    const optionIndexLesson = indexLesson
    navigation.navigate('Lesson', { optionIndexLesson, optionIndexSubject })
  }, [navigation, optionsNames])

  const optionsNames = [
    {
      title: 'Introdução à Contabilidade',
      lessons: ['Introdução a Contabilidade', 'Demontrações Contábeis', 'Controle Fluxo de Caixa', 'Introdução a gestão do Capital de Giro']
    },
    {
      title: 'Formação de Preço',
      lessons: ['Introdução a Formação de Preço', 'Métodos de Formar Preço', 'Estratégias de Preço', 'Gestão de Preço']
    },
    {
      title: 'Matemática Financeira',
      lessons: ['Fundamentos da Matemática Financeira', 'Avaliação de métricas e Investimentos', 'Planejamneto e Tomada decisões Financeiras', 'Gestão de Riscos Financeiros']
    },
    {
      title: 'Sistemas de Amortização',
      lessons: ['Introdução aos Sistemas de Amortização', 'Sistema de Amortização Constante', 'Sistema de Amortização Francês -SAF ou Tabela Price', 'Gestão de Emprestimos e Financiamento']
    }
  ]

  return (
    <Container>
      <Text style={{ fontSize: 24, marginBottom: 64, textAlign: 'center' }} >{optionsNames[optionIndexSubject].title}</Text>

      {
        Array.from({ length: 4 }).map((_, indexLesson) => {
          return (
            <Option
              onPress={() => handleOptionSelection(indexLesson)}
              disabled={indexLesson !== 0}
              key={indexLesson}
              style={
                indexLesson !== 0 && { marginTop: 16 }
              }
              isBlocked={indexLesson !== 0}
            >
              <OptionText>{optionsNames[optionIndexSubject].lessons[indexLesson]}</OptionText>

              <OptionCheck
                optionSelected={optionSelected === indexLesson}
              >
                {optionSelected === indexLesson && <MaterialIcons name='check' size={15} color='#fff' />}
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