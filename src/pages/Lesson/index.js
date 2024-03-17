import React, { useCallback, useMemo, useState, useEffect  } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import YoutubeIframe from 'react-native-youtube-iframe';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; //Importa o Slider

import {
  AudioLessonContainer,
  Container, 
  ImageContainer,
  TextLessonContainer
} from './styles'

const getLessonsInfo = (lessonOpened) => {

  return({
    audio: {
      name: 'audio',
      text: 'áudio',
      file: 
        lessonOpened == 'audio'
          ? require('../../../assets/Content/audio-background-open.png')
          : require('../../../assets/Content/audio-background-option.png')
    },
    text: {
      name: 'text',
      text: 'texto',
      file: 
        lessonOpened == 'text'
          ? require('../../../assets/Content/text-background-open.png')
          : require('../../../assets/Content/text-background-option.png')
    },
    video: {
      name: 'video',
      text: 'vídeo',
      file: 
        lessonOpened == 'video'
          ? require('../../../assets/Content/video-background-open.png')
          : require('../../../assets/Content/video-background-option.png')
    }
  })
}

const Lesson = () => {
  const [lessonOpened, setLessonOpened] = useState('')
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [sound, setSound] = useState(null)

  const [soundPosition, setSoundPosition] = useState(0);
  const [soundDuration, setSoundDuration] = useState(1); // Inicie com 1 para evitar divisão por zero
  const route = useRoute()
  const { optionIndexLesson, optionIndexSubject } = route.params

  const optionsInfo = [
    {
      title: 'Introdução à Contabilidade',
      subtitle: 'Introdução a Contabilidade',
      urlVideo: '',
      audio:  '',
      textLesson: ''
    },
    {
      title: 'Formação de Preço',
      subtitle: 'Introdução a Formação de Preço',
      urlVideo: 'GWGL5dBy3-8',
      audio: 'https://drive.google.com/uc?export=download&id=19h91WfCd5hgqRxwy4uL-JA19J2JE8EYx',
      textLesson: `Seja muito bem-vindo ao nosso módulo sobre introdução à precificação para
      impulsionar o seu negócio! Se você sente dificuldade em precificar esse é o primeiro
      para aprender de vez e ter segurança na formação de preços do seu negócio. No
      Brasil, cerca de 89% dos empresários não sentem confiança na hora de formar o
      preço dos seus produtos e serviços. Vamos explorar alguns aspectos cruciais a
      serem considerados durante o processo de precificação do seu produto:\n
      1. Custo do Produto: Este é o ponto de partida, levando em conta o valor de produção, os materiais empregados e as despesas diretas envolvidas.\n
      2.  Margem de Lucro: Essencialmente, é a diferença entre o preço de venda e os custos totais associados à produção ou oferta de um produto ou serviço. Isso engloba tanto os custos diretos quanto os indiretos, tais como custos de produção,
      matéria-prima, despesas administrativas, impostos e outros gastos relacionados ao
      negócio.\n
      3. Valor de Mercado do Produto: É fundamental analisar os preços de venda
      praticados pela concorrência no mercado para produtos semelhantes em sua região.
      Manter-se competitivo exige que seu preço esteja alinhado com o praticado pelo
      mercado.\n
      4.Percepção de Valor do Cliente: Cada indivíduo percebe o valor de um produto de
      maneira diferente, o que influencia diretamente sua disposição para pagar um preço
      mais alto com base na diferenciação percebida em seu produto.\n
      5. Processo Dinâmico de Precificação: A precificação deve ser constantemente
      avaliada e reavaliada para evitar comprometer o preço do produto ou serviço e a
      lucratividade do negócio\n
      6. Diferenciação entre Preço à Vista e a Prazo: É importante reconhecer que alguns
      produtos e serviços podem ser vendidos com prazos de pagamento mais longos,
      exigindo o uso de parcelamento no cartão de crédito, o que implica em taxas
      adicionais. Por isso, é crucial incorporar essas taxas ao preço final.\n
      Além disso, há diversas variáveis importantes a serem consideradas, como tributos,
      despesas fixas, custos variáveis, comissões para vendedores e a influência da
      inflação no processo de precificação. Observações, análises, além de vários outros
      métodos de precificação, você aprenderá nos módulos seguintes de estratégia e
      gestão da precificação.
      `
    },
    {
      title: 'Matemática Financeira',
      subtitle: 'Fundamentos da Matemática Financeira',
      urlVideo: 'TVX3vEd11YY',
      audio: 'https://drive.google.com/uc?export=download&id=17jA5hG7Ca0oIYXoR_PmiUYeSTf-LsKQi',
      textLesson: `Seja bem vindo(a) ao módulo de Matemática Financeira para Microempreendedores
      um conteúdo essencial para capacitar empreendedores a entenderem e
      gerenciarem melhor suas finanças, garantindo uma gestão sólida e sustentável de
      seus negócios." A Matemática Financeira desempenha um papel fundamental na
      gestão de negócios, independentemente do tamanho da empresa. Ela fornece as
      ferramentas necessárias para compreender e analisar aspectos financeiros cruciais,
      como investimentos, lucros, fluxo de caixa, orçamento e tomada de decisões. Para
      os microempreendedores, essa compreensão é especialmente vital, pois muitas
      vezes são responsáveis por todas as áreas de seus negócios, incluindo as finanças.
      Uma sólida compreensão da Matemática Financeira permite aos
      microempreendedores realizar projeções financeiras, calcular riscos e retornos,
      determinar preços de produtos ou serviços de forma competitiva e garantir a saúde
      financeira a longo prazo de seus empreendimentos. Em resumo, a Matemática
      Financeira capacita os microempreendedores a tomar decisões informadas e
      estratégicas que impulsionam o crescimento e a sustentabilidade de seus negócios.\n
      1. O que é Matemática Financeira?\n
      Matemática Financeira é uma área da matemática que se concentra em lidar com
      números relacionados ao dinheiro. Ela ajuda as pessoas a entenderem e
      administrarem suas finanças pessoais, bem como auxilia empresas a tomar
      decisões financeiras importantes, como investimentos, empréstimos, financiamentos
      e orçamentos. Em resumo, a Matemática Financeira ajuda a calcular e analisar
      questões monetárias para tomar decisões inteligentes sobre como gerenciar
      recursos financeiros de forma eficaz. A Matemática Financeira desempenha um
      papel fundamental na gestão financeira de um negócio, fornecendo ferramentas
      essenciais para análise e tomada de decisões. Ela permite calcular e entender
      aspectos cruciais, como lucratividade, rentabilidade, fluxo de caixa, retorno sobre
      investimento e avaliação de projetos. Com a Matemática Financeira, os gestores
      podem realizar projeções financeiras, avaliar diferentes opções de financiamento,
      determinar preços de produtos ou serviços de forma competitiva, gerenciar riscos
      financeiros e planejar estratégias de crescimento. Em suma, a Matemática
      Financeira capacita os gestores a fazer escolhas financeiras informadas e
      estratégicas, fundamentais para o sucesso e sustentabilidade de um negócio.\n
      2. Conceitos Fundamentais:\n
      Quando se trata de empréstimos, investimentos ou até mesmo poupança, dois
      conceitos fundamentais emergem: juros simples e compostos. Ambos têm
      implicações significativas na maneira como o dinheiro cresce ou é acumulado ao
      longo do tempo. Entretanto, como a aplicabilidade dos juros simples no dia a dia é
      muito menor do que dos juros compostos, iremos focar no assunto que tem mais
      relevância para o seu negócio.\n
      2.1 Juros Compostos:\n
      Os juros compostos são uma poderosa força impulsionadora por trás do crescimento
      do dinheiro ao longo do tempo. Enquanto os juros simples calculam os ganhos
      apenas sobre o principal inicial, os juros compostos incorporam não apenas o
      principal, mas também os juros acumulados em cada período. Imagine que você
      tenha R$1000 investidos em uma conta com juros compostos de 5% ao ano. No
      primeiro ano, você ganha R$50 em juros, resultando em um saldo total de R$1050.
      Agora, no segundo ano, os juros de 5% serão calculados sobre esse novo saldo de
      R$1050, resultando em R$52,50 em juros. Se continuarmos esse processo ao longo
      de vários anos, o saldo continuará a crescer de forma exponencial, já que os juros
      são calculados não apenas sobre o principal, mas também sobre os juros
      acumulados em cada período anterior. Essa característica dos juros compostos
      torna-os uma ferramenta poderosa para o crescimento do capital ao longo do tempo.
      Quanto mais tempo o dinheiro permanecer investido, mais significativo será o
      impacto dos juros compostos. Os juros compostos são amplamente utilizados em
      uma variedade de contextos financeiros, desde contas de poupança e investimentos
      em ações até empréstimos e financiamentos. Compreender como os juros
      compostos funcionam é essencial para tomar decisões financeiras informadas e
      aproveitar ao máximo o potencial de crescimento do seu dinheiro ao longo do tempo.
      Em última análise, compreender a diferença entre juros simples e compostos é
      crucial para tomar decisões financeiras informadas e maximizar o potencial de
      crescimento do dinheiro ao longo do tempo.\n
      2.2 Valor Presente e Valor Futuro:\n
      O Valor Presente representa o valor que um montante de dinheiro teria hoje, levando
      em conta seu valor futuro e o potencial de ganhos ao longo do tempo. Para os
      microempreendedores, entender o valor presente é fundamental ao avaliar
      investimentos futuros, como a compra de equipamentos ou a expansão do negócio.
      Saber calcular o valor presente ajuda a determinar se um investimento potencial é
      realmente vantajoso, considerando o retorno esperado e os custos associados ao
      longo do tempo.
      O Valor Futuro é o montante que um investimento, empréstimo ou depósito
      alcançará após um determinado período de tempo, considerando uma taxa de juros
      ou retorno. Para os microempreendedores, compreender o valor futuro é crucial ao
      planejar metas financeiras de longo prazo, como aposentadoria, expansão do
      negócio ou acumulação de capital para investimentos futuros. Saber calcular o valor
      futuro ajuda a estimar quanto dinheiro estará disponível no futuro, o que auxilia na
      definição de estratégias financeiras e na tomada de decisões para atingir objetivos
      específicos.
      Em resumo, tanto o Valor Presente quanto o Valor Futuro são conceitos importantes
      para os microempreendedores, pois os ajudam a avaliar o valor financeiro de
      decisões presentes e futuras, facilitando a gestão financeira e o planejamento
      estratégico de seus negócios.\n
      3. Aplicações Práticas na Gestão Financeira: \n
      3.1 Análise de Investimentos:\n
      Ao considerar a compra de equipamentos, expansão de instalações ou
      lançamento de novos produtos, a matemática financeira é utilizada
      para avaliar os investimentos potenciais. Isso envolve calcular o
      retorno sobre o investimento (ROI), o período de retorno do
      investimento e a viabilidade financeira geral do projeto.\n
      3.2 Gestão de Fluxo de Caixa: \n
      A gestão eficaz do fluxo de caixa é essencial para a saúde financeira
      de uma microempresa. A matemática financeira é empregada para
      prever entradas e saídas de caixa, determinar os momentos de pico e
      vales de atividade financeira e planejar o uso inteligente de recursos
      para evitar problemas de liquidez. \n
      3.3 Financiamento e Empréstimos: \n
      Quando a microempresa precisa de capital adicional para expandir ou
      cobrir despesas operacionais, a matemática financeira é fundamental
      na análise de diferentes opções de financiamento. Isso inclui calcular
      taxas de juros, prazos de pagamento, custos totais do empréstimo e
      impacto nos fluxos de caixa futuros para determinar a melhor opção de
      financiamento para a empresa.
      `

    },
    {
      title:'Sistemas de Amortização',
      subtitle: 'Introdução aos Sistemas de Amortização',
      urlVideo: '1NZGsBx1rXA',
      audio: 'https://drive.google.com/uc?export=download&id=1TJ56ghN4aw9esCNxJy5_JpveZHYD1NT1',
      textLesson: `
      Olá, empreendedores!
      Hoje, vamos explorar um tema crucial para a gestão financeira de seus negócios: os
      Sistemas de Amortização. Como microempreendedores, é essencial entender como
      funcionam esses sistemas para tomar decisões financeiras mais informadas e
      estratégicas.\n

      1.  O que são Sistemas de Amortização? \n

      Os Sistemas de Amortização são métodos utilizados para liquidar um empréstimo
      ao longo do tempo, pagando parcelas periódicas que incluem tanto o principal (o
      dinheiro que você pegou emprestado) quanto os juros. Existem diferentes tipos de
      sistemas de amortização, cada um com suas características e impactos financeiros
      distintos. Além disso, vamos discutir a importância de compreender os detalhes de
      cada sistema de amortização ao buscar financiamentos, empréstimos ou outras
      formas de capital para suas operações. Esses sistemas determinam a forma como
      essas parcelas são calculadas e distribuídas ao longo do período de pagamento do
      empréstimo. Isso permitirá que vocês façam escolhas financeiras mais conscientes
      e alinhadas com os objetivos de crescimento e sustentabilidade de seus
      empreendimentos.\n

      2. Sistema de Amortização Constante (SAC):\n

      Amortização Constante: No Sistema de Amortização Constante (SAC), o valor
      da amortização do principal é constante ao longo do período de pagamento
      do empréstimo. Isso significa que a parte da parcela destinada à amortização
      do principal é a mesma em cada período.
      Redução Progressiva dos Juros: Enquanto a amortização do principal
      permanece constante, os juros pagos diminuem ao longo do tempo. Isso
      ocorre porque os juros são calculados sobre o saldo devedor remanescente,
      que diminui à medida que o principal é amortizado a cada período.
      Parcelas Decrescentes: Como resultado da amortização constante do
      principal e da redução progressiva dos juros, as parcelas pagas por quem
      pegou o empréstimo diminuem ao longo do período de pagamento do
      empréstimo. Inicialmente, as parcelas são mais altas devido à maior parte
      destinada aos juros, mas diminuem ao longo do tempo à medida que os juros
      diminuem.\n
      Menor Custo Total: Comparado ao Sistema de Amortização Price (Tabela
      Price), o SAC geralmente resulta em um custo total do empréstimo mais
      baixo, uma vez que os juros são calculados sobre um saldo devedor
      decrescente ao longo do tempo. Isso pode beneficiar os mutuários ao reduzir
      o montante total de juros pagos ao longo do prazo do empréstimo.
      Complexidade de Cálculo: Embora o SAC seja mais simples em termos de
      amortização constante, seu cálculo pode ser mais complexo em comparação
      com o Sistema Price. Isso ocorre porque as parcelas são calculadas
      individualmente com base no saldo devedor remanescente e na taxa de juros,
      o que pode exigir mais esforço para calcular manualmente.\n

      3. Sistema de Amortização Francês (SAF):\n

      Parcelas Constantes: No Sistema de Amortização Price, as parcelas são
      constantes ao longo do período de pagamento do empréstimo. Isso significa
      que o valor da parcela permanece o mesmo a cada período, facilitando o
      planejamento financeiro, já que os pagamentos são previsíveis.
      Amortização do Principal e Pagamento de Juros: Cada parcela paga pelo
      mutuário inclui uma parte destinada à amortização do principal emprestado e
      outra parte destinada ao pagamento dos juros sobre o saldo devedor.
      Inicialmente, a maior parte da parcela é destinada ao pagamento dos juros,
      com uma proporção menor sendo aplicada à amortização do principal. \n

      Conforme o tempo passa, a proporção destinada à amortização do principal
      aumenta, enquanto a parte destinada aos juros diminui.
      Equilíbrio entre Juros e Amortização: O Sistema Price busca um equilíbrio
      entre o pagamento de juros e a amortização do principal ao longo do tempo.
      Isso significa que as parcelas são calculadas de forma a garantir que o valor
      total do empréstimo seja pago ao final do prazo acordado, levando em
      consideração os juros acumulados.
      Facilidade de Cálculo: O Sistema de Amortização Price é relativamente
      simples de calcular, o que o torna amplamente utilizado em empréstimos
      imobiliários, financiamentos de veículos e outros tipos de empréstimos de
      longo prazo. A fórmula para calcular o valor da parcela é conhecida e fácil de
      aplicar, o que facilita a compreensão e a gestão do empréstimo tanto para o
      mutuário quanto para o credor.
      Acesso a Financiamentos de Longo Prazo: Devido à sua estrutura de
      pagamento previsível e constante, o Sistema Price é frequentemente utilizado
      em empréstimos de longo prazo, permitindo que os mutuários tenham acesso
      a financiamentos para projetos que exigem um período prolongado para
      serem liquidados, como a compra de imóveis ou investimentos em expansão
      de negócios.\n


      4. Escolhendo o Sistema de Amortização Adequado: \n

      Ao escolher entre o Sistema de Amortização Constante (SAC) e o Sistema de
      Amortização Francês (SAF), é essencial considerar as características e
      necessidades específicas da microempresa. Para microempreendedores que
      buscam parcelas mais altas no início do empréstimo e uma redução gradual ao
      longo do tempo, o SAC pode ser a escolha ideal. Isso proporciona uma gestão
      financeira mais previsível, facilitando o planejamento de fluxo de caixa. Por outro
      lado, o SAF, com suas parcelas constantes ao longo do tempo, pode ser preferível
      para microempresas que buscam uma abordagem mais equilibrada em relação aos
      pagamentos mensais. Isso pode ser especialmente útil para empresas com
      orçamentos mais apertados, já que as parcelas constantes facilitam o planejamento
      financeiro a longo prazo. Em última análise, a melhor decisão envolvendo os
      sistemas de amortização depende das preferências individuais da microempresa e
      de seus objetivos financeiros a curto e longo prazo
      `
    }
  ]

  useEffect(() => {
    return sound
      ? () => {
          console.log('Descarregando Som');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    }
  }, [sound]); 

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setSoundPosition(status.positionMillis);
      setSoundDuration(status.durationMillis || 1);
  
      setIsAudioPlaying(status.isPlaying);
  
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
        setSoundPosition(0);
      }
    }
  };

  const playPauseAudio = async () => {
    if (sound === null) {
      const { sound: soundObject, status } = await Audio.Sound.createAsync(
        { uri: optionsInfo[optionIndexSubject].audio},
        { shouldPlay: true }
     );
      setSound(soundObject);
      soundObject.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      setIsAudioPlaying(status.isPlaying);
    } else if (isAudioPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // Adicione a função para lidar com a mudança de valor do Slider
  const onSliderValueChange = useCallback(async (value) => {
    if (sound !== null) {
      await sound.setPositionAsync(value);
    }
  }, [sound]);

  const toggleIsAudioPlaying = () => {
    playPauseAudio();
  }

  const lessonsSequence = useMemo(() => {
    let lessons

    if (lessonOpened == 'audio') {
      lessons = ['text', 'video', 'audio']
    } else if (lessonOpened == 'text') {
      lessons = ['video', 'audio', 'text']
    } else {
      lessons = ['audio', 'text', 'video']
    }

    const lessonsObj = getLessonsInfo(lessonOpened)

    return lessons.map(lesson => lessonsObj[lesson])
  }, [lessonOpened])

  const getMidiaComponent = useMemo(() => {
    if (lessonOpened == 'video') {
      return (
        <YoutubeIframe
          videoId={optionsInfo[optionIndexSubject].urlVideo}
          height='100%'
          width='100%'
          play
        />
      )
    } else if (lessonOpened == 'text') {
      return (
        <TextLessonContainer>
          <Text style={{ fontSize: 24, textAlign: 'center'}} >{optionsInfo[optionIndexSubject].subtitle}</Text>

          <Text
            style={{
              marginTop: 16,
              fontSize: 12
            }}
          >
            {optionsInfo[optionIndexSubject].textLesson}
          </Text>
        </TextLessonContainer>
      )
    } else {
      return (
        <AudioLessonContainer>
          <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={soundDuration}
              value={soundPosition}
              onSlidingComplete={onSliderValueChange} // Atualizar a posição do áudio quando o usuário termina de arrastar o slider
              onValueChange={onSliderValueChange}
              minimumTrackTintColor='#10E873'
              maximumTrackTintColor="#fff"
              thumbTintColor = '#10E873'
            />
          <View
            style={{
              backgroundColor: '#10E873',
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48
            }}
          >
            <TouchableOpacity onPress={toggleIsAudioPlaying}>
              {
                isAudioPlaying
                  ? <MaterialIcons name='pause' size={32} color='#fff' style={{ height: 32, width: 32 }} />
                  : <MaterialIcons name='arrow-right' size={56} color='#fff' style={{ height: 56, width: 56 }} />
              }
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 16, marginTop : 10 }}>
            {`${Math.floor(soundPosition / 60000)}:${((soundPosition % 60000) / 1000).toFixed(0).padStart(2, '0')}`}
            </Text>
        </AudioLessonContainer>
      )
    }
  }, [lessonOpened, isAudioPlaying])

  return (
    <Container>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{optionsInfo[optionIndexSubject].subtitle}</Text>
      <Text 
        style={{ 
          fontSize: 22,
          marginBottom: lessonOpened == '' ? 80 : 0
        }}
      >
        {optionsInfo[optionIndexSubject].title} - {optionIndexLesson+1}/4
      </Text>

      {
        lessonOpened == ''
          ? <>
              <ImageContainer onPress={() => setLessonOpened('text')}>
                <Image
                  source={require('../../../assets/Content/text-background.png')}
                  style={{
                    position: 'absolute',
                  }} 
                />

                <Text style={{ fontSize: 20, color: '#C6F3E8' }}>Aula em texto</Text>
              </ImageContainer>
                
              <ImageContainer onPress={() => setLessonOpened('audio')}>
                <Image
                  source={require('../../../assets/Content/audio-background.png')}
                  style={{
                    position: 'absolute'
                  }}
                />

                <Text style={{ fontSize: 20, color: '#C6F3E8' }}>Aula em áudio</Text>
              </ImageContainer>
                
              <ImageContainer  onPress={() => setLessonOpened('video')}>
                <Image
                  source={require('../../../assets/Content/video-background.png')}
                  style={{
                    position: 'absolute'
                  }}
                />

                <Text style={{ fontSize: 20, color: '#C6F3E8' }}>Aula em vídeo</Text>
              </ImageContainer>
            </>
          : <>
              {lessonsSequence.map((lesson, index) => (
                <ImageContainer 
                  onPress={() => setLessonOpened(lesson.name)}
                  isShrink={index != 2}
                  key={index}
                >
                  <Image
                    source={lesson.file}
                    style={{
                      position: 'absolute',
                    }} 
                  />

                  <Text style={{ fontSize: 20, color: '#C6F3E8' }}>Aula em {lesson.text}</Text>
                </ImageContainer>        
              ))}
              
              {getMidiaComponent}
            </>
      }
    </Container>
  );
};

export default Lesson;
