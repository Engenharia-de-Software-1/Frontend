import React, { ReactNode } from 'react';
import { textTitle } from './styles';

interface INavSectionProps {
  title: string;
  children?: ReactNode;
}

function NavSection({
  title,
  children,
}: INavSectionProps) {
  return(
    <div className='mb-10'>
      <h1 className={textTitle}>{title}</h1>
      {children}
    </div>
  );
}

export {NavSection};