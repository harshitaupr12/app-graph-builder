import { HomeIcon, SettingsIcon, LayersIcon, ActivityIcon } from 'lucide-react';

export const LeftRail = () => {
  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: LayersIcon, label: 'Layers', active: false },
    { icon: ActivityIcon, label: 'Activity', active: false },
    { icon: SettingsIcon, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-20 border-r border-border/50 bg-gradient-to-b from-card to-muted/20 flex flex-col items-center py-6 gap-3">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="relative group">
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-110'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          </div>
        );
      })}
      
      {/* Divider */}
      <div className="w-8 h-px bg-border/50 my-2"></div>
      
      {/* Status Indicator */}
      <div className="mt-auto">
        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};
