import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import "./MyTags.css";

const MY_TAGS = gql`
  query Me {
    me {
      myTags {
        _id
        name
        color
      }
    }
  }
`;

const EDIT_TAGS = gql`
  mutation Edit_tag($id: ID!, $data: tagInfo!) {
    edit_tag(_id: $id, data: $data) {
      status
      msg
    }
  }
`;

const MyTags = () => {
  const [isshowReqMessage, setIsshowReqMessage] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { loading, data, refetch } = useQuery(MY_TAGS);
  const [edit] = useMutation(EDIT_TAGS);
  const [tags, setTags] = useState([]);
  const [dataEdit, setDataEdit] = useState(tags);

  useEffect(() => {
    async function fetch() {
      setTags(data?.me?.myTags);
    }
    fetch();
  }, [data]);

  const nameChangeHandler = (e, index) => {
    const clone = JSON.parse(JSON.stringify(tags));
    clone[index].name = e.target.value;
    setTags(clone);
  };
  const colorChangeHandler = (e, index) => {
    const clone = JSON.parse(JSON.stringify(tags));
    clone[index].color = e.target.value;
    setTags(clone);
  };

  const editTagHandler = async (item) => {
    const d = { name: item.name, color: item.color };
    try {
      const res = await edit({
        variables: {
          "id": item._id,
          "data": d,
        },
      });
      console.log(res);
      window.location.assign(`/dashboard`); 
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="ui middle aligned divided list">
        <div className="item">
          <div className="content">
            <strong>You Can Edit your Tag</strong>
          </div>
        </div>

        {tags?.map((item, index) => {
          return (
            <div key={index} className="item">
              <div className="right floated content">
                <button
                  onClick={() => editTagHandler(item)}
                  className="ui button"
                  disabled={
                    item.name.trim().length === 0 ||
                    item.color.trim().length === 0
                      ? true
                      : false
                  }
                >
                  Edit
                </button>
              </div>
              <div className="content">
                <div className="input-content">
                  name:{" "}
                  <input
                    value={item.name}
                    onChange={(e) => nameChangeHandler(e, index)}
                  />
                  {item.name.trim().length === 0 && (
                    <span
                      className="formGroup-required"
                      style={{ margin: "auto" }}
                    >
                      tag is required
                    </span>
                  )}
                </div>
                <div className="input-content">
                  color:{" "}
                  <input
                    value={item.color}
                    onChange={(e) => colorChangeHandler(e, index)}
                  />
                  {item.color.trim().length === 0 && (
                    <span
                      className="formGroup-required"
                      style={{ margin: "auto" }}
                    >
                      color is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTags;
