import React from 'react'
import '../styles/App.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Chatbox from '../components/Chat/Chatbox.jsx'
import Thread from '../components/Chat/Thread.jsx'
import {nanoid} from 'nanoid'
export default function App() {

  const about_me_thread_data = {
    "thread_id": 1,
    "title": "About Me",
    "messages":[
      { id: 1, text: 'Tommy Ho is a software engineer with over 5 years of experience in both large enterprise and startups. He also has over 2 years of experience of tech sales as he wore multiple hats while working at startups.'},
      { id: 2, text: 'He is particularly interested in blockchain and AI projects. Most notably, he is a founding member at both Nodies and Function Network. Nodies is a blockchain SaaS startup that sells nodes as a service and Function Network is a blockchain x AI SaaS startup that sells inference. '},
      { id: 3, text: 'He currently lives in Houston, TX but loves to travel both for leisure and work. When he is not working, he enjoys playing pickleball, powerlifting, and exploring parks with his dog.'}
    ]
  };

  const resume_thread_data = {
    "thread_id": 2,
    "title": "Resume",
    "messages":[
      { id: 1, text: "Tommy has a unique blend of both engineering and sales experience. This is a result of his time at startups where he wore multiple hats taking on the role of both Software Engineer and Technical Sales AE."},
      { id: 2, text: "He has been a Software Engineer since 2018, with expertise in application development and DevOps infrastructure. He has worked at large enterprises like AWS, where he contributed to CI/CD and host management, and CGI, where he helped modernize infrastructure for a key government product. At startups such as BaaS Pools LLC, he worked on blockchain wallet orchestration, and at Nodies, he assisted in onboarding 30+ blockchain networks, deploying nodes, and monitoring systems."},
      { id: 3, text: "Given his background in startups, he has also served as an all-in-one Sales Rep/Account Executive/Sales Engineer. At Nodies, he executed sales pipelines end to end and closed $11M ARR in the first two years of the company's inception."},
      { id: 4, text: "If you are interested in learning more about Tommy's experience, please send him a e-mail at TommyHoJobs@gmail.com"},
    ]
  }

  const website_info = {
    "thread_id": 3,
    "title": "Website Info",
    "messages":[
      { id: 1, text: "This website was created using React.js. There are plans to integrate a nodejs backend to allow visitors to chat with a conversational AI agent to represent Tommy, discuss meetings with him, and more."},
      { id: 2, text: "The website is a work in progress and will be updated regularly.. He is aware the CSS could better but he is likely bandiwdth constrained with his current job. The website is currently not mobile responsive and should be viewed on a laptop or PC."},
    ]
  }

  const all_thread_data = [about_me_thread_data,resume_thread_data,website_info]
  
  const [currentThreadId,setCurrentThreadId] = React.useState(1)
  function getThreadComponent(){
    const threadData = all_thread_data.find((threadData) => threadData.thread_id === currentThreadId)
    const title = threadData.title
    const threadMessages = threadData.messages
    return <Thread title = {title} messages={threadMessages}/>
  }
  function getThreadTitles(){
    return all_thread_data.map((threadData) => ({ "title": threadData.title, "id": threadData.thread_id }));
  }

  return <>
  <Navbar chatTitles={getThreadTitles()} setCurrentThreadId={setCurrentThreadId}/>
  {getThreadComponent()}
  <Chatbox/>
  </>
}

