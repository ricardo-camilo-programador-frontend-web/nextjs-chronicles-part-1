"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { TextInput } from "@/components/forms/TextInput";
import { Checkbox } from "@/components/forms/Checkbox";
import Button from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "@/components/Link";
import { useTranslations } from 'next-intl';
import type { FieldValues, UseFormRegister } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/user/loginSchema";
import { useToast } from "@/hooks/useToast";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations('auth');
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/user");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(`${t('loginFailed')} ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <Logo width={120} height={120} />
        <LanguageSwitcher />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('welcome')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('loginMessage')}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <TextInput
                label={t('email')}
                name="email"
                type="email"
                register={register as unknown as UseFormRegister<FieldValues>}
                error={errors.email?.message}
                autocomplete="email"
              />

              <TextInput
                label={t('password')}
                name="password"
                type={showPassword ? "text" : "password"}
                register={register as unknown as UseFormRegister<FieldValues>}
                error={errors.password?.message}
                autocomplete="current-password"
              >
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 border-none bg-transparent"
                >
                  {showPassword ? (
                    <EyeIcon className="w-6 h-6" />
                  ) : (
                    <EyeOffIcon className="w-6 h-6" />
                  )}
                </Button>
              </TextInput>
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                label={t('rememberMe')}
                className="relative"
                register={register as unknown as UseFormRegister<FieldValues>}
                name="rememberMe"
              />

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              label={t('signIn')}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            />

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {t('noAccount')}{' '}
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t('createAccount')}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}