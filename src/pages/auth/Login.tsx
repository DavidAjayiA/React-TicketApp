import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { session } from '../../utils/session';
import { toast } from 'react-toastify';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: any) {
    try {
      if (!data.email || !data.password) {
        toast.error('Email and password are required');
        return;
      }

      await session.login(data.email, data.password);
      toast.success('Logged in successfully');
      nav('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Invalid email or password');
    }
  }

  return (
    <div style={{
      maxWidth: 600,
      margin: '40px auto',
      padding: 24,
      background: 'white',
      borderRadius: 12,
      boxShadow: '0 6px 24px rgba(2,6,23,0.06)',
      position: 'relative'
    }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Input */}
        <div style={{ marginBottom: 12 }}>
          <label>Email
            <input
              {...register('email', { required: true })}
              type='email'
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </label>
          {errors.email && <div style={{ color: '#b91c1c' }}>Email required</div>}
        </div>

        {/* Password Input with Eye Toggle */}
        <div style={{ marginBottom: 12, position: 'relative' }}>
          <label>Password
            <input
              {...register('password', { required: true })}
              type={showPassword ? 'text' : 'password'}
              style={{ width: '100%', padding: 8, marginTop: 4, paddingRight: 30 }}
            />
          </label>

          {/* 👁 Toggle Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 10,
              top: '65%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#555',
              fontSize: 16,
              userSelect: 'none'
            }}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁'}
          </span>

          {errors.password && <div style={{ color: '#b91c1c' }}>Password required</div>}
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 12 }}>
          <button type='submit' style={{ cursor: 'pointer' }}>Login</button>
          <a href="/auth/signup" style={{ marginLeft: 12, textDecoration:"none" }}>Create Account</a>
        </div>
      </form>
    </div>
  );
}
