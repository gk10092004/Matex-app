import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PieChart from "./PieChart";

const MaterialCard = ({ items, onSendData, removeData }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState({});

  const toggleBookmark = (id) => {
    setBookmarkedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the bookmark state for this item
    }));
  };

  const AddBook = () => {
    onSendData(items);
  };
  const RemoveBook = () => {
    removeData(items._id);
  };

  return (
    <div className="cardForItem rounded-[1rem] bg-[#F4FBFA] flex xs0:flex-col xs2:flex-row p-[1rem] gap-[1rem]">
      <Link to={`/material/${items._id}`} target="blank">
        <img
          src={items.material_photo}
          alt={"thd"}
          className="materialPhot xs0:w-[100%] hover:border hover:border-[#c7e7e6] xs2:w-[13rem] xs2:h-[14rem] xs0:h-[15rem] rounded-[0.5rem] "
        />
      </Link>
      <div className="flex-grow flex flex-col gap-[0.7rem]">
        <div className="materialAndSave flex justify-between ">
          <Link to={`/material/${items._id}`} target="blank">
            <div className="materia font-semibold text-[1.8rem] ">
              {items.basic_detail.material_name}
            </div>
          </Link>
          <div onClick={() => toggleBookmark(items._id)}>
            {bookmarkedItems[items._id] ? (
              <span
                onClick={RemoveBook}
                className="text-[2rem] cursor-pointer material-symbols-outlined"
              >
                bookmark_added
              </span>
            ) : (
              <span
                onClick={AddBook}
                className="text-[2rem] cursor-pointer material-symbols-outlined"
              >
                bookmark
              </span>
            )}
          </div>
        </div>
        <div className="typeOfMateial self-start ">
          {items.basic_detail.material_cat}
        </div>
        <div className="price self-start font-bold ">
          {`${items.supply_detail.supply_price}${items.supply_detail.supply_curr}/${items.supply_detail.supply_curr_unit} `}
        </div>
        <div className="materialForm flex justify-between gap-[0.5rem] ">
          <div className=" flex gap-[0.5rem] h-fit flex-wrap items-start ">
            {Array.isArray(items.supply_detail.supply_cat)
              ? items.supply_detail.supply_cat.map((formType, idx) => {
                  return (
                    <>
                      <div
                        key={idx}
                        className="border font-semibold border-[#919191] p-[0.3rem] w-fit rounded-[0.5rem]"
                      >
                        {formType}
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
          <PieChart match={items.total_match} total={items.totalProp_ask} />
        </div>
      </div>
    </div>
  );
};

MaterialCard.propTypes = {
  items: PropTypes.object.isRequired,
  onSendData: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired,
};
export default MaterialCard;
