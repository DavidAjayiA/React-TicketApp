import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { session } from '../../utils/session';
import { toast } from 'react-toastify';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: any) {
    try {
      if (!data.email || !data.password) {
        toast.error('Email and password are required');
        return;
      }

      // call signup logic
      await session.signup(data.email, data.password);
      toast.success('Account created and logged in');
      nav('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account');
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
      <h2>Signup</h2>

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
              {...register('password', { required: true, minLength: 6 })}
              type={showPassword ? 'text' : 'password'}
              style={{ width: '100%', padding: 8, marginTop: 4, paddingRight: 30 }}
            />
          </label>

          {/* 👁 / 🙈 Toggle */}
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

          {errors.password && (
            <div style={{ color: '#b91c1c' }}>
              Password required (min 6 characters)
            </div>
          )}
        </div>

        {/* Submit + Redirect */}
        <div style={{ marginTop: 12 }}>
          <button type='submit' style={{ cursor: 'pointer' }}>Create account</button>
          <Link to="/auth/login" style={{ marginLeft: 12, textDecoration:"none" }}>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}
