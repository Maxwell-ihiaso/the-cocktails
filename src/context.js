import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${url}${searchTerm}`)
      .then((result) => {
        const { drinks } = result.data;
        if (drinks) {
          const newCocktails = drinks.map((cocktail) => {
            const {
              idDrink: id,
              strAlcoholic: info,
              strDrinkThumb: image,
              strGlass: glass,
              strDrink: drink,
            } = cocktail;

            return { id, info, image, glass, drink };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchCocktails();
  }, [searchTerm, fetchCocktails]);

  return (
    <AppContext.Provider
      value={{ loading, setLoading, searchTerm, setSearchTerm, cocktails }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
