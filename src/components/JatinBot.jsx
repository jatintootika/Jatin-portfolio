import { useState, useRef, useEffect } from 'react';
import './styles/JatinBot.css';
import { IconJLogo } from './Icons';

/* ── Knowledge base — written in first person, conversational, no emojis ── */
const KNOWLEDGE = {
  greeting: [
    "Hey, glad you stopped by. I'm Jatin — feel free to ask me anything.",
    "What's up! I'm Jatin. You can ask me about my background, or literally anything else. I try to be smart.",
    "Hey there. Ask me anything."
  ],
  about: [
    "I'm an AI and ML Engineer who builds intelligent systems. I focus on computer vision and predictive modeling."
  ],
  skills: [
    "Python, TensorFlow, PyTorch, React, OpenCV. I like to build end-to-end ML applications."
  ],
  projects: [
    "I built a Health AI platform, a Drone Simulator, and automation bots for WhatsApp and Instagram. Check the work section for more."
  ]
};

async function getResponse(input) {
  const msg = input.toLowerCase().trim();

  // 1. Check local knowledge base first
  if (/^(hi|hello|hey|sup|yo)/.test(msg)) return pick(KNOWLEDGE.greeting);
  if (/\b(who are you|about you|about yourself|about jatin|who is jatin)\b/.test(msg)) return pick(KNOWLEDGE.about);
  if (/\b(skill|tech|stack|tools|language)\b/.test(msg)) return pick(KNOWLEDGE.skills);
  if (/\b(project|build|work|portfolio)\b/.test(msg)) return pick(KNOWLEDGE.projects);
  
  // 2. Fetch from Wikipedia for general questions to seem super smart!
  try {
    // Extract keywords (very basic NLP simulation)
    const query = msg.replace(/what is|who is|tell me about|explain/gi, '').trim();
    if (!query) return "Hmm, could you be more specific? I can answer questions about the world, or about my portfolio.";

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Not found");
    
    const data = await res.json();
    if (data.extract) {
      return `Here's what I know about that: ${data.extract}`;
    }
  } catch (err) {
    // Fallback if wiki fails or query isn't a clear noun
  }

  // 3. Ultimate conversational fallback
  const fallbacks = [
    "That's an interesting question. I'm just a frontend AI mock, so my brain is a bit limited. Ask me about Python or my projects instead!",
    "I don't have that in my database right now. But if you want to talk about Machine Learning, I'm your guy.",
    "I'm still learning! Ask me something about Jatin's portfolio or a well-known topic and I might know the answer."
  ];
  return pick(fallbacks);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── Chat Component ── */
export default function JatinBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey, I'm Jatin. Ask me anything about my work or skills." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSend(e) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);

    // Simulate natural typing delay
    const delay = 600 + Math.random() * 800;
    setTimeout(async () => {
      const reply = await getResponse(trimmed);
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, delay);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`jbot-trigger ${isOpen ? 'jbot-trigger--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Jatin"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div className={`jbot-window ${isOpen ? 'jbot-window--open' : ''}`}>
        {/* Header */}
        <div className="jbot-header">
          <div className="jbot-header-info">
            <div className="jbot-avatar flex items-center justify-center relative">
              <IconJLogo size={20} className="text-white relative z-10" />
            </div>
            <div>
              <div className="jbot-header-name">Jatin</div>
              <div className="jbot-header-status">
                <span className="jbot-status-dot"></span>
                Online
              </div>
            </div>
          </div>
          <button className="jbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="jbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`jbot-msg jbot-msg--${msg.from}`}>
              <div className={`jbot-bubble jbot-bubble--${msg.from}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="jbot-msg jbot-msg--bot">
              <div className="jbot-bubble jbot-bubble--bot jbot-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        <div className="jbot-prompts">
          {['Who are you?', 'Your skills?', 'Projects?', 'Contact?'].map((q) => (
            <button
              key={q}
              className="jbot-prompt-btn"
              onClick={() => {
                setInput(q);
                setTimeout(() => {
                  setMessages((prev) => [...prev, { from: 'user', text: q }]);
                  setIsTyping(true);
                  const delay = 600 + Math.random() * 800;
                  setTimeout(async () => {
                    const reply = await getResponse(q);
                    setIsTyping(false);
                    setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
                  }, delay);
                  setInput('');
                }, 50);
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form className="jbot-input-bar" onSubmit={handleSend}>
          <input
            ref={inputRef}
            type="text"
            className="jbot-input"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="jbot-send" disabled={!input.trim()} aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
