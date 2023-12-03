import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon, PlayIcon } from "@heroicons/react/24/solid";

import { Input } from "../auth/Login";
import { useUser } from "../user-context";

import { redirect, useNavigate } from "react-router-dom";

const logoImg = require("../../../../src/assets/amtap-logo-re.png");

const exerciseFields = [
  {
    labelText: "Exercise Name",
    labelFor: "exercise-name",
    id: "exercise-name",
    name: "exercise-name",
    type: "text",
    isRequired: true,
    placeholder: "Exercise Name",
  },
  {
    labelText: "Description",
    labelFor: "description",
    id: "description",
    name: "description",
    type: "text",
    isRequired: true,
    placeholder: "Description",
  },
];

function TopBar() {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="flex items-center">
      {/* <div className="w-full bg-red-600 h-14"></div> */}
      <h2 className=" text-3xl font-bold mr-auto">AMTAP Exercises</h2>

      <p className="whitespace-nowrap mx-4 text-gray-600">
        Logged in as:{" "}
        <span className="font-semibold text-navy">{user.displayName}</span>
      </p>

      <button
        className=" h-12 rounded-lg flex items-center bg-primary px-4"
        type="button"
        onClick={openModal}
      >
        <PlusIcon className="block h-4 w-4 mr-2" aria-hidden="true" />
        <p className="text-background whitespace-nowrap text-sm font-semibold">
          Add Exercise
        </p>
      </button>
      <ExerciseModal isOpen={isOpen} closeModal={closeModal} data={{}} />
    </div>
  );
}

function ExerciseModal({
  isOpen,
  closeModal,
  data,
}: {
  isOpen: boolean;
  closeModal: any;
  data: any;
}) {
  const fields = exerciseFields;
  let fieldsState: any = {};

  const dataKeys = Object.keys(data ?? {});
  dataKeys.forEach((key) => (fieldsState[key] = data[key] ?? ""));

  const [exerciseState, setExerciseState] = useState(fieldsState);

  const handleChange = (e: any) => {
    setExerciseState({ ...exerciseState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    console.log(exerciseState);
    closeModal();
  };

  const hasVideo = false;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Add a New Exercise
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-purple">
                    Fill in the details of the exercise
                  </p>
                </div>

                <form
                  className="mt-8 space-y-6 flex flex-col"
                  onSubmit={handleSubmit}
                >
                  <div
                    className={`
                      ${!hasVideo ? "cursor-pointer" : ""}
                     w-full h-64 self-center flex justify-center items-center rounded-2xl relative border border-purple`}
                  >
                    {hasVideo ? (
                      <PlayCircleIcon
                        className="block h-20 w-20 mr-2 text-purple absolute"
                        aria-hidden="true"
                      />
                    ) : (
                      <p className="z-10 text-white">Click to Upload a Video</p>
                    )}
                  </div>

                  <div className="-space-y-px">
                    {fields.map((field) => (
                      <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={exerciseState[field.id]}
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

                  <div className="mt-4 flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md   border border-transparent bg-primary px-4 py-2 text-base font-medium text-background focus:outline-none  hover:ring-primary hover:ring-offset-2 hover:ring-offset-background hover:ring-2"
                      onClick={handleSubmit}
                    >
                      <PlusIcon
                        className="block h-4 w-4 mr-2"
                        aria-hidden="true"
                      />
                      <p className=" whitespace-nowrap text-sm font-semibold">
                        Add Exercise
                      </p>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-red-600 focus:outline-none ml-4"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function VideoCard({ exercise }: { exercise: Exercise }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        <div className="flex ">
          <div className=" w-64 h-44  flex justify-center items-center bg-background rounded-2xl">
            <PlayCircleIcon
              className="block h-20 w-20 mr-2 text-purple"
              aria-hidden="true"
            />
          </div>
          <div className="ml-6 h-44 flex flex-col justify-center items-start">
            <h2 className="font-semibold text-2xl">
              {exercise["exercise-name"]}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
            <p className="text-sm mt-2 text-gray-500">
              Uploaded By: <span className="font-semibold text-navy">You</span>
            </p>
          </div>
        </div>
      </button>
      <hr className="my-4" />
      <ExerciseModal isOpen={isOpen} closeModal={closeModal} data={exercise} />
    </>
  );
}

interface Exercise {
  "exercise-name": string;
  description: string;
}

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    if (!user) navigate("/login");
  }, []);
  const exerciseList: Exercise[] = [
    {
      "exercise-name": "30 Minute Stretch",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicin?",
    },
    {
      "exercise-name": "Morning Workout",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicin?",
    },
    {
      "exercise-name": "Evening Workout",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicin?",
    },
  ];

  return (
    <main className="h-screen w-screen p-4">
      <div className="flex h-full  ">
        {/* Left Panel */}
        <div className=" w-2/12 h-full ">
          {/* Content for the Left Panel */}
          <div className="p-4 py-8 h-full flex flex-col items-center justify-center">
            {/* <h1 className="text-2xl font-bold text-white">AMTAP LOGO</h1> */}
            <img alt="" className=" h-24 mr-4" src={logoImg.default} />
            {/* Add more components/content here */}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white w-10/12 rounded-3xl my-2">
          {/* Content for the Right Panel */}
          <div className="p-8">
            {/* Add more components/content here */}

            <TopBar />

            <h2 className=" text-2xl font-bold my-8">
              Uploaded Exercises (30)
            </h2>

            <div className=" h-[75vh] overflow-y-auto">
              {exerciseList.map((exercise) => (
                <VideoCard
                  key={exercise["exercise-name"]}
                  exercise={exercise}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
