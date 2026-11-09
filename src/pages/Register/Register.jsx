import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/common/Logo/Logo';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from '../../utils/validators';
import { useToast } from '../../components/common/Toast/Toast';
import styles from './Register.module.css';

/**
 * Registration page with comprehensive client validations and demo account creation
 */
export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!isValidUsername(username)) {
      setError('Username must be 3-20 alphanumeric characters or underscores.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!isValidPassword(password, 6)) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await register({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
      });
      showToast('Account registered successfully! Welcome to VYBE.', 'success');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoWrapper}>
          <Logo />
          <p className={styles.tagline}>
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeholder="e.g. Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefixIcon={<User size={18} />}
            required
          />

          <Input
            label="Username"
            placeholder="e.g. alexmorgan"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            prefixIcon={<AtSign size={18} />}
            required
          />

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
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefixIcon={<Lock size={18} />}
            suffixIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onSuffixClick={() => setShowPassword((prev) => !prev)}
            required
          />

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            prefixIcon={<Lock size={18} />}
            required
          />

          <Button type="submit" variant="primary" loading={submitting} fullWidth>
            Sign Up
          </Button>
        </form>
      </div>

      <div className={styles.bottomBox}>
        Have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </div>
    </div>
  );
}
