import { XMarkIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSubmit: () => void;
};

const Modal: FC<ModalProps> = ({ open, onClose, title, children, onSubmit }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[70vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onSubmit}
            className="w-full bg-tarawera-400 text-white px-4 py-2 rounded-lg hover:bg-tarawera-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;