import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.box}>
          <Link to="/" className={style.logo}>
            <span className={style.logo_text}>LIVE</span>
            <span className={style.logo_text}>CURRENCY</span>
          </Link>
          <ul className={style.menu}>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/currency">Курсы валют</Link>
              <ul className={style.submenu}>
                <li>
                  <Link to="/currency/nbrb">Курсы НБРБ</Link>
                </li>
                <li>
                  <Link to="/currency/bank">Курсы Банков</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/converter">Конвентор</Link>
            </li>
            <li>
              <Link to="#">Криптовалюта</Link>
              <ul className={style.submenu}>
                <li>
                  <Link to="/crypto">Курсы и конвертор</Link>
                </li>
                <li>
                  <Link to="/crypto/table">Курсы криптовалют</Link>
                </li>
                <li>
                  <Link to="/crypto/converter">Конвертор криптовалют</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">Связь</Link>
            </li>
          </ul>
          <div className={style.mobile_btn}>{/* Mobile button code */}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
