import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const DropDownProcess = ({ getData }) => {
  const [options, setOptions] = useState([
    "Machining",
    "Welding",
    "Casting",
    "Forging",
    "Molding",
    "Additive Manufacturing",
    "Heat Treatment",
    "Rolling",
    "Forming",
    "Surface Treatment",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProcesData = async () => {
      try {
        const response = await fetch(
          "https://matexbackend.vercel.app/api/vendors/allMaterial"
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const uniqueNames = new Set();
        const formatCat = data
          .filter((items) => {
            const name = items.basic_detail.material_cat;
            if (uniqueNames.has(name)) {
              return false;
            }
            uniqueNames.add(name);
            return true;
          })
          .map((item) => {
            return item.basic_detail.material_cat;
          });

        setOptions((prevOptions) => {
          const updatedOptions = [...prevOptions];

          formatCat.forEach((category) => {
            if (!updatedOptions.includes(category)) {
              updatedOptions.push(category);
            }
          });

          return updatedOptions;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProcesData();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("dropdown");
      const inputField = document.getElementById("inputField");
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        inputField &&
        !inputField.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleAddOption = () => {
    if (inputValue && !options.includes(inputValue)) {
      setOptions([...options, inputValue]);
      getData(inputValue);
    }
    setIsDropdownOpen(false);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsDropdownOpen(false);
    getData(option);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };
  return (
    <div className="relative flex items-center h-[3.5rem]  text-[1.2rem] font-semibold text-[#969494]  bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] ">
      <div className=" w-[100%] h-full ">
        <input
          id="inputField"
          type="text"
          value={inputValue}
          autoComplete="off"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          className=" w-[100%] h-full px-[0.7rem] shadow-sm outline-none bg-transparent "
          placeholder="Material Category"
        />
      </div>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute top-[3.5rem] z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {options
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)} // Set input value to clicked option
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-100"
              >
                {option}
              </div>
            ))}
          {inputValue &&
            !options.some((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            ) && (
              <div
                onClick={handleAddOption}
                className="px-4 py-2 overflow-auto scrollbar-hide  text-gray-700 cursor-pointer hover:bg-blue-100"
              >
                <span className="text-[#006A6A] font-bold ">Add</span> `
                {inputValue}`
              </div>
            )}
        </div>
      )}
    </div>
  );
};

DropDownProcess.propTypes = {
  getData: PropTypes.func.isRequired,
};
export default DropDownProcess;
