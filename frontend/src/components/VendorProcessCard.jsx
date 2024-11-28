import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VendorProcessCard = ({ items }) => {
  return (
    <div className="cardForItem rounded-[1rem] bg-[#F4FBFA] flex p-[1rem] gap-[1rem]">
      <Link to={`/material/${items._id}`} target="blank">
        <img
          src={items.photo_url}
          alt={"thd"}
          className="materialPhot w-[11rem] h-fit rounded-[0.5rem] "
        />
      </Link>
      <div className="flex-grow flex flex-col gap-[0.7rem]">
        <div className="materialAndSave flex justify-between ">
          <Link to={`/material/${items._id}`} target="blank">
            <div className="materia font-semibold text-[1.8rem] ">
              {items.basic_detail.process_name}
            </div>
          </Link>
        </div>
        <div className="typeOfMateial self-start ">
          {items.basic_detail.process_cat}
        </div>
        <div className="price self-start font-bold ">&#8377;120/kg</div>
      </div>
    </div>
  );
};

VendorProcessCard.propTypes = {
  items: PropTypes.array.isRequired,
};
export default VendorProcessCard;
