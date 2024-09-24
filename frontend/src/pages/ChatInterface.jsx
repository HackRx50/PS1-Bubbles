import React, { useState } from 'react';
import { Mic, Upload } from 'lucide-react';

const ChatInterface = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setChatMessages([{ text: `File "${uploadedFile.name}" uploaded successfully. How can I help you with this invoice?`, sender: 'ai' }]);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      // Add the user's message to the chat
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');
  
      try {
        // Send the user's message to the backend
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Add the AI's response to the chat
          setChatMessages(prev => [...prev, { text: data.response, sender: 'ai' }]);
        } else {
          // Handle error from the server
          setChatMessages(prev => [...prev, { text: 'Error: Failed to get response from server', sender: 'ai' }]);
        }
      } catch (error) {
        setChatMessages(prev => [...prev, { text: 'Error: Network issue', sender: 'ai' }]);
      }
    }
  };
  

  return (
    <div className="flex flex-col h-[85vh] bg-gray-100"> {/* Adjusted height */}
    
      {!file ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h2 className="text-2xl font-bold mb-4">Upload Your Invoice</h2>
          <p className="text-gray-600 mb-4">Simply upload your invoice image, and we'll process it for you.</p>
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
            <Upload className="w-8 h-8" />
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input type='file' className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          {/* Chat messages section */}
          <div className="flex-grow overflow-auto p-4">
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input section */}
          <div className="bg-white p-4 border-t flex-shrink-0">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
              <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Mic size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
