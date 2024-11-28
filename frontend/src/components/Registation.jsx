import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Registation = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [jobTitle, setJob] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const collectData = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phoneNumber || !jobTitle) {
      return handleError("All data is required");
    }
    const sigupData = { username, email, password, phoneNumber, jobTitle };
    try {
      const url = "http://localhost:8080/api/users/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sigupData),
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/user-login");
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
      <div className="xs0:w-[100%] xs2:w-[55%] xs3:w-[45%] xs4:w-[33%] xs0:min-h-[100%] xs2:min-h-[55%] xs3:min-h-[80vh] xs4:min-h-[90vh] p-[1.5rem] bg-[#ffffffb9] shadow-dull xs2:rounded-[1rem] flex flex-col xs2:border-[2px]  ">
        <div className="action  ">
          <form
            onSubmit={collectData}
            className="fieldbox flex flex-col gap-[1rem]"
          >
            <div className="flex justify-center ">
              <img
                onClick={goHome}
                src={"./logo2.png"}
                alt="logo"
                className="h-[3rem]   cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <h1 className="text-[1.5rem] font-bold ">User Sign Up</h1>
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Name</div>
              </div>
              <input
                type="text"
                className="border border-[#9e9e9e] bg-[transparent] h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                placeholder="Enter name"
                autoComplete="off"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Email Address</div>
              </div>
              <input
                type="email"
                className="border border-[#9e9e9e] bg-[transparent] h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                placeholder="Enter email"
                autoComplete="off"
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
                className="border border-[#9e9e9e] bg-[transparent] h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                placeholder="Create password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Phone Number</div>
              </div>
              <input
                type="number"
                className="border border-[#9e9e9e] bg-[transparent] h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                placeholder="Phone Number"
                autoComplete="off"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="div1 flex flex-col gap-[0.2rem]">
              <div className="flex justify-between ">
                <div className="text-[0.9rem] font-bold ">Job Title</div>
              </div>
              <input
                type="text"
                className="border border-[#9e9e9e] bg-[transparent] h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                placeholder="Job Title"
                autoComplete="off"
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className=" mt-[1.5rem] self-center border px-[1.2rem] text-[white] text-[0.9rem] font-semibold bg-[#1a1a75] py-[0.3rem] rounded-[0.3rem] "
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="login flex gap-[0.5rem] mt-[2rem] xs0:text-[0.9rem] xs2:text-[1rem] ">
          <p className=" text-[#000000] font-semibold ">
            Already have an account?
          </p>
          <div
            onClick={() => {
              navigate("/user-login");
            }}
            className="underline cursor-pointer text-[blue] hover:text-[#000000] "
          >
            {" "}
            login
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registation;
