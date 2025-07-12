import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // pastikan ini benar-benar ada dan mengexport `loginAction`

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }

    try {
      await loginAction(email, password);
      navigate('/publications');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#f2f6fc] p-8 rounded-xl shadow-lg">
      <div className="flex flex-col justify-center items-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg/2560px-Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg.png" alt="BPS Logo" className="h-20 w-20" />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-5 items-center gap-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="col-span-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="Contoh: naila@gmail.com"
          />
        </div>
        <div className="grid grid-cols-5 items-center gap-4">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="col-span-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="Minimal 8 karakter"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#004899] hover:bg-[#002b6a] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}