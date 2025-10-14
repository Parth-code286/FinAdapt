import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaEdit, FaTrash, FaPlus, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaBullseye } from 'react-icons/fa';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ToastContainer, ToastMessage } from '@/components/Toast'; // Assuming you have a Toast component

// --- Interfaces & Dummy Data ---
interface Goal {
  id: string;
  text: string;
}

interface AnalysisResult {
  personality: string;
  description: string;
  chartData: { trait: string; score: number }[];
  insights: { title: string; text: string; icon: React.ElementType }[];
}

const dummyPersonalities: { [key: string]: AnalysisResult } = {
  planner: {
    personality: 'The Strategic Planner',
    description: 'You are disciplined and forward-thinking. You prefer security and long-term gains over short-term gratification, meticulously planning each financial move.',
    chartData: [
      { trait: 'Future Focus', score: 90 },
      { trait: 'Risk Tolerance', score: 40 },
      { trait: 'Impulse Control', score: 85 },
      { trait: 'Financial Literacy', score: 75 },
      { trait: 'Goal Discipline', score: 95 },
    ],
    insights: [
      { title: 'Strength', text: 'Your strong discipline in saving is your greatest asset.', icon: FaCheckCircle },
      { title: 'Opportunity', text: 'Consider exploring low-risk, diversified investments to make your savings work harder for you.', icon: FaLightbulb },
      { title: 'Watch Out For', text: 'Being too risk-averse might cause you to miss out on potential long-term growth.', icon: FaExclamationTriangle },
    ],
  },
  spender: {
    personality: 'The Spontaneous Spender',
    description: 'You are present-focused and value experiences. You tend to make purchasing decisions based on emotion, which can be both joyful and financially challenging.',
    chartData: [
      { trait: 'Future Focus', score: 30 },
      { trait: 'Risk Tolerance', score: 70 },
      { trait: 'Impulse Control', score: 25 },
      { trait: 'Financial Literacy', score: 50 },
      { trait: 'Goal Discipline', score: 40 },
    ],
    insights: [
      { title: 'Strength', text: 'You know how to enjoy the present moment, which is a valuable life skill.', icon: FaCheckCircle },
      { title: 'Opportunity', text: 'Try implementing a "24-hour rule" for non-essential purchases to improve impulse control.', icon: FaLightbulb },
      { title: 'Watch Out For', text: 'Emotional spending can derail long-term goals. Setting clear budgets is crucial.', icon: FaExclamationTriangle },
    ],
  },
};


