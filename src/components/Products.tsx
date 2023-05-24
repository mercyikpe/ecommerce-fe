import React from "react";
import Product from "./Product";

const Products = (props: { products: any }) => {
  const { products } = props;
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 lg:gap-5">
      {products.map((product: any) => (
        <Product key={product._id} product={product} />
      ))}
    </section>
  );
};

export default Products;
