import Select from "./Select";
import Property1 from "./Property1";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import MaterialCard from "./MaterialCard";
const UserHome = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [loggedInUserNumber, setLoggedInUserNumber] = useState(null);
  const [typeIs, setTypeIs] = useState(null);
  const [userJob, setUserJob] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setLoggedInUserEmail(localStorage.getItem("email"));
    setLoggedInUserNumber(localStorage.getItem("phoneNumber"));
    setTypeIs(localStorage.getItem("userType"));
    setUserJob(localStorage.getItem("jobTitle"));
    if (loggedInUser == null) {
      down.current.style.display = "none";
    } else {
      down.current.style.display = "block";
    }
  }, [loggedInUser]);

  const [MaterialDatabase, setMaterialDatabase] = useState([]);
  const [processCatArray, setProcessCatArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/vendors/allMaterial"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const uniqueNames = new Set();
        const processCat = data
          .filter((items) => {
            const name = items.basic_detail.material_cat;
            if (uniqueNames.has(name)) {
              return false;
            }
            uniqueNames.add(name);
            return true;
          })
          .map((item) => {
            return { label: item.basic_detail.material_cat };
          });
        setProcessCatArray(processCat);
        setMaterialDatabase(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [cardsData, setCardsData] = useState([{}, {}, {}]);

  const handleCardDataChange = (index, data) => {
    const updatedCardsData = [...cardsData];
    updatedCardsData[index] = data;
    setCardsData(updatedCardsData);
  };

  const AddProperty = () => {
    var arr = [...cardsData, {}];
    setCardsData(arr);
  };

  const [catArr, setCatArr] = useState([]);
  const [processFilter, setProcessFilter] = useState([]);
  const handleMatCategory = (arrayFromSelect) => {
    setCatArr(arrayFromSelect);
  };

  const handleMatProcess = (arrayFromSelect) => {
    setProcessFilter(arrayFromSelect);
  };

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
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const selectMatCategory = {
    message: "Manufacturing Category",
    filterTye: "Select Material Category",
    data: processCatArray,
  };
  const [formatProcessArray, setFormatProcessArray] = useState([]);
  useEffect(() => {
    const fetchProcesData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/vendors/allProcess"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const uniqueNames = new Set();
        const formatProcess = data
          .filter((items) => {
            const name = items.basic_detail.process_name;
            if (uniqueNames.has(name)) {
              return false;
            }
            uniqueNames.add(name);
            return true;
          })
          .map((item) => {
            return { label: item.basic_detail.process_name };
          });

        setFormatProcessArray(formatProcess);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProcesData();
  }, []);
  const selectProcCategory = {
    message: "Manufacturing Process",
    filterTye: "Choose Manufacturing Process",
    data: formatProcessArray,
  };

  const material = useRef(null);
  const vendor = useRef(null);
  const [navSwitch, setNavSwitch] = useState(true);
  const SearchMaterial = () => {
    setNavSwitch(true);
    material.current.style.backgroundColor = "#CCE8E7";
    vendor.current.style.backgroundColor = "";
  };
  const SearchVendor = () => {
    setNavSwitch(false);
    vendor.current.style.backgroundColor = "#CCE8E7";
    material.current.style.backgroundColor = "";
  };

  const [search, setSearch] = useState("");

  const isArrayFilled = (array) => {
    const filledObjects = array.filter(
      (obj) => obj.property && obj.unit && obj.min && obj.max
    );

    return filledObjects.length >= 3;
  };

  const [FilterArray, setFilterArray] = useState([]);
  const [FilterExtra, setFilterExtra] = useState([]);
  const FindMaterial = () => {
    if (!catArr.length) return handleError("Select material category");

    const validProp = isArrayFilled(cardsData);
    if (!validProp) return handleError("Minimum 3 properties required*");

    const InputParameter = {
      category: catArr,
      properties: cardsData,
    };

    const newFilter = MaterialDatabase.map((material) => {
      const categoryMatch = InputParameter.category.some((cat) =>
        material.basic_detail.material_cat.includes(cat)
      );

      if (!categoryMatch) return null;

      let matchedPropertiesCount = 0;

      InputParameter.properties.forEach((inputProp) => {
        const isMatched = material.material_properties.material_properties.some(
          (matProp) =>
            matProp.property === inputProp.property &&
            matProp.unit === inputProp.unit &&
            parseFloat(inputProp.min) >= parseFloat(matProp.min) &&
            parseFloat(inputProp.max) <= parseFloat(matProp.max)
        );

        if (isMatched) {
          matchedPropertiesCount += 1;
        }
      });

      return {
        ...material,
        total_match: matchedPropertiesCount,
        totalProp_ask: InputParameter.properties.length,
      };
    }).filter((material) => material && material.total_match >= 1); // Filter valid matches with at least one property match

    setFilterArray(newFilter);
    setFilterExtra(newFilter);

    if (!newFilter.length) {
      return handleError("No material found");
    }
  };

  const ApplyFilter = () => {
    let updatedFilterArray = FilterExtra;

    if (!processFilter.length) {
      handleError("Select filter");
    } else {
      updatedFilterArray = FilterExtra.filter((material) => {
        return processFilter.some((process) =>
          material.process_name.some(
            (materialProcess) =>
              materialProcess.toLowerCase() === process.toLowerCase()
          )
        );
      });

      if (!updatedFilterArray.length) {
        handleError("No filter found! Change the option");
      }
    }

    setFilterArray(updatedFilterArray);
  };

  const ResetBtn = () => {
    navigate("/");
  };

  const cartFromLocal = JSON.parse(
    localStorage.getItem("userCartHistory") || "[]"
  );
  const [historyData, setHistoryData] = useState(cartFromLocal);

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
    localStorage.setItem("userCartHistory", JSON.stringify(historyData));
  }, [historyData]);

  useEffect(() => {
    material.current.style.backgroundColor = "#CCE8E7";
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userType");
      navigate("/user-login");
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
  return (
    <div className="w-full h-[100vh] bg-[#F4FBFA]  flex flex-col  ">
      <div className="max-h-[10vh] min-h-[5rem] flex justify-between xs0:px-[0.5rem] xs3:px-[4rem] py-[0.8rem] items-center overflow-hidden ">
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
        <div className="flex xs0:absolute xs0:left-1/2 xs2:left-0 xs0:transform xs0:-translate-x-1/2 xs2:-translate-x-0  xs0:bg-[#ff000000] xs0:max-w-fit  xs1:w-fit xs0:mt-[10rem] xs2:mt-0  xs0:justify-center xs2:relative xs0:gap-[0.1rem] xs3:gap-[0.5rem] xs0:max-h-[3rem] xs2:max-h-full ">
          <div
            onClick={SearchMaterial}
            ref={material}
            className="flex  items-center justify-center gap-[0.5rem] xs2:text-[1.1rem] font-bold xs1:p-[1rem] xs0:px-[0.5rem] xs0:py-[0.8rem] cursor-pointer rounded-[2rem] hover:bg-[#CCE8E7] xs0:w-[12rem] xs2:w-fit "
          >
            <span className="material-symbols-outlined">handyman</span>
            <div >Search Materials</div>
          </div>
          <div
            onClick={SearchVendor}
            ref={vendor}
            className="flex  items-center justify-center gap-[0.5rem]  xs2:text-[1.1rem] font-bold xs1:p-[1rem] xs0:px-[0.6rem] xs0:py-[0.8rem] cursor-pointer rounded-[2rem] hover:bg-[#CCE8E7] xs0:w-[10rem] xs1:w-[11rem] xs2:w-fit "
          >
            <span className="material-symbols-outlined">warehouse</span>
            <div>Find Vendors</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-[0.5rem] font-bold ">
            <img
              src="https://th.bing.com/th/id/OIP.f3DM2upCo-p_NPRwBAwbKQAAAA?rs=1&pid=ImgDetMain"
              alt=""
              className="xs1:h-[2.5rem] xs0:h-[2rem] xs1:w-[2.5rem] xs0:w-[2rem rounded-[2rem]"
            />
            <div className="flex gap-[0.5rem] items-center ">
              <div className="">
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
            className="fixed inset-0 hidden items-center justify-center bg-gray-500 bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg  max-w-full text-center">
              <div className="flex flex-col  gap-[0.2rem] ">
                <div className="name flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Name:</h2>
                  <h2 className="text-[1.2rem] font-bold">{loggedInUser}</h2>
                </div>
                <div className="email flex border-[3px] justify-between gap-[2.5rem] border-x-0 border-t-0 py-[2px] ">
                  <h2 className="text-[1.2rem] font-bold">Email:</h2>
                  <h2 className="text-[1.2rem] font-bold  ">
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
                  <h2 className="text-[1.2rem] font-bold">Job Title:</h2>
                  <h2 className="text-[1.2rem] font-bold">{userJob}</h2>
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

          <div
            ref={loggedAction}
            className="hidden font-semibold absolute mt-[4rem] mr-[20rem] bg-[#F4FBFA] border border-[#bbbbbb] p-[0.8rem] xs0:w-[10rem] xs2:w-[12rem] text-center rounded-[0.5rem] "
          >
            <div
              onClick={handleDetail}
              className="  hover:bg-[#CCE8E7] border rounded-[0.5rem] p-[0.2rem] my-[0.5rem] cursor-pointer "
            >
              User Detail
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
      {navSwitch ? (
        <div className="bg-[#F4FBFA]  xs3:max-h-[88%] xs0:px-[1rem] xs2:px-[5rem] xs3:px-[2.5rem] xs0:py-[2rem] xs2:py-[1rem] xs0:mt-[2rem] xs2:mt-[0rem] xs2:flex xs0:flex-col xs0:items-center xs3:flex-row xs3:justify-between xs2:gap-[1.5rem]">
          <div className="xs3:w-[25rem] xs3:min-h-[85vh] xs3:self-stretch xs2:w-full pl-[0.1rem]   text-[#3F4948] flex flex-col  py-[1rem]  ">
            <Select
              items={selectMatCategory}
              handleMatCategory={handleMatCategory}
            />
            <div className="flex  flex-col mb-[0.5rem] text-[1.3rem] border-x-0 border-b-0 border-[0.1rem] border-[#BEC9C8] ">
              <span className="font-semibold">Select Properties*</span>
              <span className="text-[1.2rem]">Minimum 3 required</span>
            </div>
            <div className="flex flex-col   gap-[0.5rem] overflow-x-hidden overflow-auto scrollbar-hide ">
              <div className="flex flex-col flex-grow  w-[100%]   ">
                {cardsData.map((_, index) => (
                  <Property1
                    key={index}
                    index={index}
                    handleCardDataChange={handleCardDataChange}
                  />
                ))}
              </div>
            </div>
            <div className="flex mt-auto justify-center items-center p-[0.5rem] ">
              <button
                onClick={AddProperty}
                className="flex gap-[1rem] items-center border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem]  hover:bg-[#006A6A] hover:text-[white] hover:border-[#006A6A]  "
              >
                <span className="material-symbols-outlined">add</span>
                <div>Add Property</div>
              </button>
            </div>
            <div className="flex flex-col  gap-[0.7rem] ">
              <button
                onClick={FindMaterial}
                className="flex gap-[1rem] hover:bg-[#006A6A] hover:text-[white] hover:border-[#006A6A]  text-[#3F4948] justify-center font-semibold items-center border-[0.15rem] border-[#3F4948] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
              >
                Find Materials
              </button>
              <button
                onClick={ResetBtn}
                className="flex gap-[1rem]  hover:bg-[#006A6A] hover:text-[white] hover:border-[#006A6A]  text-[#3F4948] justify-center font-semibold items-center border-[0.15rem] border-[#3F4948] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="xs3:w-[40rem] xs3:self-stretch xs2:w-full xs3:h-[full] bg-[white] rounded-[1.5rem] xs0:px-[0.5rem] xs2:px-[2rem] py-[1rem] flex flex-col gap-[0.7rem] border-[2px] ">
            <div className=" h-[3rem] flex items-center bg-[#E3E9E9] rounded-[2rem] gap-[0.5rem] text-[1.1rem] px-[2rem] py-[1.5rem]  ">
              <span className="material-symbols-outlined">search</span>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full py-[0.2rem] text-[#3F4948] font-semibold outline-none bg-transparent "
              />
            </div>
            <div className=" h-[3rem] flex justify-between items-center ">
              <div className="text-[1.5rem]  ">Suggested Materials</div>
            </div>
            <div className=" flex-grow-[1] min-h-[20vh]  flex flex-col gap-[1rem] py-[0.5rem] overflow-auto scrollbar-hide  ">
              {FilterArray.filter((it) => {
                return search.toLowerCase() === ""
                  ? it
                  : it.basic_detail.material_name
                      .toLowerCase()
                      .includes(search);
              }).map((item) => {
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
          <div className="xs3:w-[25rem] xs3:self-stretch xs2:w-full bg-[white] rounded-[1.5rem] xs0:my-[1rem] xs3:my-[0rem] xs0:p-[1rem] ">
            <div className="flex flex-col">
              <Select
                items={selectProcCategory}
                handleMatCategory={handleMatProcess}
              />
              <div className="flex pt-[1rem] ">
                <button
                  onClick={ApplyFilter}
                  className="flex flex-grow font-bold justify-center gap-[1rem] items-center border-[0.15rem]  border-[#3F4948]  text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem] "
                >
                  <div>Apply Filter</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#F4FBFA] flex-grow flex justify-center items-center ">
          <h1 className="font-bold text-[1.3rem] ">
            Find Vendor is in developing phase......
          </h1>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserHome;
