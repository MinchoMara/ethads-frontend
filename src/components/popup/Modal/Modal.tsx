import clsx from "clsx";
import { UIProps } from "~/components/UIProps";
import { useModalContext } from "~/contexts/ModalProvider";

export interface ModalProps extends UIProps.Div {
  isBackground?: boolean;
  isClosable?: boolean;
  onClose?: (e: any) => void;
}

export const Modal = ({
  isClosable = true,
  isBackground = true,
  children,
  className,
  onClose,
  ...props
}: ModalProps) => {
  const { closeModal } = useModalContext();

  return (
    <div
      className={clsx("fixed bottom-0 left-0 right-0 top-0 z-50", {
        "bg-black bg-opacity-20": isBackground,
      })}
      onClick={
        isClosable
          ? (e) => {
              closeModal();
              onClose?.(e);
            }
          : () => {}
      }
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()} className={clsx(className)}>
        {children}
      </div>
    </div>
  );
};
