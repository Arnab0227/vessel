'use client';

import React, { useState, useMemo } from 'react';
import { TreeNode as TreeNodeType, ExpandedState } from '@/lib/types';
import TreeNode from './tree-node';
import {
  findMatchingNodes,
  getVisibleParentIds,
} from '@/lib/search-utils';
import { Search } from 'lucide-react';
import { colorPalette } from '@/lib/node-styles';
import ColorLegend from './color-legend';

interface VesselTreeProps {
  rootNode: TreeNodeType;
}

const VesselTree: React.FC<VesselTreeProps> = ({ rootNode }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [searchQuery, setSearchQuery] = useState('');


  const { matchingIds, visibleParentIds } = useMemo(() => {
    const matching = findMatchingNodes(rootNode, searchQuery);
    const visible = getVisibleParentIds(rootNode, matching);
    return { matchingIds: matching, visibleParentIds: visible };
  }, [searchQuery, rootNode]);

  const expandedWithSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return expanded;
    }

    const autoExpanded = { ...expanded };
    visibleParentIds.forEach((nodeId) => {
      autoExpanded[nodeId] = true;
    });
    return autoExpanded;
  }, [expanded, searchQuery, visibleParentIds]);

  const handleToggle = (nodeId: string): void => {
    setExpanded((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleClearSearch = (): void => {
    setSearchQuery('');
  };

  const handleCollapseAll = (): void => {
    setExpanded({});
  };

  const handleExpandAll = (node: TreeNodeType): void => {
    const expandedState: ExpandedState = {};

    const traverse = (n: TreeNodeType): void => {
      if (n.children && n.children.length > 0) {
        expandedState[n.id] = true;
        n.children.forEach(traverse);
      }
    };

    traverse(node);
    setExpanded(expandedState);
  };

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
            onClick={() => handleExpandAll(rootNode)}
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
                {matchingIds.size} match{matchingIds.size !== 1 ? 'es' : ''}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 tree-container">
        {matchingIds.size === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No equipment found matching
              <span className="font-semibold text-gray-700 ml-2">"{searchQuery}"</span>
            </p>
          </div>
        )}

        {(matchingIds.size > 0 || !searchQuery) && (
          <TreeNode
            node={rootNode}
            expanded={expandedWithSearch}
            onToggle={handleToggle}
            depth={0}
            searchQuery={searchQuery}
            matchingIds={matchingIds}
            visibleParentIds={visibleParentIds}
          />
        )}
      </div>

      <ColorLegend />
    </div>
  );
};

export default VesselTree;
