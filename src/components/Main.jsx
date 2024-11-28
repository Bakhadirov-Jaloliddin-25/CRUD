import React, { useEffect, useRef, useState } from "react";
import { COUNTRY_LIST } from "../static";
import { v4 as uuidv4 } from "uuid";
import USER from "../assets/user.png";
import { PatternFormat } from "react-number-format";

const Main = () => {
  const [username, setUsername] = useState("");
  const password = useRef(null);
  const fname = useRef(null);
  const lname = useRef(null);
  const [country, setCountry] = useState(COUNTRY_LIST[0]?.code || "");
  const [gender, setGender] = useState("Male");
  const birthdate = useRef(null);
  const [phone, setPhone] = useState("");

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      let updatedUser = {
        id: edit.id,
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country,
        gender,
        birthdate: birthdate.current.value,
        phone,
      };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
    } else {
      const newUser = {
        id: uuidv4(),
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country,
        gender,
        birthdate: birthdate.current.value,
        phone,
      };
      setData((prev) => [...prev, newUser]);
    }
    setUsername("");
    fname.current.value = "";
    lname.current.value = "";
    password.current.value = "";
    setCountry(COUNTRY_LIST[0]?.code || "");
    setGender("");
    birthdate.current.value = "";
    setPhone("");
  };

  const handleDelete = function (id) {
    if (confirm("are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setUsername(item.username);
    password.current.value = item.password;
    fname.current.value = item.fname;
    lname.current.value = item.lname;
    setCountry(item.country);
    setEdit(item);
    setGender(item.gender);
    birthdate.current.value = item.birthdate;
    setPhone(item.phone);
  };

  return (
    <div onSubmit={handleSubmit} className="flex gap-5">
      <form className="w-80 p-5 bg-[#daf4f5] h-screen rounded-xl shadow-xl">
        <input
          ref={fname}
          required
          className="w-full h-10 px-3 mb-3 bg-[#c4dce0] rounded-lg shadow-md"
          type="text"
          placeholder="First Name"
        />
        <input
          ref={lname}
          required
          className="w-full h-10 px-3 mb-3 bg-[#c4dce0] rounded-lg shadow-md"
          type="text"
          placeholder="Last Name"
        />
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="w-full h-10 px-3 mb-3 bg-[#c4dce0] rounded-lg shadow-md"
          type="text"
          placeholder="Username"
        />
        <input
          ref={password}
          required
          className="w-full h-10 px-3 mb-3 bg-[#c4dce0] rounded-lg shadow-md"
          type="password"
          placeholder="Password"
          minLength={6}
        />
        <select
          onChange={(event) => setCountry(event.target.value)}
          id="country-select"
          name="country"
          className="w-full h-10 px-3 mb-3 bg-[#c4dce0] rounded-lg shadow-md"
        >
          <option value="">Select your country</option>
          {COUNTRY_LIST.map((country) => (
            <option key={country.id} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        <div className="flex justify-around mb-3 bg-[#abcecf] h-10 rounded-xl">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={() => setGender("Male")}
              className="mr-2"
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={() => setGender("Female")}
              className="mr-2"
            />
            Female
          </label>
        </div>
        <input
          ref={birthdate}
          type="date"
          className="w-full mb-3 bg-white h-10 rounded-lg shadow-md"
        />
        <PatternFormat
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full mb-3 bg-white h-10 text-center rounded-lg shadow-md"
          format="+998 (##) ### ## ##"
          allowEmptyFormatting
          mask="_"
        />
        <button className="w-full h-10 px-3 mb-3 bg-[#80a3a2] rounded-lg shadow-md hover:bg-[#6b8b8a]">
          Submit
        </button>
      </form>
      <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-72 p-3 shadow-lg bg-green-800 text-center flex flex-col gap-2 rounded-lg"
          >
            <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto overflow-hidden pt-2">
              <img src={USER} alt="user.png" />
            </div>
            <h3>
              {item.fname} {item.lname}
            </h3>
            <h3>{item.username}</h3>
            <p>{item.password.replace(/./g, "*")}</p>
            <p>{item.country}</p>
            <p>{item.gender}</p>
            <p>{item.birthdate}</p>
            <p>{item.phone}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="w-20 bg-[#80a3a2] p-1 rounded-lg shadow-md hover:bg-[#6b8b8a]"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="w-20 bg-[#80a3a2] p-1 rounded-lg shadow-md hover:bg-[#6b8b8a]"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
