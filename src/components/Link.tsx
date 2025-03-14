import type { FC } from 'react';
import { ReactNode } from 'react';
import Link, { LinkProps as NextLinkProps } from 'next/link';

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
  return (
    <Link
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