// --- The Main Component ---
export default function BehavioralAnalysis() {
  const [answers, setAnswers] = useState({ q1: '', q2: 50, q3: '' });
  const [goals, setGoals] = useState<Goal[]>([{ id: '1', text: 'Save for a down payment' }]);
  const [newGoalText, setNewGoalText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastMessage['type']) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    if (editingId) {
      // Update logic
      setGoals(goals.map((goal) => (goal.id === editingId ? { ...goal, text: newGoalText } : goal)));
      addToast('Goal updated successfully!', 'success');
      setEditingId(null);
    } else {
      // Create logic
      const newGoal = { id: Date.now().toString(), text: newGoalText };
      setGoals([...goals, newGoal]);
      addToast('Goal added!', 'success');
    }
    setNewGoalText('');
  };

  const handleEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setNewGoalText(goal.text);
  };
  
  const handleDelete = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    addToast('Goal removed.', 'info');
  };

  const handleAnalyze = () => {
    if (!answers.q1 || !answers.q3) {
      addToast('Please answer all survey questions.', 'error');
      return;
    }
    setIsLoading(true);
    // Simulate a complex API call and analysis
    setTimeout(() => {
      // Dummy logic to pick a personality
      const resultKey = answers.q1 === 'guilt' ? 'spender' : 'planner';
      setAnalysisResult(dummyPersonalities[resultKey]);
      setIsLoading(false);
    }, 2500); // 2.5 second loading time
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <FaBrain className="text-6xl text-primary mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mt-4">Analyzing your financial DNA...</h2>
        <p className="text-muted-foreground">This will just take a moment.</p>
      </div>
    );
  }

  if (analysisResult) {
    return (
      <div className="p-6 space-y-6 ml-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => setAnalysisResult(null)} className="text-sm text-primary hover:underline mb-4 ml-12">&larr; Retake Analysis</button>
          <h2 className="text-2xl font-bold text-foreground ml-12">Your Financial Personality</h2>
          <p className="text-primary font-semibold text-lg ml-12">{analysisResult.personality}</p>
          <p className="text-muted-foreground mt-2 max-w-2xl ml-12">{analysisResult.description}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Psychological Traits</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysisResult.chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="trait" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Radar name="Your Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border rounded-xl p-6">
                 <h3 className="font-semibold text-foreground mb-4">Actionable Insights</h3>
                 <div className="space-y-4">
                     {analysisResult.insights.map((item, i) => (
                         <div key={i} className="flex items-start gap-4">
                             <div className="mt-1"><item.icon className="text-xl text-primary" /></div>
                             <div>
                                <h4 className="font-semibold text-foreground">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.text}</p>
                             </div>
                         </div>
                     ))}
                 </div>
            </motion.div>
        </div>
      </div>
    );
  }

    function removeToast(id: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="p-6 space-y-8">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {/* --- Part 1: Questionnaire --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Step 1: Understand Your Habits</h2>
        <p className="text-sm text-muted-foreground mb-6">Answer a few questions to help us understand your financial behavior.</p>
        
        {/* Question 1 */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">After making a large, unplanned purchase, you most often feel:</label>
            <div className="flex gap-4">
                {['Excited', 'Satisfied', 'Anxious', 'Guilty'].map(option => (
                    <button key={option} onClick={() => setAnswers(prev => ({...prev, q1: option.toLowerCase()}))} className={`px-4 py-2 rounded-lg text-sm transition-all ${answers.q1 === option.toLowerCase() ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-background ring-primary' : 'bg-secondary hover:bg-secondary/80'}`}>
                        {option}
                    </button>
                ))}
            </div>
        </div>

        {/* Question 2 */}
        <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">How would you rate your investment risk tolerance? (0 = Very Cautious, 100 = Very Aggressive)</label>
            <input type="range" min="0" max="100" value={answers.q2} onChange={e => setAnswers(prev => ({...prev, q2: parseInt(e.target.value)}))} className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" />
            <p className="text-center font-bold text-primary mt-2">{answers.q2}</p>
        </div>

        {/* Question 3 */}
         <div>
            <label className="block text-sm font-semibold text-foreground mb-2">What is your primary motivation for saving money?</label>
            <div className="flex gap-4">
                {['Emergencies', 'Big Purchases (Car, House)', 'Retirement', 'Travel/Leisure'].map(option => (
                    <button key={option} onClick={() => setAnswers(prev => ({...prev, q3: option.toLowerCase()}))} className={`px-4 py-2 rounded-lg text-sm transition-all ${answers.q3 === option.toLowerCase() ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-background ring-primary' : 'bg-secondary hover:bg-secondary/80'}`}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
      </motion.div>

      {/* --- Part 2: Financial Goals (CRUD) --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.1}} className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Step 2: Define Your Goals</h2>
        <p className="text-sm text-muted-foreground mb-6">List your key financial goals. This helps in personalizing your plan.</p>
        
        <form onSubmit={handleGoalSubmit} className="flex gap-4 mb-4">
            <input type="text" value={newGoalText} onChange={e => setNewGoalText(e.target.value)} placeholder="e.g., Build an emergency fund" className="flex-grow px-4 py-2 bg-secondary border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {editingId ? 'Update' : <FaPlus />} {editingId ? 'Goal' : 'Add'}
            </button>
        </form>

        <div className="space-y-3">
            {goals.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <p className="text-foreground flex items-center gap-2"><FaBullseye className="text-primary"/> {goal.text}</p>
                    <div className="flex gap-3">
                        <button onClick={() => handleEdit(goal)} className="text-muted-foreground hover:text-primary"><FaEdit /></button>
                        <button onClick={() => handleDelete(goal.id)} className="text-muted-foreground hover:text-destructive"><FaTrash /></button>
                    </div>
                </div>
            ))}
        </div>
      </motion.div>

      {/* --- Part 3: Submission --- */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2}} className="flex justify-center">
        <button onClick={handleAnalyze} className="text-lg font-bold px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Analyze My Behavior
        </button>
      </motion.div>
    </div>
  );
}