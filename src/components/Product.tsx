import moment from "moment";
import { useNavigate } from "react-router-dom";

const Product = (props: any) => {
  const { product } = props;
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API;


  return (
    <div>
      <div
        className="flex flex-col cursor-pointer transform transition duration-500 hover:scale-110"
        onClick={() =>
          navigate(`/productdescription/${product._id}`, { state: product })
        }
      >
        <img
          className=""
          src={`${baseURL}/${product.image}`}
          alt={product.name}
        />

        <div className="px-8 space-y-2 mt-4">
          <p className="font-medium capitalize">{product.name}</p>

          <p className="text-violet-900">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <p className="text-sm text-gray-400">
            stock left ({product.countInStock})
          </p>
          <p className="text-sm text-gray-400">
            added: {moment(product.createdAt).fromNow()}
          </p>

          <div>
            <button className="my-5 h-10 w-full bg-violet-900 text-white">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
