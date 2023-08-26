import { FC, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

interface ModalBoxProps {
  showModel: boolean;
  toggle: () => void;
  walletBalance: number;
  currentGameBalance: number;
}

const ModalBox: FC<ModalBoxProps> = ({
  showModel,
  toggle,
  walletBalance,
  currentGameBalance,
}) => {
  useEffect(() => {
    if (showModel) {
      const timeout = setTimeout(() => {
        toggle();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showModel]);

  return (
    <Modal
      isOpen={showModel}
      toggle={toggle}
      centered
      keyboard={false}
      backdrop="static"
    >
      <ModalHeader tag="h2">
        Result...!!!
      </ModalHeader>
      <ModalBody>
        <h4>Updated Wallet Balance: ${walletBalance}</h4>
        <h4>Current game status: ${currentGameBalance}</h4>
      </ModalBody>
    </Modal>
  );
};

export default ModalBox;
