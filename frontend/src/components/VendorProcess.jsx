import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ProcessCostDetail from "./ProcessCostDetail";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

import DropDownProcess from "./DropDownProcess";
const VendorProcess = () => {
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

  const [addYourMaterial, setAddYourMaterial] = useState([]);

  const [cardIds, setCardIds] = useState([1]); // Initial array with one card ID
  const [cardDataArray, setCardDataArray] = useState([]);

  const handleAddCard = (e) => {
    e.preventDefault();
    setCardIds((prevIds) => [...prevIds, prevIds.length + 1]);
  };

  const handleDataChange = (id, data) => {
    setCardDataArray((prevData) => {
      const updatedData = [...prevData];
      const index = updatedData.findIndex((item) => item.id === id);

      if (index === -1) {
        updatedData.push({ id, ...data });
      } else {
        updatedData[index] = { id, ...data };
      }

      return updatedData;
    });
  };

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const [otherMat, setOtherMat] = useState([
    "Aluminum 6061",
    "Copper C110",
    "Steel S235",
    "Brass C360",
    "Titanium Grade 5",
    "Aluminum 6061",
    "Copper C110",
    "Steel S235",
    "Brass C360",
    "Titanium Grade 5",
    "Aluminum 6061",
    "Copper C110",
    "Steel S235",
    "Brass C360",
    "Titanium Grade 5",
    "Aluminum 6061",
    "Copper C110",
    "Steel S235",
    "Brass C360",
    "Titanium Grade 5",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://matexbackend.vercel.app/api/vendors/allMaterial"
        );
        const data = await response.json();

        const materialNames = data
          .map((item) => item?.basic_detail?.material_name) // Map to extract material_name
          .filter((name) => name && !otherMat.includes(name)); // Filter valid names and avoid duplicates

        setOtherMat((prevMat) => [...prevMat, ...materialNames]);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "https://matexbackend.vercel.app/api/vendors/allMaterial"
        );
        const data = await response.json();

        const allMaterialNames = data
          .filter((item) => item.owner === ownerId) // Find vendors that match your criteria
          .flatMap((vendor) => vendor.basic_detail.material_name);

        setAddYourMaterial((prevState) => {
          const newMaterials = allMaterialNames
            .filter(
              (material) =>
                !prevState.some((existing) => existing.label === material)
            ) // Avoid duplicates
            .map((name) => ({ label: name }));

          return [...prevState, ...newMaterials];
        });
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [ownerId]);

  const handleSelectChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      // Filter options based on input
      const matches = otherMat.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(matches);
    } else {
      setFilteredOptions([]); // Clear suggestions if input is empty
    }
  };

  const handleOptionClick = (selectedOption) => {
    setInputValue(selectedOption);
    setFilteredOptions([]);

    if (
      selectedOption &&
      !addYourMaterial.some((item) => item.label === selectedOption)
    ) {
      setAddYourMaterial([...addYourMaterial, { label: selectedOption }]);
    }
  };

  const [process_name, setPN] = useState(null);
  const [process_cat, setPC] = useState(null);
  const [addition_data, setAD] = useState(null);
  const [photo_url, setPU] = useState(null);

  const [process_para, setPP] = useState(null);
  const [operation_condi, setOC] = useState(null);
  const [volume_cap, setVC] = useState(null);
  const [lead_time, setLT] = useState(null);

  const getMatCategory = (catItem) => {
    setPC(catItem);
  };
  //drag and drop
  const [matImage, setMatImage] = useState("");
  function previewFiles(photo, name) {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = () => {
      if (name === "process_photo") {
        setMatImage(reader.result);
      }
    };
  }
  const inputRef1 = useRef(null);
  const showPhoto = useRef(null);
  const handleFileChange = (event, name) => {
    let file;
    if (event.target.files) {
      file = event.target.files[0];
    } else {
      file = event.dataTransfer.files[0];

      event.preventDefault();
    }

    if (name === "process_photo") {
      setPU(file);
      previewFiles(file, name);
      showPhoto.current.style.display = "flex";
    }
  };
  const closePhoto = () => {
    showPhoto.current.style.display = "none";
    setPU(null);
    setMatImage(null);

    setPU(null);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event, name) => {
    event.preventDefault();
    handleFileChange(event, name);
  };
  const formRef = useRef(null);
  const loader = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (!photo_url) {
      return handleError("image is not upload");
    }

    const formData = new FormData();
    formData.append("addtype", "process");
    formData.append("photo_url", photo_url);

    // json strings
    formData.append(
      "basic_detail",
      JSON.stringify({
        process_name: process_name,
        process_cat: process_cat,
        addition_data: addition_data,
      })
    );

    formData.append(
      "specification",
      JSON.stringify({
        compactible_mat: inputValue,
        process_para: process_para,
        operation_condi: operation_condi,
      })
    );

    formData.append(
      "production_detail",
      JSON.stringify({
        volume_cap: volume_cap,
        lead_time: lead_time,
        cost: cardDataArray,
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
    formData.append("owner", ownerId);
    try {
      loader.current.style.display = "flex";
      setLoading(true);
      const url = "https://matexbackend.vercel.app/api/vendors/process-history";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        formRef.current.reset();
        setMatImage(null);
        setTimeout(() => {
          loader.current.style.display = "none";
          setLoading(false);
        }, 1000);
        showPhoto.current.style.display = "none";
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
        setTimeout(() => {
          loader.current.style.display = "none";
          setLoading(false);
        }, 1000);
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
    setPU(null);
    showPhoto.current.style.display = "none";
  };

  return (
    <div className=" flex-grow xs3:w-[100%] flex flex-col bg-[#f4fbf7]     ">
      <form
        ref={formRef}
        onSubmit={handleSubmitData}
        className="flex xs0:min-w-[93vw] xs0:max-w-[93vw] xs3:max-w-[100%]  xs3:min-w-[100%] flex-col xs0:px-[0.5rem] xs0:py-[2rem] xs2:p-[0rem] xs0:absolute xs2:relative bg-[#f4fbf7] gap-[0.8rem] xs3:max-h-[83vh] "
        action=""
      >
        <div className="flex flex-col gap-[0.8rem] overflow-auto scrollbar-hide">
          <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem] bg-[white] ">
            <div className="font-bold text-[1.2rem] ">Basic Detail</div>
            <div className="grid xs2:grid-cols-2 gap-[1rem] ">
              <div>
                <div className="material_name flex flex-col gap-[0.3rem] flex-grow  ">
                  <div className="font-semibold">Process Name*</div>
                  <input
                    type="text"
                    required
                    className="h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                    placeholder="Ex: TIG Welding"
                    onChange={(e) => setPN(e.target.value)}
                  />
                </div>
                <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow ">
                  <div className="font-semibold">Process Category*</div>
                  <DropDownProcess getData={getMatCategory} />
                </div>
                <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                  <div className="font-semibold">Additional Detail</div>
                  <textarea
                    type="text"
                    required
                    onChange={(e) => setAD(e.target.value)}
                    className="h-[8rem] resize-none scrollbar-hide text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                    placeholder="Ex: Application details, Equipment details..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[0.3rem] ">
                <div className="font-semibold">
                  Add Process/Machinery Images
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "process_photo")}
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
                      onClick={closePhoto}
                      className="bg-[#999999] cursor-pointer text-center p-[0.2rem] w-fit rounded-[0.3rem] font-bold   material-symbols-outlined"
                    >
                      close
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center ">
                      <span className="text-[#006A6A] text-[4rem] material-symbols-outlined">
                        cloud_upload
                      </span>
                      <h1 className="font-bold text-[1.8rem] ">
                        Drag and Drop
                      </h1>
                      <p>(JPEG or PDF)</p>
                      <h2 className="font-semibold">or</h2>
                      <input
                        type="file"
                        name="process_photo"
                        onChange={(e) => handleFileChange(e, "process_photo")}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef1}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          inputRef1.current.click();
                          handleFileChange(e, "process_photo");
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
          </div>
          <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem] bg-[white] ">
            <div>
              <div className="font-bold text-[1.2rem] ">Specification</div>
            </div>
            <div className="grid xs2:grid-cols-2 gap-[1rem] ">
              <div className="material_cateroy flex flex-col gap-[0.3rem] flex-grow ">
                <div className="font-semibold">Your Materials*</div>
                <select
                  name="material"
                  id="material"
                  required
                  value={inputValue}
                  onChange={handleSelectChange}
                  className="w-[100%] h-[3.5rem] text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                >
                  <option value="hidden" selected hidden>
                    Aluminum 6061
                  </option>
                  {addYourMaterial.map((i, idx) => {
                    return (
                      <option key={idx} value={i.label}>
                        {i.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="material_name flex flex-col gap-[0.3rem] flex-grow  ">
                <div className="font-semibold">Search Other Material</div>
                <div className="h-[3.5rem] text-[1.2rem] flex items-center font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] ">
                  <span className="text-[2.2rem] material-symbols-outlined">
                    search
                  </span>
                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Aluminum 6061"
                    className="bg-transparent px-[0.5rem] w-full outline-none "
                  />
                  {filteredOptions.length > 0 && (
                    <ul className="absolute  top-[6rem] w-[30rem] bg-white border-[#6F7979] border-[0.15rem] rounded-[0.5rem] shadow-lg max-h-[12rem] overflow-y-auto z-10">
                      {filteredOptions.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleOptionClick(item)}
                          className="px-[0.7rem] py-[0.5rem] hover:bg-[#CCE8E7] cursor-pointer text-[1.2rem] text-[#333]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                <div className="font-semibold">Add Process Parameters*</div>
                <textarea
                  type="text"
                  required
                  onChange={(e) => setPP(e.target.value)}
                  className="h-[8rem] resize-none scrollbar-hide text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  placeholder="Ex: Dimensional Tolerance, Surface Finish, Workpiece size..."
                />
              </div>
              <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                <div className="font-semibold">Operating Conditions</div>
                <textarea
                  type="text"
                  required
                  onChange={(e) => setOC(e.target.value)}
                  className="h-[8rem] resize-none scrollbar-hide text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  placeholder="Ex: Temperature Range, Environmental Suitability..."
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[0.8rem]  p-[1rem] rounded-[1rem] bg-[white] ">
            <div className="font-bold text-[1.2rem] ">Production Details</div>
            <div className="grid xs2:grid-cols-2 gap-[1rem] ">
              <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                <div className="font-semibold">Production Volume Capacity</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setVC(e.target.value)}
                  className="h-[3.5rem]  text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  placeholder="Ex: High Volume"
                />
              </div>
              <div className="addition_detail flex flex-col gap-[0.3rem] flex-grow  ">
                <div className="font-semibold">Lead Time for Processing*</div>
                <input
                  type="text"
                  required
                  onChange={(e) => setLT(e.target.value)}
                  className="h-[3.5rem]  text-[1.2rem] font-semibold text-[#969494] px-[0.7rem] bg-transparent border-[#6F7979] border-[0.15rem] outline-none rounded-[0.5rem] "
                  placeholder="Ex: 3-5 Business Days"
                />
              </div>
            </div>
            <div className="font-semibold">Cost Detail</div>
            <div>
              {cardIds.map((id) => (
                <ProcessCostDetail
                  key={id}
                  id={id}
                  onDataChange={handleDataChange}
                />
              ))}
            </div>
            <div className="flex gap-[2rem]">
              <div className="pt-[0.8rem] flex items-center ">
                <button
                  onClick={handleAddCard}
                  className="flex gap-[1rem] items-center border-[0.15rem]  border-[#3F4948] font-semibold text-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem] "
                >
                  <span className="material-symbols-outlined">add</span>
                  <div>Add Another Cost</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[0.7rem] ">
          <button
            type="submit"
            className="bg-[#006A6A] flex-1 flex flex-grow gap-[1rem]  text-[#ffffff] justify-center font-semibold items-center border-[0.15rem] border-[#006A6A] rounded-[2rem] px-[1.5rem] py-[0.6rem]"
          >
            Add Process
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

export default VendorProcess;
