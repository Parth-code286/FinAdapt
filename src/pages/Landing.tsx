import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaShieldAlt, FaBolt } from 'react-icons/fa';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FaRobot,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and spending analysis powered by advanced AI',
    },
    {
      icon: FaChartLine,
      title: 'Smart Budgeting',
      description: 'Track your spending with automated budget tracking and real-time alerts',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored locally for maximum security',
    },
    {
      icon: FaBolt,
      title: 'Real-Time Updates',
      description: 'Instant synchronization across all your financial accounts',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            AI-Powered Finance
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">Adaptation</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your financial journey with intelligent insights, automated budgeting, and real-time
            transaction management. All powered by cutting-edge AI.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started →
          </motion.button>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-2xl p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Local Storage</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">AI-Powered</div>
              <div className="text-muted-foreground">Smart Insights</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Real-Time</div>
              <div className="text-muted-foreground">Sync & Updates</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
