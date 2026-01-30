import { Node, Edge } from 'reactflow';

export enum NodeType {
  EQUIPMENT_TYPE = 'equipment-type',
  EQUIPMENT = 'equipment',
  ASSEMBLY = 'assembly',
  COMPONENT = 'component',
}

export interface VesselNode {
  id: string;
  title: string;
  type: NodeType;
  parentId?: string;
}

export interface VesselFlowNode extends Node {
  data: {
    title: string;
    type: NodeType;
  };
}

export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  children?: TreeNode[];
}

export interface ExpandedState {
  [nodeId: string]: boolean;
}

export interface NodeStyleConfig {
  bgColor: string;
  textColor: string;
  borderColor: string;
  hoverBgColor: string;
  label: string;
}
