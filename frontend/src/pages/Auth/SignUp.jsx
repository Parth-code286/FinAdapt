import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

export const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName) return setError('Please enter your name.');
    if (validateEmail(email)) return setError('Please enter a valid email address.');
    if (!password) return setError('Please enter the password.');

    try {
      console.log("📤 Sending request to:", API_PATHS.AUTH.REGISTER);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: fullName,
        email,
        password,
      });

      console.log("📦 Registration response:", response);
      const { token, user } = response.data.data;

      if (token) {
        // Store token and update context
        localStorage.setItem("token", token);
        updateUser(user);

        // Upload profile image if selected
        if (profilePic) {
          try {
            const imgUploadRes = await uploadImage(profilePic);
            const profileImageUrl = imgUploadRes.imageUrl || '';
            console.log("✅ Image uploaded:", profileImageUrl);

            // OPTIONAL: Update user with profileImageUrl
            // await axiosInstance.post('/api/v1/user/profile-image', { imageUrl: profileImageUrl });

          } catch (uploadError) {
            console.error("❌ Image upload failed:", uploadError);
            // Optional: Notify user, but still continue to dashboard
          }
        }

        // Navigate after image upload completes
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#1e1e2f] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#2a2a3b] w-full max-w-lg">
        <h3 className="text-3xl font-bold text-[#e0e0e0] text-center">Create an Account</h3>
        <p className="text-sm text-[#a1a1aa] mt-2 mb-6 text-center">
          Start tracking your expenses today
        </p>

        {/* Profile Photo Upload */}
        <div className="flex justify-center mb-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="fullName"
              placeholder="John Doe"
              type="text"
              name="fullName"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              name="email"
            />
          </div>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="......."
            type="password"
            name="password"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect Link */}
        <p className="text-[13px] text-slate-400 mt-4 text-center">
          Already have an account?{' '}
          <Link className="font-medium text-primary" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
