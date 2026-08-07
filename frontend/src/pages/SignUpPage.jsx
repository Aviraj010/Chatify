import React from 'react'

import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {signup,isSignup}= useAuthStore();

  const validateForm = () => {}

  const handleSubmit = async (e) => {
    e.preventDefault(); 

  }


  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className=''></div>


    </div>
  )
}

export default SignUpPage