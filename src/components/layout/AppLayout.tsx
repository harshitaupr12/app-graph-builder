import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { LeftRail } from './LeftRail';
import { RightPanel } from './RightPanel';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <LeftRail />
        <main className="flex-1 relative">{children}</main>
        <RightPanel />
      </div>
    </div>
  );
};
