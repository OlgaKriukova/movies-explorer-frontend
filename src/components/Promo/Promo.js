import './Promo.css';
import landing_promo_pic from "../../images/landing_promo_pic.png"

function Promo() {
  return (
      <section className="promo">
          <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
          </h1>
         {/* <div className="promo__pic" /> */}
         <img className="promo__pic" src={landing_promo_pic} alt="тесьма"/>
      </section>
  );
}

export default Promo;
