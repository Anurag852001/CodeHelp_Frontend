import CodingBackground from "../../resources/CodingBacdrop.svg";
import style from "../WelcomeBackground/WelcomeBackground.module.css";


function WelcomeBackGround({ children }) {
  return (
    <div
    className={style.background} 
      style={{
        position: "relative",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden"
      }}
    >
     

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
