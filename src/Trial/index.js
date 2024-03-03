import React from 'react';

function Trial({ dummyAccounts }) {
  return (
    <div>
      <h2>Welcome to our Gym Web Application Trial</h2>
      <p>
        To get started, you can register for an account and log in using the provided dummy account details below. Once logged in, you'll be able to explore and test out the various functionalities of our application.
      </p>
      <h3>Dummy Account Details:</h3>
      <ul>
        {dummyAccounts.map((account, index) => (
          <li key={index}>
            <strong>User Type:</strong> {account.userType}<br/>
            <strong>User ID:</strong> {account.userId}<br/>
            <strong>Password:</strong> {account.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trial;
