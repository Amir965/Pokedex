import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import PokeLogo from "../assets/images/International_Pokémon_logo-300x110.webp";
import { GetPokemon, GetPokemonList } from "../redux/actions/pokemonAction";
import "./pokemonList.css";
import { Card, Modal,Dropdown,DropdownButton } from "react-bootstrap";

import Pokemon from "./Pokemon";
const PokemonList = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [getPokemonName, setGetPokemonName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (pokemonName) => {
    dispatch(GetPokemon(pokemonName));
    setShow(true);
    setGetPokemonName(pokemonName);
  };
  const pokemonList = useSelector((state) => state.PokemonList);

  const [search, setSearch] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage,setPerPage]=useState(10)
  // const perPage = 10;

  const offset = currentPage * perPage;
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const fetchData = () => {
    dispatch(GetPokemonList());
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function compare(a, b) {
    let comparison = 0;
    if (a.name > b.name) {
      comparison = 1;
    } else if (a.name < b.name) {
      comparison = -1;
    }
    return comparison;
  }

  const showData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="list-wrapper">
          {pokemonList.data
            .sort(compare)
            .slice(offset, offset + perPage)
            .map((el) => {
              return (
                <>
                  <Card
                    className="card-wrapper"
                    onClick={() => handleShow(el.name)}
                  >
                    <div className="card-div">
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src={require("../assets/images/pokemonImage.png")}
                      />
                    </div>
                    <Card.Body key={el.name}>
                      <Card.Title className="card-title">
                        {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                      </Card.Title>
                      {/* <Button variant="primary" className="btn">
                        view
                      </Button> */}
                    </Card.Body>
                  </Card>
                </>
              );
            })}
        </div>
      );
    }

    if (pokemonList.loading) {
      return <p className={"loading-error"}>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p className={"loading-error"}>{pokemonList.errorMsg}</p>;
    }

    return <p className={"loading-error"}>Unable to Get Data.</p>;
  };

  return (
    <div>
      <nav className="nav">
        <img src={PokeLogo} alt="logo" width="100" height="50" />
      </nav>
      <div className="filter-search-wrapper">
        <div className="filter-wrapper">
          <DropdownButton
            id="dropdown-button-dark"
            variant="secondary"
            menuVariant="dark"
            title="Filter"
          >
            <Dropdown.Item onClick={() => setPerPage(perPage)}>
              10
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPerPage(perPage * 2)}>
              20
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setPerPage(perPage * 3)}>
              30
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter A Pokemon Name"
          />
          <button onClick={() => props.history.push(search)}>Search</button>
          
        </div>
      </div>
      {showData()}
      <Pokemon
        Modal={Modal}
        show={show}
        handleClose={handleClose}
        pokemonName={getPokemonName}
      />
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
        />
      )}
    </div>
  );
};

export default PokemonList;
