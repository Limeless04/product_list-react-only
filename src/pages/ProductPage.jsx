import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ProductPage = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    price: '',
    stock: '',
    description: '',
    rating: '',
  });
 const [submitResult, setSubmitResult] = useState(null)
 const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await window.myAPI.submitData(formData);

        // Update the state with the response
        setSubmitResult({ success: true, message: 'Product added successfully', data: response });
        navigate("/")
    }catch(err){
        console.error('Error submitting data:', err);

        // Update the state with the error
        setSubmitResult({ success: false, message: 'Failed to add product' });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

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

      {submitResult && (
        <div
          className={`${
            submitResult.success ? 'bg-green-500' : 'bg-red-500'
          } text-white px-4 py-2 rounded-md mb-4`}
        >
          {submitResult.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductPage;
