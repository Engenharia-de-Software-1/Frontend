import React from 'react';
import { Button } from './button';

interface INavButtonProps {
  icon: string;
  title: string;
  href: string;
}

function NavButton({
  icon,
  title,
  href
}: INavButtonProps) {
  return(
    <Button href={href}>
      <h1>
        <i className={`${icon} px-3`}/>
        {title}
      </h1>
    </Button>
  );
}

export {NavButton};