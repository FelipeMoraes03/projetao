import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const GreyContainer = styled.View`
  width: 375px;
  height: 434px;
  border-radius: 0 0 100px 100px;
  background-color: #D9D9D9;
  align-items: center;
  justify-content: center;  
`

export const WhiteContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 24px;
`

export const DotContainer = styled.View`
  width: 66px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 40px;
`

export const Dot = styled.View`
  height: 8px;
  width: 8px;
  background-color: #09190E;
  border-radius: 18px;

  ${props => props.dotSelected &&
    css`
      width: 20px;
      background-color: #10E873;
    `
  }
`

export const Title = styled.Text`
  font-size: 24px;
  margin-top: 52px;
  text-align: center;
`

export const Subtitle = styled.Text`
  font-size: 12px;
  margin-top: 12px;
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 32px;
  right: 24px;
  padding: 16px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: #10E873;
`

export const MeetAppButton = styled.TouchableOpacity`
  margin-top: 60px;
  padding: 16px 24px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #10E873;
`

export const JumpTutorialButton = styled.TouchableOpacity`
  margin-top: 12px;
  padding: 12px 24px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
`