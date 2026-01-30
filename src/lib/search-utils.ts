import { TreeNode } from './types';

export const findMatchingNodes = (
  node: TreeNode,
  query: string,
  matches: Set<string> = new Set(),
): Set<string> => {
  if (query.trim() === '') {
    return new Set();
  }

  const lowerQuery = query.toLowerCase();

  if (node.name.toLowerCase().includes(lowerQuery)) {
    matches.add(node.id);
  }

  node.children?.forEach((child) => {
    findMatchingNodes(child, query, matches);
  });

  return matches;
};

export const findVisibleParents = (
  node: TreeNode,
  matchingIds: Set<string>,
  parents: Set<string> = new Set(),
): Set<string> => {
  if (matchingIds.has(node.id)) {
  
    collectParents(node, parents);
  }

  node.children?.forEach((child) => {
    findVisibleParents(child, matchingIds, parents);
  });

  return parents;
};

const collectParents = (node: TreeNode, parents: Set<string>): void => {
  parents.add(node.id);
};


export const buildParentMap = (
  node: TreeNode,
  parentMap: Map<string, string | null> = new Map(),
  parentId: string | null = null,
): Map<string, string | null> => {
  parentMap.set(node.id, parentId);

  node.children?.forEach((child) => {
    buildParentMap(child, parentMap, node.id);
  });

  return parentMap;
};


export const getAncestors = (
  nodeId: string,
  parentMap: Map<string, string | null>,
  ancestors: Set<string> = new Set(),
): Set<string> => {
  const parentId = parentMap.get(nodeId);

  if (parentId && parentId !== null) {
    ancestors.add(parentId);
    getAncestors(parentId, parentMap, ancestors);
  }

  return ancestors;
};

export const getVisibleParentIds = (
  rootNode: TreeNode,
  matchingIds: Set<string>,
): Set<string> => {
  const parentMap = buildParentMap(rootNode);
  const visibleParents = new Set<string>();

  matchingIds.forEach((nodeId) => {
    const ancestors = getAncestors(nodeId, parentMap);
    ancestors.forEach((ancestorId) => visibleParents.add(ancestorId));
  });

  return visibleParents;
};
