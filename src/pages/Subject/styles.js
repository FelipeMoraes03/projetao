import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: ${props => props.showTutorial ? 'center' : 'flex-start'};
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
      background-color: #199954;
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

export const Modal = styled.View`
  background-color: #09190E7D;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  padding: 60px 16px 40px;
  align-items: center;
  justify-content: space-between;
`

export const DotContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Dot = styled.View`
  height: 7px;
  width: 50px;
  border-radius: 25px;
  background-color: ${props => props.isSelected ? '#10E873' : '#09190E'};
`

export const MessageContainer = styled.View`
  background-color: #10E873;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 20px;
  border-top-left-radius: 0px;
  margin-bottom: 12px;
  width: 260px;
  margin-left: 8px;
  margin-top: 32px;
`

export const ArrowContainer = styled.View`
  flex-direction: row;
  justify-content: ${props => props.isStart ? 'center' : 'space-between'};
  width: 100%;
`

export const GreyContainer = styled.View`
  width: 375px;
  height: 200px;
  border-radius: 0 0 28px 28px;
  background-color: #D9D9D9;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`