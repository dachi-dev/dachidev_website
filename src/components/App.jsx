import React from 'react'
import '../styles/App.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Chatbox from '../components/Chat/Chatbox.jsx'
import Thread from '../components/Chat/Thread.jsx'
import { Helmet } from 'react-helmet' // Don't forget to import Helmet

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentThreadId: 1
    };

    // Defining the data inside the constructor
    this.about_me_thread_data = {
      "thread_id": 1,
      "title": "About Me",
      "messages": [
        { id: 1, text: 'He is passionate about blockchain and AI, and is a founding member of Nodies, a blockchain SaaS startup offering nodes as a service, and Function Network, a blockchain and AI SaaS startup focused on inference.' },
        { id: 2, text: 'He currently lives in Houston, TX but loves to travel both for leisure and work. When he is not working, he enjoys playing pickleball, powerlifting, and exploring parks with his dog.' }
      ]
    };

    this.resume_thread_data = {
      "thread_id": 2,
      "title": "Resume",
      "messages": [
        { id: 1, text: "Tommy has a unique blend of both engineering and sales experience. This is a result of his time at startups where he wore multiple hats taking on the role of both Software Engineer and Technical Sales AE." },
        { id: 2, text: "He has been a Software Engineer since 2018, with expertise in application development and DevOps infrastructure. He has worked at large enterprises like AWS, where he contributed to CI/CD and host management, and CGI, where he helped modernize infrastructure for a key government product. At startups such as BaaS Pools LLC, he worked on blockchain wallet orchestration, and at Nodies, he assisted in onboarding 30+ blockchain networks, deploying nodes, and monitoring systems." },
        { id: 3, text: "Given his background in startups, he has also served as an all-in-one Sales Rep/Account Executive/Sales Engineer. At Nodies, he executed sales pipelines end to end and closed $11M ARR in the first two years of the company's inception." },
        { id: 4, text: "If you are interested in learning more about Tommy's experience, please send him a e-mail at TommyHoJobs@gmail.com" }
      ]
    };

    this.website_info = {
      "thread_id": 3,
      "title": "Website Info",
      "messages": [
        { id: 1, text: "This website was created using React.js. There are plans to integrate a nodejs backend to allow visitors to chat with a conversational AI agent to represent Tommy, discuss meetings with him, and more." },
        { id: 2, text: "The website is a work in progress and will be updated regularly.. He is aware the CSS could better but he is likely bandwidth constrained with his current job. The website is currently not mobile responsive and should be viewed on a laptop or PC." }
      ]
    };

    this.all_thread_data = [this.about_me_thread_data, this.resume_thread_data, this.website_info];
  }

  getThreadComponent() {
    const threadData = this.all_thread_data.find((threadData) => threadData.thread_id === this.state.currentThreadId);
    const title = threadData.title;
    const threadMessages = threadData.messages;
    return <Thread title={title} messages={threadMessages} />;
  }

  getThreadTitles() {
    return this.all_thread_data.map((threadData) => ({ "title": threadData.title, "id": threadData.thread_id }));
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tommy Ho</title>
        </Helmet>
        <Navbar chatTitles={this.getThreadTitles()} setCurrentThreadId={(id) => this.setState({ currentThreadId: id })} />
        {this.getThreadComponent()}
        <Chatbox />
      </>
    );
  }
}
