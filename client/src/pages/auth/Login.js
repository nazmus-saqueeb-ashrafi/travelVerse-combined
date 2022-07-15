import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'



const Login = () => {

  // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const initialState = {
    username: "",
    password: "",
  };


  const [data, setData] = useState(initialState);

  // Handle change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form submission
  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(login(data))
  
    
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      // window.location.reload();
      navigate('/')
      console.log(user)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <motion.div
        key="modal"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
      >
        <div>
          <section class="text-gray-600 bg-base-100 body-font flex h-screen">

            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center md:text-left">

                <h1 class="font-['Abril'] font-bold italic text-5xl text-cyan-700">Travelverse</h1>

                <p class="leading-relaxed mt-0 text-zinc-400">Document your travel journey, share with your friends and family.</p>
                
              </div>

              <form class="lg:w-2/6 md:w-1/2 bg-base-300 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit}>
                
                <div class="relative mb-4">
                  <label for="username" class="leading-7 text-sm text-zinc-400">Username</label>
                  <input type="name" id="username" name="username" class="w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} value={data.username}/>
                </div>
                <div class="relative mb-4">
                  <label for="password" class="leading-7 text-sm text-zinc-400">Password</label>
                  <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleChange} value={data.password}/>
                </div>

                {/* <Link to="/dashboard"> */}
                  <button class="glass text-white bg-cyan-700 hover:bg-cyan-800 border-0 py-2 mt-3 w-full focus:outline-none rounded text-lg" type="submit">
                    Log in
                  </button>
                {/* </Link> */}

                <Link class="text-s text-cyan-700 hover:text-cyan-800 mt-3 cursor-pointer m-auto pt-2" to="">
                  Forgot password?

                </Link> 
               
                {/* <Link class="text-s text-cyan-500 hover:text-cyan-600 mt-3 cursor-pointer m-auto" to="/">
                  Forgotten password?

                </Link> */}

                {/* seperator */}
                <div class="py-4 mt-2">
                    <div class="w-full border-t border-zinc-400"></div>
                </div>
        
                
                <div class="m-auto yellow-600 ">
                  <Link to="/register">
                    <button class="text-white bg-yellow-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg mt-3 w-40 content-center glass">Register</button>
                  </Link>
                  
                </div>
                
              </form>

            </div>

          </section>

        </div>


      </motion.div>
    
  )
}

export default Login
