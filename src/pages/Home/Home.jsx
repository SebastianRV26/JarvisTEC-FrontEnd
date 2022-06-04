import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import logo from "../../assets/logo.jpg";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <nav
        className={`${classes.sidebar} ${
          isOpen ? classes.open : classes.close
        }`}
      >
        <header>
          <div className={classes["image-text"]}>
            <span className={classes.image}>
              <img src={logo} alt=""></img>
            </span>

            <div className={`${classes.text} ${classes["logo-text"]}`}>
              <span className={classes.name}>Jarvis</span>
              <span className={classes.profession}>Proyecto IA</span>
            </div>
          </div>

          <i
            className={`bx bx-chevron-right ${classes.toggle}`}
            onClick={toggleHandler}
          ></i>
        </header>
        <div className={classes["menu-bar"]}>
          <div className={classes["menu"]}>
            <ul className={classes["menu-links"]}>
              <li className={classes["nav-link"]}>
                <NavLink to="/home/jarvis">
                  <i className={`bx bx-home-alt ${classes.icon}`}></i>
                  <span className={`${classes.text} ${classes["nav-text"]}`}>
                    Home
                  </span>
                </NavLink>
              </li>
              <li className={classes["nav-link"]}>
                <NavLink to="/home/detection">
                  <i className={`bx bx-video ${classes.icon}`}></i>
                  <span className={`${classes.text} ${classes["nav-text"]}`}>
                    Detection
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={classes["bottom-content"]}>
            <li>
              <NavLink to="/">
                <i className={`bx bx-log-out ${classes.icon}`}></i>
                <span className={`${classes.text} ${classes["nav-text"]}`}>
                  Logout
                </span>
              </NavLink>
            </li>
          </div>
        </div>
      </nav>
      <section className={classes.home}>
        <Outlet />
      </section>
    </>
  );
};

export default Home;
