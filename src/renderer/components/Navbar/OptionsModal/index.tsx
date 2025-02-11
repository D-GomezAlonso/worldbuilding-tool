import { Card, CardBody } from "@heroui/card";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";

export const OptionsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalNavbarEntries = [
    'Project Configuration',
    'Theme',
    'Test',
    'Test',
    'Test',
    'Test',
  ];

  return (
    <Modal className="dark" size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Options</ModalHeader>
            <ModalBody className="min-h-96">
              <div className="flex-col min-h-96">
                <Tabs
                  aria-label="Options"
                  placement="start"
                  classNames={{
                    wrapper: '!flex-1 min-h-full',
                    panel: 'flex-col flex-1 min-h-full',
                  }}
                >
                  <Tab key="project" title="Project">
                    <Card className="flex-col flex-1 h-full">
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="themes" title="Themes">
                    <Card className="flex-col flex-1 h-full">
                      <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="videos" title="Videos">
                    <Card className="flex-col flex-1 h-full">
                      <CardBody>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
