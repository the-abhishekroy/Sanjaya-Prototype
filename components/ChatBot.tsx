"use client";
import "regenerator-runtime/runtime";
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { GradientBackground } from "./ui/gradient-background";

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI("AIzaSyCPz6mnZ3IxUtVTwpAKFqL8J9P107o7PwA");

// Create chat model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Create chat instance
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts:
        "You are Sanjaya, a farming AI assistant. You only answer questions related to farming, agriculture, and crops. Keep responses focused and practical.",
    },
    {
      role: "model",
      parts:
        "I understand. I am Sanjaya, your farming assistant. I will focus only on providing helpful information about farming, agriculture, and crops. How can I assist you today?",
    },
  ],
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
  },
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  onTalkingStateChange: (talking: boolean) => void;
}

const formatResponse = (text: string) => {
  text = text.replace(
    /^#\s+(.*)$/gm,
    '<h3 class="text-lg font-medium text-blue-400 mt-4">$1</h3>'
  );
  text = text.replace(
    /^\d+\.\s+(.*)$/gm,
    '<div class="mt-3"><strong>$1</strong></div>'
  );
  text = text.replace(/^\*\s+(.*)$/gm, '<div class="ml-4 mt-2">• $1</div>');
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text
    .split("\n\n")
    .map((paragraph) => {
      if (paragraph.trim().startsWith("<")) return paragraph;
      return `<p class="mt-3">${paragraph}</p>`;
    })
    .join("");
  return text;
};

const MessageBubble = motion.div;

export default function ChatBot({ onTalkingStateChange }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Sanjaya, your Farming AI assistant. Ask me anything about farming!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Update input with transcript
  useEffect(() => {
    if (transcript) {
      console.log("Transcript updated:", transcript);
      setInput(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  const toggleListening = () => {
    if (listening) {
      console.log("Stopping listening");
      SpeechRecognition.stopListening();
      // Keep the transcript in the input box when stopping
    } else {
      console.log("Starting listening");
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
        interimResults: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // If still listening while submitting, stop listening
    if (listening) {
      SpeechRecognition.stopListening();
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    onTalkingStateChange(true);

    try {
      const result = await chat.sendMessage(userMessage);
      const assistantMessage = formatResponse(result.response.text());

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      onTalkingStateChange(false);
      resetTranscript(); // Reset speech input after sending
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <GradientBackground />

      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-gray-400 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-hidden"
      >
        {/* Messages Scroll Area */}
        <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Messages */}
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-xl
                                  ${
                                    message.role === "user"
                                      ? "bg-indigo-500/20 text-indigo-400"
                                      : "bg-emerald-500/20 text-emerald-400"
                                  } 
                                  flex items-center justify-center`}
                    >
                      {message.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 shadow-lg
                        ${
                          message.role === "user"
                            ? "bg-indigo-500/10 text-white border border-indigo-500/20"
                            : "bg-gray-800/80 text-white border border-gray-700/50"
                        }`}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                </MessageBubble>
              ))}
            </AnimatePresence>

            {/* Loading State */}
            <AnimatePresence>
              {isLoading && (
                <MessageBubble
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 
                                flex items-center justify-center"
                    >
                      <Bot size={16} />
                    </div>
                    <div
                      className="bg-gray-800/80 text-white rounded-2xl px-4 py-2.5 
                                border border-gray-700/50 shadow-lg"
                    >
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                </MessageBubble>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Input Form */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none h-12 -top-12" />
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm p-4"
        >
          <div className="max-w-4xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-xl border border-gray-700/50 bg-gray-800/50 
                         text-white px-4 py-3 pr-24 focus:outline-none focus:ring-2 
                         focus:ring-indigo-500/50 placeholder-gray-400
                         transition-all duration-200"
                placeholder={
                  listening ? "Listening..." : "Ask about farming..."
                }
              />
              {listening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 
                           rounded-md bg-green-500/10 text-green-400 text-xs font-medium"
                >
                  Recording...
                </motion.div>
              )}
            </div>

            {/* Voice Button */}
            <motion.button
              type="button"
              onClick={toggleListening}
              disabled={isLoading || !isMicrophoneAvailable}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl p-3 text-white transition-colors duration-200
                       ${
                         listening
                           ? "bg-red-500 hover:bg-red-600"
                           : "bg-green-500 hover:bg-green-600"
                       } 
                       disabled:opacity-50`}
            >
              {listening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </motion.button>

            {/* Send Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-indigo-500 p-3 text-white hover:bg-indigo-600 
                       disabled:opacity-50 transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </form>
      </div>

      {/* Help Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-20 right-4 w-80 p-4 rounded-xl 
                      bg-gray-900/90 backdrop-blur-sm border border-gray-800
                      shadow-xl shadow-black/20"
          >
            <h3 className="text-lg font-medium text-indigo-400 mb-2">
              How to use Sanjaya AI
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Ask questions about farming techniques</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Get crop disease solutions</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Learn about sustainable practices</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
