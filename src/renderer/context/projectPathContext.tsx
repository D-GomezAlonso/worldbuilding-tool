import { createContext, ReactNode, useContext, useState } from 'react';

export type TProjectPathContext = {
  projectPath: string | undefined;
  setProjectPath: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ProjectPathContext = createContext<TProjectPathContext | null>(
  null,
);

export default function ProjectPathProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projectPath, setProjectPath] = useState<string | undefined>(undefined);

  return (
    <ProjectPathContext.Provider value={{ projectPath, setProjectPath }}>
      {children}
    </ProjectPathContext.Provider>
  );
}

export function useProjectPathContext() {
  const context = useContext(ProjectPathContext);
  if (!context) {
    throw new Error(
      'useProjectPathContext must be used within a ProjectPathProvider',
    );
  }
  return context
}
