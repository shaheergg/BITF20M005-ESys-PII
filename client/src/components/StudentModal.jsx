import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function StudentModal({ student, closeModal, isOpen }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Student Details
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Details about{" "}
                      <span className="font-semibold text-black">
                        {student?.name}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-black">Name:</span>{" "}
                      {student?.name}
                    </p>
                    <p>
                      <span className="font-semibold text-black">
                        Roll Number:
                      </span>{" "}
                      {student?.rollNumber}
                    </p>
                    <p>
                      <span className="font-semibold text-black">Email:</span>{" "}
                      {student?.email}
                    </p>
                    <p>
                      <span className="font-semibold text-black">Detgree:</span>{" "}
                      {student?.degree}
                    </p>
                    <p>
                      <span className="font-semibold text-black">
                        Department:
                      </span>{" "}
                      {student?.department}
                    </p>
                    <p>
                      <span className="font-semibold text-black">
                        Date of birth:
                      </span>{" "}
                      {student?.dob?.slice(0, 10)}
                    </p>
                    <p>
                      <span className="font-semibold text-black">City:</span>{" "}
                      {student?.city}
                    </p>
                    <p>
                      <span className="font-semibold text-black">
                        Interest:
                      </span>{" "}
                      {student?.interest?.name}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
