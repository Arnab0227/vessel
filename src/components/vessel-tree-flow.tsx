'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { TreeNode } from '@/lib/types';
import { flattenTreeNodes, generateEdgesFromNodes } from '@/lib/react-flow-utils';
import CustomVesselNode from './custom-vessel-node';
import { colorPalette, getNodeStyle } from '@/lib/node-styles';
import { Search } from 'lucide-react';
import ColorLegend from './color-legend';

interface VesselTreeFlowProps {
  rootNode: TreeNode;
}

const VesselTreeFlow: React.FC<VesselTreeFlowProps> = ({ rootNode }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const nodeTypes = useMemo(() => ({ custom: CustomVesselNode }), []);

  const vesselNodes = useMemo(() => flattenTreeNodes(rootNode), [rootNode]);

  const initialNodes = useMemo(() => {
    const HORIZONTAL_SPACING = 250;
    const VERTICAL_SPACING = 90;

    const nodePositions = new Map<string, { x: number; y: number }>();

    const getChildren = (parentId?: string): any[] => {
      return vesselNodes.filter((n) => n.parentId === parentId);
    };

    const assignPositions = (parentId: string | undefined, depth: number, startY: number): void => {
      const children = getChildren(parentId);

      children.forEach((child, index) => {
        const childY = startY + index * VERTICAL_SPACING;

        nodePositions.set(child.id, { 
          x: depth * HORIZONTAL_SPACING + 100, 
          y: childY
        });

        assignPositions(child.id, depth + 1, childY);
      });
    };

    assignPositions(undefined, 0, 0);

    return vesselNodes.map((node) => {
      const pos = nodePositions.get(node.id) || { x: 0, y: 0 };
      return {
        id: node.id,
        data: { title: node.title, type: node.type, isExpanded: true },
        position: { x: pos.x, y: pos.y },
        type: 'custom',
      };
    });
  }, [vesselNodes]);

  const initialEdges = useMemo(() => {
    return vesselNodes
      .filter((n) => n.parentId)
      .map((n) => ({
        id: `${n.parentId}-${n.id}`,
        source: n.parentId!,
        target: n.id,
        animated: false,
        type: 'smoothstep',
        style: { stroke: colorPalette.connectorLine, strokeWidth: 2 },
      }));
  }, [vesselNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;

    const matchingIds = new Set<string>();
    const visibleParentIds = new Set<string>();


    vesselNodes.forEach((node) => {
      if (node.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        matchingIds.add(node.id);

        let currentNode = node;
        while (currentNode.parentId) {
          visibleParentIds.add(currentNode.parentId);
          currentNode = vesselNodes.find((n) => n.id === currentNode.parentId)!;
        }
      }
    });

    return nodes.filter(
      (node) => matchingIds.has(node.id) || visibleParentIds.has(node.id)
    );
  }, [nodes, searchQuery, vesselNodes]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleExpandAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data },
      }))
    );
  }, [setNodes]);

  const handleCollapseAll = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data },
      }))
    );
  }, [setNodes]);

  return (
    <div className="flex flex-col h-full">

      <div className="border-b border-gray-200 bg-white p-4 sm:p-6">
 
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search equipment, systems, components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleExpandAll}
            className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
            style={{ backgroundColor: colorPalette.equipment }}
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400 transition-colors"
          >
            Collapse All
          </button>
          {searchQuery && (
            <>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
                style={{ backgroundColor: colorPalette.equipmentType }}
              >
                Clear Search
              </button>
              <span className="px-4 py-2 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-md">
                {filteredNodes.length} match{filteredNodes.length !== 1 ? 'es' : ''}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>


      <ColorLegend />
    </div>
  );
};

export default VesselTreeFlow;
