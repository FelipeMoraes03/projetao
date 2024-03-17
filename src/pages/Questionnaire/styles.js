import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 52px;
  padding-bottom: 100px;
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

