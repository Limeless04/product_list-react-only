import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length == 0) {
      alert("Username Cannot Be empty");
      return;
    }

    if (password.length == 0) {
      alert("Password Cannot be empty");
      return;
    }
    try {
      auth.LoginUser({username, password});
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`${error}`)
      // Handle error (e.g., show an alert to the user)
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-8 bg-gray-100 rounded shadow">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
