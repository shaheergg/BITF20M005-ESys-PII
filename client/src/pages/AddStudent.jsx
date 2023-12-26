import React, { useState, useEffect } from "react";
import { CITIES, DEGREES, DEPARTMENTS, GENDERS, BASE_URL } from "../constants";
import SelectBox from "../components/SelectBox";
import Datepicker from "../components/DatePicker";
import { useAuth } from "../context/useAuth";
import { Link, Navigate } from "react-router-dom";
import CreateableSelect from "../components/CreatableSelect";
const AddStudent = () => {
  const [selectedInterest, setSelectedInterest] = useState({
    label: "Select Interest",
    id: 0,
  });
  console.log(selectedInterest);
  const [data, setData] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchInterests = () => {
      fetch(BASE_URL + "/api/interstes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((d) => {
          console.log(d);
          setData(d.data);
        });
    };
    fetchInterests();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate inputs
    if (
      name === "" ||
      rollNumber === "" ||
      email === "" ||
      selectedGender === "" ||
      dob === "" ||
      city.id === 0 ||
      selectedInterest.id === 0 ||
      startDate === "" ||
      endDate === "" ||
      subject === ""
    ) {
      console.log("Please fill all the fields");
      return;
    }

    fetch(BASE_URL + "/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        rollNumber,
        email,
        gender: selectedGender,
        dob,
        city,
        interestName: selectedInterest.label,
        department,
        degree,
        startDate,
        endDate,
        subject,
      }),
    })
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        Navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });

    // empty inputs
    setName("");
    setRollNumber("");
    setEmail("");
    setSubject("");
    window.location.href = "/students";
  };

  console.log("AddStudents: ", selectedInterest);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGender, setSelectedGender] = useState(GENDERS[0]);
  const [dob, setDob] = useState(new Date());
  const [city, setCity] = useState(CITIES[0]);
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [degree, setDegree] = useState(DEGREES[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [subject, setSubject] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Add Student</h2>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="full-name"
              id="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Roll Number
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <input
                type="text"
                name="roll-number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                id="roll-number"
                autoComplete="given-roll-number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email Address
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <input
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="given-email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Gender
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <SelectBox
                data={GENDERS}
                selected={selectedGender}
                setSelected={setSelectedGender}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date Of Birth
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <Datepicker startDate={dob} setStartDate={setDob} />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <SelectBox data={CITIES} selected={city} setSelected={setCity} />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Interest
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <CreateableSelect
                setData={setData}
                data={data}
                interest={selectedInterest}
                setInterest={setSelectedInterest}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Department
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <SelectBox
                data={DEPARTMENTS}
                selected={department}
                setSelected={setDepartment}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Degree Title
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <SelectBox
                data={DEGREES}
                selected={degree}
                setSelected={setDegree}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Subject
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              autoComplete="given-subject"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Start Date
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <Datepicker startDate={startDate} setStartDate={setStartDate} />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            End Date
          </label>
          <div className="mt-2">
            <div className="mt-2">
              <Datepicker startDate={endDate} setStartDate={setEndDate} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Link
            to="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
