import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useAuth } from "../context/useAuth";
import PieChart from "./PieChart";

const GenderDistribution = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(BASE_URL + "/api/gender-distribution", {
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
        setData(data.data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="col-span-12 p-4 bg-gray-100 rounded">
      <PieChart
        labels={["Gender", "Count"]}
        title={"Gender Distribution"}
        data={data}
      />
    </div>
  );
};

export default GenderDistribution;
