import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function Students() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]); // Initialize the state with an empty array
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
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);

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

  return (
    <div className="">
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
                {students.map((person) => (
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
                    <td className="relative py-4 pl-3 pr-4 text-sm text-right whitespace-nowrap sm:pr-0">
                      <Link
                        to={`/students/${person.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </Link>{" "}
                      |{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View<span className="sr-only">, {person.name}</span>
                      </a>{" "}
                      |{" "}
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
        </div>
      </div>
    </div>
  );
}
