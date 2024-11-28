import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Registation = () => {
  const [vendorname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const collectData = async (e) => {
    e.preventDefault();
    if (
      !vendorname ||
      !email ||
      !password ||
      !phoneNumber ||
      !companyName ||
      !streetName ||
      !city ||
      !zipCode ||
      !country ||
      !state
    ) {
      return handleError("All data is required");
    }
    const sigupData = {
      vendorname,
      email,
      password,
      phoneNumber,
      companyName,
      streetName,
      city,
      state,
      country,
      zipCode,
    };
    try {
      const url = "http://localhost:8080/api/vendors/signup";
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
          navigate("/vendor-login");
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
    <div className=" w-[100vw]  min-h-[100vh] flex justify-center items-center ">
      <div className="bg-smbg bg-center bg-cover bg-[#F4FBFA] w-[100%] h-[100%] fixed xs0:hidden xs2:block  z-[-1] blur-[1.5px] opacity-[0.6]   "></div>
      <div className="xs0:min-w-[100%] pb-[5rem] xs2:min-w-[55%] xs3:min-w-[45%] xs4:min-w-[33%] xs0:h-[100%] xs2:max-h-[70vh] xs3:max-h-[80vh] xs4:max-h-[93vh] p-[1.5rem] bg-[#ffffffb9] shadow-dull xs2:rounded-[1rem] flex flex-col xs2:border-[2px]  ">
        <div className="action ">
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
              <h1 className="text-[1.5rem] font-bold ">Vendor Sign Up</h1>
            </div>
            <div className="flex xs2:flex-row xs0:flex-col xs2:justify-between gap-[0.8rem]">
              <div className="div1 flex-grow flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Name</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
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
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Enter email"
                  autoComplete="off"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex xs2:flex-row xs0:flex-col xs2:justify-between gap-[0.8rem]">
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Password</div>
                </div>
                <input
                  type="password"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
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
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Phone Number"
                  autoComplete="off"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex xs2:flex-row xs0:flex-col xs2:justify-between gap-[0.8rem]">
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Company Name</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Company Name"
                  autoComplete="off"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Street Name</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Street Name"
                  autoComplete="off"
                  onChange={(e) => {
                    setStreetName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex xs2:flex-row xs0:flex-col xs2:justify-between gap-[0.8rem]">
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">City</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="City"
                  autoComplete="off"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Zip Code</div>
                </div>
                <input
                  type="number"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Zip Code"
                  autoComplete="off"
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex xs2:flex-row xs0:flex-col xs2:justify-between gap-[0.8rem]">
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">State</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="State"
                  autoComplete="off"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Country</div>
                </div>
                <input
                  type="text"
                  className="border border-[#9e9e9e] bg-[transparent] h-[2rem] xs2:w-[16rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  placeholder="Country"
                  autoComplete="off"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
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
              navigate("/vendor-login");
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
