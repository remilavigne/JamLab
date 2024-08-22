import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  href,
  type = 'button',
  disabled = false,
  icon,
  children,
  onClick,
}) => {
  const baseClasses = 'w-full rounded-md font-semibold text-center shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const variantClasses = classNames({
    'bg-orange-600 text-white hover:bg-orange-300 focus-visible:outline-orange-300': variant === 'primary',
    'bg-orange-400 text-neutral-900 hover:bg-orange-300 focus-visible:outline-orange-400': variant === 'secondary',
    'text-neutral-900 hover:text-neutral-700 focus-visible:outline-neutral-700': variant === 'link',
  });
  const sizeClasses = classNames({
    'px-3 py-1.5 text-sm': size === 'small',
    'px-3.5 py-2.5 text-base': size === 'medium',
    'px-4 py-3 text-lg': size === 'large',
  });
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const content = (
    <span className="flex items-center justify-center gap-2">
      {icon}
      {children}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses}`}
        aria-disabled={disabled}>
          {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
