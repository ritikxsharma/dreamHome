import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const AdForm = ({ action, type }) => {
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    type: "",
    title: "",
    description: "",
    loading: false,
  });

  return (
    <>
      <CurrencyInput
        placeholder="Enter price"
        defaultValue={ad.price}
        className="form-control mb-3"
        onValueChange={(value) => setAd({ ...ad, price: value })}
      />

      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="number of bedrooms"
        value={ad.bedrooms}
        onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
      />

      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="number of bathrooms"
        value={ad.bathrooms}
        onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
      />
      <input
        type="number"
        min="0"
        className="form-control mb-3"
        placeholder="number of carpark"
        value={ad.carpark}
        onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="size of land"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter title"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Enter description"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <button className="btn btn-primary mb-3" type="submit">
        Submit
      </button>
    </>
  );
};

export default AdForm;
