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
      <div className="flex items-center justify-center h-[100dvh] w-[100dvw] bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-[85%]  md:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
        >
          <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium mb-10">
            Admin Login
          </h1>
          {(
            <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
              {/* User Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input type="text" placeholder="Name" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* Mail Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input type="email" placeholder="Email id" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* Lock Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input type="password" placeholder="Password" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full pr-3" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mt-5 text-left">
          </div>
          <button type="submit" className="cursor-pointer mt-2 w-full h-11 rounded-full mb-10 text-white bg-indigo-500 hover:opacity-90 transition-opacity" >
            {
              load ? <Load /> : "Login"
            }
          </button>
        </form>
      </div>
    </>
  );
}
