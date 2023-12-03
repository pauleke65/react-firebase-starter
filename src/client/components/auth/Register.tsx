import { Header, Input, FormAction } from "./Login";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const signupFields = [
  {
    labelText: "Full Name",
    labelFor: "full-name",
    id: "full-name",
    name: "fullname",
    type: "text",
    autoComplete: "fullname",
    isRequired: true,
    placeholder: "Full Name",
  },
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
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

const fields = signupFields;
let fieldsState: any = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: any) => {
    console.log("Handle Submit");
    e.preventDefault();


    if(signupState['password'] !== signupState['confirm-password']){
      toast.error("Password and Confirm Password should be same");
      return;
    }

    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    await auth.signOut();
    setIsLoading(true);
    console.log("Creating Account");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        signupState["email-address"],
        signupState["password"]
      );

      await updateProfile(auth.currentUser, {
        displayName: signupState["full-name"],
      }).catch((error) => {
        throw new Error(error);
      });
      auth;
      console.log(res);
      toast.success("Account Created Successfully");
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      } else {
        toast.error(e);
      }
    }

    setIsLoading(false);
    console.log("Done...!");
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass={""}
          />
        ))}
        <FormAction
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          text="Signup"
        />
      </div>
    </form>
  );
}

export default function Register() {
  return (
    <>
      <Header
        heading="Register for Trainer Account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <Signup />
      </div>
    </>
  );
}
