import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [singleCocktail, setSingleCocktail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchSingleCocktail = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${url}${id}`)
      .then((result) => {
        const { drinks } = result.data;
        if (drinks) {
          const newSingleCocktail = drinks.map((cocktail) => {
            const {
              strAlcoholic: info,
              strDrinkThumb: image,
              strGlass: glass,
              strDrink: drink,
              strCategory: category,
              strInstructions: instructions,
              strIngredient1: ingredient1,
              strIngredient2: ingredient2,
              strIngredient3: ingredient3,
              strIngredient4: ingredient4,
              strIngredient5: ingredient5,
              strIngredient6: ingredient6,
              strIngredient7: ingredient7,
              strIngredient8: ingredient8,
              strIngredient9: ingredient9,
              strIngredient10: ingredient10,
              strIngredient11: ingredient11,
              strIngredient12: ingredient12,
            } = cocktail;

            const ingredients = [
              ingredient1,
              ingredient2,
              ingredient3,
              ingredient4,
              ingredient5,
              ingredient6,
              ingredient7,
              ingredient8,
              ingredient9,
              ingredient10,
              ingredient11,
              ingredient12,
            ];

            return {
              info,
              image,
              glass,
              drink,
              category,
              instructions,
              ingredients,
            };
          });
          setSingleCocktail(newSingleCocktail);
        } else {
          setSingleCocktail([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchSingleCocktail();
  }, [id, fetchSingleCocktail]);

  if (loading) {
    return <Loading />;
  }

  if (singleCocktail.length === 0) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  const { info, image, glass, drink, category, instructions, ingredients } =
    singleCocktail[0];

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{drink}</h2>
      <div className="drink">
        <img src={image} alt={category} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {drink}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {ingredients.filter((ingredient) => ingredient !== null).join(",")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
