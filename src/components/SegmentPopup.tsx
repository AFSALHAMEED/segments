import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSegments } from "@/hooks";

type Props = {
  onClose: () => void;
  showPopup: boolean;
};

export const SegmentPopup = ({ onClose, showPopup }: Props) => {
  const {
    segmentName,
    setSegmentName,
    handleSubmit,
    handleSchemaChange,
    handleAddSchema,
    schemas,
    schemaOptions,
    loading,
    onRemoveSegment,
  } = useSegments({ onClose, showPopup });

  return (
    <Dialog open={showPopup} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-white/10 backdrop-blur-[1px] transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="relative flex h-full flex-col overflow-y-auto bg-white  shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                <div className="bg-teal-600 text-white px-4 py-5 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>

                  <DialogTitle className="text-base font-semibold text-white">
                    Saving Segment
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 flex-col justify-between items-end  px-4 sm:px-6">
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700 "
                      htmlFor="name"
                    >
                      Enter the Name of the Segment
                    </label>
                    <input
                      type="text"
                      value={segmentName}
                      onChange={(e) => setSegmentName(e.target.value)}
                      placeholder=" Name of the Segment"
                      className="w-full border  px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none mt-4"
                      name="segment"
                    />
                    <p className="text-gray-700 mt-3">
                      To save your segment, you need to add the schemas to build
                      the query
                    </p>
                  </div>

                  {schemas.length > 0 && (
                    <div className="0 rounded-lg p-3 space-y-2 mt-3">
                      {schemas.map((schema, idx) => {
                        const remaining = schemaOptions.filter(
                          (opt) =>
                            !schemas.some(
                              (s, i) => i !== idx && s.value === opt.value
                            ) || opt.value === schema.value
                        );
                        return (
                          <div className="flex gap-2" key={idx}>
                            <select
                              key={idx}
                              value={schema.value}
                              onChange={(e) =>
                                handleSchemaChange(idx, e.target.value)
                              }
                              className="w-full border rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 "
                            >
                              {remaining.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <button
                              className="bg-blue-50 border border-blue-300 rounded-sm"
                              onClick={() => onRemoveSegment(schema.value)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!(schemaOptions.length === schemas.length) && (
                    <button
                      onClick={handleAddSchema}
                      className="mt-2 text-green-600 underline underline-offset-4"
                    >
                      + Add new schema
                    </button>
                  )}
                </div>
                <div className="flex gap-3 p-2  sm:p-4 bg-gray-300">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    disabled={loading}
                  >
                    Save the segment
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white text-red-700 px-4 py-2 rounded-md hover:bg-white transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
