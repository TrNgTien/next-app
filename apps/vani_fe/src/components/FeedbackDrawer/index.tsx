import * as React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

export function FeedbackDrawer(props: {
  children: React.ReactNode;
  componentTrigger: React.ReactNode;
}) {
  const { componentTrigger, children } = props ?? {};


  return (
    <Drawer>
      <DrawerTrigger asChild>{componentTrigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
