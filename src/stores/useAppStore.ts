import { create } from 'zustand';

interface AppStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
