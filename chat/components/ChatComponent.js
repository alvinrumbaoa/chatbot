import axios from 'axios';
import { useState } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/chat', { userInput });
      setResponses([...responses, { userInput, aiResponse: response.data.aiResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Send
        </button>
      </form>
      <div className="mt-4">
        {responses.map((res, index) => (
          <div key={index} className="chat-message">
            <p className="user-input"><b>You:</b> {res.userInput}</p>
            <p className="ai-response"><b>AI:</b> {res.aiResponse}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
