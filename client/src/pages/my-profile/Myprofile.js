import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import "./Myprofile.css";
import { FaUpload } from "react-icons/fa";
const EDIT_PROFILE = gql`
  mutation Mutation($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;

const GET_ME = gql`
  query Me {
    me {
      name
      username
      img
      _id
    }
  }
`;

const DOMAIN = "http://localhost:80";

function Myprofile() {
  const [isshowReqMessage, setIsshowReqMessage] = useState(false);
  const [EditME] = useMutation(EDIT_PROFILE);
  const { data, refetch, loading } = useQuery(GET_ME);
  const [meData, setMeData] = useState("");
  const [preview, setPreview] = useState();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    async function fetch() {
      setMeData(data);
      setName(data?.me?.name);
      await refetch();
      // await setFile(data?.me?.img);
    }
    fetch();
  }, [loading]);

  console.log(data);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (meData?.me?.img === null || meData?.me?.name === "") {
      setIsshowReqMessage(true);
    }
    console.log(file);
    try {
      const res = await EditME({
        variables: {
          "name": name,
          "img": file
        },
      });
      await refetch();
      console.log(res);
    } catch (error) {
      return alert(error);
    }
  };
  // const imageHandler = (e) => ;

  if(loading) return <h1>Loading...</h1>
  return (
    <form onSubmit={submitHandler}>
      <div className="ui centered card">
        <div className="image">
          <img
            src={`${DOMAIN}/${data.me.img}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/unknown-person.png";
            }}
          />
        </div>
        <div className="ui small basic icon buttons"></div>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          id="upload-file"
          className="upload-file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <label htmlFor="upload-file">
          <div className="upload-icon">
            <FaUpload id="icon" />
          </div>
        </label>

        <div className="content">
          <input
            className="header"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {meData?.me?.name.trim().length === 0 ? (
            <span className="formGroup-required" style={{ margin: "auto" }}>
              This field is required
            </span>
          ) : (
            ""
          )}
        </div>
        {file === null ? (
          <span className="formGroup-required" style={{ margin: "auto" }}>
            please upload an image
          </span>
        ) : (
          ""
        )}
        <button
          disabled={file === null || meData?.me?.name === "" ? true : false}
          className="ui bottom attached button"
        >
          <i className="edit icon"></i>
          edit
        </button>
      </div>
    </form>
  );
}

export default Myprofile;
