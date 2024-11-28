import Select from "./Select";
import Property1 from "./Property1";

import { useEffect, useState } from "react";

import { handleError } from "../utils";
import { ToastContainer } from "react-toastify";
import MaterialCard from "./MaterialCard";
import { useNavigate } from "react-router";
const UserHome = () => {
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

  const [cardsData, setCardsData] = useState([{}, {}, {}]); //usefull array

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
    }).filter((material) => material && material.total_match >= 1);

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
  const navigate = useNavigate();
  const ResetBtn = () => {
    navigate("/");
  };

  const cartFromLocal = JSON.parse(
    localStorage.getItem("vendorCartHistory") || "[]"
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
    localStorage.setItem("vendorCartHistory", JSON.stringify(historyData));
  }, [historyData]);

  return (
    <div className="w-full  bg-[#F4FBFA] flex flex-col   ">
      <div className="xs3:max-h-[90vh]  scrollbar-hide  bg-transparent xs1:px-[1rem] xs2:px-[5rem] xs3:px-[2.5rem] xs1:py-[2rem] xs2:py-[1rem] xs1:mt-[2rem] xs2:mt-[0rem] xs2:flex xs1:flex-col xs1:items-center xs3:flex-row xs3:justify-between xs2:gap-[1.5rem]  ">
        <div className="xs3:w-[25rem] xs3:min-h-[85vh]  xs3:self-stretch xs2:w-full pl-[0.1rem]   text-[#3F4948] flex flex-col  py-[1rem] over   ">
          <Select
            items={selectMatCategory}
            handleMatCategory={handleMatCategory}
          />
          <div className="flex flex-col mb-[0.5rem] text-[1.3rem] border-x-0 border-b-0 border-[0.1rem] border-[#BEC9C8] ">
            <span className="font-semibold">Select Properties*</span>
            <span className="text-[1.2rem]">Minimum 3 required</span>
          </div>
          <div className="flex flex-col gap-[0.5rem] overflow-auto scrollbar-hide ">
            <div className="flex flex-col  ">
              {cardsData.map((_, index) => (
                <Property1
                  key={index}
                  index={index}
                  handleCardDataChange={handleCardDataChange}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center  mt-auto items-center p-[0.5rem] ">
            <button
              onClick={AddProperty}
              className="flex gap-[1rem] items-center border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem]  hover:bg-[#006A6A] hover:text-[white] hover:border-[#006A6A] "
            >
              <span className="material-symbols-outlined">add</span>
              <div>Add Property</div>
            </button>
          </div>
          <div className="flex flex-col gap-[0.7rem] ">
            <button
              onClick={FindMaterial}
              className="flex gap-[1rem]  hover:bg-[#006A6A] hover:text-[white] hover:border-[#006A6A]   text-[#3F4948] justify-center font-semibold items-center border-[0.15rem] border-[#3F4948] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
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
                : it.basic_detail.material_name.toLowerCase().includes(search);
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
      <ToastContainer />
    </div>
  );
};

export default UserHome;
