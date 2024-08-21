'use client';

import React from 'react';

export default function ForgotPasswordPage () {

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900">
          Forgot Your Password? 🤔
        </h2>
        <p className="mt-2 text-center text-base tracking-tight text-neutral-900">
          Enter your email address below and we will send you a link to reset your password.
        </p>
      </div>
    </div>
  );
}
