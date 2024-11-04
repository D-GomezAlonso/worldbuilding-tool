import { Card, CardBody, CardFooter } from '@nextui-org/card';
import cardImage from '../../../../assets/article-header.jpg';
import { Image } from '@nextui-org/image';
import { useFormContext } from 'react-hook-form';
import { newFormDefaultValues } from '../../form-utils';
import { useDisclosure } from '@nextui-org/modal';
import { InputModal } from './components/InputModal';

export function Home() {
  const files = window.electron.files.readProjectsDir();
  const { reset } = useFormContext();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <section
      className={`flex w-full flex-col items-center  gap-52 py-8 bg-home-wallpaper bg-cover`}
    >
      <h1 className="text-white text-4xl font-bold shadow-sm">
        World building tool
      </h1>

      <div className="flex gap-10">
        <Card
          shadow="sm"
          isPressable
          onClick={() => {
            onOpen();
            // reset(newFormDefaultValues);
            // window.electron.files.createNewProjectDir(
            //   JSON.stringify(newFormDefaultValues),
            // );
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
          <Card shadow="sm" isPressable>
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
