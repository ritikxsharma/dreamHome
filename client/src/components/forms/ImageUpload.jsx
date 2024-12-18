import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";

const ImageUpload = ({ ad, setAd }) => {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      console.log(files);

      if (files?.length) {
        setAd({ ...ad, uploading: true });
        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  const res = await axios.post("/images/upload-image", {
                    image: uri,
                  });

                  setAd((prev) => ({
                    ...prev,
                    photos: [...prev.photos, res.data],
                  }));
                } catch (error) {
                  console.log(error);
                  setAd({ ...ad, uploading: false });
                }
              }
            );
          });
        });
      }
      console.log(ad);
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, uploading: true });
    } catch (error) {
      setAd({ ...ad, uploading: false });
      console.log(error);
    }
  };

  return (
    <>
      <label className="btn btn-light mb-2">
        Upload Photos
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          hidden
          onChange={handleUpload}
        />
      </label>
    </>
  );
};

export default ImageUpload;
