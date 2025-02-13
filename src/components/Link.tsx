'use client';

import type { FC } from 'react';
import { ReactNode } from 'react';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

export interface LinkProps extends NextLinkProps {
  className?: string;
  externalLink?: boolean;
  withUnderline?: boolean;
  href: string;
  variant?: 'light' | 'dark';
  rel?: string;
  title?: string;
  animate?: boolean;
  children: ReactNode;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LinkComponent: FC<LinkProps> = ({
  children,
  href,
  className,
  withUnderline = true,
  externalLink,
  rel,
  title,
  animate = true,
  ...props
}: LinkProps) => {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!router) return;

    e.preventDefault();

    const sleepTime = 1000;
    const body = document.querySelector('body');

    if (body && animate) {
      body.classList.add('page-transition');

      await sleep(sleepTime);
    }


    await router.push(href);

    if (body && animate) {
      await sleep(sleepTime);

      body.classList.remove('page-transition');
    }
  };

  return (
    <Link
      onClick={handleTransition}
      href={href}
      target={externalLink ? '_blank' : '_self'}
      className={` hover:decoration-white active:text-white'} ${withUnderline && 'animate-underline'} ${className}`}
      rel={rel}
      title={title}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
