import { TreeNode, VesselNode } from './types';
import { Node, Edge } from 'reactflow';

export function flattenTreeNodes(treeNode: TreeNode, parentId?: string): VesselNode[] {
  const nodes: VesselNode[] = [
    {
      id: treeNode.id,
      title: treeNode.name,
      type: treeNode.type,
      parentId,
    },
  ];

  if (treeNode.children) {
    treeNode.children.forEach((child) => {
      nodes.push(...flattenTreeNodes(child, treeNode.id));
    });
  }

  return nodes;
}

export function generateFlowNodesAndEdges(
  vesselNodes: VesselNode,
  nodeWidth: number = 140,
  nodeHeight: number = 56,
) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap = new Map<string, { x: number; y: number }>();

  const processNode = (
    nodeId: string,
    parentId: string | undefined,
    depth: number,
    siblingIndex: number,
    siblingCount: number,
  ) => {
    const horizontalSpacing = 220;
    const verticalSpacing = 140;

    const x = depth * horizontalSpacing + 100;
    const y = siblingIndex * verticalSpacing + (depth * 50);

    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      node.position = { x, y };
    }

    nodeMap.set(nodeId, { x, y });
  };


  const addNodesRecursively = (node: VesselNode | any, depth: number = 0, parentId?: string) => {
    const children = Array.isArray(node) ? node : [node];

    children.forEach((child, index) => {
      const flowNode: Node = {
        id: child.id,
        data: { title: child.title, type: child.type },
        position: { x: 0, y: 0 },
        type: 'custom',
      };

      nodes.push(flowNode);

      if (parentId) {
        edges.push({
          id: `${parentId}-${child.id}`,
          source: parentId,
          target: child.id,
          animated: false,
          type: 'smoothstep',
          
        });
      }
    });
  };

  if ('id' in vesselNodes) {
    const flowNode: Node = {
      id: vesselNodes.id,
      data: { title: vesselNodes.title, type: vesselNodes.type },
      position: { x: 0, y: 0 },
      type: 'custom',
    };
    nodes.push(flowNode);
  }

  let yOffset = 0;
  const assignPositions = (node: any, depth: number = 0, parentId?: string, parentY: number = 0) => {
    const x = depth * 220 + 100;
    const y = yOffset;
    yOffset += 140;

    const nodeToUpdate = nodes.find((n) => n.id === node.id);
    if (nodeToUpdate) {
      nodeToUpdate.position = { x, y };
    }

    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        animated: false,
        type: 'smoothstep',
      });
    }
  };

  assignPositions(vesselNodes, 0);

  return { nodes, edges };
}

export function generateEdgesFromNodes(nodes: VesselNode[]): Edge[] {
  return nodes
    .filter((node) => node.parentId)
    .map((node) => ({
      id: `${node.parentId}-${node.id}`,
      source: node.parentId!,
      target: node.id,
      animated: false,
      type: 'smoothstep',
    }));
}
