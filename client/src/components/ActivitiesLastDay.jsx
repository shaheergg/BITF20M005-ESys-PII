import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/useAuth";
import { LineChart } from "./LineChart";

const ActivitiesLastDay = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    fetch(BASE_URL + "/api/activities-last-day", {
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
        console.log("Last day activity", data);
        setData(data.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <div className="col-span-6 p-4 bg-gray-100 rounded">
      <LineChart xAxis="Day" yAxis={"Count"} data={data} />
    </div>
  );
};

export default ActivitiesLastDay;
