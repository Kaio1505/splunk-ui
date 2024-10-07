import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CodeBlock = ({ className, children }) => {
  const language = className ? className.split("-")[1] : "";
  const code = children;

  return (
    <div style={{ position: 'relative' }}>
      {language ? (
        <>
          <SyntaxHighlighter
            language={language}
            style={darcula}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
          <CopyToClipboard text={code}>
            <button style={copyButtonStyle}>Copy</button>
          </CopyToClipboard>
        </>
      ) : (
        <code style={{backgroundColor:'#dcdfe6'}}>
        {code}</code> // Renderiza apenas um span se não houver linguagem
      )}
    </div>
  );
};

const copyButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default CodeBlock;
