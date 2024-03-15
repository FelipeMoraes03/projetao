import React, { useCallback, useMemo, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import YoutubeIframe from 'react-native-youtube-iframe';

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

  const toggleIsAudioPlaying = () => {
    setIsAudioPlaying(!isAudioPlaying)
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
          videoId='GWGL5dBy3-8'
          height='100%'
          width='100%'
          play
        />
      )
    } else if (lessonOpened == 'text') {
      return (
        <TextLessonContainer>
          <Text style={{ fontSize: 24 }} >O que são finanças?</Text>

          <Text
            style={{
              marginTop: 16,
              fontSize: 12
            }}
          >
            O campo das finanças para microempreendedores pode ser caracterizado como "a habilidade e o conhecimento de gerenciar os recursos financeiros". Praticamente todos osmicroempreendedores ganham ou angariam fundos, despendem ou investem capital. Asfinanças referem-se ao processo, às instituições, aos mercados e aos instrumentosenvolvidos na movimentação de recursos financeiros entre o microempreendedor, clientes,fornecedores e órgãos governamentais
          </Text>
        </TextLessonContainer>
      )
    } else {
      return (
        <AudioLessonContainer>
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
        </AudioLessonContainer>
      )
    }
  }, [lessonOpened, isAudioPlaying])

  return (
    <Container>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>O que são finanças?</Text>
      <Text 
        style={{ 
          fontSize: 22,
          marginBottom: lessonOpened == '' ? 80 : 0
        }}
      >
        Introdução a Finanças - 1/4
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
