'use client';

import React from 'react';
import { TreeNode as TreeNodeType, ExpandedState } from '@/lib/types';
import { getNodeStyle } from '@/lib/node-styles';
import { colorPalette } from '@/lib/node-styles';
import { Plus, Minus } from 'lucide-react';

interface TreeNodeProps {
  node: TreeNodeType;
  expanded: ExpandedState;
  onToggle: (nodeId: string) => void;
  depth: number;
  searchQuery: string;
  matchingIds: Set<string>;
  visibleParentIds: Set<string>;
}

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 120;
const NODE_WIDTH = 140;
const NODE_HEIGHT = 56;
const CURVE_RADIUS = 200;

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  expanded,
  onToggle,
  depth,
  searchQuery,
  matchingIds,
  visibleParentIds,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id] ?? false;
  const isMatching = matchingIds.has(node.id);
  const shouldShow =
    !searchQuery ||
    isMatching ||
    visibleParentIds.has(node.id);

  if (!shouldShow) return null;

  const style = getNodeStyle(node.type);
  const childCount = node.children?.length ?? 0;
  const spineX = NODE_WIDTH / 2;

  return (
    <div className="relative inline-block" style={{ marginRight: '20px', marginBottom: '40px' }}>
      
      {hasChildren && isExpanded && childCount > 0 && (
        <svg
          className="absolute"
          style={{
            top: NODE_HEIGHT,
            left: spineX - 10,
            width: childCount > 1 ? (childCount - 1) * HORIZONTAL_SPACING + 60 : 80,
            height: VERTICAL_SPACING + 20,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'visible',
          }}
        >
         
          <line
            x1="10"
            y1="0"
            x2="10"
            y2={VERTICAL_SPACING}
            stroke={colorPalette.connectorLine}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {node.children?.map((_, index) => {
            const childX = index * HORIZONTAL_SPACING + 30;
            const branchStartY = (index / (childCount - 1 || 1)) * VERTICAL_SPACING;

            return (
              <g key={`branch-${index}`}>
               
                <path
                  d={`M 10 ${branchStartY} Q ${(10 + childX) / 2} ${branchStartY + CURVE_RADIUS} ${childX} ${VERTICAL_SPACING}`}
                  stroke={colorPalette.connectorLine}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Node Card */}
      <div
        className="relative rounded-lg font-medium text-sm text-center flex items-center justify-center cursor-default transition-all duration-200 hover:shadow-lg"
        style={{
          width: `${NODE_WIDTH}px`,
          height: `${NODE_HEIGHT}px`,
          backgroundColor: style.bgColor,
          color: style.textColor,
          border: `1px solid ${style.borderColor}`,
          padding: '0 12px',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <span className="text-center break-words text-xs sm:text-sm">{node.name}</span>

        {hasChildren && (
          <button
            onClick={() => onToggle(node.id)}
            className="absolute bottom-1 right-1 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: colorPalette.toggleBg,
              border: `1.5px solid ${style.textColor}`,
              color: style.textColor,
              cursor: 'pointer',
            }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <Minus size={14} strokeWidth={2.5} />
            ) : (
              <Plus size={14} strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div style={{ marginTop: VERTICAL_SPACING + 30, display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
          {node.children?.map((child) => (
            <div key={child.id} style={{ display: 'inline-block' }}>
              <TreeNode
                node={child}
                expanded={expanded}
                onToggle={onToggle}
                depth={depth + 1}
                searchQuery={searchQuery}
                matchingIds={matchingIds}
                visibleParentIds={visibleParentIds}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
