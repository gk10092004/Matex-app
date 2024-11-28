import VendorMaterial from "./VendorMaterial";
import VendorProcess from "./VendorProcess";
import VendorAsUser from "./VendorAsUser";
import VendorShop from "./VendorShop";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import MaterialCard from "./MaterialCard";
const VendorHome = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [loggedInUserNumber, setLoggedInUserNumber] = useState(null);
  const [typeIs, setTypeIs] = useState(null);
  const [street, setStreet] = useState(null);
  const [company, setCompany] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setzip] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setLoggedInUserEmail(localStorage.getItem("email"));
    setLoggedInUserNumber(localStorage.getItem("phoneNumber"));
    setTypeIs(localStorage.getItem("userType"));
    setStreet(localStorage.getItem("street"));
    setCompany(localStorage.getItem("company"));
    setCity(localStorage.getItem("city"));
    setzip(localStorage.getItem("zip"));
    setState(localStorage.getItem("state"));

    setCountry(localStorage.getItem("country"));
    if (loggedInUser == null) {
      down.current.style.display = "none";
    } else {
      down.current.style.display = "block";
    }
  }, [loggedInUser]);

  const up = useRef(null);
  const down = useRef(null);
  const loggedAction = useRef(null);
  const userDetail = useRef(null);
  const userHistory = useRef(null);
  const Close = () => {
    down.current.style.display = "block";
    up.current.style.display = "none";
    loggedAction.current.style.display = "none";
  };
  const OpenD = () => {
    down.current.style.display = "none";
    up.current.style.display = "block";
    loggedAction.current.style.display = "block";
  };
  const handleDetail = () => {
    userDetail.current.style.display = "flex";
    loggedAction.current.style.display = "none";
    down.current.style.display = "block";
    up.current.style.display = "none";
  };
  const handleRoleClose = () => {
    userDetail.current.style.display = "none";
  };
  const handleHistory = () => {
    userHistory.current.style.display = "flex";
    loggedAction.current.style.display = "none";
    down.current.style.display = "block";
    up.current.style.display = "none";
  };
  const handleHistoryClose = () => {
    userHistory.current.style.display = "none";
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    localStorage.removeItem("jobTitle");
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("owner");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userType");
      localStorage.removeItem("owner");
      navigate("/vendor-login");
    }, 86400000); //86400000ms = 24 hour = 1day
    return () => clearTimeout(timer);
  }, [navigate]);

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const type = localStorage.getItem("userType");
  useEffect(() => {
    if (isAuthenticated) {
      if (type == "User") navigate("/user-home");
      else navigate("/vendor-home");
    } else navigate("/");
  }, [isAuthenticated, navigate, type]);

  const material = useRef(null);
  const vendor = useRef(null);
  const addM = useRef(null);
  const addPm = useRef(null);
  const addM_p = useRef(null);
  const [f1, setF1] = useState(true);
  const [f2, setF2] = useState(false);
  const [flag, setFlag] = useState(false);
  const SearchMaterial = () => {
    setF1(false);
    setF2(true);
    material.current.style.backgroundColor = "#CCE8E7";
    vendor.current.style.backgroundColor = "";
    addM.current.style.backgroundColor = "";
  };
  const SearchVendor = () => {
    setF1(false);
    setF2(false);
    vendor.current.style.backgroundColor = "#CCE8E7";
    material.current.style.backgroundColor = "";
    addM.current.style.backgroundColor = "";
  };
  const handleAddMaterial = () => {
    setFlag(false);
    setF1(true);
    setF2(false);

    addM.current.style.backgroundColor = "#CCE8E7";
    material.current.style.backgroundColor = "";
    vendor.current.style.backgroundColor = "";
  };

  const AddMaterial = () => {
    setFlag(false);
    addPm.current.style.backgroundColor = "";
    addM_p.current.style.backgroundColor = "#CCE8E7";
  };
  const AddProcess = () => {
    setFlag(true);
    addPm.current.style.backgroundColor = "#CCE8E7";
    addM_p.current.style.backgroundColor = "";
  };
  useEffect(() => {
    addM_p.current.style.backgroundColor = "#CCE8E7";
    addM.current.style.backgroundColor = "#CCE8E7";
  }, [addM_p, addM]);

  const cartFromLocal = JSON.parse(
    localStorage.getItem("vendorCartHistory") || "[]"
  );
  const [historyData, setHistoryData] = useState(cartFromLocal); // Array to store objects

  const HistoryDataFromCard = (newData) => {
    const isExist =
      Array.isArray(historyData) &&
      historyData.some((item) => item._id === newData._id);

    if (!isExist) {
      setHistoryData((prevArray) => [...prevArray, newData]);
    } else {
      handleError("Item already exists!");
    }
  };
  const HistoryRemove = (id) => {
    setHistoryData((prevArray) => prevArray.filter((item) => item._id !== id));
  };

  useEffect(() => {
    localStorage.setItem("vendorCartHistory", JSON.stringify(historyData));
  }, [historyData]);

  return (
    <div className="w-[100%] h-[100vh] bg-[#f4fbf7] flex flex-col  ">
      <div className="max-h-[10vh] min-h-[5rem] flex justify-between xs1:px-[0.5rem] xs3:px-[4rem] py-[0.8rem] items-center overflow-hidden ">
        <a
          href="/"
          className="flex items-center gap-[0.5rem] text-[1.1rem] font-bold px-[1rem] "
        >
          <img
            src="./logo2.png"
            className="xs3:h-[2.5rem] xs1:h-[1.8rem] xs0:h-[1.6rem]"
            alt=""
          />
        </a>
        <div className="xs2:flex xs0:absolute xs0:left-1/2 xs2:left-0 xs0:transform xs0:-translate-x-1/2 xs2:-translate-x-0 xs0:p-[0rem] xs2:p-[0rem] xs0:max-w-full  xs1:w-fit xs0:mt-[14rem] xs2:mt-0  xs0:justify-center xs2:relative gap-[0.5rem]">
          <div className="flex  xs2:flex-row xs0:flex-col items-center gap-[0.5rem] ">
            <div
              onClick={handleAddMaterial}
              ref={addM}
              className="xs0:order-2 xs2:order-1 w-fit flex items-center justify-center gap-[0.5rem] xs2:text-[1rem] xs3:text-[1.1rem] font-bold xs0:p-[1rem] xs2:px-[1rem]  xs2:py-[0.8rem] xs3:p-[1rem] cursor-pointer rounded-[2rem]  hover:bg-[#CCE8E7] xs0:w-[12rem] xs2:w-fit xs0:max-h-[3rem] xs2:max-h-full "
            >
              <span className="font-semibold material-symbols-outlined">
                add
              </span>
              <span>Add items</span>
            </div>
            <div className="xs0:order-1 xs2:order-2 flex xs3:gap-[0.5rem] xs0:max-h-[3rem] xs2:max-h-full ">
              <div
                onClick={SearchMaterial}
                ref={material}
                className="flex items-center justify-center gap-[0.5rem] xs2:text-[1rem] xs3:text-[1.1rem] font-bold xs0:p-[1rem] xs2:px-[1rem]  xs2:py-[0.8rem] xs3:p-[1rem] cursor-pointer rounded-[2rem] hover:bg-[#CCE8E7]  xs0:w-[12rem] xs2:w-fit "
              >
                <span className="material-symbols-outlined">handyman</span>
                <div>Search Materials</div>
              </div>
              <div
                onClick={SearchVendor}
                ref={vendor}
                className="flex items-center justify-center gap-[0.5rem]  xs2:text-[1rem] xs3:text-[1.1rem] font-bold xs0:p-[1rem] xs2:px-[1rem]  xs2:py-[0.8rem] xs3:p-[1rem]  cursor-pointer rounded-[2rem] hover:bg-[#CCE8E7]  xs0:w-[10rem] xs2:w-fit  "
              >
                <span className="material-symbols-outlined">warehouse</span>
                <div>My Shop</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col z-[1000] px-[0rem]">
          <div className="flex items-center  gap-[0.5rem] font-bold ">
            <img
              src="https://th.bing.com/th/id/OIP.f3DM2upCo-p_NPRwBAwbKQAAAA?rs=1&pid=ImgDetMain"
              alt=""
              className="h-[2.5rem] w-[2.5rem] rounded-[2rem]"
            />
            <div className="flex gap-[0.5rem]  items-center ">
              <div>
                <div className="xs0:text-[0.8rem] w-fit  ">{loggedInUser}</div>
                <div className="text-[0.8rem] text-[#909090] ">{typeIs}</div>
              </div>
              <div className="">
                <span
                  className="hidden material-symbols-outlined cursor-pointer "
                  ref={up}
                  onClick={Close}
                >
                  expand_circle_up
                </span>
                <span
                  className="hidden material-symbols-outlined cursor-pointer"
                  ref={down}
                  onClick={OpenD}
                >
                  expand_circle_down
                </span>
              </div>
            </div>
          </div>

          <div
            ref={userDetail}
            className="fixed inset-0 hidden  items-center justify-center bg-gray-500 bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg  max-w-full text-center">
              <div className="flex flex-col  gap-[0.2rem] ">
                <div className="name flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Name:</h2>
                  <h2 className="text-[1.2rem] font-bold">{loggedInUser}</h2>
                </div>
                <div className="email flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Email:</h2>
                  <h2 className="text-[1.2rem] font-bold">
                    {loggedInUserEmail}
                  </h2>
                </div>
                <div className="number flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Number:</h2>
                  <h2 className="text-[1.2rem] font-bold">
                    {loggedInUserNumber}
                  </h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Company:</h2>
                  <h2 className="text-[1.2rem] font-bold">{company}</h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Street:</h2>
                  <h2 className="text-[1.2rem] font-bold">{street}</h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Zip Code:</h2>
                  <h2 className="text-[1.2rem] font-bold">{zip}</h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">City:</h2>
                  <h2 className="text-[1.2rem] font-bold">{city}</h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">State:</h2>
                  <h2 className="text-[1.2rem] font-bold">{state}</h2>
                </div>
                <div className="title flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Country:</h2>
                  <h2 className="text-[1.2rem] font-bold">{country}</h2>
                </div>
              </div>
              <button
                onClick={handleRoleClose}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>

          <div
            ref={userHistory}
            className="fixed inset-0 hidden items-center justify-center bg-gray-500 bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg  max-w-full text-center">
              <div className="flex flex-col gap-[0.5rem] ">
                <div className="flex justify-center text-[1.3rem] font-bold gap-[2rem] min-w-[20rem] border rounded-[0.5rem] p-[0.5rem]  ">
                  Your Search History
                </div>
                <div className="flex flex-col max-h-[60vh] overflow-auto scrollbar-hide border-[0.2rem] p-[0.8rem] gap-[1rem] ">
                  {historyData.map((item) => {
                    return (
                      <MaterialCard
                        key={item._id}
                        items={item}
                        onSendData={HistoryDataFromCard}
                        removeData={HistoryRemove}
                      />
                    );
                  })}
                </div>
              </div>
              <button
                onClick={handleHistoryClose}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
          {/*  */}
          <div
            ref={loggedAction}
            className="hidden font-semibold absolute mt-[4rem] mr-[20rem] bg-[#F4FBFA] border border-[#bbbbbb] p-[0.8rem] xs0:w-[10rem] xs2:w-[12rem] text-center rounded-[0.5rem] "
          >
            <div
              onClick={handleDetail}
              className="  hover:bg-[#CCE8E7] border rounded-[0.5rem] p-[0.2rem] my-[0.5rem] cursor-pointer "
            >
              Vendor Detail
            </div>
            <div
              onClick={handleHistory}
              className=" hover:bg-[#CCE8E7] border rounded-[0.5rem] p-[0.2rem] my-[0.5rem] cursor-pointer "
            >
              Material history
            </div>
            <div
              onClick={handleLogout}
              className=" hover:bg-[#CCE8E7] border rounded-[0.5rem] p-[0.2rem] my-[0.5rem] cursor-pointer "
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
      {f1 ? (
        <div className="xs0:mt-[10rem]  xs1:mt-[10rem]  xs3:h-[90vh] xs0:pl-[1.1rem] xs0:pr-[1rem] xs2:px-[5rem] xs3:px-[2.5rem] xs1:py-[2rem] xs2:py-[1rem] xs2:mt-[0rem] xs2:flex xs1:flex-col xs1:items-center xs3:flex-row xs3:justify-between xs2:gap-[1.5rem] ">
          <div className="xs3:min-w-[20rem] xs3:max-w-[20rem] xs3:self-stretch xs2:w-full pl-[0.1rem]  xs3:h-[100%] text-[#3F4948] flex flex-col  py-[1rem] xs0:px-[0.5rem] xs2:px-[0rem] ">
            <div className="flex flex-col gap-[0.7rem] ">
              <button
                onClick={AddMaterial}
                ref={addM_p}
                className={`flex gap-[1rem]  text-[#3F4948]  font-bold items-center rounded-[2rem] px-[1.5rem] py-[0.6rem] ${
                  f1 != flag ? "bg-[#CCE8E7]" : ""
                } `}
              >
                <span className="material-symbols-outlined">category</span>
                <span>Add New Material</span>
              </button>
              <button
                onClick={AddProcess}
                ref={addPm}
                className="flex gap-[1rem] text-[#3F4948]  font-bold items-center   rounded-[2rem] px-[1.5rem] py-[0.6rem]"
              >
                <span className="material-symbols-outlined">manufacturing</span>
                <span>Add Manufacturing Process</span>
              </button>
            </div>
          </div>
          <div className="flex-grow max-w-[100vw] h-[100%] flex flex-col gap-[1rem]">
            {flag ? <VendorProcess /> : <VendorMaterial />}
          </div>
        </div>
      ) : (
        <div className="xs0:mt-[10rem] xs1:mt-[10rem]  xs3:h-[90vh] xs0:overflow-y-auto xs3:overflow-hidden   xs0:h-[100%]   xs1:px-[0.5rem] xs0:pb-[2rem] xs2:pb-[0rem] xs0:px-[1rem] xs2:px-[0rem] xs2:mt-[0rem]  ">
          {f2 ? <VendorAsUser /> : <VendorShop />}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default VendorHome;
