import React from "react";
import {  useSelector } from "react-redux";
import _ from "lodash";
import { Button} from "react-bootstrap";
import "./pokemon.css"
// import PokeLogo from "../assets/images/International_Pokémon_logo-300x110.webp";
// import { GetPokemon } from "../redux/actions/pokemonActions";

const Pokemon = ({ Modal, show, handleClose, pokemonName }) => {
  // const pokemonName = props.match.params.pokemon;
  // const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  console.log("pokemonState data", pokemonState);

  // useEffect(() => {
  //   dispatch(GetPokemon(pokemonName));
  // }, []);

  const showData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div>
          <div className="pokemon-image">
            <img
              src={pokeData.sprites.other["home"].front_default}
              alt=""
            />
          </div>
          <div>
            <div>
              <ul>
                <strong>Stats</strong>
                {pokeData.stats.map((el) => {
                  return (
                    <li key={el.stat.name}>
                      {el.stat.name.charAt(0).toUpperCase() +
                        el.stat.name.slice(1)}{" "}
                      - {el.base_stat}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <ul>
                <strong>Abilities</strong>
                {pokeData.abilities.map((el) => {
                  return (
                    <li key={el.ability.name}>
                      {el.ability.name.charAt(0).toUpperCase() +
                        el.ability.name.slice(1)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p className={"loading-error"}>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p className={"loading-error"}>{pokemonState.errorMsg}</p>;
    }

    return <p className={"loading-error"}>Unable to Get Data.</p>;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton /> */}
        <div>
          <Modal.Body>
            <strong className="pokemon-title">
              {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
            </strong>
            {showData()}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Pokemon;
