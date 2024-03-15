import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding-top: ${props => props.isIntroduction ? 140 : 40}px;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
`

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
`

export const InputContainer = styled.View`
  flex-direction: row;
  height: 40px;
  color: #fff;
  font-size: 16px;
  border-width: 1px;
  border-color: #09190E;
  border-radius: 24px;
  padding-right: 6px;
  padding-left: 16px;
  align-items: center;
  margin-top: auto;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-right: 8px;
`

export const InputButton = styled.TouchableOpacity`
  background-color: #09190E;
  height: 28px;
  width: 28px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`

export const MessageContainer = styled.View`
  background-color: ${props => props.isUser ? '#0087fd' : '#e1e5ec'};
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 9px;
  margin-bottom: 12px;
  max-width: 260px;

  ${props => 
    props.isUser 
      ? css`
          margin-left: auto;
        `
      : css`
          margin-right: auto;
        `
  }
`