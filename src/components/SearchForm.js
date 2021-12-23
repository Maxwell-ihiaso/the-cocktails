import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchContainer = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    searchContainer.current.focus();
    console.log(searchContainer);
  }, []);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchContainer}
            name="name"
            onChange={() => setSearchTerm(searchContainer.current.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
