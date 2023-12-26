import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { BASE_URL } from "../constants";
const DistinctInterests = () => {
  const { token } = useAuth();
  const [distinctInterestsCount, setDistinctInterestsCount] = useState(0);
  useEffect(() => {
    fetch(BASE_URL + "/api/interests/distinct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDistinctInterestsCount(data.data.length));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center col-span-3 gap-4 p-4 bg-gray-100 rounded">
      <span className="font-semibold">Distinct Interests</span>
      <div className="">
        <h2 className="font-semibold text-9xl">{distinctInterestsCount}</h2>
      </div>
    </div>
  );
};

export default DistinctInterests;
