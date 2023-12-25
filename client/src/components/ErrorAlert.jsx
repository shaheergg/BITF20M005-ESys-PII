import { XCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorAlert({ message }) {
  return (
    <div className="w-full max-w-sm p-4 mx-auto mt-10 rounded-md bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  );
}
