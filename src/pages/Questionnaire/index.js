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


const stagesConfig = [
  {
    items: [
      { label: 'MEI - Microempreendedor Individual', value: 'mei' },
      { label: 'EI - Empresario Individual', value: 'ei'},
      { label: 'LTDA - Sociedade Limitada', value: 'ltda'},
      { label: 'SLU - Sociedade Unipessoal Limitada', value: 'slu'},
      {label: 'SS- Sociedade Simples Limitada e Pura', value: 'ss'},
    ]
  },
  {
    items: [
      { label: 'Comércio', value: 'segComercio'},
      { label: 'Indútria', value: 'segIndustria'},
      { label: 'Serviços', value: 'segServicos'},
    ]
  },
  {
    label: "Qual dos seguintes termos representa a diferença entre a receita total e os custos totais de um negócio?",
    items: [
      { label: 'Lucro Líquido', value: 'answerBasic1' },
      { label: 'Margem de Lucro', value: 'answerBasic2' },
      { label: 'Fluxo de Caixa', value: 'answerBasic3' },
      { label: 'Despesas Operacionais', value: 'answerBasic4' },
    ],
    fontSize: 16
  },
  {
    label: "Um microempreendedor deseja calcular a margem de lucro de seus produtos. Qual a fórmula correta para calcular a margem de lucro?",
    items: [
      { label: 'Margem de Lucro = (Receita Total - Custo Total) / Receita Total', value: 'answerIntermediary1' },
      { label: 'Margem de Lucro = (Receita Total - Custo Total) / Custo Total', value: 'answerIntermediary2' },
      { label: 'Margem de Lucro = (Receita Total / Custo Total) * 100', value: 'answerIntermediary3' },
      { label: 'Margem de Lucro = (Custo Total / Receita Total) * 100', value: 'answerIntermediary4' },
    ],
    fontSize: 13
  },
  {
    label: "Ao expandir um negócio, um microempreendedor precisa decidir entre financiamento de curto prazo e financiamento de longo prazo. Qual das seguintes afirmativas é verdadeira em relação a essas opções?",
    items: [
      { label: 'Financiamento de curto prazo geralmente tem taxas de juros mais baixas.', value: 'answerAdvanced1' },
      { label: 'Financiamento de longo prazo é mais adequado para necessidades de capital de giro de curto prazo.', value: 'answerAdvanced2' },
      { label: 'Financiamento de curto prazo é menos arriscado devido a obrigações de pagamento mais longas.', value: 'answerAdvanced3' },
      { label: 'Financiamento de longo prazo é apropriado para investimentos de curto prazo.', value: 'answerAdvanced4' },
    ],
    fontSize: 11
  },
  {
    label: "Um microempreendedor está considerando a diversificação de seus investimentos. Qual das seguintes opções de investimento é mais apropriada para reduzir o risco do portfólio?",
    items: [
      { label: 'Investir todo o capital em ações de uma única empresa.', value: 'answerExpert1' },
      { label: 'Manter todo o capital em uma conta poupança.', value: 'answerExpert2' },
      { label: 'Diversificar o investimento em diferentes classes de ativos, como ações e títulos.', value: 'answerExpert3' },
      { label: 'Investir apenas em setores relacionados ao negócio principal.', value: 'answerExpert4' },
    ],
    fontSize: 11
  }
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
    if (stage < (stagesConfig.length)-2) {
      setStage(stage+1)
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
                  items={stagesConfig[0].items}
                  setOpen={setOpenLegalNature}
                  setValue={setLegalNature}
                  zIndex={3000} // Ensure this is greater for the upper picker
                  zIndexInverse={1000}
                  textStyle={{ color: 'grey'}}
                  placeholder='Selecione'
                />

                <SelectLabel>Segmento de atuação</SelectLabel>
                <DropDownPicker
                  open={openSegment}
                  value={segment}
                  items={stagesConfig[1].items}
                  setOpen={setOpenSegment}
                  setValue={setSegment}
                  zIndex={2000}
                  textStyle={{ color: 'grey' }}
                  placeholder='Selecione'
                />
              </>
            : <>
                <SelectLabel style={{ textAlign: 'center' }}>
                  {stagesConfig[stage+1].label}
                </SelectLabel>
                <DropDownPicker
                  open={openLevel}
                  value={level}
                  items={stagesConfig[stage+1].items}
                  setOpen={setOpenLevel}
                  setValue={setLevel}
                  zIndex={3000} // Ensure this is greater for the upper picker
                  zIndexInverse={1000}
                  textStyle={{ color: 'grey', fontSize: stagesConfig[stage+1].fontSize}}
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
