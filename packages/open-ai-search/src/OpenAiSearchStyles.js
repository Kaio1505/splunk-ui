import styled from 'styled-components';
import { variables, mixins } from '@splunk/themes';
import TextArea from '@splunk/react-ui/TextArea';
import Text from '@splunk/react-ui/Text';
import TabLayout from '@splunk/react-ui/TabLayout';


const StyledMarkdownContainer = styled.div`

    ${mixins.reset('inline-block')};
    font-size: ${variables.fontSizeLarge};
    line-height: 200%;
    margin: ${variables.spacing} ${variables.spacingHalf};
    padding: ${variables.spacing} ${variables.spacingXXLarge};
    border-radius: ${variables.borderRadius};
    box-shadow: ${variables.overlayShadow};
    background-color: ${variables.backgroundColor};
    color: black;
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  code {
    background-color: #f4f4f4;
    color: #c7254e;
    padding: 2px 4px;
    border-radius: 4px;
  }

  pre {
    background-color: #333;
    color: #f8f8f2;
    padding: 16px;
    border-radius: 5px;
    overflow-x: auto;
  }

  /* Estilo para blockquote */
  blockquote {
    margin: 20px 0;
    padding: 15px 20px;
    background-color: #f9f9f9;
    border-left: 5px solid #ccc;
    color: #555;
    font-style: italic;
    position: relative;
  }

  blockquote p {
    margin: 0;
  }

  /* Estilo recursivo para blockquotes aninhados */
  blockquote blockquote {
    background-color: #ececec;
    border-left: 5px solid #bbb;
    margin-top: 10px;
    padding-left: 20px;
    font-style: normal;
    color: #333;
  }

  blockquote blockquote blockquote {
    background-color: #e0e0e0;
    border-left: 5px solid #999;
    margin-top: 10px;
    padding-left: 25px;
  }

  blockquote blockquote blockquote blockquote {
    background-color: #d6d6d6;
    border-left: 5px solid #777;
    margin-top: 10px;
    padding-left: 30px;
  }
`;



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

// Estilo para a tabela
const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: ${variables.spacing} 0;
    box-shadow: ${variables.overlayShadow};
    font-size: ${variables.fontSizeSmall}; /* Tamanho da fonte */
`;

// Estilo para o cabeçalho da tabela
const StyledTableHeader = styled.th`
    background-color: ${variables.brandColor};
    color: white;
    padding: ${variables.spacing} ${variables.spacingSmall};
    text-align: left;
    border: 1px solid #ddd;
    font-size: ${variables.fontSizeMedium}; /* Tamanho da fonte */
    border-radius: ${variables.borderRadius}; /* Adiciona borda arredondada */
`;

// Estilo para as células da tabela
const StyledTableCell = styled.td`
    padding: ${variables.spacingSmall};
    border: 1px solid #ddd;
    font-size: ${variables.fontSizeSmall};
    text-align: left;
    
    &:nth-child(even) {
        background-color: #f9f9f9; /* Cor para linhas pares */
    }

    &:hover {
        background-color: #f1f1f1; /* Efeito ao passar o mouse */
    }
`;

// Estilo para as linhas da tabela
const StyledTableRow = styled.tr`
    &:nth-child(odd) {
        background-color: #ffffff; /* Cor para linhas ímpares */
    }
    
    &:hover {
        background-color: #e6e6e6; /* Efeito hover na linha */
    }
`;



export { StyledContainer, StyledGreeting, StyledTabLayout ,StyledTextArea,StyledButton,StyledSpan,StyledResponse, StyledTable, StyledTableHeader, StyledTableCell, StyledTableRow, StyledMarkdownContainer};
