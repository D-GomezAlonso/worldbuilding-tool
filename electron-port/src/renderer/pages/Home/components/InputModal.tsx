import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { newFormDefaultValues } from '../../../form-utils';

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
                      reset(newFormDefaultValues);
                      window.electron.files.createNewProject(
                        JSON.stringify(newFormDefaultValues),
                        inputValue,
                      );
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
