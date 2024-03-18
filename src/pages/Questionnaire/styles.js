import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 52px;
  padding-bottom: 60px;
  background-color: #fff;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

export const SelectContainer = styled.View`
  width: 100%;
  margin-bottom: 32px;
`;

export const SelectLabel = styled.Text`
  font-size: 16px;
  color: #000;
  margin-top: 40px;
  margin-bottom: 8px;
`;

export const AdvanceButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 52px;
  background-color: #10E873;
  border-radius: 8px;
  margin-top: auto;
`;

export const AdvanceButtonText = styled.Text`
  font-size: 18px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  height: 40px;
  color: #fff;
  font-size: 16px;
  border-width: 1px;
  border-color: #09190E;
  border-radius: 12px;
  padding-right: 6px;
  padding-left: 16px;
  align-items: center;
  margin-top: auto;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin-right: 8px;
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

export const GreyContainer = styled.View`
  width: 375px;
  height: 200px;
  border-radius: 0 0 28px 28px;
  background-color: #D9D9D9;
  align-items: center;
  justify-content: center;
  margin-bottom: 0px;
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
  margin-top: 64px;
`