const KEY = 'ticketapp_session';
export function setSession(token:string){ localStorage.setItem(KEY, token) }
export function getSession(){ return localStorage.getItem(KEY) }
export function clearSession(){ localStorage.removeItem(KEY) }

const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users_v1';

// helper delay
function sleep(ms = 250) {
  return new Promise(r => setTimeout(r, ms));
}

type User = {
  email: string;
  password: string;
  name?: string;
};

export const session = {
  async signup(email: string, password: string, name?: string) {
    await sleep();
    if (!email || !password)
      throw new Error('Email and password are required');
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters');
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email))
      throw new Error('Email already registered');
    const user: User = { email, password, name };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    return { email };
  },

async login(email: string, password: string) {
  await sleep();

  // Basic validation
  if (!email || !password)
    throw new Error('Email and password are required');

  // Normalize input
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  // Fetch users
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

  // Find match
  const found = users.find(
    (u) =>
      u.email.trim().toLowerCase() === cleanEmail &&
      u.password.trim() === cleanPass
  );

  if (!found)
    throw new Error('Invalid email or password. Please try again.');

  // Save session
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: cleanEmail }));
  return { email: cleanEmail };
},


  async logout() {
    await sleep();
    localStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem(SESSION_KEY);
  }
};
