// src/components/LandingPage.jsx
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div>
      <h1>EduConnect</h1>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <button onClick={toggleForm}>
        {isLogin ? "Create an Account" : "Already have an account? Log in"}
      </button>
    </div>
  );
};

export default LandingPage;
