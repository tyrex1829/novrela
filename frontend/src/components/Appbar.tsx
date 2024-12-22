import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export const Appbar = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUsername(decoded.username || decoded.email.split("@")[0] || "Guest");
      } catch (error) {
        console.error("Error decoding token:", error);
        setUsername("Guest");
      }
    }
  }, []);

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>

        <Avatar size={"big"} name={username} />
      </div>
    </div>
  );
};
