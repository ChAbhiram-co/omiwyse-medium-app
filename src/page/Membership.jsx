import React, { useState, useMemo, useCallback, useContext } from "react";

const MembershipContext = React.createContext();

function Membership() {

 const [membershipType, setMembershipType] = useState(null);

 
  const membershipTypes = useMemo(() => [
    { type: "Free", description: "Access limited articles per month." },
    { type: "Premium", description: "Unlimited access + exclusive content." }
  ], []);

 
  const handleClick = useCallback((type) => {
    setMembershipType(type);  
    console.log("Updated membership:", type);  
    alert(`You selected the ${type}  membership`); 
  }, [setMembershipType]);

  const contextValue = useMemo(() => ({
    membershipType, 
    membershipTypes, 
    handleClick 
  }), [membershipType, membershipTypes, handleClick]);
  return (
    <MembershipContext.Provider value={contextValue}>
      <div className="membership-container">
        <h1>Welcome to StoryBook Membership</h1>
        <p>Unlock exclusive content, features, and more.</p>
        <div className="membership-options">
          {membershipTypes.map((membership) => (
            <div key={membership.type} className={`membership-card ${membership.type.toLowerCase()}`}>
              <h2>{membership.type}</h2>
              <p>{membership.description}</p>
              <button onClick={() => handleClick(membership.type)}>
                {membership.type === "Free" ? "Get Started" : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>

        <div className="selected-membership">
          <h3>Selected Membership: {membershipType || "None"}</h3>
        </div>

        
        <MembershipInfo />
      </div>
    </MembershipContext.Provider>
  );
}
function MembershipInfo() {
  const { membershipType } = useContext(MembershipContext);

  return (
    <div>
      <h4>Current Membership (from MembershipInfo component): {membershipType || "None"}</h4>
    </div>
  );
}
export default Membership;


