import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import DropDown from "./DropDown";
import VendorProperty from "./VenderProperty";
import VendorSelect from "./VendorSelect";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const VendorMaterial = () => {
  const [ownerId, setOwnerId] = useState();
  const [street, setStreet] = useState(null);
  const [company, setCompany] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setzip] = useState(null);
  const [state, setState] = useState(null);

  const [country, setCountry] = useState(null);
  useEffect(() => {
    setOwnerId(localStorage.getItem("owner"));
    setStreet(localStorage.getItem("street"));
    setCompany(localStorage.getItem("company"));
    setCity(localStorage.getItem("city"));
    setzip(localStorage.getItem("zip"));
    setState(localStorage.getItem("state"));

    setCountry(localStorage.getItem("country"));
  }, []);
  const Units = [
    { label: "Kg(Kilogram)" },
    { label: "M(Meter)" },
    { label: "2M*1M*20CM" },
  ];
  const Currency = [
    { label: "USD (United States Dollar)" },
    { label: "EUR (Euro)" },
    { label: "JPY (Japanese Yen)" },
    { label: "GBP (British Pound)" },
    { label: "AUD (Australian Dollar)" },
    { label: "CAD (Canadian Dollar)" },
    { label: "CHF (Swiss Franc)" },
    { label: "CNY (Chinese Yuan)" },
    { label: "INR (Indian Rupee)" },
    { label: "MXN (Mexican Peso)" },
  ];

  const options = {
    title: "Available Form*",
    data: [
      { label: "Rod" },
      { label: "Sheet" },
      { label: "Plate" },
      { label: "Wire" },
      { label: "Pipe" },
      { label: "Bar" },
      { label: "Foil" },
      { label: "Tube" },
      { label: "Angle" },
      { label: "Block" },
    ],
  };

  const [cardsData, setCardsData] = useState([{}, {}, {}, {}]); //usefull array
  const handleCardDataChange = (index, data) => {
    const updatedCardsData = [...cardsData];
    updatedCardsData[index] = data;
    setCardsData(updatedCardsData);
  };
  const AddProperty = (e) => {
    e.preventDefault();
    var arr = [...cardsData, {}];
    setCardsData(arr);
  };
  //Data Collection
  const [material_name, setMN] = useState(null);
  const [material_cat, setMC] = useState(null);
  const [addtional_detail, setAD] = useState(null);
  const [material_photo, setMP] = useState(null);

  const [datasheet_pdf, setDP] = useState(null);

  const [supply_quant, setSQ] = useState(null);
  const [supply_quant_unit, setSQU] = useState(null);
  const [supply_lead, setSL] = useState(null);
  const [supply_lead_unit, setSLU] = useState(null);
  const [supply_price, setSP] = useState(null);
  const [supply_curr, setSCY] = useState(null);
  const [supply_curr_unit, setSCYU] = useState(null);
  const [propert, setProp] = useState(null); //supply categori
  const inputRef1 = useRef(null);
  const [matImage, setMatImage] = useState("");

  const getMatCategory = (catItem) => {
    setMC(catItem);
  };
  function previewFiles(photo, name) {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = () => {
      if (name === "material_photo") {
        setMatImage(reader.result);
      }
    };
  }
  const showPhoto = useRef(null);
  const dataName = useRef(null);
  const [pdf_name, setPdf_name] = useState("");
  const handleFileChange = (event, name) => {
    let file;
    if (event.target.files) {
      file = event.target.files[0];
    } else {
      // File dropped
      file = event.dataTransfer.files[0];
      event.preventDefault();
    }

    if (name === "material_photo") {
      setMP(file);
      previewFiles(file, name);
      showPhoto.current.style.display = "flex";
      // console.log(file)
    } else if (name === "datasheet_pdf") {
      setDP(file);
      previewFiles(file, name);
      setPdf_name(file.name);
      dataName.current.style.display = "flex";
    }
  };
  const closePhoto = (name) => {
    if (name === "material_photo") {
      showPhoto.current.style.display = "none";
      setMP(null);
      setMatImage(null);
    } else if (name === "datasheet_pdf") {
      dataName.current.style.display = "none";
      setDP(null);
      // setMatData(null)
    }

    setMP(null);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event, name) => {
    event.preventDefault();
    handleFileChange(event, name);
  };

  const inputRef2 = useRef();

  //Drag and drop1

  //data of propert
  const handlePropert = (arrayData) => {
    setProp(arrayData);
  };
  //data of propert
  const formRef = useRef(null);
  const loader = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (!datasheet_pdf || !material_photo) {
      return handleError("Upload datasheet and photo");
    }
    //properties check
    const isObjectNonEmpty = (obj) => Object.keys(obj).length > 0;
    let emptyCount = 0;
    let nonEmptyCount = 0;

    for (let i = 0; i < 4; i++) {
      if (isObjectNonEmpty(cardsData[i])) nonEmptyCount++;
      else emptyCount++;
    }

    // If more than 4 objects exist, count additional non-empty objects until reaching at least 4 non-empty
    if (cardsData.length > 4) {
      for (let i = 4; i < cardsData.length && nonEmptyCount < 4; i++) {
        if (isObjectNonEmpty(cardsData[i])) nonEmptyCount++;
        else emptyCount++;
      }
    }
    if (nonEmptyCount < 4)
      return handleError(
        `Filled the minimum ${
          4 - nonEmptyCount
        } material properties and empty field is ${emptyCount}`
      );
    //

    const formData = new FormData();
    formData.append("addtype", "material");
    formData.append("material_photo", material_photo);
    formData.append("datasheet_pdf", datasheet_pdf);

    //
    formData.append(
      "basic_detail",
      JSON.stringify({
        material_name: material_name,
        material_cat: material_cat,
        addtional_detail: addtional_detail,
      })
    );

    formData.append(
      "material_properties",
      JSON.stringify({
        material_properties: cardsData,
      })
    );

    formData.append(
      "supply_detail",
      JSON.stringify({
        supply_cat: propert,
        supply_quant: supply_quant,
        supply_quant_unit: supply_quant_unit,
        supply_lead: supply_lead,
        supply_lead_unit: supply_lead_unit,
        supply_price: supply_price,
        supply_curr: supply_curr,
        supply_curr_unit: supply_curr_unit,
      })
    );
    formData.append(
      "vendor_contact",
      JSON.stringify({
        street: street,
        company: company,
        city: city,
        zip: zip,
        state: state,
        country: country,
      })
    );

    // Add owner ID if needed
    formData.append("owner", ownerId);

    try {
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
      if (
        material_photo.size > MAX_FILE_SIZE ||
        datasheet_pdf.size > MAX_FILE_SIZE
      ) {
        return handleError(
          `File size should not exceed 50 MB. ${material_photo.size}`
        );
      }

      loader.current.style.display = "flex";
      setLoading(true);

      const url = "https://matexbackend.vercel.app/api/vendors/history";
      const response = await fetch(url, {
        method: "POST",

        body: formData,
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          loader.current.style.display = "none";
          setLoading(false);
        }, 1000);

        setMN("");
        setMC("");
        setAD("");
        setMP(null);
        setDP(null);
        setSQ("");
        dataName.current.style.display = "none";
        showPhoto.current.style.display = "none";
        formRef.current.reset();
      } else if (error) {
        const details = error?.details[0].message;
        setTimeout(() => {
          loader.current.style.display = "none";
          setLoading(false);
        }, 1000);
        handleError(details);
      } else if (!success) {
        handleError(message);
        setTimeout(() => {
          loader.current.style.display = "none";
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      handleError(error);
      setTimeout(() => {
        loader.current.style.display = "none";
        setLoading(false);
      }, 1000);
    }
  };
  const ResetForm = () => {
    dataName.current.style.display = "none";
    showPhoto.current.style.display = "none";
    setMP(null);
    setDP(null);
  };

  return (
    <div className=" flex-grow xs3:w-[100%] flex flex-col  bg-[#f4fbf7]  ">
      <form
        ref={formRef}
        name="material"
        onSubmit={handleSubmitData}
        className="flex xs0:min-w-[93vw] xs0:max-w-[93vw] xs3:max-w-[100%]  xs3:min-w-[100%] flex-col xs0:px-[0.5rem] xs0:py-[2rem] xs2:p-[0rem]  xs0:absolute xs2:relative bg-[#f4fbf7] gap-[0.8rem] xs3:max-h-[83vh]  "
      >
        <div className="flex   flex-col gap-[0.8rem] overflow-auto scrollbar-hide">
          <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem] bg-[white] ">
            <div className="font-bold text-[1.2rem] ">Basic Detail</div>
            <div className="grid xs3:grid-cols-2 gap-[1rem] ">
              <div>
                <div className="material_name flex flex-col gap-[0.3rem] flex-grow  ">
                  <div className="font-semibold">Material Name*</div>
                  <input
                    type="text"
                    required
                    onChange={(e) => setMN(e.target.value)}
                    className="h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                    placeholder="Ex: Aluminum 6061"
                  />
                </div>
                <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow ">
                  <div className="font-semibold">Material Category*</div>
                  <DropDown getData={getMatCategory} />
                </div>
                <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                  <div className="font-semibold">Additional Detail</div>
                  <textarea
                    type="text"
                    required
                    onChange={(e) => setAD(e.target.value)}
                    className="h-[8rem] resize-none scrollbar-hide text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                    placeholder="Ex: Application details, Processing compatibility..."
                  />
                </div>
              </div>
              <div className="material_img flex-grow flex flex-col gap-[0.5rem] ">
                <div className="font-semibold">
                  Add Material Images (from inventory)
                </div>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "material_photo")}
                  className="flex justify-evenly h-full items-center gap-[0.2rem] p-[0.5rem] border-[4px] border-dashed "
                >
                  <div
                    ref={showPhoto}
                    className="hidden flex-col gap-[0.5rem] items-center"
                  >
                    <img
                      src={matImage}
                      className="w-[8rem] h-[8rem] rounded-[10rem] "
                      alt=""
                    />
                    <span
                      onClick={() => closePhoto("material_photo")}
                      className="bg-[#999999] cursor-pointer text-center p-[0.2rem] w-fit rounded-[0.3rem] font-bold   material-symbols-outlined"
                    >
                      close
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[#006A6A] text-[4rem] material-symbols-outlined">
                      cloud_upload
                    </span>
                    <h1 className="font-bold text-[1.8rem] ">Drag and Drop</h1>
                    <p>(JPEG File)</p>
                    <h2>or</h2>
                    <input
                      type="file"
                      name="material_photo"
                      onChange={(e) => handleFileChange(e, "material_photo")}
                      hidden
                      accept="image/png, image/jpeg"
                      ref={inputRef1}
                    />
                    <button
                      name="material_photo"
                      onClick={(e) => {
                        e.preventDefault();
                        inputRef1.current.click();
                        handleFileChange(e, "material_photo");
                      }}
                      className="flex gap-[1rem] items-center border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem] "
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem] bg-[white] ">
            <div>
              <div className="font-bold text-[1.2rem] ">
                Material Properties
              </div>
              <div>Minimum 4 required</div>
            </div>
            <div className="flex flex-grow gap-[1rem] xs0:flex-col xs2:flex-row  ">
              <div className="property xs2:w-[50%] flex-grow ">
                <div className="h-[21rem] overflow-auto scrollbar-hide">
                  {cardsData.map((_, index) => (
                    <VendorProperty
                      key={index}
                      index={index}
                      handleCardDataChange={handleCardDataChange}
                    />
                  ))}
                </div>
                <div className="pt-[0.8rem] flex  items-center xs0:justify-center xs2:justify-start ">
                  <button
                    onClick={AddProperty}
                    className="flex gap-[1rem] items-center  border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem] "
                  >
                    <span className="material-symbols-outlined">add</span>
                    <div>Add Another Property</div>
                  </button>
                </div>
              </div>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "datasheet_pdf")}
                className="datasheet xs2:w-[50%]  flex-grow flex flex-col gap-[0.5rem] "
              >
                <div className="font-semibold">Add Matarial Datasheet*</div>
                <div className="flex justify-evenly items-center h-[17rem] gap-[0.2rem] p-[0.5rem] border-[4px] border-dashed ">
                  <div
                    ref={dataName}
                    className="hidden flex-col gap-[0.5rem] items-center"
                  >
                    <span className="w-fit px-[0.3rem] py-[0.2rem] rounded-[0.3rem] font-bold text-[1.2rem] border ">
                      {pdf_name}
                    </span>
                    <span
                      onClick={() => closePhoto("datasheet_pdf")}
                      className="bg-[#999999] cursor-pointer text-center p-[0.2rem] w-fit rounded-[0.3rem] font-bold   material-symbols-outlined"
                    >
                      close
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[#006A6A] text-[4rem] material-symbols-outlined">
                      cloud_upload
                    </span>
                    <h1 className="font-bold text-[1.8rem] ">Drag and Drop</h1>
                    <p>(PDF File)</p>
                    <h2>or</h2>
                    <input
                      name="datasheet_pdf"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, "datasheet_pdf")}
                      hidden
                      ref={inputRef2}
                    />
                    <button
                      name="datasheet_pdf"
                      onClick={(e) => {
                        e.preventDefault();
                        inputRef2.current.click();
                        handleFileChange(e, "datasheet_pdf");
                      }}
                      className="flex gap-[1rem] items-center border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem] "
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.8rem] bg-[white]  p-[1rem] rounded-[1rem]">
            <div className="font-bold text-[1.2rem] ">Supply Details</div>
            <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem]  ">
              <div className="flex flex-col ">
                <VendorSelect items={options} onSelect={handlePropert} />
                <div className="grid xs2:grid-cols-2   gap-[1rem] ">
                  <div className="addition_detail  flex flex-col gap-[0.3rem] flex-grow  ">
                    <div className="font-semibold">Minimum Order Quantity</div>
                    <input
                      type="number"
                      required
                      onChange={(e) => setSQ(e.target.value)}
                      className="h-[3.5rem] w-[100%] text-[1.2rem]   font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                      placeholder="Minimum Order Quantity"
                    />
                  </div>
                  <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                    <div className="font-semibold">Unit</div>
                    <input
                      type="text"
                      required
                      onChange={(e) => setSQU(e.target.value)}
                      className="h-[3.5rem] w-[100%]  text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                      placeholder="Unit"
                    />
                  </div>
                  <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                    <div className="font-semibold">Lead Time</div>
                    <input
                      type="number"
                      required
                      onChange={(e) => setSL(e.target.value)}
                      className="h-[3.5rem] w-[100%] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                      placeholder="Lead Time"
                    />
                  </div>
                  <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                    <div className="font-semibold">Unit</div>
                    <input
                      type="text"
                      required
                      onChange={(e) => setSLU(e.target.value)}
                      className="h-[3.5rem] w-[100%] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                      placeholder="Unit"
                    />
                  </div>
                </div>
              </div>
              <div className="flex xs0:flex-col xs2:flex-row gap-[1rem] justify-between ">
                <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                  <div className="font-semibold">Price</div>
                  <input
                    type="number"
                    required
                    onChange={(e) => setSP(e.target.value)}
                    className="h-[3.5rem] w-[100%] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                    placeholder="Price"
                  />
                </div>
                <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow ">
                  <div className="font-semibold">Currency</div>
                  <select
                    name="material"
                    id="material"
                    required
                    onChange={(e) => setSCY(e.target.value)}
                    className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  >
                    <option value="hidden" disabled selected hidden>
                      Choose the currency
                    </option>
                    {Currency.map((i, idx) => {
                      return (
                        <option key={idx} value={i.label}>
                          {i.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow ">
                  <div className="font-semibold">Per Unit</div>
                  <select
                    name="material"
                    id="material"
                    required
                    onChange={(e) => setSCYU(e.target.value)}
                    className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  >
                    <option value="hidden" disabled selected hidden>
                      Unit
                    </option>
                    {Units.map((i, idx) => {
                      return (
                        <option key={idx} value={i.label}>
                          {i.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[0.7rem] ">
          <button
            type="submit"
            className="bg-[#006A6A] flex-1 flex flex-grow gap-[1rem]  text-[#ffffff] justify-center font-semibold items-center border-[0.15rem] border-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
          >
            Add Material
          </button>
          <button
            onClick={ResetForm}
            type="reset"
            className="flex-1 flex flex-grow gap-[1rem] text-[#3F4948] justify-center font-semibold items-center border-[0.15rem] border-[#3F4948] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
          >
            Reset
          </button>
        </div>
      </form>
      <div
        ref={loader}
        className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#acacaca6] hidden justify-center items-center  "
      >
        <div className=" min-w-[20rem] min-h-[20rem] flex justify-center items-center ">
          <div>
            {loading ? (
              <ClipLoader
                color={"#09ff36"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <h1>hello</h1>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorMaterial;
