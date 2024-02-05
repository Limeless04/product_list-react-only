import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState();
  console.log(productDetail)
  const getDetail = async () => {
    try {
      let data = await window.myAPI.getById(productId);
      setProductDetail(data);
    } catch (err) {
      console.error("Error Fetching Data ", err);
      alert(`${err}`);
    }
  };

  useEffect(() => {
    // console.log(window.myAPI.getById(productId))
    getDetail();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl mb-4">Halaman Product Detail</h1>

      <div className="flex items-center mb-4">
        <Link to="/" className="text-blue-500 hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.707 3.293a1 1 0 0 0-1.414 0L3.293 7.293a1 1 0 0 0 0 1.414L8.707 13.707a1 1 0 0 0 1.414-1.414L7.414 10H16a1 1 0 1 0 0-2H7.414l2.293-2.293a1 1 0 0 0 0-1.414z"
            />
          </svg>
          Home
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {productDetail && (
          <>
            <img
              src={productDetail.image}
              alt={`Product: ${productDetail.title}`}
              className="mb-4"
            />
            <ul>
              <li className="text-xl font-semibold mb-2">
                Product Name: {productDetail.title}
              </li>
              <li className="text-gray-700">
                Product Price: ${productDetail.price}
              </li>
              <li className="text-gray-700">
                Product Stock: {productDetail.stock}
              </li>
              <li className="text-gray-700">
                Product Description: {productDetail.description}
              </li>
              <li className="text-gray-700">
                Product Rating: {productDetail.rating}
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
