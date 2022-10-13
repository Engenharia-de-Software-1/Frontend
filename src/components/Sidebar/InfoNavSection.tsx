import React from 'react';
import { belowStyle, buttonLogoutStyle, buttonStyle, textStyle, textStyle2 } from './styles';

interface IInfoNavSectionProps {
  logout: () => void;
}

function InfoNavSection({
  logout,
}: IInfoNavSectionProps) {
  return(
    <div className={belowStyle}>
      <div className="flex flex-col mr-auto">
        <text className={textStyle}>
          John Doe
        </text>
        <text className={textStyle2}>
          johndoe@agroi9.com
        </text>
      </div>

      <button className={buttonLogoutStyle} onClick={logout}>
        <i className="ri-logout-box-r-line px-3"></i>
      </button>
  </div>
  );
}

export {InfoNavSection};