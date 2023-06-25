import { Dialog, Transition } from "@headlessui/react";
import type { PropsWithChildren, ReactNode } from "react";
import { useState } from "react";

type ModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
};

const ModalBase = ({
  children,
  isModalVisible,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Transition appear show={isModalVisible} as="div" className="absolute">
      <Dialog as="div" className={`fixed inset-0 z-50`} onClose={onClose}>
        <div className="py-16 min-h-screen px-2 w-full">
          <Transition.Child
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="w-full mx-auto"
          >
            <div
              className={`p-3 md:p-8  mx-auto w-full max-w-[600px] border border-violet-6 bg-violet-3 rounded-md transition-all transform`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const Modal = ({ children }: { children: ReactNode }) => (
    <ModalBase onClose={handleClose} isModalVisible={isModalVisible}>
      {children}
    </ModalBase>
  );

  return { Modal, handleClose, handleOpen, isModalVisible };
};
