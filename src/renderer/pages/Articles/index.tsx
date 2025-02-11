import { Divider } from "@heroui/divider";
import { useFormContext } from 'react-hook-form';
import { ProjectFormType } from '../../form-utils';
import { Input } from "@heroui/input";
import { RichTextEditor } from './components/RichTextEditor';
import { Tab, Tabs } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { useNavigate, useParams } from 'react-router-dom';

export type Fields =
  | 'content'
  | 'subheading'
  | 'credits'
  | 'sidebarTop'
  | 'sidebarTopContent'
  | 'sidebarBottom'
  | 'sidebarBottomContent'
  | 'footnotes';

export default function ArticleEditPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { watch, setValue } = useFormContext<ProjectFormType>();

  const articleIndex = watch('articles').findIndex((value) => value.id === id);

  const onChange =
    (field: `articles.${number}.${Fields | 'name'}`) => (value: string) => {
      if (articleIndex !== -1) {
        setValue(field, value);
      }
    };

  return (
    <div className="flex flex-col w-full h-full ">
      <Divider></Divider>
      <div className="w-full h-full p-5 relative  flex flex-col gap-5 dark:bg-gray-background overflow-auto">
        <div className="flex gap-10 items-center">
          <Input
            size="lg"
            classNames={{ input: 'text-3xl' }}
            placeholder="Article Title"
            variant="underlined"
            onChange={(e) =>
              setValue(`articles.${articleIndex}.name`, e.currentTarget.value)
            }
          />
          <Button onPress={() => navigate(`/articles-view/${id}`)}>
            Go to View Mode
          </Button>
        </div>
        <div className="flex flex-col flex-1 dark:bg-gray-navbar px-6 pt-6 text-x">
          <Tabs
            variant="underlined"
            aria-label="Tabs variants"
            className="rounded-[14]"
            classNames={{
              tabList: ' border-b-1 w-full pb-0',
              tab: 'w-auto !flex-none',
              tabContent: 'h-full',
            }}
          >
            <Tab title="Content" className="flex-1 flex flex-col gap-3">
              <RichTextEditor
                fieldName={`articles.${articleIndex}.content`}
                updateFieldValue={onChange(`articles.${articleIndex}.content`)}
              />
            </Tab>
            <Tab title="Header" className="flex-1">
              <div className="flex flex-col gap-6 ">
                <Input
                  variant="underlined"
                  placeholder="Write your subheading"
                  label="SUBHEADING"
                  classNames={{ label: 'text-lg font-bold' }}
                  value={watch(`articles.${articleIndex}.subheading`) ?? ''}
                  onChange={(e) =>
                    setValue(
                      `articles.${articleIndex}.subheading`,
                      e.currentTarget.value,
                    )
                  }
                />
                <EditorWithLabel
                  label="CREDITS"
                  fieldName={`articles.${articleIndex}.credits`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.credits`,
                  )}
                />
              </div>
            </Tab>
            <Tab title="Sidebar">
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel
                  fieldName={`articles.${articleIndex}.sidebarTop`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.sidebarTop`,
                  )}
                  label="SIDEBAR: TOP"
                />
                <EditorWithLabel
                  fieldName={`articles.${articleIndex}.sidebarTopContent`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.sidebarTopContent`,
                  )}
                  label="SIDEBAR: CONTENT PANEL TOP"
                />
                <EditorWithLabel
                  fieldName={`articles.${articleIndex}.sidebarBottom`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.sidebarBottom`,
                  )}
                  label="SIDEBAR: BOTTOM"
                />
                <EditorWithLabel
                  fieldName={`articles.${articleIndex}.sidebarBottomContent`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.sidebarBottomContent`,
                  )}
                  label="SIDEBAR: CONTENT PANEL BOTTOM"
                />
              </div>
            </Tab>
            <Tab title="Footer" className="flex-1">
              <div className="flex-1 flex flex-col gap-6 py-5">
                <EditorWithLabel
                  fieldName={`articles.${articleIndex}.footnotes`}
                  updateFieldValue={onChange(
                    `articles.${articleIndex}.footnotes`,
                  )}
                  label="FOOTNOTES"
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const EditorWithLabel = ({
  label,
  updateFieldValue,
  fieldName,
}: {
  fieldName: `articles.${number}.${Fields}`;
  label: string;
  updateFieldValue: (value: string) => void;
}) => {
  return (
    <div className="h-72 flex flex-col ">
      <h1 className="ml-1.5 text-fieldHeader font-bold mb-2 text-default-600">
        {label}
      </h1>
      <div className="flex-1">
        <RichTextEditor
          fieldName={fieldName}
          updateFieldValue={updateFieldValue}
        />
      </div>
    </div>
  );
};
