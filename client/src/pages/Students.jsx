import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import StudentModal from "../components/StudentModal";

export default function Students() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]); // Initialize the state with an empty array
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [studentList, setStudentList] = useState([]);
  const [currStudent, setCurrStudent] = useState({});
  useEffect(() => {
    setStudentList(students.slice((page - 1) * pageSize, page * pageSize));
  }, [pageSize, page, students]);
  useEffect(() => {
    fetch(BASE_URL + "/api/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        console.log(data);
        setStudents(data.data);
        setTotalPages(data.data?.length / pageSize);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token, pageSize]);
  console.log(totalPages);
  const deleteStudent = (id) => {
    fetch(BASE_URL + "/api/students/" + Number(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
    window.location.reload();
  };
  function handlePageChange(e) {
    console.log(e.target.value);
    console.log("Page Change");
    setPageSize(e.target.value);
    setTotalPages(students.length / e.target.value);
  }
  function handleNextPage() {
    console.log("Next Page");
    if (page < Math.ceil(totalPages)) setPage(page + 1);
  }
  function handlePreviousPage() {
    console.log("Previous Page");
    if (page > 1) setPage(page - 1);
  }
  function handleLastPage() {
    console.log("Last Page");
    setPage(Math.ceil(totalPages));
  }
  function handleFirstPage() {
    console.log("First Page");
    setPage(1);
  }

  let [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="">
      <div className="flex items-center justify-end gap-4 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold">Page Size: </h2>
          <select
            defaultValue={5}
            onChange={(e) => handlePageChange(e)}
            id="pageSize"
            name="pageSize"
            className="p-1 border-2 rounded"
          >
            <option>5</option>
            <option>10</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFirstPage()}
            className="p-2 text-white bg-indigo-600 rounded hover:indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePreviousPage()}
            className="p-2 text-white bg-indigo-600 rounded hover:indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span className="text-xs font-semibold">
            Page {page} of {Math.ceil(totalPages)}
          </span>
          <button
            onClick={() => handleNextPage()}
            className="p-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => handleLastPage()}
            className="p-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Roll Number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Degree
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Interest
                  </th>
                  <th
                    scope="col"
                    className="relative text-sm py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentList.map((person) => (
                  <tr key={person.email}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                      {person.id}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.rollNumber}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.email}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.department}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.degree}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person?.dob.split("T")[0]}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.city}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.interest.name}
                    </td>
                    <td className="relative flex items-center gap-2 py-4 pl-3 pr-4 text-sm text-right whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/students/${person.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </Link>{" "}
                      <button
                        onClick={() => {
                          setCurrStudent(person);
                          openModal();
                        }}
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View<span className="sr-only">, {person.name}</span>
                      </button>{" "}
                      <button
                        onClick={() => deleteStudent(person.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Delete<span className="sr-only">, {person.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <StudentModal
            isOpen={isOpen}
            closeModal={closeModal}
            student={currStudent}
          />
        </div>
      </div>
    </div>
  );
}
