import React, { useState } from "react";
interface NameProps {
  name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
  const [bgcolor, setBgcolor] = useState("black");
  const handleSubmit = () => {
    if (bgcolor == "green") {
      setBgcolor("black");
    } else {
      setBgcolor("green");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "2%",
        paddingBottom: "2%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "2%",
    }}
    >
      <div
        style={{
            color: "#000000",
        }}
        >
        {name}
      </div>
      <div
        style={{
            width: "5%",
            height: "35px",
            backgroundColor: bgcolor,
            alignSelf: "center",
            marginLeft: "auto",
          borderRadius: "20%",
        }}
        onClick={handleSubmit}
      ></div>
    </div>
  );
};

export default Name;
