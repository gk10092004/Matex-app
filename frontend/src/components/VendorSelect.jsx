import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
const VendorSelect = ({ items, onSelect }) => {
  const [propert, setPropet] = useState([]); //usefull array
  const list = useRef(null);
  const Handler = (e) => {
    var ele = e.target.value;
    var arr = [];
    var flag = false;
    if (!arr.length) {
      list.current.style.display = "flex";
    }
    for (let i = 0; i < propert.length; i++) {
      if (ele == propert[i]) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      arr = [...propert, ele];
      setPropet(arr);
    }
  };
  const Close = (e, idx) => {
    let newArr = [];
    for (let i = 0; i < propert.length; i++) {
      if (i == idx) continue;
      else newArr = [...newArr, propert[i]];
    }
    setPropet(newArr);
    if (!newArr.length) {
      list.current.style.display = "none";
    }
  };

  //scollerr

  const scrollContainerRef = useRef(null);
  const scrollRight = (e) => {
    e.preventDefault();
    const itemWidth = scrollContainerRef.current.children[0].offsetWidth; // Width of one item
    scrollContainerRef.current.scrollBy({
      left: itemWidth * 2,
      behavior: "smooth", // Enable smooth scrolling
    });
  };
  const scrollLeft = (e) => {
    e.preventDefault();
    const itemWidth = scrollContainerRef.current.children[0].offsetWidth; // Width of one item
    scrollContainerRef.current.scrollBy({
      left: -itemWidth * 2,
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  //data sen to parent
  useEffect(() => {
    onSelect(propert);
  }, [onSelect, propert]);

  return (
    <div className="w-full flex xs0:flex-col xs2:flex-row justify-between gap-[1rem] pb-[0.5rem]  ">
      <div className="flex-grow xs3:max-w-[32rem] xs2:max-w-[49%] xs2:min-w-[49%]  flex flex-col gap-[0.3rem] ">
        <div className="font-semibold">{items.title}</div>
        <select
          name="material"
          id="material"
          onChange={Handler}
          className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
        >
          <option value="hidden" disabled selected hidden>
            {items.title}
          </option>
          {Array.isArray(items.data)
            ? items.data.map((i, idx) => {
                return (
                  <option key={idx} value={i.label}>
                    {i.label}
                  </option>
                );
              })
            : ""}
        </select>
      </div>
      <div
        ref={list}
        className="material_name xs3:max-w-[31.4rem] xs2:max-w-[18rem]  hidden flex-col justify-center gap-[0.3rem] flex-grow  "
      >
        <div className="flex items-center ">
          <button
            onClick={scrollLeft}
            className=" flex justify-center items-center"
          >
            <span className=" font-bold material-symbols-outlined">
              keyboard_arrow_left
            </span>
          </button>
          <div
            ref={scrollContainerRef}
            className=" flex items-center overflow-y-hidden scrollbar-hide gap-[0.2rem] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] p-[0.7rem] bg-transparent outline-none rounded-[0.5rem] "
          >
            {propert.map((i, idx) => {
              return (
                <div
                  key={idx}
                  className="border rounded-[0.6rem] bg-[#CCE8E7] flex items-center gap-[0.3rem] h-[2rem] px-[0.4rem]"
                >
                  <div className="font-semibold font-">{i}</div>
                  <div
                    className="text-[1.3rem] font-bold cursor-pointer "
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
          <button
            onClick={scrollRight}
            className="flex justify-center items-center"
          >
            <span className=" font-bold material-symbols-outlined">
              keyboard_arrow_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
VendorSelect.propTypes = {
  items: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default VendorSelect;
