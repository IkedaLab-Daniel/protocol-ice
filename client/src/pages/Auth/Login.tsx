import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username_email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username_email.trim()) {
      newErrors.username_email = 'Username or email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container page-container">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>
      <Card className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/protocol-ice.png" alt="Protocol Ice" />
          </div>
          <h1>Protocol Ice</h1>
          <p className="auth-subtitle">Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {apiError && <div className="error-banner">{apiError}</div>}

          <Input
            label="Username or Email"
            type="text"
            placeholder="Enter your username or email"
            value={formData.username_email}
            onChange={(e) =>
              setFormData({ ...formData, username_email: e.target.value })
            }
            error={errors.username_email}
            icon={<Mail size={16} />}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            icon={<Lock size={16} />}
            fullWidth
          />

          <Button type="submit" fullWidth loading={loading}>
            <LogIn size={18} />
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
        <div className="auth-learn-more">
          <Link to="/about" className="auth-link">
            Learn more about Protocol Ice
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;