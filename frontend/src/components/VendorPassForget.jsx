import { useEffect, useRef, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PassForget = () => {
  const [otpbtn, setOtpbtn] = useState("Send Otp");
  const [email, setEmail] = useState();
  const VerifyBtn = useRef();
  const EnterOtp = useRef();
  const ReadOnly = useRef();
  const emailOtp = useRef();
  const newPass = useRef();
  const [currentOtp, setCurrentOtp] = useState();
  const [getCurrentOtp, setGetCurrentOtp] = useState();
  const [password, setCreatePass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const navigate = useNavigate();
  const SendOtp = async (e) => {
    e.preventDefault();
    if (!email) handleError("Enter your email");
    try {
      const response = await fetch(
        "http://localhost:8080/api/vendors/all-vendor"
      );
      if (!response.ok) {
        throw handleError("Failed to fetch users");
      }
      const users = await response.json();
      const user = users.find((user) => user.email === email);
      if (!user) {
        handleError("email not exist");
      }
      const owner = user._id;
      const otpData = { email, owner };

      const url = "http://localhost:8080/api/vendors/send-otp";
      const response2 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      });
      const result = await response2.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setOtpbtn("Resend Otp");
        VerifyBtn.current.style.display = "block";
        EnterOtp.current.style.display = "flex";
        ReadOnly.current.setAttribute("readonly", "readonly");
        ReadOnly.current.style.color = "#5a5a5a";
        const otpResponse = await fetch(
          "http://localhost:8080/api/vendors/all-vendor"
        );
        const users = await otpResponse.json();
        const otpUser = users.find((user) => user.email === email);
        setCurrentOtp(otpUser.otp[otpUser.otp.length - 1].otp);
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
  const VerifyOpts = async (e) => {
    e.preventDefault();
    if (currentOtp == getCurrentOtp) {
      handleSuccess("otp varified");
      emailOtp.current.style.display = "none";
      newPass.current.style.display = "flex";
    } else {
      handleError("Invalid Otp");
    }
  };
  const UpdatePass = async (e) => {
    e.preventDefault();
    if (password == confirmPass) {
      try {
        const reset = { email, password };
        const url = "http://localhost:8080/api/vendors/password-reset";
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reset),
        });

        const data = await response.json();
        if (response.ok) {
          handleSuccess(data.message);
          setTimeout(() => {
            navigate("/vendor-login");
          }, 1000);
        } else {
          handleError(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      handleError("Confirm password is not same");
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
    <div>
      <div
        ref={emailOtp}
        className=" w-[100vw] h-[100vh] flex justify-center items-center "
      >
        <div className="bg-smbg bg-center bg-cover bg-[#F4FBFA] w-[100%] h-[100%] fixed xs0:hidden xs2:block  z-[-1] blur-[1.5px] opacity-[0.6]   "></div>
        <div className="xs0:w-[100%] xs2:w-[55%] xs3:w-[45%] xs4:w-[33%] xs0:h-[100%] xs2:h-[55%] xs3:h-[50%] xs4:h-[85%] p-[1.5rem] bg-[#ffffffb9] shadow-dull xs2:rounded-[1rem] flex flex-col xs2:border-[2px] ">
          <div className="action       ">
            <form className="fieldbox   flex flex-col gap-[1rem]">
              <div className="flex justify-center ">
                <img
                  onClick={goHome}
                  src={"./logo2.png"}
                  alt="logo"
                  className="h-[3rem]   cursor-pointer"
                />
              </div>
              <div className="flex justify-center">
                <h1 className="text-[1.5rem] font-bold ">Password Reset</h1>
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Email Address</div>
                </div>
                <input
                  type="email"
                  ref={ReadOnly}
                  className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  required
                  autoComplete="off"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="div1 hidden flex-col gap-[0.2rem]" ref={EnterOtp}>
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">OTP</div>
                </div>
                <input
                  type="otp"
                  onChange={(e) => {
                    setGetCurrentOtp(e.target.value);
                  }}
                  className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  required
                  autoComplete="off"
                  placeholder="Enter otp"
                />
              </div>
              <div className="self-center flex gap-[1rem] ">
                <button
                  onClick={SendOtp}
                  className=" mt-[1.5rem]  border px-[1.2rem] text-[white] text-[0.9rem] font-semibold bg-[#1a1a75] py-[0.3rem] rounded-[0.3rem] "
                >
                  {otpbtn}
                </button>
                <button
                  type="submit"
                  onClick={VerifyOpts}
                  ref={VerifyBtn}
                  className="hidden mt-[1.5rem]  border px-[1.2rem] text-[white] text-[0.9rem] font-semibold bg-[#1a1a75] py-[0.3rem] rounded-[0.3rem] "
                >
                  Verify Otp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        ref={newPass}
        className=" w-[100vw] h-[100vh] hidden justify-center items-center "
      >
        <div className="bg-smbg bg-center bg-cover w-[100%] h-[100%] fixed xs0:hidden xs2:block  z-[-1] blur-[1.5px] opacity-[0.6]   "></div>
        <div className="xs0:w-[100%] xs2:w-[55%] xs3:w-[45%] xs4:w-[33%] xs0:h-[100%] xs2:h-[55%] xs3:h-[50%] xs4:h-[85%] p-[1.5rem] bg-[#ffffffb9] shadow-dull xs2:rounded-[1rem]  ">
          <div className="action       ">
            <form
              onSubmit={UpdatePass}
              className="fieldbox   flex flex-col gap-[1rem]"
            >
              <div className="flex justify-center xs2:my-[-2.5rem]">
                <img
                  onClick={goHome}
                  src={
                    "https://www.logotypes101.com/logos/359/CB1BB6944B638687AA5A8E81FB3F3248/KGK.png"
                  }
                  alt="logo"
                  className="w-[8rem] rounded-[5rem] cursor-pointer "
                />
              </div>
              <div className="flex justify-center">
                <h1 className="text-[1.5rem] font-bold ">Password Reset</h1>
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">Email</div>
                </div>
                <input
                  type="email"
                  onChange={(e) => {
                    setCreatePass(e.target.value);
                  }}
                  className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  required
                  autoComplete="off"
                  value={email}
                  readOnly
                />
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">
                    Create Password
                  </div>
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setCreatePass(e.target.value);
                  }}
                  className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  required
                  autoComplete="off"
                  placeholder="Enter new password"
                />
              </div>
              <div className="div1 flex flex-col gap-[0.2rem]">
                <div className="flex justify-between ">
                  <div className="text-[0.9rem] font-bold ">
                    Confirm Password
                  </div>
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                  className="border border-[#9e9e9e] bg-transparent h-[2rem] p-[0.5rem] font-bold outline-none rounded-[0.2rem]"
                  required
                  autoComplete="off"
                  placeholder="Enter confirm posword"
                />
              </div>
              <button
                type="submit"
                className=" mt-[1.5rem] self-center border px-[1.2rem] text-[white] text-[0.9rem] font-semibold bg-[#1a1a75] py-[0.3rem] rounded-[0.3rem] "
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PassForget;
