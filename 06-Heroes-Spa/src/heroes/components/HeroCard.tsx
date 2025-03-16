import { Link } from "react-router-dom";
import { hero } from "../helpers/getHeroesByPublisher";

const HeroCard = ({ hero }: { hero: hero }) => {
  const characters =
    hero?.characters
      .split(",")
      .filter((character) => character !== hero.alter_ego)
      .join(",") || "";

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-5">
            <img
              src={`/assets/heroes/${hero.id}.jpg`}
              alt={hero.superhero}
              className="card-img h-100 object-fit-cover"
            />
          </div>
          <div className="col-7">
            <div className="card-body">
              <h5 className="card-title">{hero.superhero}</h5>
              <p className="card-text">{hero.alter_ego}</p>
              {characters && <p className="card-text">{characters}</p>}
              <p className="card-text">
                <small className="text-muted">{hero.first_appearance}</small>
              </p>
              <Link to={`/heroes/hero/${hero.id}`} className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
