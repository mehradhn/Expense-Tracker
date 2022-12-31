import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState, useRef } from "react";
import Dropdown from "react-dropdown";
import Map from "../../components/leaflet/Map";
import "./NewExpense.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { MdLocationOn } from "react-icons/md";
const GET_TAGS = gql`
  query Query {
    me {
      myTags {
        _id
        name
        color
      }
    }
  }
`;

const CREATE_TAGS = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
    }
  }
`;
const NewExpense = () => {
  const { data, error, loading } = useQuery(GET_TAGS);
  const [value, setvalue] = useState([]);
  const [tagStore, setTagStore] = useState([]);
  const [amount, setAmount] = useState(0);
  const [zone, setZone] = useState(0);
  const [neighbour, setNeighbour] = useState("");
  const [Faddress, setFAddress] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const mapRef = useRef();
  const [CreateTags] = useMutation(CREATE_TAGS);
  // console.log(mapRef.current);
  const position = [35.73, 51.4937];

  useEffect(() => {
    if (data) {
      const x = data.me.myTags.map((tag) => {
        return {
          label: tag.name,
          value: tag._id,
        };
      });
      setTagStore(x);
    }
  }, [data]);

  if (loading) return loading;
  const handleOnchange = (val) => {
    setvalue(val);
  };

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>404</h1>;

  const expenseHandler = async () => {
    let tags = value.split(',')
    try {
      const res = await CreateTags({
        variables: {
          data: {
            amount: parseFloat(amount),
            geo: {
              lat: parseFloat(mapRef.current.getCenter().lat),
              lon: parseFloat(mapRef.current.getCenter().lng),
            },
            tags: tags,
            date: date,
            address: {
              MunicipalityZone: parseFloat(zone),
              Neighbourhood: neighbour,
              FormattedAddress: Faddress,
              Place: place,
            },
          },
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-expense-container">
      <div className="ui form segment">
        <div className="field">
          <label>amount</label>
          <input
            placeholder="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />{" "}
          {!amount && (
            <span className="formGroup-required">this field is required</span>
          )}
        </div>
        <div className="field">
          <MultiSelect
            className="dropdown"
            onChange={handleOnchange}
            options={tagStore}
          />
          {!value && (
            <span className="formGroup-required">this field is required</span>
          )}
        </div>

        <div className="two fields">
          <div className="field">
            {" "}
            <label>MunicipalityZone</label>
            <input
              placeholder="MunicipalityZone"
              name="MunicipalityZone"
              type="number"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            />
            {!zone && (
              <span className="formGroup-required">this field is required</span>
            )}
          </div>
          <div className="field">
            {" "}
            <label>Neighbourhood</label>
            <input
              placeholder="Neighbourhood"
              name="Neighbourhood"
              type="text"
              value={neighbour}
              onChange={(e) => setNeighbour(e.target.value)}
            />
            {!neighbour && (
              <span className="formGroup-required">this field is required</span>
            )}
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>FormattedAddress</label>
            <input
              placeholder="FormattedAddress"
              name="FormattedAddress"
              type="text"
              value={Faddress}
              onChange={(e) => setFAddress(e.target.value)}
            />
            {!Faddress && (
              <span className="formGroup-required">this field is required</span>
            )}
          </div>
          <div className="field">
            <label>Place</label>
            <input
              placeholder="Place"
              name="Place"
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            {!place && (
              <span className="formGroup-required">this field is required</span>
            )}
          </div>
        </div>
        <div className="field">
          <input
            type="date"
            name="date-field"
            id="date-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="field">
          <div>
            <MapContainer
              ref={mapRef}
              className="map-container"
              center={position}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MdLocationOn className="icon-map" />
            </MapContainer>
          </div>
        </div>
        <button
          disabled={
            !zone || !place || !Faddress || !neighbour || !amount ? true : false
          }
          onClick={expenseHandler}
          className="ui primary submit button"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default NewExpense;
