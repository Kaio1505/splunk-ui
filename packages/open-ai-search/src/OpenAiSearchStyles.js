import styled from 'styled-components';
import { variables, mixins } from '@splunk/themes';
import TextArea from '@splunk/react-ui/TextArea';
import Text from '@splunk/react-ui/Text';
import TabLayout from '@splunk/react-ui/TabLayout';

const StyledContainer = styled.div`
    ${mixins.reset('inline-block')};
    font-size: ${variables.fontSizeLarge};
    line-height: 200%;
    margin: ${variables.spacing} ${variables.spacingHalf};
    padding: ${variables.spacing} ${variables.spacingXXLarge};
    border-radius: ${variables.borderRadius};
    box-shadow: ${variables.overlayShadow};
    background-color: ${variables.backgroundColor};
    color: black;
`;

const StyledGreeting = styled.div`
    font-weight: bold;
    color: ${variables.brandColor};
    font-size: ${variables.fontSizeXXLarge};
`;

const StyledTabLayout = styled(TabLayout)`
button{
  color: black;
}
`;


const StyledTextArea = styled.div`
position: fixed;
display: inline-flex;
top: 92%;
width: -webkit-fill-available;
margin-right: 3%;
`;

const StyledButton = styled.button`
height: fit-content;
width: fit-content;
`;


const StyledSpan = styled(TextArea)`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-right: 5px;
  resize: none;
  flex: 1;
  border-radius: 20px;
  color: black;
  span {
    background: #e3e3e3;
    color: black;
    border: 1px; /* Estilo para o span interno */
  }
  textarea {
   color: black;
  }
`;

const StyledResponse = styled(TextArea)`
  width: 100%;
  margin-right: 5px;
  border-radius: 20px;

  span {
    background: #e3e3e3;
    border: 1px; /* Estilo para o span interno */
  }
`;

export { StyledContainer, StyledGreeting, StyledTabLayout ,StyledTextArea,StyledButton,StyledSpan,StyledResponse};
