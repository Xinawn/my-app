import React, { useState } from "react";
import style from "./Navbar.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';


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
              <a href="/about">О нас</a>
            </li>
            <li>
              <a href="/currency">Курсы валют</a>
            </li>
            <li>
              <a href="/crypto">Криптовалюта</a>
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
