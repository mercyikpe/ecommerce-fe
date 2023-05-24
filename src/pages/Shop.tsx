import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  getAllProducts,
  getFilteredProducts,
  getSearchedProducts,
} from "../services/ProductService";
import { toast } from "react-toastify";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Products from "../components/Products";
import { prices } from "../utils/price";
import { getAllCategories } from "../services/CategoryServices";
import { ProductT } from "../types/ProductTypes";
import axios from "axios";
import { CategoryT } from "../types/CategoryTypes";

import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [sortedBy, setSortedBy] = React.useState<string | "">("date");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [checkedPrice, setCheckedPrice] = useState<Number[]>([]);
  const [checkedCategory, setCheckedCategory] = useState<String>("");
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getAllProducts(page);
        setProducts(response.data.products);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.error.message);
        } else {
          toast("An error occurred");
        }
      }
    };
    fetchAllProducts();
  }, []);

  const loadMoreProducts = async () => {
    try {
      const response = await getAllProducts(page);
      setProducts((prevState: ProductT[]) => {
        return [...prevState, ...response.data.products];
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts();
  }, [page]);

  const fetchSearchedProducts = async () => {
    try {
      const response = await getSearchedProducts(searchValue, searchPage);
      setProducts(response.data.products);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (searchValue.length === 0) return;
    fetchSearchedProducts();
  }, [searchValue]);

  const loadMoreSearchProducts = async () => {
    try {
      const response = await getSearchedProducts(searchValue, searchPage);
      setProducts((prevState: ProductT[]) => {
        return [...prevState, ...response.data.products];
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (searchPage === 1) return;
    loadMoreSearchProducts();
  }, [searchPage]);

  const temporaryProducts = [...products];
  const sortedByPrice = temporaryProducts.sort((a, b) =>
    a.price < b.price ? 1 : -1
  );
  const handleChange = (event: SelectChangeEvent) => {
    setSortedBy(event.target.value);
  };

  const handlePriceChange = (price: React.SetStateAction<Number[]>) => {
    setCheckedPrice(price);
  };
  const handleCategoryChange = (categoryId: React.SetStateAction<String>) => {
    setCheckedCategory(categoryId);
  };
  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchAllFilteredProducts = async () => {
      try {
        const response = await getFilteredProducts(
          checkedCategory,
          checkedPrice
        );
        setProducts(response.data.products);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.error.message);
        } else {
          toast("An error occurred");
        }
      }
    };
    fetchAllFilteredProducts();
  }, [checkedCategory, checkedPrice]);

  return (
    <div>
      <Helmet>
        <title>Shop - All our deals</title>
      </Helmet>

      <nav className="mx-auto mt-4 max-w-[1200px] px-5">
        <ul className="flex items-center">
          <li className="cursor-pointer">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">&gt;</span>
          </li>

          <li className="text-gray-500">Shop</li>
        </ul>
      </nav>

      <section className="container mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        <aside className="hidden w-[300px] flex-shrink-0 px-4 lg:block">
          <div className="flex border-b pb-5">
            <p className="font-medium">Sort by</p>

            <FormControl sx={{ minWidth: 120, mt: 5 }}>
              <Select
                labelId="sortBy"
                id="sort"
                value={sortedBy}
                label="Sort By :"
                onChange={handleChange}
              >
                <MenuItem value="date">New Arrival</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="border-b pb-5">
            <h3 className="my-4 font-semibold text-gray-900 dark:text-white">
              Filter by Price
            </h3>
            <ul
              aria-label="filter by price"
              className=" items-center justify-center gap-8 text-sm font-medium"
            >
              {prices &&
                prices.map((price) => {
                  return (
                    <RadioGroup
                      key={price._id}
                      value={checkedPrice}
                      onChange={() => {
                        handlePriceChange(price.range);
                      }}
                    >
                      <FormControlLabel
                        key={price._id}
                        name="price"
                        value={price.range}
                        control={<Radio />}
                        label={price.name}
                      />
                    </RadioGroup>
                  );
                })}
            </ul>
          </div>

          <div className="border-b pb-5">
            <h3 className="my-4 font-semibold text-gray-900 dark:text-white">
              Filter by Category
            </h3>
            <ul
              aria-label="filter by price"
              className=" items-center justify-center gap-8 text-sm font-medium"
            >
              {categories &&
                categories.map((category: CategoryT) => {
                  return (
                    <RadioGroup
                      key={category._id}
                      value={checkedCategory}
                      onChange={() => {
                        handleCategoryChange(category._id);
                      }}
                    >
                      <FormControlLabel
                        key={category._id}
                        name="category"
                        value={category._id}
                        control={<Radio />}
                        label={category.name}
                      />
                    </RadioGroup>
                  );
                })}
            </ul>
          </div>

          <div className="mt-10">
            <button
              className="bg-violet-900 text-white rounded-sm px-5 py-1"
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear filter
            </button>
          </div>
        </aside>

        <article>
          <div className="w-full mx-auto relative flex items-center mb-20">
            <span className="absolute left-4 top-3 text-gray-400 w-4 h-4">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
              </svg>
            </span>
            <input
              onChange={(event) => setSearchValue(event.target.value)}
              type="search"
              name="search"
              id="search"
              className="text-base w-full border border-amber-400 pl-12 py-1 pr-3 rounded focus:outline-none"
              placeholder="search"
            />
          </div>

          <section className="mx-auto grid max-w-[1200px] px-5 pb-10">
            {products && sortedBy === "date" && (
              <Products products={products} />
            )}
            {sortedByPrice && sortedBy === "price" && (
              <Products products={sortedByPrice} />
            )}

            <div className="text-center mt-10">
              {searchValue.length === 0 && (
                <button
                  className="bg-yellow-400 px-4 py-1 rounded-sm hover:text-violet-900"
                  onClick={() => setPage(page + 1)}
                >
                  load more
                </button>
              )}
              {searchValue.length > 0 && (
                <button
                  className="bg-yellow-400 px-4 py-1 rounded-sm hover:text-violet-900"
                  onClick={() => setSearchPage(searchPage + 1)}
                >
                  load more
                </button>
              )}
            </div>
          </section>
        </article>
      </section>
    </div>
  );
};

export default Shop;
