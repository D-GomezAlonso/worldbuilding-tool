import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Indicator } from './Indicator';
import { AccordionItemBody } from './AccordionEntryBody';
import { PageConfig, siteConfig } from '../../../config/site';
import { BsChevronRight } from 'react-icons/bs';

type AccordionEntryProps = {
  handleAccordionClick: (
    item: Omit<PageConfig, 'formRef'>,
    index: number,
  ) => void;
  createAndNavigate: (href: string, formRef: string) => void;
  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
  selectedKeys: Set<string | number>;
};

export function NavbarAccordion({
  activeId,
  createAndNavigate,
  handleAccordionClick,
  setActiveId,
  selectedKeys,
}: AccordionEntryProps) {
  return (
    <Accordion
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      className="group px-0"
      itemClasses={{
        base: ['group'],
        startContent: 'group-data-[open=true]/:rotate-90 transition',
      }}
    >
      {siteConfig.map((item, index) => (
        <AccordionItem
          className="p-0 m-0"
          key={`${item.label}-${index}`}
          aria-label={`${item.label}-${index}`}
          startContent={
            <BsChevronRight onClick={() => handleAccordionClick(item, index)} />
          }
          indicator={
            <Indicator
              item={item}
              onClick={() => createAndNavigate(item.href, item.formRef)}
            />
          }
          disableIndicatorAnimation
          title={
            <div
              onClick={() => handleAccordionClick(item, index)}
              className="flex items-center gap-3 min-w-40"
            >
              <item.Icon /> {item.label}
            </div>
          }
        >
          <AccordionItemBody
            activeId={activeId}
            setActiveId={setActiveId}
            formRef={item.formRef}
            item={item}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
