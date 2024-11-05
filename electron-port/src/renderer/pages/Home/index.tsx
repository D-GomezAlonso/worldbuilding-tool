import { Card, CardBody, CardFooter } from '@nextui-org/card';
import cardImage from '../../../../assets/article-header.jpg';
import { Image } from '@nextui-org/image';
import { useDisclosure } from '@nextui-org/modal';
import { InputModal } from './components/InputModal';
import { useProjectPathContext } from '../../context/projectPathContext';
import { useFormContext } from 'react-hook-form';

export function Home() {
  const files = window.electron.files.readProjectsDir();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { setProjectPath } = useProjectPathContext();
  const { reset } = useFormContext();

  const handleLoadProject = (projectName: string) => {
    const projectsDir = window.electron.files.getProjectsDirectory();
    const formValues = window.electron.files.loadProject(projectName);

    if (formValues) {
      setProjectPath(projectsDir + projectName);
      reset(JSON.parse(formValues));
    }
  };

  return (
    <section
      className={`flex w-full flex-col items-center  gap-52 py-8 bg-home-wallpaper bg-cover`}
    >
      <h1 className="text-white text-4xl font-bold shadow-sm">
        World building tool
      </h1>

      <div className="flex flex-wrap align-center justify-center w-full gap-10">
        <Card
          shadow="sm"
          isPressable
          onClick={() => {
            onOpen();
          }}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="none"
              width="100%"
              className="w-full object-cover h-[200px]"
              classNames={{ wrapper: 'bg-gray-500', img: '!opacity-60' }}
              src={cardImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Create New Project</b>
          </CardFooter>
        </Card>
        {files?.map((file) => (
          <Card shadow="sm" isPressable onClick={() => handleLoadProject(file)}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="none"
                width="100%"
                className="w-full object-cover h-[200px]"
                src={cardImage}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{file}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
      <InputModal
        isOpen={isOpen}
        close={onClose}
        onSave={(value) => {
          return window.electron.files.checkIfProjectExists(value);
        }}
      />
    </section>
  );
}
