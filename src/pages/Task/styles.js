import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  width: 300px;
  padding: 0 20px;
  border: 1.5px solid #10E873;
  border-radius: 10px;

  ${props =>
    props.isBlocked &&
    css`
      background-color: #D9D9D9;
      border-color: #D9D9D9;
    ` 
  }
`

export const OptionText = styled.Text`
  font-size: 16px;
`

export const OptionCheck = styled.View`
  height: 16px;
  width: 16px;
  border-width: 1.5px;
  border-color: #09190E;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  ${props => 
    props.optionSelected &&
    css`
      background-color: #09190E;
      border: none;
    `
  }
`

export const Button = styled.TouchableOpacity`
  height: 52px;
  width: 300px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  background-color: #10E873;
`

export const ButtonText = styled.Text`
  font-size: 16px;
`
