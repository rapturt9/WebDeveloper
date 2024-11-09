// src/components/InstructionPanel.tsx

import { Dispatch, SetStateAction, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";

interface InstructionPanelProps {
  websiteURL: string;
  setWebsiteURL: Dispatch<SetStateAction<string>>;
  instructions: string[];
  setInstructions: Dispatch<SetStateAction<string[]>>;
}

export default function InstructionPanel({
  websiteURL,
  setWebsiteURL,
  instructions,
  setInstructions,
}: InstructionPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstruction, setNewInstruction] = useState("");

  const addInstruction = () => {
    if (newInstruction.trim() !== "") {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction("");
      setIsModalOpen(false);
    }
  };

  const tabs = ["Instructions", "Activity Feed"];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <section className="w-full md:w-1/3 p-6 bg-white border-r border-gray-200">
      {/* URL Input Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Website Modification
        </h2>
        <div className="space-y-2">
          <label
            htmlFor="websiteURL"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Website URL
          </label>
          <input
            type="url"
            id="websiteURL"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            placeholder="https://example.com"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              // Implement capture website logic
            }}
          >
            Capture Website
          </button>
        </div>
      </div>

      {/* Tabs for Instructions and Activity Feed */}
      <div className="mt-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  clsx(
                    "w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg",
                    selected
                      ? "bg-white shadow"
                      : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              {/* Instructions Tab Content */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Instructions
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center p-2 bg-indigo-600 text-white rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                {instructions.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {instructions.map((instruction, index) => (
                      <li
                        key={index}
                        className="p-3 bg-gray-50 rounded-md shadow-sm flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700">
                          {instruction}
                        </span>
                        {/* Add edit and delete icons if needed */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    No instructions added yet.
                  </p>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Activity Feed Tab Content */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Activity Feed
                </h3>
                <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm h-64 overflow-y-auto">
                  {/* Implement logs display */}
                  <p className="text-sm text-gray-500">No activity yet.</p>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-2">
        <button
          className="w-full inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => {
            // Implement download logic
          }}
        >
          Download Modified Website
        </button>
        <button
          className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => {
            // Implement export logic
          }}
        >
          Export A/B Test
        </button>
      </div>

      {/* Add Instruction Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                  <div className="bg-white px-6 py-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Add Instruction
                    </Dialog.Title>
                    <div className="mt-4">
                      <textarea
                        className="block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={newInstruction}
                        onChange={(e) => setNewInstruction(e.target.value)}
                        placeholder="Enter your instruction here..."
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={addInstruction}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
