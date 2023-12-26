import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { BASE_URL } from "../constants";
function InterestStat() {
  const { token } = useAuth();
  const [topInterests, setTopInterests] = useState([]);
  const [bottomInterests, setBottomInterests] = useState([]);
  useEffect(() => {
    fetch(BASE_URL + "/api/interests/top-5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTopInterests(data.data));
  }, []);

  useEffect(() => {
    fetch(BASE_URL + "/api/interests/bottom-5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBottomInterests(data.data));
  }, []);
  console.log(bottomInterests);
  return (
    <div className="col-span-3 p-4 space-y-4 rounded bg-gray-50">
      <div>
        <span className="font-semibold">Top 5 interests</span>
        <div className="flex flex-wrap items-center gap-2 py-2">
          {topInterests.map((interest) => (
            <div
              key={interest.id}
              className="px-2 py-1 text-xs bg-gray-200 rounded"
            >
              {interest.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="font-semibold">Bottom 5 interests</span>
        <div className="flex flex-wrap items-center gap-2 py-2">
          {bottomInterests.map((interest) => (
            <div
              key={interest.id}
              className="px-2 py-1 text-xs bg-gray-200 rounded"
            >
              {interest.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterestStat;
