import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/useAuth";
const StudentStatus = () => {
  const { token } = useAuth();
  const [studying, setStudying] = useState(null);
  const [graduated, setGraduated] = useState(null);
  const [recentlyEnrolled, setRecentlyEnrolled] = useState(null);
  const [aboutToGraduate, setAboutToGraduate] = useState(null);
  useEffect(() => {
    fetch(BASE_URL + "/api/sutdying", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Response", res);
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        setStudying(data.data?.length);
        console.log("Studying", data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);
  useEffect(() => {
    fetch(BASE_URL + "/api/graduated-students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Response", res);
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        setGraduated(data.data?.length);
        console.log("Studying", data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);
  useEffect(() => {
    fetch(BASE_URL + "/api/recently-enrolled", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        setRecentlyEnrolled(data.data?.length);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);
  useEffect(() => {
    fetch(BASE_URL + "/api/about-to-graduate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json(); // Parse the response JSON
      })
      .then((data) => {
        setAboutToGraduate(data.data?.length);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [token]);
  return (
    <div className="col-span-6 px-4 bg-gray-100 rounded">
      <div className="flow-root mt-2">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    colSpan={"4"}
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Student Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td
                    colSpan={"4"}
                    className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0"
                  >
                    Studying
                  </td>
                  <td
                    colSpan={"1"}
                    className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                  >
                    {studying}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={"4"}
                    className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0"
                  >
                    Graduated Students
                  </td>
                  <td
                    colSpan={"1"}
                    className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                  >
                    {graduated}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={"4"}
                    className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0"
                  >
                    Recently Enrolled Students
                  </td>
                  <td
                    colSpan={"1"}
                    className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                  >
                    {recentlyEnrolled}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={"4"}
                    className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0"
                  >
                    About to Graduate Students
                  </td>
                  <td
                    colSpan={"1"}
                    className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap"
                  >
                    {!aboutToGraduate ? "None" : aboutToGraduate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
