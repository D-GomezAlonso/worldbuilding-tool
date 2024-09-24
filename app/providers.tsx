"use client";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { formDefaultValues, ProjectFormType } from "@/form-utils/defaultValues";
import { FormProvider, useForm } from "react-hook-form";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const methods = useForm<ProjectFormType>({
    defaultValues: formDefaultValues,
  });

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <FormProvider {...methods}>{children}</FormProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
