import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { Avatar } from "antd";

const ImageUpload = ({ ad, setAd }) => {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];

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
                    photos: [...prev.photos, res.data.data],
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

      setAd({ ...ad, uploading: false });
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete Image?");
    if (!answer) return;

    try {
      const res = await axios.post("/images/remove-image", file);
      console.log(res.status);
      
      if (res.status === 200) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((photo) => photo.Key !== file.Key),
          uploading: false
        }));
      }
    } catch (error) {
      setAd({ ...ad, uploading: false });
      console.log(error);
    }
  };

  return (
    <>
      <label className="btn btn-primary mb-2">
        {ad.uploading ? "Uploading in process..." : "Upload Photos"}
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          hidden
          onChange={handleUpload}
        />
      </label>
      {ad.photos?.map((photo) => (
        <Avatar
          src={photo?.Location}
          shape="square"
          size="46"
          className="mx-2 mb-2"
          onClick={() => handleDelete(photo)}
        />
      ))}
    </>
  );
};

export default ImageUpload;
