import React from "react";
import CreatableSelect from "react-select/creatable";

const CreateableSelect = ({ data, interest, setInterest }) => {
  const formatData = () => {
    console.log("interests", data);
    return data.map((item) => {
      return { label: item.name, value: item.id };
    });
  };
  console.log(formatData);
  const handleChange = (selectedOption) => {
    setInterest(selectedOption);
  };

  console.log("interest", interest);

  return (
    <CreatableSelect
      isClearable
      value={interest}
      options={formatData()}
      onChange={handleChange}
    />
  );
};

export default CreateableSelect;
