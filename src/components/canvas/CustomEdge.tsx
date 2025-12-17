import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from '@xyflow/react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 11,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="px-2 py-0.5 rounded-md backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-medium shadow-sm">
            {data?.label || 'HTTP'}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
