'use client'

import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { setLogin } from "./store/Slice";
import { useDispatch } from "react-redux";
import Load from "./loading/Load";



export default function Home() {

  // state for input value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  // handle change input value

  // handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    console.log(name, email, password);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/check-admin`, { name, email, password });
    if (!res.data.success) {
      return alert("Incorrect username, email or password");
    } else {
      dispatch(setLogin());
      router.push('/admin/home');
    }
    setLoad(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-tr from-brand-pink-light/70 via-slate-50 to-brand-pink-light/30 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm glass-card rounded-3xl p-8 space-y-6 bg-white/80"
        >
          <div className="text-center space-y-2">
            <span className="brand-gradient-bg text-white font-extrabold text-lg px-3 py-1.5 rounded-xl shadow-md inline-block mb-1">
              SK
            </span>
            <h1 className="text-slate-800 text-3xl font-extrabold font-playfair">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500">Sign in to manage frames and catalog details</p>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-brand-pink/80 focus-within:ring-2 focus-within:ring-brand-pink/20 h-13 rounded-2xl overflow-hidden px-4 gap-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400" viewBox="0 0 24 24" >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input 
                type="text" 
                placeholder="Admin Name" 
                className="bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm w-full h-full font-medium" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-brand-pink/80 focus-within:ring-2 focus-within:ring-brand-pink/20 h-13 rounded-2xl overflow-hidden px-4 gap-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400" viewBox="0 0 24 24" >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm w-full h-full font-medium" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200/80 focus-within:border-brand-pink/80 focus-within:ring-2 focus-within:ring-brand-pink/20 h-13 rounded-2xl overflow-hidden px-4 gap-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400" viewBox="0 0 24 24" >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input 
                type="password" 
                placeholder="Security Password" 
                className="bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm w-full h-full pr-2 font-medium" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full h-13 rounded-2xl text-white font-bold brand-gradient-bg hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer" 
          >
            {load ? <Load /> : "Access Dashboard"}
          </button>
        </form>
      </div>
    </>
  );
}

