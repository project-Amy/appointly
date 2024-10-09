import { Modal } from "antd";

interface modalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export default function ModalConfirm({
  isModalOpen,
  setIsModalOpen,
}: modalProps) {

  return (
    <>
      <Modal
        title="Appuntamento inoltrato"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className=" text-center"
        centered
        closable
        footer={null}
        maskClosable
      >
        <p>
          La tua richiesta di appuntamento è stata ricevuta! Ti faremo sapere
          presto, via email o direttamente sul sito, se è stata confermata!
        </p>
      </Modal>
    </>
  );
}
