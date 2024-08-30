
import "./Unauthenticated.css"
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

function Unauthenticated() {
  
  const {login, signup} = useAuth();

  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("login");
  const [signUpErrors, setSignUpErrors] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  function handleSubmit(event) {
    event.preventDefault();

    // obtener datos del formulario
  
setStatus("loading");

    if (activeTab === "login") {
      login(formData)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    } else {
      signup(formData)
        .then(() => setStatus("success"))
        .catch((error) => {
          setStatus("error");
          setSignUpErrors(error.message);
        });
    }
  }

  

  function handleTabChange(tab) {
    setActiveTab(tab);
    setStatus("idle");
  }

  const isLoading = status === "loading";
  const buttonText = activeTab === "login" ? "Enter" : "Create";
  const hasError = status === "error";
  

  return (
    <div className="flex flex-col max-w-80 gap-2 m-auto">
      <div className="tabs py-1 px-0 gap-8 rounded-lg ">
        <Button
          onClick={() => handleTabChange("login")}
          className={activeTab === "login" ? "active ": ""}
        >
          Login
        </Button>
        <Button
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? "active " : ""}
        >
          Signup
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col py-4 px-2 gap-4">
        <div className="fields">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="fields">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="bg-violet-700 py-2 px-4 text-white">
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </form>
      {hasError && (
        <p className="text-center text-red-600">
          {signUpErrors || "Invalid Credentials"}
        </p>
      )}
    </div>
  );
}

export default Unauthenticated;
