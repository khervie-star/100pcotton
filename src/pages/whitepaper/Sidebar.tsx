import React, { useState } from "react";
import { Link, Element } from "react-scroll";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleSetActive = (to: React.SetStateAction<string>) => {
    setActiveItem(to);
  };
  const sidebarItems = [
    {
      name: "Abstract",
      to: "Abstract",
    },
    {
      name: "Introduction",
      to: "Introduction",
    },
    {
      name: "Our Utility",
      to: "OurUtility",
    },
    {
      name: "Target Audience",
      to: "TargetAudience",
    },
    {
      name: "Our First Shirt Design",
      to: "OurFirstShirtDesign",
    },
    {
      name: "Community Building",
      to: "CommunityBuilding",
    },
    {
      name: "Member Retention",
      to: "MemberRetention",
    },
    {
      name: "Roadmap",
      to: "Roadmap",
    },
    {
      name: "Gamifying the NFTee Experience",
      to: "GamifyingTheNFTeeExperience",
    },
    {
      name: "Conclusion",
      to: "Conclusion",
    },
  ];
  return (
    <div className="relative md:fixed md:top-[200px] md:left-[40px] w-full md:w-[280px] h-fit bg-slate-100 overflow-y-auto rounded-[8px]">
      <nav className="py-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, i) => (
            <li key={i}>
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-300}
                duration={500}
                onSetActive={handleSetActive}
                activeClass="gradient-text bg-gradient-to-r from-primary2 to-primary1 bg-clip-text fill-transparent"
                className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 font-poppins font-semibold text-[16px] cursor-pointer ${
                  activeItem === item.to
                    ? " gradient-text bg-gradient-to-r from-primary2 to-primary1 bg-clip-text fill-transparent"
                    : ""
                }`}>
                {item.name}
              </Link>
              {/* <Link
              to="section3"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              activeClass="text-blue-600"
              className={`block px-4 py-2 text-gray-800 hover:bg-gray-300 ${
                activeItem === 'section3' ? 'text-blue-600' : ''
              }`}
              onSetActive={handleSetActive}
            ></Link> */}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
