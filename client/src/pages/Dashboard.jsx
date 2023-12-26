import React from "react";
import InterestStat from "../components/InterestStat";
import DistinctInterests from "../components/DistinctInterests";
import DegreeDistribution from "../components/DegreeDistribution";
import DepartmentDistribution from "../components/DepartmentDistribution";
import GenderDistribution from "../components/GenderDistribution";
import StudentStatus from "../components/StudentStatus";
import ProvincialDistribution from "../components/ProvincialDistribution";
import Last30DaysActivity from "../components/Last30DaysActivity";
import ActivitiesLastDay from "../components/ActivitiesLastDay";
const Dashboard = () => {
  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-2">
        <InterestStat />
        <DistinctInterests />
        <StudentStatus />
        <DegreeDistribution />
        <DepartmentDistribution />
        <GenderDistribution />
        <ProvincialDistribution />
        <Last30DaysActivity />
        <ActivitiesLastDay />
      </div>
    </div>
  );
};

export default Dashboard;
