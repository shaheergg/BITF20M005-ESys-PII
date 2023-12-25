import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 text-center">
      <h2 className="text-4xl">
        <span className="font-bold">
          Welcome to the Student Interest System
        </span>
      </h2>
      <p className="text-gray-600">
        Please login to access the Student Interest System
      </p>
      <Link to="/login">
        <button className="flex items-center gap-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Go to Login
          <span>
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
