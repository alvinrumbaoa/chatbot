import { useState } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResponses([...responses, { userInput, aiResponse: data.aiResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
    }
  };

  
  return (
    <div className="p-6 max-w-xl mx-auto bg-blue shadow-lg rounded-lg">
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything..."
        className="flex-1 p-3 border  text-black border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-blue-500 text-black rounded-r-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </form>
    <div className="space-y-4">
      {responses.map((res, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="self-end bg-blue-100 text-blue-800 p-3 rounded-lg">
            <b>You:</b> {res.userInput}
          </div>
          <div className="self-start bg-gray-100 text-gray-800 p-3 rounded-lg">
            <b>AI:</b> {res.aiResponse}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ChatComponent;
