'use client';

import Image from 'next/image'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Input validation using zod
const FormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

// Sign-up form component
export default function SignUpForm() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!isMounted) return;

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.status === 409) {
        // Handle the case where the user already exists
        const data = await response.json();
        console.error(data.message);
        alert(data.message); // Show a user-friendly message
      } else if (response.ok) {
        // Redirect on successful registration
        router.push('/sign-in');
      } else {
        console.error('Registration failed');
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
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
            Join the Adventure ! 🎸
          </h2>
          <p className="mt-2 text-center text-base tracking-tight text-neutral-900">
            Enter your information to access JamLab
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-neutral-900">
                Your first name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  {...form.register('firstName')}
                  name="firstName"
                  type="text"
                  required
                  autoComplete="firstName"
                  placeholder="Paul"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-neutral-900">
                Your last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  {...form.register('lastName')}
                  name="lastName"
                  type="text"
                  required
                  autoComplete="lastName"
                  placeholder="McCartney"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-900">
                Your email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...form.register('email')}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Paul.McCartney@exemple.com"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-neutral-900">
                  Your password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...form.register('password')}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="PaulMcCartney13.?"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Already a member of the team? {' '}
            <Link href="/sign-in" className="font-semibold leading-6 text-orange-600 hover:text-orange-300">
              Sign in here!
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
