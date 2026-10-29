import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function BorderBeam({ children, className = '' }: Props) {
  return (
    <div className={`border-beam relative ${className}`}>
      {children}
    </div>
  );
}
