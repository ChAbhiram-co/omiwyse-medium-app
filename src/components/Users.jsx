import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="users-page">
      <h2>User List</h2>
      <div className="user-cards">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <h3>{user.firstname} {user.lastname}</h3>
              <p>Age: {user.age}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Users;
