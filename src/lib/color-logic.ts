import { Node, Edge } from 'reactflow';

export const getAllDescendants = (nodeId: string, edges: Edge[]): string[] => {
  const descendants: string[] = [];
  const directChildren = edges
    .filter((e) => e.source === nodeId)
    .map((e) => e.target);

  descendants.push(...directChildren);
  directChildren.forEach((childId) => {
    descendants.push(...getAllDescendants(childId, edges));
  });

  return descendants;
};


export const getAllAncestors = (nodeId: string, edges: Edge[]): string[] => {
  const ancestors: string[] = [];
  const parentEdge = edges.find((e) => e.target === nodeId);

  if (!parentEdge) return ancestors; // Root node

  const parentId = parentEdge.source;
  ancestors.push(parentId);
  ancestors.push(...getAllAncestors(parentId, edges));

  return ancestors;
};

export const isNodeOrHasExpandedDescendant = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): boolean => {
  const node = nodes.find((n) => n.id === nodeId);

  if (node?.data?.isExpanded === true) return true;

  const descendants = getAllDescendants(nodeId, edges);
  return descendants.some((descId) => {
    const descendantNode = nodes.find((n) => n.id === descId);
    return descendantNode?.data?.isExpanded === true;
  });
};

export const getSiblings = (nodeId: string, edges: Edge[]): string[] => {
  const parentEdge = edges.find((e) => e.target === nodeId);
  if (!parentEdge) return []; 

  const parentId = parentEdge.source;
  const siblings = edges
    .filter((e) => e.source === parentId)
    .map((e) => e.target)
    .filter((id) => id !== nodeId);

  return siblings;
};

export const shouldShowDraftColor = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): boolean => {
  const node = nodes.find((n) => n.id === nodeId);
  const isExpanded = node?.data?.isExpanded === true;

  if (isExpanded) return false;

  if (isNodeOrHasExpandedDescendant(nodeId, nodes, edges)) return false;

  const siblings = getSiblings(nodeId, edges);

  if (siblings.length === 0) return false;
  const anySiblingActive = siblings.some((sibId) =>
    isNodeOrHasExpandedDescendant(sibId, nodes, edges)
  );

  return anySiblingActive;
};


export const isOnActiveBranch = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): boolean => {
 
  return isNodeOrHasExpandedDescendant(nodeId, nodes, edges);
};


export const getActivePath = (nodes: Node[], edges: Edge[]): string[] => {
  const expandedNodes = nodes.filter((n) => n.data?.isExpanded === true);

  if (expandedNodes.length === 0) return [];

  const allAncestorsOfExpanded = new Set<string>();
  expandedNodes.forEach((expanded) => {
    allAncestorsOfExpanded.add(expanded.id);
    getAllAncestors(expanded.id, edges).forEach((ancestor) => {
      allAncestorsOfExpanded.add(ancestor);
    });
  });

  return Array.from(allAncestorsOfExpanded);
};
