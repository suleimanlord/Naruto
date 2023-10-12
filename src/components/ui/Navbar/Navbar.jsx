import React, { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import znakLista from "./NavImages/znakLista.png";
import "./Navbar.css";
import { getOneUser } from "../../../store/users/usersSlice";
import { getOneQuiz } from "../../../store/quizzes/quizzesActions";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function closeBurgerMenu() {
    setIsMenuOpen(false);
  }

  // useEffect(() => {
  //   dispatch(getOneUser());
  //   dispatch(getOneQuiz());
  // }, []);

  return (
    <div className="nav">
      <button className="burgerBtn" onClick={toggleMenu}>
        {isMenuOpen ? (
          <div className="burger--square__close">
            <p>X</p>
          </div>
        ) : (
          <div className="burger--square__open">
            <img src={znakLista} alt="" />
            <p>MENU</p>
          </div>
        )}
      </button>
      {isMenuOpen && (
        <div>
          <BurgerMenu closeBurgerMenu={closeBurgerMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
