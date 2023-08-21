import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import './Main.css';

function Main() {
  return (
    <>
    <Header
      isShowButtons={true}
      isBlue={true}
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
