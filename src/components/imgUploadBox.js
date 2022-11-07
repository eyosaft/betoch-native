import React, { useState } from "react";
import useStorage from "../Hooks/useStorage";
import "./imgUploadBox.css";

const MAX_COUNT = 5;

const ImgUploadBox = ({ f }) => {
  const [file, setFile] = useState([]);
  const [error, setError] = useState(null);
  const [filePath, setFilePath] = useState([]);
  const types = ["image/png", "image/jpeg"];
  const [fileLimit, setFileLimit] = useState(false);

  const handleChange = (e) => {
    let selected = Array.prototype.slice.call(e.target.files);
    //  let paths = [];
    //   for (let i = 0; i < selected.length; i++) {
    //     paths.push(URL.createObjectURL(selected[i]))
    //   }
    handleUploadFiles(selected);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...file];
    const paths = [...filePath];

    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        paths.push(URL.createObjectURL(file));
        // if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only upload ${MAX_COUNT} photos`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setFile(uploaded);
      setFilePath(paths);
    }
  };

  const removeImage = (e,path) => {
      e.preventDefault();
      filePath.pop(path);
      setFilePath((oldState) => oldState.filter((item) => item.id !== path));
  }

  return (
    <>
      <label className="custom-file-upload">
        <input multiple type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      {filePath &&
        filePath.map((path) => (
          <>
          <img key={path} className="preview" src={path} />
          <button onClick={(e)=>removeImage(e,path)}>delete</button>
          </>
        ))}
     
      {file && f(file)}
    </>
  );
};

export default ImgUploadBox;
