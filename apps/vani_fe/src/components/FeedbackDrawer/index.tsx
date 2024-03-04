import * as React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

export function FeedbackDrawer(props: {
  children: React.ReactNode;
  componentTrigger: React.ReactNode;
}) {
  const { componentTrigger, children } = props ?? {};
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{componentTrigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
