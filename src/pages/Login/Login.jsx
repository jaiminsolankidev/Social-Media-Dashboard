import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../components/common/Logo/Logo';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail } from '../../utils/validators';
import { useToast } from '../../components/common/Toast/Toast';
import styles from './Login.module.css';

/**
 * Demonstration Login page with credential inputs and quick demo session pickers
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      showToast('Logged in successfully!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo-password');
    setSubmitting(true);
    setError('');
    try {
      await login(demoEmail, 'demo-password');
      showToast('Welcome to VYBE demo!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Quick login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefixIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefixIcon={<Lock size={18} />}
            suffixIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onSuffixClick={() => setShowPassword((prev) => !prev)}
            required
          />

          <Button type="submit" variant="primary" loading={submitting} fullWidth>
            Log In
          </Button>
        </form>

        <div className={styles.divider}>OR QUICK DEMO LOGIN</div>

        <div className={styles.demoUsersSection}>
          <span className={styles.demoLabel}>Instant Demo Accounts:</span>
          <div className={styles.demoButtons}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleQuickDemoLogin('alex@example.com')}
            >
              Alex (Photographer)
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleQuickDemoLogin('maya@example.com')}
            >
              Maya (Designer)
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleQuickDemoLogin('marcus@example.com')}
            >
              Marcus (Dev)
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBox}>
        Don&apos;t have an account?{' '}
        <Link to="/register" className={styles.link}>
          Sign up
        </Link>
      </div>

      <p className={styles.demoDisclaimer}>
        Note: This is an educational demonstration authentication system using mock REST data. Passwords are for demonstration only.
      </p>
    </div>
  );
}
