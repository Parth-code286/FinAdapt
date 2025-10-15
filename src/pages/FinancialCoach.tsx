import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaPaperPlane, FaMicrophone } from 'react-icons/fa';

// --- Interfaces & Dummy Data ---
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'coach';
}

// The predefined set of questions and answers
const knowledgeBase: { [key: string]: string } = {
  'How can I start saving money?': `That's the best first question to ask! The most effective method is to "Pay Yourself First."
  
  Before you pay any bills or buy anything else, transfer a set amount to your savings. Think of it as the most important bill you have to pay each month. Even starting with ₹1,000 can build a powerful habit.`,

  'What is a good budget to follow?': `A great starting point is the 50/30/20 rule. It's a simple framework:
  
  * **50% for Needs:** This covers your essentials like rent, utilities, and groceries.
  * **30% for Wants:** This is for lifestyle choices like dining out, hobbies, and entertainment.
  * **20% for Savings & Debt:** This is the portion you use to build your future wealth and pay off any outstanding debt.
  
  Remember, it's a flexible guide, not a strict rule. Adjust the percentages to fit your life!`,

  'How do I track my daily expenses effectively?': `The key is to find a method that's easy for you to stick with. Start small!
  
  For one week, try to track just *one* category, like "Food & Groceries." Write down every single purchase in that category. This small exercise will give you incredible insight without feeling overwhelming.`,
  
  'How can I stop impulse spending online?': `This is a common challenge! Here are three powerful tricks:
  
  1.  **The 24-Hour Rule:** If you see something you want, add it to your cart but wait 24 hours before buying. The urge often fades.
  2.  **Unsubscribe:** Unsubscribe from tempting marketing emails and unfollow brands that trigger your spending.
  3.  **Identify the Trigger:** When you feel the urge to buy, ask yourself: "Am I bored, stressed, or happy?" Recognizing the emotion is the first step to controlling the action.`,
  
  'What is an emergency fund and why do I need one?': `Think of an emergency fund as your personal financial fire extinguisher. It's a stash of money (ideally 3-6 months of living expenses) saved for unexpected emergencies only, like a medical issue or sudden job loss.
  
  It's what keeps a small problem from turning into a big, stressful debt.`,

  'What is the difference between saving and investing?': `A simple way to think about it is that **saving** is for short-term, specific goals (like a vacation) and is stored in a safe, accessible place.
  
  **Investing** is for long-term wealth growth (like retirement). You buy assets that you expect to grow in value, which involves taking on some risk for the potential of higher returns.`,

  'How can I start investing with a small amount of money?': `You can start with as little as ₹500! The best way for beginners is through a **Systematic Investment Plan (SIP)** in a diversified **Index Fund**.
  
  An Index Fund holds a small piece of many of the largest companies, so you're not putting all your eggs in one basket. It's a proven, low-cost way to build wealth over time.`,

  'What is "compounding" and how does it work?': `Compounding is the most powerful force in finance! It's when your investment earnings start earning their *own* earnings.
  
  Imagine your money making babies, and then those babies grow up to have their own babies. This snowball effect is what creates massive wealth over the long term. The earlier you start, the more powerful it is.`,

  'Should I pay off debt or invest my extra money?': `This is a crucial question. Most experts agree on this priority:
  
  1.  **Pay off high-interest debt FIRST.** Anything over 8-10% (like credit card debt) is a financial emergency. Paying it off is a *guaranteed* return on your money equal to the interest rate.
  2.  **Once that's gone,** you can start investing while paying off lower-interest debt (like a home loan).`,
  
  'How do I improve my credit score?': `Your credit score is built on two main pillars:
  
  * **On-Time Payments:** Always pay at least the minimum amount due on time, every single month. This is the single most important factor.
  * **Low Credit Utilization:** Try to use less than 30% of your total credit card limit. For example, if your limit is ₹1,00,000, keep your balance below ₹30,000.`,

  'I feel anxious about my finances. Where do I start?': `Feeling anxious is completely normal, and taking the first step is the best cure. Don't try to do everything at once.
  
  Just focus on **one small, achievable thing**: for the next 7 days, simply write down what you spend each day. That's it. This single act of tracking will give you a sense of knowledge and control, which is the foundation of confidence.`,
  
  'What is a "sinking fund"?': `A sinking fund is a brilliant financial trick! It's a mini-savings account for a specific, planned, non-emergency expense in the future.
  
  For example, you know you'll need new tires for your car in a year (costing ₹12,000). You would "sink" ₹1,000 into this fund every month. When the time comes, the purchase is completely stress-free because the money is already there!`,
};

// --- The Main Component ---
export default function FinancialCoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'coach', text: "Hello! I'm Fin, your personal financial coach. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isTyping) return;

    const userQuestion = inputValue.trim();

    const newUserMessage: Message = {
      id: Date.now(),
      text: userQuestion,
      sender: 'user',
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate coach looking up the answer and typing
    setTimeout(() => {
      // Find a matching question in the knowledge base, ignoring case and extra whitespace
      const matchedQuestion = Object.keys(knowledgeBase)
        .find(q => q.toLowerCase().trim() === userQuestion.toLowerCase().trim());
      
      const coachResponseText = matchedQuestion 
        ? knowledgeBase[matchedQuestion] 
        : "I'm sorry, I'm not trained on that question yet. Please try asking something else from my knowledge base.";

      const coachResponse: Message = {
        id: Date.now() + 1,
        text: coachResponseText,
        sender: 'coach',
      };
      setMessages(prev => [...prev, coachResponse]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <motion.div
        key="chat"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 8rem)' }}
      >
        {/* Chat Header */}
        <div className="flex items-center p-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
            <FaBrain className="text-xl text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Fin - Your AI Coach</h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-foreground rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-secondary text-foreground rounded-bl-none flex items-center gap-1.5">
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* --- INPUT AREA --- */}
        <div className="p-4 border-t border-border bg-background">
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question here..."
              className="flex-grow px-4 py-3 bg-secondary border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isTyping}
            />
            <button
              type="button"
              className="w-12 h-12 bg-secondary text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 hover:bg-secondary/80 transition-colors"
            >
              <FaMicrophone />
            </button>
            <button
              type="submit"
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-colors disabled:bg-muted disabled:cursor-not-allowed"
              disabled={!inputValue.trim() || isTyping}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}