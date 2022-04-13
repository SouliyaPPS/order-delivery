import React from "react";
import { MenuItem, Select, Box, InputBase, IconButton } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "../utility/classes";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { getError } from "../utility/error";
import axios from "axios";

const SearchBox = ({ children }) => {
  const router = useRouter();
  const { category = "all" } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };

  const [query, setQuery] = useState("");

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      {/* Search MUI */}
      <div className="flex item-center justify-center">
        <form onSubmit={submitHandler}>
          <Box sx={classes.searchForm}>
            <IconButton>
              <div className="select mx-auto">
                <Select
                  fullWidth
                  style={{ height: "30px" }}
                  value={category}
                  onChange={categoryHandler}
                >
                  <MenuItem value="all">All</MenuItem>
                  {categories.map((category) => (
                    <NextLink
                      key={category}
                      href={`/search?category=${category}`}
                      passHref
                    >
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    </NextLink>
                  ))}
                </Select>
              </div>
            </IconButton>
            <InputBase
              name="query"
              sx={classes.searchInput}
              placeholder="Search products"
              onChange={queryChangeHandler}
              onSubmit={submitHandler}
            />
            {children}

            <IconButton
              type="submit"
              sx={classes.searchButton}
              aria-label="search"
              style={{ color: "white" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </div>
      {/* Search MUI END */}
    </>
  );
};

export default SearchBox;
