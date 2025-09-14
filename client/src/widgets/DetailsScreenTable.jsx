import React from 'react';

function DetailsScreenTable() {
  return (
    <div className="card bg-base-100 w-[900px] shadow-sm p-4">
      <h1 className="text-2xl font-bold mt-8 mb-4">Data Overview</h1>
      <table className="table w-full">
        <thead className="text-black">
          <tr className="bg-[#EDF5FF]">
            <th>Category</th>
            <th>Value</th>
            <th>Acceptability</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Tiv</td>
            <td>57,075,450</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Loss Value</td>
            <td>$2,585,536.95</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Total Premium</td>
            <td>$1,375,175.89</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Effective Date</td>
            <td>2024-12-12</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Expiry Date</td>
            <td>2025-12-12</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Oldest Building</td>
            <td>1984</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Construction Type</td>
            <td>Frame</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Type</td>
            <td>Renewal</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>State of Risk</td>
            <td>CA</td>
            <td>Yes</td>
          </tr>
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>Line of Business</td>
            <td>General Liability</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailsScreenTable;
