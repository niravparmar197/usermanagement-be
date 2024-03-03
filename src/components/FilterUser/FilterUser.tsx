import React, { useState } from "react";

type FilterUserProps = {
  getUserFilterValue: (filterValue: string) => void;
};

const FilterUser = ({ getUserFilterValue }: FilterUserProps) => {
  const [filterUserVal, setFilterUserVal] = useState("all");
  const handleFilterUserChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterUserVal(e.target.value);
    getUserFilterValue(e.target.value);
  };
  return (
    <select
      onChange={handleFilterUserChanges}
      value={filterUserVal}
      className="filter-user"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
    </select>
  );
};

export default FilterUser;
