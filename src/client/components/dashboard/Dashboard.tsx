import { Dialog, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState, useCallback } from "react";

import { CogIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

import { Input } from "../auth/Login";

import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase/clientApp";
import { toast } from "sonner";
import Dropzone, { Accept } from "react-dropzone";

import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useUser } from "../user-context";

const logoImg = require("../../../../src/assets/amtap-logo-re.png");

const exerciseFields = [
  {
    labelText: "Exercise Name",
    labelFor: "exerciseName",
    id: "exerciseName",
    name: "exerciseName",
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
  let [displayName, setDisplayName] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const logout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (user) setDisplayName(user?.displayName ?? user?.email);
  }, []);

  return (
    <div className="flex items-center">
      {/* <div className="w-full bg-red-600 h-14"></div> */}
      <h2 className=" text-3xl font-bold mr-auto">AMTAP Exercises</h2>

      <Popover className="relative">
        <Popover.Button className="whitespace-nowrap mx-4 text-gray-600 focus:outline-none">
          Logged in as:{" "}
          <span className="font-semibold text-navy">{displayName}</span>
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <button
            className=" h-12 rounded-lg flex items-center shadow-md px-4"
            type="button"
            onClick={logout}
          >
            <p className="text-background whitespace-nowrap text-sm font-semibold">
              Sign Out from Account
            </p>
          </button>
        </Popover.Panel>
      </Popover>
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
      <ExerciseModal isOpen={isOpen} closeModal={closeModal} />
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
  data?: any;
}) {
  let [isLoading, setIsLoading] = useState(false);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const { user } = useUser();

  const fields = exerciseFields;
  let fieldsState: any = {};
  const isUpdate = data != null;

  const onClose = () => {
    setSelectedVideoFile(null);
    setHasVideo(false);

    closeModal();
  };

  const dataKeys = Object.keys(data ?? {});
  dataKeys.forEach((key) => (fieldsState[key] = data[key] ?? ""));

  const [exerciseState, setExerciseState] = useState(fieldsState);

  const handleChange = (e: any) => {
    setExerciseState({ ...exerciseState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    isUpdate ? updateExercise() : addExercise();
  };

  const addExercise = async () => {
    try {
      setIsLoading(true);

      if (!selectedVideoFile) throw "Please upload a video file";

      const result = await uploadVideo();

      await addDoc(collection(db, "amtapExercises"), {
        exerciseName: exerciseState["exerciseName"],
        description: exerciseState["description"],
        owner: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        },
        videoUrl: result.ref.fullPath,
      });

      console.log(exerciseState);
      setIsLoading(false);
      closeModal();
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      } else {
        toast.error(e);
      }
    }

    setIsLoading(false);
  };

  const updateExercise = async () => {
    setIsLoading(true);
    console.log(exerciseState);
    setIsLoading(false);
    closeModal();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    if (acceptedFiles.length > 0) {
      setSelectedVideoFile(acceptedFiles[0]);
      setHasVideo(true);
      console.log(selectedVideoFile);
    }
  }, []);

  const acceptedFileType: Accept = {
    "video/mp4": [".mp4"],
  };

  const onDropRejected = (fileRejections: any) => {
    try {
      toast.error(fileRejections[0].errors[0].message);
    } catch (e) {
      toast.error(
        "File type not accepted, Only MP4 files under 5MV are accepted"
      );
    }
  };

  const uploadVideo = async () => {
    const storageRef = ref(
      storage,
      `amtap-exercises/${selectedVideoFile.name}_${Date.now()}`
    );

    const uploadedFile = await uploadBytes(storageRef, selectedVideoFile);

    return uploadedFile;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={onClose}>
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
                  {isUpdate ? "Edit Exercise" : "Add a New Exercise"}
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
                  <Dropzone
                    onDrop={onDrop}
                    accept={acceptedFileType}
                    onDropRejected={onDropRejected}
                    minSize={0}
                    maxSize={5242880}
                    maxFiles={1}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragReject,
                    }) => (
                      <div className="w-full h-64 self-center flex justify-center items-center rounded-2xl relative border  border-purple">
                        <div className="bg-red-200">
                          {selectedVideoFile != null && (
                            <video
                              className=" z-10 absolute bottom-0  left-0 w-full h-64  rounded-2xl"
                              controls
                            >
                              <source
                                src={URL.createObjectURL(selectedVideoFile)}
                              />
                            </video>
                          )}
                        </div>
                        <div
                          {...getRootProps()}
                          className={`z-20 focus:outline-none bg-purple rounded-full py-1 px-3 cursor-pointer absolute ${
                            hasVideo ? "opacity-50" : ""
                          } `}
                        >
                          <input {...getInputProps()} />

                          <p className=" text-white">
                            {isDragReject
                              ? "File type not accepted, Only MP4 files are accepted"
                              : isDragActive
                              ? "Drop Video Here"
                              : hasVideo
                              ? "Drag/Click to Replace Video (5MB Max)"
                              : "Drag/Click to Upload a Video (5MB Max)"}
                          </p>
                        </div>{" "}
                      </div>
                    )}
                  </Dropzone>

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

                  {isLoading ? (
                    <div className="flex justify-center items-center text-white">
                      <CogIcon
                        className="block h-8 w-8 animate-spin mr-2"
                        aria-hidden="true"
                      />
                      <p>Uploading...</p>
                    </div>
                  ) : (
                    <div className="mt-6 flex">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md   border border-transparent bg-primary px-4 py-2 text-base font-medium text-background focus:outline-none  hover:ring-primary hover:ring-offset-2 hover:ring-offset-background hover:ring-2"
                        onSubmit={handleSubmit}
                      >
                        {isUpdate ? (
                          <PencilIcon
                            className="block h-4 w-4 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            className="block h-4 w-4 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        <p className=" whitespace-nowrap text-sm font-semibold">
                          {isUpdate ? "Update Exercise" : "Add Exercise"}
                        </p>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent  px-4 py-2 text-base font-medium text-red-600 focus:outline-none ml-4"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
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
  let [ownerName, setOwnerName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const { user } = useUser();

  useEffect(() => {
    if (user)
      setOwnerName(
        exercise.owner.id == user?.uid ? "You" : exercise.owner.name
      );
  }, []);

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
              {exercise["exerciseName"]}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{exercise.description}</p>
            <p className="text-sm mt-2 text-gray-500">
              Uploaded By:{" "}
              <span className="font-semibold text-navy">{ownerName}</span>
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
  id: string;
  exerciseName: string;
  description: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  videoUrl: string;
}

function Dashboard() {
  let [isLoading, setIsLoading] = useState(true);
  let [exercises, setExercises] = useState<Exercise[]>([]);

  const { user } = useUser();
  const navigate = useNavigate();

  const getExercises = async () => {
    try {
      const exercisesRef = collection(db, "amtapExercises");

      const q = query(exercisesRef, where("owner.id", "==", user.uid));

      const querySnapshot = await getDocs(q);

      setExercises(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Exercise[]
      );
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      } else {
        toast.error(e);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(user);

    if (!user) {
      navigate("/login");
    } else {
      getExercises();
    }
  }, [user]);

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

            {isLoading ? (
              <div className="flex justify-center items-center flex-col h-[85vh] ">
                <div className="border-none rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className=" text-2xl font-bold my-8">
                  Uploaded Exercises ({exercises.length})
                </h2>

                <div className=" h-[75vh] overflow-y-auto">
                  {exercises.map((exercise) => (
                    <VideoCard
                      key={exercise["exerciseName"]}
                      exercise={exercise}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
