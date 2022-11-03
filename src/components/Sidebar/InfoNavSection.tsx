import React from 'react';
import { belowStyle, buttonLogoutStyle, buttonStyle, textStyle, textStyle2 } from './styles';

interface IInfoNavSectionProps {
  name: string;
  email: string;
  logout: () => void;
}

function InfoNavSection({
  name,
  email,
  logout,
}: IInfoNavSectionProps) {
  return(
    <div className={belowStyle}>
      <div className="flex flex-col mr-auto">
        <text className={textStyle}>
          {name}
        </text>
        <text className={textStyle2}>
          {email}
        </text>
      </div>

      <button className={buttonLogoutStyle} onClick={logout}>
        <i className="ri-logout-box-r-line px-3"></i>
      </button>
  </div>
  );
}

export {InfoNavSection};