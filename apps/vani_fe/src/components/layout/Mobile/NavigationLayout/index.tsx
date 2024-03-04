import HeaderMobile from '@/components/Header/Mobile';
import React from 'react';

const NavigationLayout = (props: { children: React.ReactNode }) => {
  const { children } = props ?? {};
  return (
    <div>
      <HeaderMobile />
      {children}
    </div>
  );
};

export default NavigationLayout;
