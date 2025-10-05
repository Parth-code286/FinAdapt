import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuTrendingUpDown } from 'react-icons/lu';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs/Input';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath'; // ✅ your API path constants
import { UserContext } from '../../context/userContext';

// ✅ StatsInfoCard Component
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#151524] border border-[#2d2d45] shadow-inner shadow-[#8b5cf620] w-full mb-6">
      <div className={`w-12 h-12 flex items-center justify-center text-2xl text-white rounded-md ${color}`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-300">{label}</h6>
        <span className="text-xl font-bold text-white">₹{value}</span>
      </div>
    </div>
  );
};

// ✅ Main Login Component
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        updateUser(user)
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#2a2a3b] w-full max-w-md">
        <h3 className="text-3xl font-bold text-[#e0e0e0] text-center">Welcome Back</h3>
        <p className="text-sm text-[#a1a1aa] mt-2 mb-6 text-center">
          Please enter your details to log in
        </p>

        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label="Track Your Income & Expenses"
          value="430,000"
          color="bg-[#8b5cf6]"
        />

        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            type="text"
            placeholder="Enter Your Email."
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email Address"
          />

          <Input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 rounded-md bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#7c3aed] transition-all duration-200 shadow-md shadow-[#8b5cf650] focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            LOGIN
          </button>
        </form>

        <p className="text-[13px] text-slate-400 mt-5 text-center">
          Don't have an account?{' '}
          <Link className="font-medium text-primary hover:underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};