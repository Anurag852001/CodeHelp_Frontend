import CodingBackground from "../../resources/CodingBacdrop.svg";

function WelcomeBackGround({ children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <img
        src={CodingBackground}
        alt="Coding Background"
        style={{
          height: "60vh",
          width: "60vw",
          objectFit: "contain",
          zIndex: 0,
        }}
      />

    <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
        }}
      >
        {children}
      </div>  
    </div>
  );
}

export default WelcomeBackGround;
