import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  getAllProducts,
  getFilteredProducts,
  getSearchedProducts,
} from "../services/ProductService";
import { toast } from "react-toastify";
import { Button, SelectChangeEvent } from "@mui/material";
import Products from "../components/Products";

import { getAllCategories } from "../services/CategoryServices";
import { ProductT } from "../types/ProductTypes";
import axios from "axios";
import { CategoryT } from "../types/CategoryTypes";

import BannerImage from "../images/banner-bg.jpg";
import { Link } from "react-router-dom";

const Home = () => {
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
        <title>Home Page</title>
      </Helmet>

      <div className="relative">
        <img
          className="w-full object-cover brightness-50 filter lg:h-[500px]"
          src={BannerImage}
          alt="Living room"
        />

        <div className="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-left">
            Best Collection for Home decoration
          </h1>
          <p className="pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-left lg:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aperiam natus, nulla, obcaecati nesciunt, itaque
            adipisci earum ducimus pariatur eaque labore.
          </p>
          <Link
            to="/shop"
            className="text-base mx-auto mt-5 w-1/2 bg-amber-400 px-3 py-1 text-black duration-100 hover:bg-yellow-300 lg:mx-0 lg:h-10 lg:w-2/12 lg:px-10"
          >
            Order Now
          </Link>
        </div>
      </div>

      <section className="container mx-auto my-8 flex flex-col justify-center gap-3 lg:flex-row my-20">
        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Free Delivery
            </h3>
            <p className="text-light text-center text-xs lg:text-left lg:text-sm">
              Orders from $200
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Money returns
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              30 Days guarantee
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              24/7 Supports
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              Consumer support
            </p>
          </div>
        </div>
      </section>

      <h3 className="mx-auto mt-10 max-w-[1200px] px-5">TOP NEW ARRIVAL</h3>

      <section className="container mx-auto mt-8 mb-12 flex flex-col justify-center gap-3 lg:flex-row">
        {products && sortedBy === "date" && <Products products={products} />}
        {sortedByPrice && sortedBy === "price" && (
          <Products products={sortedByPrice} />
        )}
      </section>

      {searchValue.length === 3 && (
        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Load More
        </Button>
      )}
      {searchValue.length > 0 && (
        <Button
          variant="contained"
          onClick={() => setSearchPage(searchPage + 1)}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default Home;
