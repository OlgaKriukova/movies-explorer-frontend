import './Techs.css';

function Techs() {
  return (
    <section className="techs">
        <h3 className="title title-border">Технологии</h3>
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном&nbsp;проекте.
        </p>
        <div className="techs__item">
            <p className="techs__item-text">HTML</p>
            <p className="techs__item-text">CSS</p>
            <p className="techs__item-text">JS</p>
            <p className="techs__item-text">React</p>
            <p className="techs__item-text">Git</p>
            <p className="techs__item-text">Express.js</p>
            <p className="techs__item-text">mongoDB</p>
        </div>
    </section>
  );
}

export default Techs;
