# 🎨 App Graph Builder

A modern, professional graph visualization application built with **React**, **TypeScript**, and **ReactFlow**. Features a stunning glassmorphic UI, dark/light mode, interactive node editing, and real-time service monitoring.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Canvas** - Drag, zoom, pan, and connect nodes with ReactFlow
- **Node Management** - Add, edit, delete, and connect service nodes
- **Real-time Monitoring** - Live CPU, memory, and request metrics
- **Node Inspector** - Detailed service information panel with edit capabilities
- **Multi-App Support** - Switch between different application graphs

### 🎨 Modern UI/UX
- **Glassmorphic Design** - Beautiful backdrop blur and transparency effects
- **Dark/Light Mode** - Smooth theme switching with animated transitions
- **Responsive Layout** - Mobile-optimized with drawer panels
- **Smooth Animations** - Framer Motion powered interactions
- **Professional Components** - Clean, modern interface elements

### 🛠️ Interactive Features
- **Floating Toolbar** - Quick access to zoom, fit view, and layout controls
- **Edge Labels** - Visual connection information between nodes
- **Search Bar** - Filter and search services (top bar)
- **Notifications** - Real-time alerts and system messages
- **User Menu** - Profile, settings, and account management

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

Clone the repository
git clone <your-repo-url>
cd ainyx-frontend-task

Install dependencies
npm install

Start development server
npm run dev
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **TypeScript** | Type safety (strict mode) |
| **Vite** | Build tool & dev server |
| **ReactFlow** | Interactive node-based canvas |
| **TanStack Query** | Data fetching & caching |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Smooth animations |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Modern icon library |
| **MSW** | API mocking for development |

## 🎮 Usage Guide

### Adding a New Node
1. Click the **+ button** in the top-left corner of the canvas
2. A new service node will appear with default values
3. Click the node to open the inspector and edit details

### Editing Node Information
1. Click any node to open the **Node Inspector** panel
2. Hover over the service name and click the **edit icon**
3. Type the new name and press **Enter** or click **Save**
4. Changes are applied immediately

### Connecting Nodes
1. Drag from the **bottom handle** of a source node
2. Drop on the **top handle** of a target node
3. Edge will be created with an animated connection line

### Switching Applications
1. Open the **Applications panel** on the right
2. Click any application card to load its graph
3. The canvas will update with the new service topology

### Theme Toggle
- Click the **Sun/Moon icon** in the top-right corner
- Theme switches with smooth animations
- Preference is saved to localStorage

### Deleting a Node
1. Click the node to open the inspector
2. Click the **trash icon** in the top-right of the inspector
3. Node and all connected edges will be removed

## 📁 Project Structure

src/
├── components/
│ ├── canvas/
│ │ ├── Canvas.tsx # Main ReactFlow canvas
│ │ ├── ServiceNode.tsx # Custom node component
│ │ ├── CustomEdge.tsx # Custom edge with labels
│ │ └── Toolbar.tsx # Floating toolbar
│ ├── inspector/
│ │ └── NodeInspector.tsx # Node details panel
│ ├── layout/
│ │ ├── TopBar.tsx # Header with search & menus
│ │ ├── LeftSidebar.tsx # Navigation sidebar
│ │ └── RightPanel.tsx # Applications panel
│ ├── ui/
│ │ └── button.tsx # Reusable button component
│ └── AppSelector.tsx # Application list
├── context/
│ └── ThemeContext.tsx # Dark/light mode provider
├── store/
│ └── useStore.ts # Zustand global state
├── mocks/
│ ├── handlers.ts # MSW API handlers
│ └── browser.ts # MSW worker setup
├── types/
│ └── index.ts # TypeScript interfaces
├── App.tsx # Root component
├── main.tsx # App entry point
└── index.css # Global styles


## 🎨 Design Principles

### Glassmorphism
- Backdrop blur for depth
- Semi-transparent backgrounds
- Subtle borders and shadows
- Layered visual hierarchy

### Color Palette
- **Primary**: Blue (`#3b82f6`)
- **Success**: Emerald (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Error**: Red (`#ef4444`)
- **Neutral**: Gray scale with dark mode support

### Typography
- **Font Family**: System fonts for performance
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Scales**: Responsive sizing with Tailwind utilities

## 🔧 Available Scripts

Development server with hot reload
npm run dev

Build for production
npm run build

Preview production build
npm run preview

Run ESLint
npm run lint

Type checking
npm run typecheck


## 📱 Responsive Design

- **Desktop** (1024px+): Full layout with all panels visible
- **Tablet** (768px - 1024px): Collapsible right panel
- **Mobile** (<768px): Drawer panels with floating action button

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Key Features Breakdown

### Node Inspector Panel
- **Service Details**: Name, ID, status indicator
- **Performance Metrics**: CPU, Memory, Requests with animated progress bars
- **Additional Info**: Uptime, response time, error rate
- **Actions**: View logs, restart service buttons
- **Edit Mode**: Inline editing of node properties
- **Delete**: Remove node with confirmation

### Floating Toolbar
- **Zoom In/Out**: Precise canvas zoom controls
- **Fit View**: Auto-fit all nodes in viewport
- **Reset Layout**: Restore default positioning
- **Refresh**: Reload graph data

### Top Bar Features
- **Search**: Real-time service filtering
- **Theme Toggle**: Light/dark mode switch
- **Notifications**: System alerts with badges
- **User Menu**: Profile and account options

## 🚧 Future Enhancements

- [ ] Real-time metrics updates via WebSocket
- [ ] Drag-and-drop node creation from sidebar
- [ ] Custom edge routing algorithms
- [ ] Graph export (PNG, SVG, JSON)
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts
- [ ] Minimap toggle
- [ ] Node grouping/clusters
- [ ] Custom node types (database, cache, etc.)
- [ ] Performance monitoring dashboard

## 👨‍💻 Development

### Adding New Node Types

// 1. Define type in src/types/index.ts
export interface DatabaseNodeData {
label: string;
connections: number;
// ... other properties
}

// 2. Create component in src/components/canvas/
export function DatabaseNode({ data }: NodeProps<DatabaseNodeData>) {
// Component implementation
}

// 3. Register in Canvas.tsx
const nodeTypes = {
service: ServiceNode,
database: DatabaseNode, // Add here
};


## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **ReactFlow** - Powerful graph library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide** - Beautiful icon set

---

**Built with ❤️ by Harshita Upreti**

For questions or feedback, reach out at harshita@example.com
