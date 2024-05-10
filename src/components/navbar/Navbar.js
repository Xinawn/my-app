import React, { useState } from "react";
import style from "./Navbar.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.box}>
          <Link to="/" className={style.logo}>
            <span className={style.logo_text}>LIVE</span>
            <span className={style.logo_text}>CURRENCY</span>
          </Link>
          <ul
            className={
              nav ? [style.menu, style.active].join(" ") : [style.menu]
            }
          >
            <li>
              <a href="/">Главная</a>
            </li>
            <li>
              <a href="/converter">Конвертер</a>
            </li>
            <li>
              <a href="/currency">Курсы валют</a>
              <ul className={style.submenu}>
                <li>
                  <a href="/currency/nbrb">Курсы НБРБ</a>
                </li>
                <li>
                  <a href="/currency/bank">Курсы Банков</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/crypto">Криптовалюта</a>
              <ul className={style.submenu}>
                <li>
                  <a href="/crypto">Курсы и конвертор</a>
                </li>
                <li>
                  <a href="/crypto/table">Курсы криптовалют</a>
                </li>
                <li>
                  <a href="/crypto/converter">Конвертор криптовалют</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="##">Связь</a>
            </li>
          </ul>
          <div onClick={() => setNav(!nav)} className={style.mobile_btn}>
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
