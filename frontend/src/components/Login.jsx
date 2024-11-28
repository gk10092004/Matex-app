import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const LoginToHOme = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return handleError("All data is required");
    }
    const loginData = { email, password };
    try {
      const url = "http://localhost:8080/api/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      const {
        success,
        message,
        jwtToken,
        username,
        email,
        typeIs,
        jobTitle,
        phoneNumber,
        error,
      } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("userType", typeIs);
        localStorage.setItem("jobTitle", jobTitle);
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
        setTimeout(() => {
          navigate("/user-home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const goHome = () => {
    navigate("/");
  };
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const type = localStorage.getItem("userType");
  useEffect(() => {
    if (isAuthenticated) {
      if (type == "User") navigate("/user-home");
      else navigate("/vendor-home");
    }
  }, [isAuthenticated, navigate, type]);
  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="bg-smbg bg-center bg-cover bg-[#F4FBFA] w-[100%] h-[100%] fixed xs0:hidden xs2:block  z-[-1] blur-[1.5px] opacity-[0.6]   "></div>
      <div className="xs0:w-[100%] xs2:w-[55%] xs3:w-[45%] xs4:w-[33%] xs0:h-[100%] xs2:h-[55%] xs3:h-[50%] xs4:h-[85%] p-[1.5rem] bg-[#ffffffb9] shadow-dull xs2:rounded-[1rem] flex flex-col xs2:border-[2px]  ">
        <div className="action       ">
          <form
            onSubmit={LoginToHOme}
            className="fieldbox   flex flex-col gap-[1rem]"
          >
            <div className="flex justify-center">
              <img
                onClick={goHome}
                src={"./logo2.png"}
                alt="logo"
                className="h-[3rem]   cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <h1 className="text-[1.5rem] font-bold ">User Login</h1>
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Email Address</div>
              </div>
              <input
                type="email"
                className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                required
                autoComplete="off"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Password</div>
              </div>
              <input
                type="password"
                className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                required
                autoComplete="off"
                placeholder="Enter your posword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className=" mt-[1.6rem] self-center border px-[1.2rem] text-[white] text-[0.9rem] font-semibold bg-[#1a1a75] py-[0.3rem] rounded-[0.3rem] "
            >
              Login
            </button>
          </form>
        </div>
        <div className="login flex gap-[0.5rem] mt-[2rem] xs0:text-[0.9rem] xs2:text-[1rem] ">
          <p className=" text-[#000000] font-semibold ">Forgot password? </p>
          <div
            onClick={() => {
              navigate("/user-password-reset");
            }}
            className="underline cursor-pointer text-[blue] hover:text-[#000000] "
          >
            Reset
          </div>
        </div>
        <div className="login flex gap-[0.5rem] mt-[2rem] xs0:text-[0.9rem] xs2:text-[1rem] ">
          <p className=" text-[#000000] font-semibold">
            Do not have an account?
          </p>
          <div
            onClick={() => {
              navigate("/user-signup");
            }}
            className="underline cursor-pointer text-[blue] hover:text-[#000000] "
          >
            Sign Up
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
