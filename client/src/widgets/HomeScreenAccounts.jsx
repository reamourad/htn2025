import React from 'react';

function HomeScreenAccounts() {
  return (
    <div className="card bg-base-100 w-[900px] shadow-sm p-4">
      <h1 className="text-2xl font-bold mb-4">Current Accounts</h1>

      <table className="table w-full">
        {/* head */}
        <thead className = "text-black">
          <tr className="bg-[#EDF5FF]">            
          <th>Priority</th>
            <th>Account Name</th>
            <th>Estimated Premium</th>
            <th>Primary Risk State</th>
            <th>Line of Business</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>
               <div className="flex flex-col items-center">
                <h1 className="text-sm mb-2 text-green-500 font-bold">High</h1>

            <progress
              className="progress progress-success w-30"
              value="80"
              max="100"
            ></progress>
              </div>

            </td>
            <td>bbtest7</td>
            <td>$4,846,803.30</td>
            <td>CA</td>
            <td>AUTO</td>
            <td>🟡Created</td>
          </tr>
          {/* row 2 */}
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>
              <div className="flex flex-col items-center">
                <h1 className="text-sm mb-2 text-green-500 font-bold">High</h1>

            <progress
              className="progress progress-success w-30"
              value="90"
              max="100"
            ></progress>
              </div>
            </td>
            <td>Colorado State University</td>
            <td>$2,887,133.23</td>
            <td>CO</td>
            <td>COMMERICAL</td>
            <td>🟡Created</td>
          </tr>
          {/* row 3 */}
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>
            <div className="flex flex-col items-center">
                <h1 className="text-sm mb-2 text-red-500 font-bold">Low</h1>

            <progress
              className="progress progress-error w-30"
              value="20"
              max="100"
            ></progress>
              </div>


            </td>
            <td>BrandonB5</td>
            <td>$924,401.40</td>
            <td>TX</td>
            <td>COMMERCIAL</td>
            <td>🟢Completed</td>
          </tr>
          {/* row 4 */}
          <tr className="odd:bg-white even:bg-[#EDF5FF]">
            <td>
            <div className="flex flex-col items-center">
                <h1 className="text-sm mb-2 text-yellow-500 font-bold">Medium</h1>

            <progress
              className="progress progress-warning w-30"
              value="60"
              max="100"
            ></progress>
              </div>



            </td>
            <td>z account 1</td>
            <td>$698,864.43</td>
            <td>CA</td>
            <td>CYBER</td>
            <td>🟡Created</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HomeScreenAccounts;
