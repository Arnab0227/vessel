'use client';

import React, { useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { NodeType } from '@/lib/types';
import { getNodeStyle, getDraftStyle } from '@/lib/node-styles';
import { Plus, Minus } from 'lucide-react';
import { colorPalette } from '@/lib/node-styles';
import { shouldShowDraftColor } from '@/lib/color-logic';

interface CustomNodeData {
  title: string;
  type: NodeType;
  isExpanded?: boolean;
}

export const CustomVesselNode: React.FC<{ data: CustomNodeData; id: string }> = ({ 
  data,
  id,
}) => {
  const { getNode, getNodes, setNodes, getEdges, setEdges } = useReactFlow();
 
  const currentNode = getNode(id);
  const isExpanded = currentNode?.data?.isExpanded ?? true;

  const nodes = getNodes();
  const shouldDraft = shouldShowDraftColor(id, nodes, getEdges());
  const style = shouldDraft ? getDraftStyle(data.type) : getNodeStyle(data.type);

  const handleToggleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const currentEdges = getEdges();
      const currentNode = getNode(id);
      const currentIsExpanded = currentNode?.data?.isExpanded ?? true;
      const newIsExpanded = !currentIsExpanded;

      const directChildren = currentEdges
        .filter((edge) => edge.source === id)
        .map((edge) => edge.target);

      const getAllDescendants = (nodeId: string): string[] => {
        const descendants: string[] = [];
        const children = currentEdges
          .filter((edge) => edge.source === nodeId)
          .map((edge) => edge.target);

        descendants.push(...children);
        children.forEach((childId) => {
          descendants.push(...getAllDescendants(childId));
        });

        return descendants;
      };

      const allDescendants = getAllDescendants(id);

      setNodes((nodes) =>
        nodes.map((n) => {
        
          if (n.id === id) {
            return {
              ...n,
              data: { ...n.data, isExpanded: newIsExpanded },
            };
          }
        
          if (newIsExpanded && directChildren.includes(n.id)) {
            return {
              ...n,
              hidden: false,
            };
          }

          if (!newIsExpanded && allDescendants.includes(n.id)) {
            return {
              ...n,
              hidden: true,
            };
          }
          
          return n;
        })
      );

      setEdges((edges) =>
        edges.map((edge) => {
          if (newIsExpanded && directChildren.includes(edge.target)) {
            return { ...edge, hidden: false };
          }
          if (!newIsExpanded && allDescendants.includes(edge.target)) {
            return { ...edge, hidden: true };
          }
          return edge;
        })
      );
    },
    [id, setNodes, setEdges, getEdges, getNode]
  );

  const hasChildren = getEdges().some((edge) => edge.source === id);

  return (
    <div className="relative">
      
      <Handle type="target" position={Position.Left} />

      <div
        className="relative rounded-lg font-medium text-sm text-center flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg overflow-visible"
        style={{
          width: '140px',
          height: '56px',
          backgroundColor: style.bgColor,
          color: style.textColor,
          border: `1px solid ${style.borderColor}`,
          padding: '0 12px',
          paddingRight: '28px',
        }}
      >
        <span className="text-center break-words text-xs sm:text-sm">{data.title}</span>

        <button
          onClick={handleToggleExpand}
          disabled={!hasChildren}
          className={`absolute flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 z-50 ${hasChildren ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
          style={{
            bottom: '-8px',
            right: '-8px',
            backgroundColor: colorPalette.toggleBg,
            border: `2px solid ${style.textColor}`,
            color: style.textColor,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          title={hasChildren ? (isExpanded ? 'Collapse' : 'Expand') : 'No children'}
        >
          {isExpanded ? (
            <Minus size={16} strokeWidth={3} />
          ) : (
            <Plus size={16} strokeWidth={3} />
          )}
        </button>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomVesselNode;
