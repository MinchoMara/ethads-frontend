import { type Dispatch, type SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

type ModalContextType = {
  ModalComponent: ModalContextChildren;
  setModalComponent: Dispatch<SetStateAction<ModalContextChildren>>;
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
  isModalOpen: boolean;
};
type ModalContextChildren = React.ReactNode | null | React.ReactNode[] | null[];

const ModalContext = createContext<ModalContextType>(undefined as unknown as ModalContextType);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [ModalComponent, setModalComponent] = useState<ModalContextChildren>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (modal: React.ReactNode) => {
    setModalComponent(modal);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalComponent(null);
    setIsModalOpen(false);
  };

  const providerValue = useMemo(
    () => ({
      ModalComponent,
      setModalComponent,
      openModal,
      closeModal,
      isModalOpen,
    }),
    [ModalComponent, setModalComponent, isModalOpen],
  );

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);
  return (
    <ModalContext.Provider value={providerValue}>
      {ModalComponent}
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export { ModalContext, ModalProvider, useModalContext };
