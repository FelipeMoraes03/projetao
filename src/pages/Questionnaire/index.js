import React, { useCallback, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Title,
  Description,
  SelectContainer,
  SelectLabel,
  AdvanceButton,
  AdvanceButtonText,
} from './styles'

const legalNatureItems = [
  { label: 'Empresa Individual', value: 'individual' },
]

const segmentItems = [
  { label: 'Tecnologia', value: 'tech' },
]

const levelItems = [
  { label: 'Superior', value: 'basic' },
]

const Questionnaire = () => {
  const navigation = useNavigation()

  const [legalNature, setLegalNature] = useState(null)
  const [segment, setSegment] = useState(null)
  const [level, setLevel] = useState(null)

  const [openLegalNature, setOpenLegalNature] = useState(false)
  const [openSegment, setOpenSegment] = useState(false)
  const [openLevel, setOpenLevel] = useState(false)

  const [stage, setStage] = useState(0)

  const handleNextStage = useCallback(() => {
    if (stage == 0) {
      setStage(1)
    } else {
      navigation.navigate('Welcome')
    }
  }, [stage])

  return (
    <Container>
      <Title>{stage == 0 ? 'Qual o seu perfil?' : 'Nível de conhecimento'}</Title>
      <Description>
        {stage == 0
          ? 'Para melhor atender suas necessidades primeiro precisamos entender melhor sobre você, seu negócio e seus conhecimentos sobre finanças.'
          : 'Vamos avaliar seu nível de conhecimento, assim podemos atender melhor as suas dúvidas e lhe indicar a uma aula adequada a suas necessidades atuais.'
        }
      </Description>

      <SelectContainer>
        {
          stage == 0
            ?
              <>
                <SelectLabel>Natureza jurídica</SelectLabel>
                <DropDownPicker
                  open={openLegalNature}
                  value={legalNature}
                  items={legalNatureItems}
                  setOpen={setOpenLegalNature}
                  setValue={setLegalNature}
                  zIndex={3000} // Ensure this is greater for the upper picker
                  zIndexInverse={1000}
                  textStyle={{ color: 'grey' }}
                  placeholder='Selecione'
                />

                <SelectLabel>Segmento de atuação</SelectLabel>
                <DropDownPicker
                  open={openSegment}
                  value={segment}
                  items={segmentItems}
                  setOpen={setOpenSegment}
                  setValue={setSegment}
                  zIndex={2000}
                  textStyle={{ color: 'grey' }}
                  placeholder='Selecione'
                />
              </>
            : <>
                <SelectLabel>Nível básico</SelectLabel>
                <DropDownPicker
                  open={openLevel}
                  value={level}
                  items={levelItems}
                  setOpen={setOpenLevel}
                  setValue={setLevel}
                  zIndex={3000} // Ensure this is greater for the upper picker
                  zIndexInverse={1000}
                  textStyle={{ color: 'grey' }}
                  placeholder='Selecione'
                />
              </>
        }
        
      </SelectContainer>

      <AdvanceButton onPress={handleNextStage}>
        <AdvanceButtonText>Avançar</AdvanceButtonText>
      </AdvanceButton>
    </Container>
  )
}

export default Questionnaire
