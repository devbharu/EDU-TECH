import { useState, useEffect, useRef } from 'react';
import { Send, Loader, X, Mic } from 'lucide-react';

const AIChatBox = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = {
      sender: 'user',
      content: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });
      
      const data = await response.json();
      
      const aiMessage = {
        sender: 'ai',
        content: data.response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error communicating with AI:', error);
      const errorMessage = {
        sender: 'ai',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopSpeechRecognition = () => {
    setIsListening(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className={`flex flex-col h-full bg-gray-50 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between bg-indigo-700 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">AI Learning Assistant</h2>
        <button 
          onClick={clearChat}
          className="text-white hover:text-red-200 transition-colors"
          aria-label="Clear chat"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center">
              Ask me anything about your studies! I can explain concepts, create study plans, or quiz you on topics.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-3/4 p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : msg.isError
                    ? 'bg-red-100 text-red-800'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a concept or for help..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2 rounded-full ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:opacity-80`}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <Mic size={20} />
          </button>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBox;