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
        { id: 1, text: 'Give me a overview of Tommy. Tell me who he is.', isAI: false},
        { id: 2, text: 'Tommy is a software engineer and technical account executive with 6 years of experience. He is particularly passionate about blockchain and AI', isAI: true },
        { id: 3, text: 'He currently lives in Houston, TX. Some of his hobbies include powerlifting, pickleball, cafe-hopping, and traveling.', isAI: true }
      ]
    },
    2: {
      title: "Resume",
      messages: [
        { id: 1, text: 'Can you highlight his resume?', isAI: false},
        { id: 2, text: "Tommy has a unique blend of both engineering and sales experience. This is a result of working in both enterprise and startups where he had to wear multiple. Most notably he has engineering experience at companies such as AWS,CGI, and Nodies.app since 2018. Additionally, he has direct sales experience since 2023 as a Technical Account Executive at Nodies.app and Function.network.", isAI: true },
        { id: 3, text: 'Where can I view his full resume?', isAI: false},
        { id: 4, text: 'Get in contact with him at TommyHoJobs@gmail.com', isAI: true},
      ]
    },
    3: {
      title: "Website Info",
      messages: [
        { id: 1, text: "What tech stack is this website using?", isAI: false},
        { id: 2, text: "This website was developed by Tommy/Dachi using React.js and is running Meta's Llama Model. It is a WIP and is not currently responsive.", isAI: true },
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