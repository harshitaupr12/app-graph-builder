import { useReactFlow } from '@xyflow/react';
import { NodeInspector } from './NodeInspector';

export const NodeInspectorWrapper = () => {
  try {
    // This will throw if not inside ReactFlowProvider
    useReactFlow();
    return <NodeInspector />;
  } catch {
    return <div className="p-4 text-sm text-muted-foreground">Inspector unavailable</div>;
  }
};
