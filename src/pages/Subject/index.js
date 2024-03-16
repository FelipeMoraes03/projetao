import { useCallback, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Option,
  OptionText,
  OptionCheck,
  Button,
  ButtonText
} from './styles';

const Subject = () => {
  const navigation = useNavigation()

  const [optionSelected, setOptionSelected] = useState(-1)

  const handleOptionSelection = useCallback((index) => {
    setOptionSelected(index)
    const optionIndex = index
    navigation.navigate('Task', { optionIndex })
  }, [navigation, optionsNames])

  const optionsNames = ['Precificação', 'Introdução à Contabilidade', 'Indicadores e Pensamento Analítuco', 'Matemática Financeira e Sistema de Amortização']

  return (
    <Container>
      {
        Array.from({ length: 4 }).map((_, index) => {
          return (
            <Option
              onPress={() => handleOptionSelection(index)}
              disabled={index < 0}
              key={index}
              style={
                { marginTop: 16 }
              }
              isBlocked={index < 0}
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
  )
}

export default Subject