import {blo} from 'blo';
import React from 'react';
import type {Address} from 'viem';

interface AccountImageProps {
  id: Address;
  label?: string | null;
  image?: string | null;
}

export const AccountImage: React.FC<AccountImageProps> = ({id, label, image}) => {
  return (
    <img
      src={image || blo(id)}
      alt={label || id}
      title={label || id}
      width={32}
      height={32}
      className="rounded-full object-cover object-center"
    />
  );
};
