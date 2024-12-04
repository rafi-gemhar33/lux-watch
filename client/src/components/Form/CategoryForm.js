import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-75" // Adjust the width with w-75 (or use other classes like w-50, w-25, etc.)
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
