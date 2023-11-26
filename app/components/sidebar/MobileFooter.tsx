'use client';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoute';
import React from 'react';
import MobileItem from './MobileItem';

function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
      fixed
      justify-between
      w-full
      bottom-0
      z-40
      flex
      items-center
      border-t-[1px]
      lg:hidden
    "
    >
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

export default MobileFooter;
