'use client'

import Head from 'next/head';
import ChatComponent from '../../components/ChatComponent'; // Assuming you have ChatComponent in components directory

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50">
    <Head>
      <title>Chatbot Home</title>
      <meta name="description" content="Interactive AI Chatbot" />
    </Head>
  
    <header className="text-center mb-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to the AI Chatbot</h1>
      <p className="text-xl text-gray-600">Engage in a conversation with AI</p>
    </header>
  
    <main className="w-full max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
      <ChatComponent />
    </main>
  </div>
  );
}
