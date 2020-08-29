import { Link } from "react-router-dom";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Link to="/signout">Sign Out</Link>
    </div>
  );
};

export default HomePage;
