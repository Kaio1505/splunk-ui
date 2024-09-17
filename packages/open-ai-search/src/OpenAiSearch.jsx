import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  StyledContainer,
  StyledTextArea,
  StyledSpan,
  StyledTabLayout,
} from './OpenAiSearchStyles';
import List from '@splunk/react-ui/List';
import P from '@splunk/react-ui/Paragraph';
import TabLayout from '@splunk/react-ui/TabLayout';
import Button from '@splunk/react-ui/Button';
import Plus from '@splunk/react-icons/Plus';
import PaperPlane from '@splunk/react-icons/PaperPlane';
import Monogram from '@splunk/react-ui/Monogram';
import Portrait from '@splunk/react-icons/Portrait';
import Cross from '@splunk/react-icons/Cross';
import Modal from '@splunk/react-ui/Modal';
import SearchJob from '@splunk/search-job';
import RobotAgent from '@splunk/react-icons/RobotAgent';
import Progress from '@splunk/react-ui/Progress';
import CodeBlock from './CodeBlock';
import Markdown from 'markdown-to-jsx';
import { getEncoding, encodingForModel } from 'js-tiktoken';

const propTypes = {
  name: PropTypes.string,
};

const enc = encodingForModel('gpt-4o');
const OpenAiSearch = ({ name = 'User' }) => {
  const iconProps = { width: 20, height: 20 };
  const [text, setText] = useState('');
  const [conversas, setConversas] = useState([{ role: 'assistant', content: 'Oi, Como posso ajudar?' }]);
  const [cannotSearch, setSearch] = useState(false);
  const [items, setItems] = useState([
    {
      label: 'Chat 3',
      id: 0,
      conversas: conversas,
    },
  ]);
  const [activePanel, setActive] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalMessage, setModal] = useState('');
  const [pageHeight, setHeight] = useState('500px');
  const [buttonHeight, setButtonHeight] = useState('500px');
  const [removeId, setId] = useState(-1);
  const tabLayoutRef = useRef(null);
  const parentRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const modalToggle = useRef(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const TOKEN_LIMIT = 110000;

  const countTokens = (messages) => {
    let numTokens = 0;
    for (const message of messages) {
      if (message) {
        numTokens += enc.encode(message.content).length;
      }
    }
    return numTokens;
  };

  const trimMessagesToFitTokenLimit = (messages, tokenLimit) => {
    while (countTokens(messages) > tokenLimit) {
      messages.shift();
    }
    return messages;
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPercentage((currentPercentage) => {
        if (currentPercentage >= 100) {
          return 100;
        }
        return currentPercentage + 5;
      });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, [cannotSearch]);

  const extractNumber = (str) => {
    const match = str.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };

  const runSearch = async (e, valor, messages) => {
    setLoading(true);
    setError(null);
    const searchJob = SearchJob.create({
      search: `| makeresults | eval prompt=\"${JSON.stringify(messages).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}\" | askchatgpt`,
      earliest_time: '-60m@m',
      latest_time: 'now',
    });
    const resultsSubscription = searchJob.getResults().subscribe((results) => {
      let element = e.name;
      setItems((state) => {
        return state.map((item) => {
          if (item.id === extractNumber(element)) {
            return {
              ...item,
              conversas: [...item.conversas, { role: 'assistant', content: results.results[0].response }],
            };
          }
          return item;
        });
      });
      setSearch(false);
    });
    setResults(searchJob);
  };

  const storeArrayInLocalStorage = (key) => {
    const jsonString = JSON.stringify(items);
    localStorage.setItem(key, jsonString);
  };

  const getArrayFromLocalStorage = (key) => {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
      setItems(JSON.parse(jsonString));
      return JSON.parse(jsonString);
    } else {
      return null;
    }
  };

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleChange = (e, { value }) => {
    setText(value);

    if (parentRef.current) {
      const textareaElement = parentRef.current.querySelector('[data-test="textbox"]');
      if (textareaElement) {
        const headerElement = document.querySelector('header');
        setHeight(textareaElement.getBoundingClientRect().y - headerElement.getBoundingClientRect().height - 20);
      }
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      const textareaElement = parentRef.current.querySelector('[data-test="textbox"]');
      if (textareaElement) {
        const headerElement = document.querySelector('header');
        setHeight(textareaElement.getBoundingClientRect().y - headerElement.getBoundingClientRect().height - 20);
      }
    }
  }, [activePanel]);

  const handleRequestAddChat = (e) => {
    setSearch(true);
    let element = e.name;
    let value = e.value;
    let matchedItems;
    setText('');
    setItems((state) => {
      return state.map((item) => {
        if (item.id === extractNumber(element)) {
          matchedItems = {
            ...item,
            conversas: [...item.conversas, { role: 'user', content: value }],
          };
          let messages = trimMessagesToFitTokenLimit(matchedItems.conversas, TOKEN_LIMIT);
          runSearch(e, value, messages);
          return matchedItems;
        }
        return item;
      });
    });
  };

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const y = rect.top + window.scrollY;
      setButtonHeight(y - 140);
    }
    if (tabLayoutRef.current) {
      const lateralTab = tabLayoutRef.current.querySelector('[data-tab-layout="vertical"]');
      lateralTab.style.overflowY = 'auto';
      lateralTab.style.color = 'black';
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      getArrayFromLocalStorage('splunk_openai');
      setIsLoaded(true);
    }
  }, [items]);

  useEffect(() => {
    if (isLoaded) {
      storeArrayInLocalStorage('splunk_openai');
    }
  }, [items, isLoaded]);

  const handleRequestAdd = () => {
    setItems((state) => {
      const newId = state.length > 0 ? state[state.length - 1].id + 1 : 0;
      return [
        ...state,
        {
          label: `Chat ${newId + 1}`,
          id: newId,
          conversas: [],
        },
      ];
    });
  };

  const handleKeyDown = (e, target) => {
    if (e.keyCode === 13) {
      handleRequestAddChat(e.currentTarget);
    }
  };

  const handleButtonClick = () => {
    if (parentRef.current) {
      const textareaElement = parentRef.current.querySelector('[data-test="textbox"]');
      if (textareaElement) {
        handleRequestAddChat(textareaElement);
      }
    }
  };

  const getValuesFromButton = (e) => {
    const value = e.currentTarget.value;
    const [text, number] = value.split(',');
    return { text: text, number: parseInt(number, 10) };
  };

  const handleRequestOpen = (e) => {
    let dados = getValuesFromButton(e);
    setId(dados.number);
    setModal(`Você gostaria de excluir o chat: ${dados.text}`);
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const handleRequestRemove = () => {
    setItems((state) => {
      return state.filter((item) => item.id !== removeId);
    });
    handleRequestClose();
  };

  const renderPanelLabel = (label, id) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ width: '85%' }}>{label}</span>
      <Button
        appearance="Destructive"
        onClick={handleRequestOpen}
        icon={<Cross {...iconProps} />}
        style={{ marginLeft: '10px' }}
        value={[label, id]}
      />
    </div>
  );

  const handleChangeTabLayout = (e) => {
    setActive(e);
  };

  return (
    <StyledTabLayout
      elementRef={tabLayoutRef}
      onChange={handleChangeTabLayout}
      layout="vertical"
      tabWidth={300}
      style={{ height: `${buttonHeight}px`, width: '100%', position: 'fixed', marginTop: 0 }}
    >
      {items.map((row) => (
        <TabLayout.Panel
          label={renderPanelLabel(row.label, row.id)}
          panelId={`panel-${row.id}`}
          key={row.id}
          style={{ flexDirection: 'column', justifyContent: 'space-between', overflowWrap: 'anywhere' }}
        >
          <List
            style={{ listStyle: 'none', overflowY: 'auto', flex: 1, height: `${pageHeight}px`, marginBottom: 0 }}
            key={row.id}
          >
            {row.conversas.map((talks) =>
              talks ? (
                talks.role === 'assistant' ? (
                  <List.Item style={{ marginBottom: '10px' }}>
                    <Monogram
                      backgroundColor="cornflowerblue"
                      initials={<RobotAgent variant="filled" {...iconProps} style={{ color: 'white' }} />}
                      style={{
                        marginRight: '10px',
                        verticalAlign: 'top',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                    <StyledContainer style={{ background: 'white', borderRadius: '20px', width: '85%', color: 'black' }}>
                      <Markdown
                        options={{
                          overrides: {
                            code: {
                              component: CodeBlock,
                            },
                          },
                        }}
                      >
                        {talks.content}
                      </Markdown>
                    </StyledContainer>
                  </List.Item>
                ) : (
                  <List.Item style={{ marginBottom: '10px' }}>
                    <StyledContainer style={{ borderRadius: '20px', width: '85%', background: '#f4f4f4' }}>
                      <Markdown
                        options={{
                          overrides: {
                            code: {
                              component: CodeBlock,
                            },
                          },
                        }}
                      >
                        {talks.content}
                      </Markdown>
                    </StyledContainer>
                    <Monogram
                      backgroundColor="orange"
                      initials={<Portrait variant="filled" {...iconProps} style={{ color: 'white' }} />}
                      style={{
                        marginRight: '10px',
                        verticalAlign: 'top',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </List.Item>
                )
              ) : null
            )}
          </List>
          {cannotSearch ? (
            <Progress
              style={{ height: `${pageHeight}px` }}
              type="success"
              percentage={percentage}
              tooltip={`${percentage}% carregado`}
            />
          ) : null}
          <List style={{ listStyle: 'none', overflowY: 'auto', flex: 1 }}>
            <StyledTextArea ref={parentRef}>
              <StyledSpan
                value={text}
                inline={true}
                disabled={cannotSearch}
                onChange={handleChange}
                onKeyDown={(event) => handleKeyDown(event, event.target)}
                name={`styled-span-${row.id}`}
                style={{
                  width: '85%',
                  marginRight: '5px',
                  position: 'absolute',
                  bottom: 0,
                  resize: 'none',
                  flex: 1,
                  borderRadius: '20px'
                }}
              />
              <Button
                onClick={handleButtonClick}
                appearance="primary"
                disabled={cannotSearch}
                icon={<PaperPlane {...iconProps} />}
                style={{
                  height: 'fit-content',
                  width: 'fit-content',
                  marginLeft: '87%',
                  marginRight: '5%',
                  outline: 'none',
                }}
              />
            </StyledTextArea>
          </List>
          <Modal onRequestClose={handleRequestClose} open={open} style={{ width: '600px' }}>
            <Modal.Header title="Excluir Item" onRequestClose={handleRequestClose} />
            <Modal.Body>
              <P>{modalMessage}</P>
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="secondary" onClick={handleRequestClose} label="Cancelar" />
              <Button appearance="primary" onClick={handleRequestRemove} label="Excluir" />
            </Modal.Footer>
          </Modal>
        </TabLayout.Panel>
      ))}

      <TabLayout.Panel
        label={
          <Button
            elementRef={buttonRef}
            onClick={handleRequestAdd}
            appearance="primary"
            icon={<Plus {...iconProps} />}
            label="Novo Chat"
            style={{ position: 'fixed', display: 'inline-flex', marginLeft: '4%', top: '92%' }}
          />
        }
        panelId="Novo Chat"
        disabled={false}
        style={{ margin: 20 }}
      />
    </StyledTabLayout>
  );
};

OpenAiSearch.propTypes = propTypes;

export default OpenAiSearch;
