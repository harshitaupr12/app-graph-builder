import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';
import { ThemeProvider } from './context/ThemeContext';
import { TopBar } from './components/layout/TopBar';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightPanel } from './components/layout/RightPanel';
import { Canvas } from './components/canvas/Canvas';
import { Menu } from 'lucide-react';

const queryClient = new QueryClient();

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
            <TopBar />
            
            <div className="flex-1 flex overflow-hidden relative">
              <LeftSidebar />
              
              <main className="flex-1 relative">
                <Canvas />
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsPanelOpen(true)}
                  className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-xl shadow-blue-500/30 flex items-center justify-center z-20 active:scale-95 transition-all"
                >
                  <Menu className="w-6 h-6 text-white" />
                </button>
              </main>
              
              <RightPanel 
                isOpen={isPanelOpen} 
                onClose={() => setIsPanelOpen(false)} 
              />
            </div>
          </div>
        </ReactFlowProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
