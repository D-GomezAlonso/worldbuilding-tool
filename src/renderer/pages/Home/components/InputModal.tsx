import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { newFormDefaultValues } from '../../../form-utils';
import { useProjectPathContext } from '../../../context/projectPathContext';

export function InputModal({
  isOpen,
  close,
  onSave,
}: {
  isOpen: boolean;
  close: () => void;
  onSave: (value: string) => boolean;
}) {
  const [inputValue, setInputValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const { reset } = useFormContext();
  const { setProjectPath } = useProjectPathContext();

  const onClose = () => {
    setInputValue('');
    close();
    setIsInvalid(false);
  };

  return (
    <>
      <Modal className="dark" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Project Name
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="My New Project"
                  errorMessage="Current name is already taken."
                  isInvalid={isInvalid}
                  value={inputValue}
                  onInput={(e) => setInputValue(e.currentTarget.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (onSave(inputValue)) {
                      setIsInvalid(true);
                    } else {
                      const formValues = newFormDefaultValues;
                      formValues.name = inputValue;

                      reset(formValues);
                      const createdDir = window.electron.files.createNewProject(
                        JSON.stringify(formValues),
                        inputValue,
                      );
                      setProjectPath(createdDir);
                      close();
                    }
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
