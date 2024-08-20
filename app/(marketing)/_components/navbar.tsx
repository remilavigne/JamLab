'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Links from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const navigation = [
  // Add any other navigation links you may have here
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-neutral-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">JamLab</span>
            <Image
              alt="Logo"
              src="/logo.svg"
              className="h-8 w-auto"
              width="200"
              height="32"
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-neutral-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {session ? (
            <>
              <Links
                href="/dashboard"
                className="hidden lg:block lg:text-base lg:font-semibold lg:leading-6 lg:text-neutral-900"
              >
                Dashboard
              </Links>
              <button
                onClick={() => signOut()}
                className="hidden lg:block lg:rounded-md lg:bg-orange-400 lg:px-3 lg:py-2 lg:text-base lg:font-semibold lg:text-neutral-900 lg:shadow-sm lg:hover:bg-orange-300 lg:focus-visible:outline lg:focus-visible:outline-2 lg:focus-visible:outline-offset-2 lg:focus-visible:outline-orange-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Links
                href="/sign-in"
                className="hidden lg:block lg:text-base lg:font-semibold lg:leading-6 lg:text-neutral-900"
              >
                Log in
              </Links>
              <Links
                href="/sign-up"
                className="hidden lg:block lg:rounded-md lg:bg-orange-400 lg:px-3 lg:py-2 lg:text-base lg:font-semibold lg:text-neutral-900 lg:shadow-sm lg:hover:bg-orange-300 lg:focus-visible:outline lg:focus-visible:outline-2 lg:focus-visible:outline-offset-2 lg:focus-visible:outline-orange-400"
              >
                Sign up
              </Links>
            </>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center gap-x-6">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">JamLab</span>
              <Image
                alt="Logo"
                src="/logo.svg"
                className="h-8 w-auto"
                width="200"
                height="32"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-neutral-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {session ? (
                  <>
                    <Links
                      href="/admin"
                      className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-100"
                    >
                      Dashboard
                    </Links>
                    <button
                      onClick={() => signOut()}
                      className="mt-3 mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Links
                      href="/sign-in"
                      className="mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-100"
                    >
                      Log in
                    </Links>
                    <Links
                      href="/sign-up"
                      className="mt-3 mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-orange-600 text-neutral-900 hover:bg-orange-300"
                    >
                      Sign up
                    </Links>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
