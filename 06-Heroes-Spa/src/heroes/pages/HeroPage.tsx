import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroeById } from "../helpers/getHeroById";
import { useMemo } from "react";

const HeroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hero = useMemo(() => getHeroeById(id!), [id]);

  const onNavigate = () => {
    navigate(-1);
  };

  if (!hero) return <Navigate to={"/heroes/"} />;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeIn"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-goup list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>
        <button onClick={onNavigate} className="btn btn-outline-primary">
          Back
        </button>
      </div>
    </div>
  );
};

export { HeroPage };
