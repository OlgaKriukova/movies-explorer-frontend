import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
        <h3 className="title">О проекте</h3>
        <div className="about-project__table table">
            <div className="table__block">
                <h3 className="table__title">Дипломный проект включал 5 этапов</h3>
                <p className="table__discription">
                    Составление плана, работу над бэкендом, вёрстку, добавление
                    функциональности и финальные доработки.
                </p>
            </div>
            <div className="table__block">
                <h3 className="table__title">
                    На выполнение диплома ушло 5 недель
                </h3>
                <p className="table__discription">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                    соблюдать, чтобы успешно защититься.
                </p>
            </div>
        </div>
        <div className="about-project__time time">
            <p className="time__title-one">1 неделя</p>
            <p className="time__title-four">4 недели</p>
            <p className="time__discription">Back-end</p>
            <p className="time__discription">Front-end</p>
        </div>
    </section>
  );
}

export default AboutProject;
