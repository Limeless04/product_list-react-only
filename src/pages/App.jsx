import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Navigate, Link } from "react-router-dom";

function App() {
  const user = useAuth();
  const [products, setProduct] = useState(null);

  const fetchingProducts = async () => {
    try {
      let data = await window.myAPI.getAllProduct();
      setProduct(data);
    } catch (err) {
      console.error("Error Fetching Data ", err);
      alert(`${err}`);
    }
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you Sure ? ") == true){
      try {
        await window.myAPI.deleteProduct(productId);
        // After successful deletion, fetch the updated list of products
        fetchingProducts();
      } catch (err) {
        console.error("Error Deleting Product ", err);
        alert(`${err}`);
      }
    }
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  if (!user.token) return <Navigate to="/login" />;

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl mb-4">Halaman Home</h1>
        <Link to="/product" className="bg-blue-500 text-white px-4 py-2 mb-20">
          Tambah Product
        </Link>
        {products && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {products.map((product) => (
              <li
                key={product._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex flex-row justify-between">
                <Link
                  to={`/product/${product._id}`}
                  className="text-xl font-semibold mb-2 "
                >
                  <p className="hover:border-b-2 border-red-200">{product.title}</p>
                  
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
                </div>
                
                
                <p className="text-gray-700">Name: {product.price}</p>
                <p className="text-gray-700">Stock: {product.stock}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
