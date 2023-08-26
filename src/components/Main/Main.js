import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import './Main.css';

function Main() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
    <Header
      isShowButtons={true}
      isBlue={true}
      headerForm={'Main'}
    />
    <main className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
    </main>
    <Footer/>
    </>
  );
}

export default Main;
