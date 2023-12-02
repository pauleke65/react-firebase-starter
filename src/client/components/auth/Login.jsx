import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

export  function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="../assets/amtap-logo-re.png"
         
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        {heading}
      </h2>
      <p className="text-center text-sm text-purple mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-primary"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
export function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`${fixedInputClass} ${customClass} bg-navy text-white placeholder:text-purple border-none text-lg py-4 pl-4`}
        placeholder={placeholder}
      />
    </div>
  );
}

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function LoginC() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    console.log(loginState)
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

<div className="mt-4">
      <FormAction handleSubmit={handleSubmit} text="Login" />
      </div>
    </form>
  );
}

export function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className=" bg-primary group relative w-full flex justify-center p-3.5 border border-transparent text-sm font-medium rounded-md text-background   focus:outline-none focus:ring-2 focus:ring-offset-2  mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default function Login() {
  return (
    <>
      <Header
        heading="Login to Trainer Account"
        paragraph="Don't have an account yet? "
        linkName="Register"
        linkUrl="/register"
      />
      
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">

      <LoginC />
        </div>
    </>
  );
}
