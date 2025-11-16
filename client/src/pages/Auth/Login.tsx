import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, type FormEvent } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username_email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username_email.trim()) {
      newErrors.username_email = "Username or Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(error.message || 'Login Failed');
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
          {apiError && <div className="error-banner">{apiError}</div>}

          <Input
            label="Username or Email"
            type="text"
            placeholder="Enter your username or email"
            value={formData.username_email}
            onChange={(e) => 
                setFormData({...formData, username_email: e.target.value})
            }
            fullWidth
            error={errors.username_email}
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
            fullWidth
          />

          <Button type="submit" fullWidth loading={loading}>
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to='/register' className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>

      </Card>
    </div>
  )
}

export default Login;