import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { ImLab } from "react-icons/im";
import { RiBugLine } from "react-icons/ri";
import { PiCodeDuotone } from "react-icons/pi";

const SidebarContainer = styled.div`
    position: sticky;
    top: 100px;
    height: 100%;
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    background: #131313;
    color: #ffffff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #232222;
    border-radius: 10px;
`;

const MainTitle = styled(Link)`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    color: #eeeeee;
    background: #0e0e0e;
    border-radius: 8px;
    padding: 10px 20px;
    border: 1px solid #3a3a3a;
    gap: 15px;

    transition: all 0.3s ease-in-out;

    &:hover {
        background: #ff6b08;
        color: #000000;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    //margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

// const DropdownButton = styled.button`
//   width: 100%;
//   padding: 5px;
//   cursor: pointer;
//   background: #111111;
//   border: 1px solid #3a3a3a;
//   text-align: left;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const DropdownList = styled.div`
    width: 100%;
    //background: #1a1a1a;
    //border: 1px solid #3a3a3a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
    cursor: pointer;
    border-radius: 8px;
    padding: 5px 10px;

    &:hover {
        background: #2d2d2d;
    }
`;
const VerticalLine = styled.div`
    border: 1px solid rgba(140, 140, 140, 0.4);
    height: 90%;
    width: fit-content;
    margin: 0 0 0 10px;
    padding: 10px 0;
    position: absolute;
`;

// const HorizontalLine = styled.div`
//   border-bottom: 1px solid #ffffff;
//   width: 100%;
// `;

const Sidebar = ({ heading, topics, onSelectSubtopic, setCategoryActive, onlyCat }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    // get unique and sorted categories

    const categories = [...new Set(topics.map((topic) => topic.category))].sort();

    return (
        <SidebarContainer>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    {heading && (
                        <h3
                            style={{
                                color: "#ecf0f1",
                                fontSize: "20px",
                                textAlign: "center",
                            }}
                        >
                            {heading}
                        </h3>
                    )}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    {onlyCat &&
                        categories.map((category, index) => (
                            <MainTitle key={index} onClick={() => setCategoryActive(category)}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {heading === "Topics" && <SiOpenstreetmap />}
                                    {heading === "Labs" && <ImLab />}
                                    {heading === "Code Review" && <RiBugLine />}
                                    {heading === "Crack Me" && <PiCodeDuotone />}
                                </div>
                                {category}
                            </MainTitle>
                        ))}
                </div>

                {topics.map((topic, index) =>
                    !onlyCat ? (
                        <div key={topic.id}>
                            <MainTitle
                                to={`/websecurity/topic/${topic.id}`}
                                onClick={() => toggleDropdown(index)}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    border: openDropdown === index ? `0px` : "1px solid #3a3a3a",
                                }}
                            >
                                {topic.title}
                                <span>{openDropdown === index ? <FaAngleUp /> : <FaAngleDown />}</span>
                            </MainTitle>
                            <DropdownContainer>
                                {openDropdown === index && (
                                    <>
                                        <VerticalLine />
                                        <span></span>
                                    </>
                                )}
                                <DropdownList isOpen={openDropdown === index}>
                                    {topic.desc.map((subtopic) => (
                                        <DropdownItem
                                            key={subtopic.title}
                                            onClick={() => {
                                                onSelectSubtopic(subtopic.title);
                                                // toggleDropdown(index);
                                            }}
                                        >
                                            {subtopic.title}
                                        </DropdownItem>
                                    ))}
                                </DropdownList>
                            </DropdownContainer>
                        </div>
                    ) : null,
                )}
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;
