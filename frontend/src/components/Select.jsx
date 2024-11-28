import PropTypes from "prop-types";
import { useState } from "react";
const Select = ({ items, handleMatCategory }) => {
  const [propert, setPropet] = useState([]);

  const Handler = (e) => {
    const ele = e.target.value;
    setPropet((prevPropert) => {
      if (!prevPropert.includes(ele)) {
        const updatedArray = [...prevPropert, ele];
        handleMatCategory(updatedArray);
        return updatedArray;
      }
      return prevPropert;
    });
  };

  const Close = (e, idx) => {
    const newArr = propert.filter((_, i) => i !== idx);
    setPropet(newArr);
    handleMatCategory(newArr);
  };

  return (
    <div className="w-[100%]  flex flex-col gap-[0.5rem] pb-[0.5rem]  ">
      <div className="text-[1.4rem]">{items.filterTye}</div>
      <div className="">
        <select
          name="material"
          id="material"
          onChange={Handler}
          className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
        >
          <option value="hidden" disabled selected hidden>
            {items.message}
          </option>
          {Array.isArray(items.data) ? (
            items.data.map((i, idx) => {
              return (
                <option key={idx} value={i.label}>
                  {i.label}
                </option>
              );
            })
          ) : (
            <option value="t">No</option>
          )}
        </select>
      </div>
      <div className="flex px-[0.2rem] flex-wrap gap-x-[0.6rem] gap-y-[0.3rem]  w-[25rem]  ">
        {propert.map((i, idx) => {
          return (
            <div
              key={idx}
              className="border  rounded-[0.6rem] bg-[#CCE8E7] flex items-center gap-[0.3rem] px-[0.4rem]"
            >
              <div className="font-semibold font-">{i}</div>
              <div
                className="text-[1.5rem] font-bold cursor-pointer "
                onClick={(e) => {
                  Close(e, idx);
                }}
              >
                &times;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Select.propTypes = {
  items: PropTypes.object.isRequired,
  handleMatCategory: PropTypes.func.isRequired,
};

export default Select;
