import React, { useState } from 'react';
import './ChatbotScreen.css'

const ChatbotScreen = () => {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<Array<{question: string, answer: string, search_term: Array<string>}>>();

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
    const responseUp = await fetch('http://127.0.0.1:8000/gpt_data', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question
        }),
      });
      const resp = await responseUp.json();
      const newResponseArr = response ? [...response] : []
      newResponseArr.unshift(resp.data)
      setResponse(newResponseArr)
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
 
      <div>
        <div className="chat-container">
          <div className="user-input">
            <form onSubmit={handleSubmit}>
              <input type="text" value={question} onChange={handleInputChange} />
              <button type="submit" disabled={!Boolean(question)}>Ask</button>
            </form>
          </div>
          <div className="chat-response">
            {response && response?.map((value: {question: string, answer: string, search_term: Array<string>}, index: number) => {
                return (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center'}} key={`${value.question}${index}`}>
                    <h1 style={{ backgroundColor: 'violet',  textAlign: 'center'}}>{`Question: ${value.question}`}</h1>
                    <div style={{display: 'flex', flexDirection: 'row', backgroundColor: 'red',  textAlign: 'center'}}>{'search_term: '}{value.search_term.map((value1: string) => (<h2 key={value1}>{value1}</h2>))}</div>
                    <h3 style={{backgroundColor: 'white',  textAlign: 'center'}}>{'Answer: '}{value.answer}</h3>
                    </div>
                )
            })}
          </div>
        </div>
      </div>

  );
};

export default ChatbotScreen;
