import React from 'react';

function HomeScreenAccounts() {
  return (
    <div className="card bg-base-100 w-[900px] shadow-sm p-4">
      <h1 className="text-2xl font-bold mb-4">Current Accounts</h1>

      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Priority</th>
            <th>Account Name</th>
            <th>Estimated Premium</th>
            <th>Primary Risk State</th>
            <th>Line of Business</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td>High</td>
            <td>bbtest7</td>
            <td>$4,846,803.30</td>
            <td>CA</td>
            <td>AUTO</td>
            <td>Created</td>
           
          </tr>
          {/* row 2 */}
          <tr>
            <td>High</td>
            <td>Colorado State University</td>
            <td>$2,887,133.23</td>
            <td>CO</td>
            <td>COMMERICAL</td>
            <td>Created</td>
          
          </tr>
          {/* row 3 */}
          <tr>
            <td>Low</td>
            <td>BrandonB5</td>
            <td>$924,401.40</td>
            <td>TX</td>
            <td>COMMERCIAL</td>
            <td>Completed</td>
         
          </tr>
          {/* row 4 */}
          <tr>
            <td>Medium</td>
            <td>z account 1</td>
            <td>$698,864.43</td>
            <td>CA</td>
            <td>CYBER</td>
            <td>Created</td>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Priority</th>
            <th>Account Name</th>
            <th>Estimated Premium</th>
            <th>Primary Risk State</th>
            <th>Line of Business</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default HomeScreenAccounts;
