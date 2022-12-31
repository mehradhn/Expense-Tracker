import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createtags.css";

const CREATE_TAGS = gql`
  mutation Mutation($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;

const CreateTags = () => {
  const navigate = useNavigate();
  const [isshowReqMessage, setIsshowReqMessage] = useState(false);
  const [create_tags] = useMutation(CREATE_TAGS, {fetchPolicy: "no-cache" });
  const [data, setData] = useState({
    name: "",
    color: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.name.trim().length === 0 || data.color.trim().length === 0) {
      setIsshowReqMessage(true);
    }
    try {
      const {
        data: {
          create_tag: { msg, status },
        },
      } = await create_tags({
        variables: {
          data: data,
        },
      });
      console.log(msg);
      console.log(status);
      if (msg === "ok") {
        window.location.assign(`/dashboard`);
      }
    } catch (error) {
      return alert(error.msg);
    }
  };
  const nameChangeHandler = (e) => {
    setData({ ...data, name: e.target.value });
    setIsshowReqMessage(false);
  };
  const colorChangeHandler = (e) => {
    setData({ ...data, color: e.target.value });
    setIsshowReqMessage(false);
  };
  return (
    <div className="container-tags-grandparent">
      <form onSubmit={submitHandler} className="container-tags" action="">
        <input
          value={data.name}
          onChange={nameChangeHandler}
          className="input-tag"
          type="text"
          placeholder="Tags"
        />
        {!data.name && isshowReqMessage ? (
          <span className="formGroup-required">this field is required</span>
        ) : (
          ""
        )}
        <input
          value={data.color}
          onChange={colorChangeHandler}
          className="input-tag"
          type="text"
          placeholder="color"
        />
        {!data.color && isshowReqMessage ? (
          <span className="formGroup-required">this field is required</span>
        ) : (
          ""
        )}
        <button className="button-tag">add tags</button>
      </form>
    </div>
  );
};

export default CreateTags;
