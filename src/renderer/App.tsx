import 'tailwindcss/tailwind.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { HeroUIProvider } from "@heroui/system";
import { formInitialValues, ProjectFormType } from './form-utils/';
import { FormProvider, useForm } from 'react-hook-form';
import { Home } from './pages/Home';
import { RootLayout } from './pages/RootLayout';
import './styles/globals.css';
import { PanelPage } from './pages/PanelPage/PanelPage';
import ArticleEditPage from './pages/Articles';
import ArticleViewPage from './pages/ArticleView';
import ProjectPathProvider from './context/projectPathContext';

export default function App() {
  const methods = useForm<ProjectFormType>({
    defaultValues: formInitialValues,
  });

  const router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/characters/:id',
          element: <PanelPage pageKey="characters" />,
        },
        {
          path: '/places/:id',
          element: <PanelPage pageKey="places" />,
        },
        {
          path: '/maps/:id',
          element: <PanelPage pageKey="maps" />,
        },
        {
          path: '/relationships/:id',
          element: <PanelPage pageKey="relationships" />,
        },
        {
          path: '/articles/:id',
          element: <ArticleEditPage />,
        },
        {
          path: '/articles-view/:id',
          element: <ArticleViewPage />,
        },
      ],
    },
  ]);

  return (
    <HeroUIProvider>
      <ProjectPathProvider>
        <FormProvider {...methods}>
          <RouterProvider router={router} />
        </FormProvider>
      </ProjectPathProvider>
    </HeroUIProvider>
  );
}
