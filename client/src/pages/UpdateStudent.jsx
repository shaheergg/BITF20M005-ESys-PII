import React, { useState, useEffect } from "react";
import { CITIES, DEGREES, DEPARTMENTS, GENDERS, BASE_URL } from "../constants";
import SelectBox from "../components/SelectBox";
import Datepicker from "../components/DatePicker";
import { useAuth } from "../context/useAuth";
import { Link, useParams } from "react-router-dom";
const UpdateStudent = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate inputs
    if (
      student.name === "" ||
      student.rollNumber === "" ||
      student.email === "" ||
      student.gender === "" ||
      student.dob === "" ||
      student.city === "" ||
      student.startDate === "" ||
      student.endDate === "" ||
      student.subject === ""
    ) {
      console.log("Please fill all the fields");
      return;
    }

    fetch(BASE_URL + `/api/students/${id}`, {
      method: "PUT",
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

  useEffect(() => {
    const fetchStudent = () => {
      fetch(BASE_URL + `/api/students/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((d) => {
          setStudent(d.data);
          console.log("student data: ", d);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchStudent();
  }, []);
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
  if (!student) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Update Student</h2>
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
              defaultValue={student.name}
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
                defaultValue={student.rollNumber}
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
                value={student.email}
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
                selected={student.gender}
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
              <Datepicker
                startDate={Date.parse(student.dob)}
                setStartDate={setDob}
              />
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
              <SelectBox
                data={CITIES}
                selected={student.city}
                setSelected={setCity}
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
                selected={student.department}
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
              defaultValue={student.subject}
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
              <Datepicker
                startDate={Date.parse(student.startDate)}
                setStartDate={setStartDate}
              />
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
              <Datepicker
                startDate={Date.parse(student.endDate)}
                setStartDate={setEndDate}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start col-span-6 mt-6 gap-x-6">
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
