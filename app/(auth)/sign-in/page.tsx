'use client';

import Image from 'next/image'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Links from 'next/link';
import { useRouter } from 'next/navigation';

// Input validation using zod
const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'We will need your email to sign you in!')
      .email('Oops, that\'s the wrong email. Check and try again!'),
    password: z
      .string()
      .min(1, 'We will need your password to sign you in!') // Add a generic message for empty password input
  })

export default function SignInForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      form.setError('password', { type: 'manual', message: "Hmm, this password doesn't seem correct. Try again!" });
    } else {
      router.push('/admin')
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
              alt="Logo"
              src="/logo.svg"
              className="h-8 w-auto flex align-items-center justify-center"
              width="200"
              height="32"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
            Welcome home! 👋
          </h2>
          <p className="mt-2 text-center text-base tracking-tight text-neutral-900">
            Enter your information to access JamLab
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-900">
                Your email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...form.register("email")}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Paul.McCartney@exemple.com"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {form.formState.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-900">
                  Your password
                </label>
                <div className="text-sm">
                  <Links href="/forgot-password" className="font-semibold text-orange-600 hover:text-orange-300">
                    Forgot password?
                  </Links>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...form.register("password")}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="PaulMcCartney13.?"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
                {form.formState.errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.password?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-500">
            No account yet?{' '}
            <Links href="/sign-up" className="font-semibold leading-6 text-orange-600 hover:text-orange-300">
             Join us!
            </Links>
          </p>
        </div>
      </div>
    </>
  )
}
