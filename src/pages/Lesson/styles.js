import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  align-items: center;
`

export const ImageContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props => props.isShrink ? 40 : 90}px;
  border-radius: 10px;
  margin-top: 12px;
`

export const TextLessonContainer = styled.View`
  width: 96%;
  padding: 24px;
  background-color: rgba(16, 232, 115, 0.1);
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  align-items: center;
  justify-content: center;
`

export const AudioLessonContainer = styled.View`
  width: 96%;
  padding: 24px;
  background-color: rgba(16, 232, 115, 0.1);
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  align-items: center;
  justify-content: center;
`