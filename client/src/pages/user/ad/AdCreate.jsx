import React, { useState } from "react";
import Tabs from "../../../components/navigation/Tabs";
import { useNavigate } from "react-router-dom";
import getImageURL from "../../../getImageURL";

const AdCreate = () => {
  const [hoveredOption, setHoveredOption] = useState("");

  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    setHoveredOption(e.currentTarget.id);
  };
  const handleMouseLeave = () => {
    setHoveredOption("")
  }

  const renderOptionsBtns = () => {
    return (
      <div className="d-flex justify-content-between p-4">
        <button
          type="button"
          class="btn btn-light"
          onClick={() => navigate(`/ad/create/${hoveredOption}/house`)}
        >
          House
        </button>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => navigate(`/ad/create/${hoveredOption}/land`)}
        >
          Land
        </button>
      </div>
    );
  };

  return (
    <>
      <div>
        <h1 className="display-1 bg-primary text-light p-5 ">Ad Create</h1>
        <Tabs />

        <div
          className="d-flex justify-content-center align-items-center gap-5 p-4 vh-100"
          style={{marginTop: "-9rem"}}
        >
          <div
            className={`card btn btn-success ${
              hoveredOption === "sell" ? "expanded active" : ""
            }`}
            style={{ cursor: "pointer" }}
            id="sell"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="card-img"
              src={getImageURL("forSaleAd")}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Sell Your Property</h5>
              <p className="card-text">
                Looking to sell your property? Reach thousands of potential
                buyers and get the best value for your property quickly and
                easily. Post your ad today!
              </p>
            </div>
            {hoveredOption === "sell" && renderOptionsBtns()}
          </div>

          <div
            className={`card btn btn-success ${
              hoveredOption === "rent" ? "expanded active" : ""
            }`}
            style={{ cursor: "pointer" }}
            id="rent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="card-img"
              src={getImageURL("forRentAd")}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Rent Out Your Property</h5>
              <p className="card-text">
                List your property for rent and connect with verified tenants.
                Make your rental process seamless and hassle-free!
              </p>
            </div>
            {hoveredOption === "rent" && renderOptionsBtns()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCreate;
