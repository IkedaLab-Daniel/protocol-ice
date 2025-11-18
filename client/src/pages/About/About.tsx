import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Tag, BarChart3, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import protocol_ice from '../../assets/protocol-ice.png';
import atomic_habit from '../../assets/atomic-habits.png'
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="about-container page-container">
      <div className="about-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="about-content">
        <div className="about-header">
          <div className="about-logo">
            <img src={protocol_ice} alt="Protocol Ice" />
          </div>
          <h1>About Protocol Ice</h1>
          <p className="about-tagline">Every action is a vote for the person you want to become</p>
        </div>

        <Card className="about-card">
          <div className="about-section">
            <div className="section-icon">
              <img src={atomic_habit} alt="Atomic Habits Books" />
            </div>
            <h2>Inspired by Atomic Habits</h2>
            <p>
              Protocol Ice is based on the powerful concept from James Clear's bestselling book{' '}
              <strong>Atomic Habits</strong>. The core idea is simple yet profound: every action you 
              take is a vote for the type of person you wish to become.
            </p>
            <p>
              With each repetition, you reinforce your identity. Vote for yourself as someone who 
              exercises, who reads, who stays organized—and gradually, those votes add up to real change.
            </p>
          </div>
        </Card>

        <Card className="about-card">
          <div className="about-section">
            <h2>How It Works</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon feature-icon-positive">
                  <TrendingUp size={28} />
                </div>
                <h3>Track Good Habits</h3>
                <p>
                  Click the <strong>Positive</strong> button when you complete a good habit. 
                  Each click is a vote for your better self.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon feature-icon-negative">
                  <TrendingDown size={28} />
                </div>
                <h3>Acknowledge Setbacks</h3>
                <p>
                  Click the <strong>Negative</strong> button when you slip into a bad habit. 
                  Awareness is the first step to change.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon feature-icon-label">
                  <Tag size={28} />
                </div>
                <h3>Add Labels</h3>
                <p>
                  Optionally categorize your actions with custom labels like "Exercise", 
                  "Reading", or "Gaming" to track patterns.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon feature-icon-stats">
                  <BarChart3 size={28} />
                </div>
                <h3>View Your Progress</h3>
                <p>
                  Analyze your voting patterns with detailed statistics and visualizations 
                  to see your identity transformation.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="about-card about-cta">
          <div className="about-section">
            <h2>Start Voting for Your Future Self</h2>
            <p>
              Every habit is a vote. The more you vote, the stronger your identity becomes. 
              Start tracking your actions today and watch as small votes compound into remarkable results.
            </p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Button onClick={() => navigate('/dashboard')}>
                  <Home size={18} />
                  Back to Dashboard
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        <div className="about-quote">
          <blockquote>
            "Every action you take is a vote for the type of person you wish to become. 
            No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity."
          </blockquote>
          <cite>— James Clear, Atomic Habits</cite>
        </div>
      </div>
    </div>
  );
};

export default About;
