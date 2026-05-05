import React, { useState } from 'react';
import logocar from "../assets/logocar.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Createaccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      if (!name || !email || !password) {
        setError("Please fill all fields!");
        return;
      }
      if (!agree) {
        setError("Please agree to the terms & conditions!");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        setError(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className='bg-gray-800 h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center bg-gray-600 border-1 border-gray-500 w-100 pt-4 rounded-3xl'>
        <div>
          <img className='w-30 h-5' src={logocar} alt="" />
          <h1 className='font-bold text-white mb-7 pl-3 text-xl'>CARAREA</h1>
        </div>

        <h1 className='text-yellow-100 font-bold text-3xl mb-2'>Join PremiumDrive</h1>
        <p className='text-gray-400 font-bold'>Create Your Exclusive Account</p>

        <div className='flex flex-col gap-4 mt-10 w-90'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-1 border-gray-500 pl-10 bg-gray-500 p-2 text-lg rounded-xl text-white font-bold'
            type="text"
            placeholder='Enter Your Name'
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-1 border-gray-500 pl-10 bg-gray-500 p-2 text-lg rounded-xl text-white font-bold'
            type="text"
            placeholder='Enter Your Email'
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-1 border-gray-500 pl-10 bg-gray-500 p-2 text-lg rounded-xl text-white font-bold'
            type="password"
            placeholder='Enter Your Password'
            required
          />
        </div>

        <div className='flex gap-4 mt-8 pr-18'>
          <input
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            type="checkbox"
          />
          <p className='text-neutral-400'>
            I agree to the <span className='text-orange-400'>terms & conditions</span>
          </p>
        </div>

        {error && <p className='text-orange-400 mt-3 font-bold'>{error}</p>}

        <button
          onClick={handleCreate}
          className='text-white font-bold border-1 border-orange-400 bg-amber-700 mt-2 p-2 w-80 rounded-2xl text-center'
        >
          CREATE ACCOUNT
        </button>

        <p className='mt-10 text-neutral-400'>Already have an account?</p>
        <Link
          to={"/login"}
          className='border-1 border-orange-400 text-orange-400 w-80 text-center p-1 mt-2 rounded-xl mb-10 font-bold'
        >
          LOGIN TO YOUR ACCOUNT
        </Link>
      </div>
    </div>
  );
};

export default Createaccount;
