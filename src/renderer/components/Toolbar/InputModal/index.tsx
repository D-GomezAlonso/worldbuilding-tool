import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useCallback, useState } from 'react';

export const InputModal = ({
  isOpen,
  onClose,
  renameFile,
}: {
  isOpen: boolean;
  onClose: () => void;
  renameFile: (newName: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const closeAndClear = () => {
    setInputValue('');
    onClose();
  };

  const onSave = useCallback(() => {
    renameFile(inputValue);
    closeAndClear();
  }, [inputValue, closeAndClear]);

  return (
    <Modal className="dark" size={'sm'} isOpen={isOpen} onClose={closeAndClear}>
      <ModalContent>
        {(closeAndClear) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Change Item Name
            </ModalHeader>
            <ModalBody>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                size="sm"
                placeholder="New Item Name"
                variant="bordered"
                title="New Item Name"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeAndClear}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
