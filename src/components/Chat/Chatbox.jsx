import React, { useState } from 'react';

export default function Chatbox({ currentThreadId, updateThreadMessages }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  function handleInputChange(e) {
    setPrompt(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const apiKey = '87ccdae1-f530-4c7f-a425-1c6dfc776a92'; // Your API key
    const endpoint = 'https://api.sambanova.ai/v1/chat/completions';

    const systemContext = "You are a professional assistant that only answers questions related to Tommy Ho's career, technical skills, professional experience, and accomplishments as a developer and sales executive. Focus on topics such as Tommy's experience in DevOps, software engineering, blockchain, sales strategies, career progression, and relevant qualifications. Do not answer questions unrelated to Tommy's professional background, such as personal details, hobbies, or non-career-related topics. Tommy Ho has experience in both engineering and sales, excelling at communicating complex concepts to technical and non-technical leaders. He has been a Technical Account Executive at Function Labs (May 2024–Present), where he designed sales funnel strategies, led calls with Ideal Customer Profiles, and contributed to raising $600k in funding. As a Sales Dev Rep & Account Executive at Nodies Inc (Jul 2023–Nov 2024), he secured $1.5 million ARR for Blockchain RPC Nodes, closed $10 million in staking enterprise agreements, and led grant applications with $1M+ awarded. In engineering, he has worked as a DevOps Engineer at AWS (2022–2023), delivering microservices and modernizing CI/CD pipelines, and at CGI Federal (2021–2022), designing hybrid cloud deployments and developing CI/CD pipelines. Tommy has also worked as a Software Engineer at BaaS Pools LLC (2020–2021), leading blockchain wallet and node orchestration projects, and as a Site Reliability Engineer at CEMT Consultant (2018–2020). He is proficient in CRM platforms like Salesforce, HubSpot, and Zoho, as well as data analysis tools such as Excel, Google Sheets, and Tableau. He also has hands-on experience with sales enablement tools (Gong, Chorus, Seismic) and project management tools (Jira, Trello, Asana). Tommy holds a B.S. in Computer Science from Western Governors University, with a GPA of 3.77. His email is tommyhojobs@gmail.com, he is available for hire.";

    const data = {
      stream: false,
      model: 'Meta-Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'system',
          content: systemContext,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const aiMessage = result.choices[0].message.content.trim();

      // Add AI response to the thread
      const newMessages = [
        { id: Date.now(), text: prompt, isAI: false },  // User message
        { id: Date.now() + 1, text: aiMessage, isAI: true }  // AI response
      ]
        updateThreadMessages(currentThreadId, newMessages); // Add both messages at once
      setResponse(aiMessage);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-input-container">
        <form onSubmit={handleSubmit}>
          <textarea
            id="chat_input"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          ></textarea>
          <button id="chat_submit" type="submit" disabled={!prompt.trim()}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg>
          </button>
        </form>
      </div>
      
      <div className="chat-footer">
        <footer>
          AI can make mistakes. Please check my resume or contact me directly for important info.
        </footer>
      </div>

    </div>
  );
}
