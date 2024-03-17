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
      urlVideo: 'GWGL5dBy3-8',
      audio:  'https://drive.google.com/uc?export=download&id=19h91WfCd5hgqRxwy4uL-JA19J2JE8EYx',
      textLesson: 'O campo das finanças para microempreendedores pode ser caracterizado como "a habilidade e o conhecimento de gerenciar os recursos financeiros". Praticamente todos osmicroempreendedores ganham ou angariam fundos, despendem ou investem capital. Asfinanças referem-se ao processo, às instituições, aos mercados e aos instrumentosenvolvidos na movimentação de recursos financeiros entre o microempreendedor, clientes,fornecedores e órgãos governamentais'
    },
    {
      title: 'Formação de Preço',
      subtitle: 'Introdução a Formação de Preço',
      urlVideo: '',
      audio: '',
      textLesson: ''
    },
    {
      title: 'Matemática Financeira',
      subtitle: 'Fundamentos da Matemática Financeira',
      urlVideo: 'TVX3vEd11YY',
      audio: 'https://drive.google.com/uc?export=download&id=17jA5hG7Ca0oIYXoR_PmiUYeSTf-LsKQi',
      textLesson: ''
    },
    {
      title:'Sistemas de Amortização',
      subtitle: 'Introdução aos Sistemas de Amortização',
      urlVideo: '1NZGsBx1rXA',
      audio: 'https://drive.google.com/uc?export=download&id=1TJ56ghN4aw9esCNxJy5_JpveZHYD1NT1',
      textLesson: ''
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
