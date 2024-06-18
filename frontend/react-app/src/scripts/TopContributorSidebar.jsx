import "../styles/TopContributorSidebar.css";
import "@fontsource/montserrat";
import { FaSearchPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import usericon from "../images/usericon.png";
import { useState, useEffect } from "react";
import axios from "axios";

function TopContributorSidebar() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios.get(
          "http://localhost:8000/top_contributors"
        );
        setContributors(response.data);
      } catch (error) {
        console.error("Error fetching top contributors:", error);
      }
    }

    fetchContributors();
  }, []);

  return (
    <div className="sidebarMainBody">
      <SidebarHeader />
      <SidebarBody contributors={contributors} />
    </div>
  );
}

function SidebarHeader() {
  return <div className="sidebarHeader">Top Contributors</div>;
}

function SidebarBody({ contributors }) {
  return (
    <div className="sidebarBody">
      {contributors.map((contributor, index) => (
        <ProfilePlus key={index} contributor={contributor} />
      ))}
    </div>
  );
}

function ProfilePlus({ contributor }) {
  console.log("contributor", contributor);
  return (
    <div className="profilePlus">
      <img
        src={contributor.image || usericon}
        className="userIconBody"
        alt="user icon"
      />
      <button className="sidebarUserButton">{contributor.username}</button>
      <div className="userScore">{contributor.user_score}</div>
    </div>
  );
}

export default TopContributorSidebar;
