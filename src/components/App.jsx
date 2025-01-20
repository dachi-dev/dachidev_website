import React, { useState } from 'react'
import '../styles/App.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Chatbox from '../components/Chat/Chatbox.jsx'
import Thread from '../components/Chat/Thread.jsx'
import { Helmet } from 'react-helmet'

const App = () => {
  const [currentThreadId, setCurrentThreadId] = useState(1);

  // Initial thread data with messages
  const [threads, setThreads] = useState({
    1: {
      title: "About Me",
      messages: [
        { id: 1, text: 'He is passionate about blockchain and AI...', isAI: true },
        { id: 2, text: 'He currently lives in Houston, TX...', isAI: true }
      ]
    },
    2: {
      title: "Resume",
      messages: [
        { id: 1, text: "Tommy has a unique blend of both engineering and sales experience...", isAI: true },
        { id: 2, text: "He has been a Software Engineer since 2018...", isAI: true }
      ]
    },
    3: {
      title: "Website Info",
      messages: [
        { id: 1, text: "This website was created using React.js...", isAI: true },
        { id: 2, text: "The website is a work in progress...", isAI: true }
      ]
    }
  });


  const getThreadComponent = () => {
    const thread = threads[currentThreadId];
    return <Thread title={thread.title} messages={thread.messages} />;
  };

  const getThreadTitles = () => {
    return Object.keys(threads).map((threadId) => {
      const thread = threads[threadId]; // Get the thread by the key
      return {
        title: thread.title,
        id: threadId // Use the key (which is the ID) as the id
      };
    });
  };

  const updateThreadMessages = (threadId, newMessages) => {
    setThreads((prevThreads) => {
      const updatedThreads = { ...prevThreads };
  
      // Ensure newMessages is always an array
      const messagesToAdd = Array.isArray(newMessages) ? newMessages : [newMessages];
  
      // Push each message (or array of messages) to the thread
      updatedThreads[threadId].messages.push(...messagesToAdd);
  
      return updatedThreads;
    });
  };
  


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tommy Ho</title>
      </Helmet>
      <Navbar chatTitles={getThreadTitles()} setCurrentThreadId={setCurrentThreadId} />
      {getThreadComponent()}
      <Chatbox currentThreadId={currentThreadId} updateThreadMessages={updateThreadMessages} />
    </>
  );
}

export default App;