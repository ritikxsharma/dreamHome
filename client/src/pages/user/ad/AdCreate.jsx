import React, { useState } from "react";
import Tabs from "../../../components/navigation/Tabs";
import { useNavigate } from "react-router-dom";

const AdCreate = () => {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);

  return (
    <>
      <div>
        <h1 className="display-1 bg-primary text-light p-5">Ad Create</h1>
        <Tabs />

        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-15%" }}
        >
          <div className="card-deck">
            <button className="card" type="button">
              <img className="card-img-top" src="..." alt="For Sale" />
              <div className="card-body">
                <h5 className="card-title">Sell Your Property</h5>
                <p className="card-text">
                  Looking to sell your property? Reach thousands of potential
                  buyers and get the best value for your property quickly and
                  easily. Post your ad today!
                </p>
              </div>
            </button>

            <button className="card">
              <img className="card-img-top" src="..." alt="Rent" />
              <div className="card-body">
                <h5 className="card-title">Rent Out Your Property</h5>
                <p className="card-text">
                  List your property for rent and connect with verified tenants.
                  Make your rental process seamless and hassle-free!
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdCreate;
