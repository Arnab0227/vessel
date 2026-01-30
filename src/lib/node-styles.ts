import { NodeType, NodeStyleConfig } from './types';

export const colorPalette = {
  
  equipment: '#5583F7',
  equipmentDraft: '#B3C5FF',
  
  equipmentType: '#EA5050',
  equipmentTypeDraft: '#FFB3B3',
  
  equipmentSubsystem: '#003366',
  equipmentSubsystemDraft: '#6699CC',
 
  assembly: '#929090',
  assemblyDraft: '#C9C6C5',
 
  component: '#34882D',
  componentDraft: '#CAFFBB',
 
  connectorLine: '#9CA3AF',
  toggleBg: 'rgba(255, 255, 255, 0.9)',
  toggleText: '#374151',
};

export const nodeStyleMap: Record<NodeType, NodeStyleConfig> = {
  [NodeType.EQUIPMENT_TYPE]: {
    bgColor: colorPalette.equipmentType,
    textColor: '#FFFFFF',
    borderColor: '#D84545',
    hoverBgColor: '#D84545',
    label: 'Equipment Type',
  },
  [NodeType.EQUIPMENT]: {
    bgColor: colorPalette.equipment,
    textColor: '#FFFFFF',
    borderColor: '#4263D9',
    hoverBgColor: '#4263D9',
    label: 'Equipment',
  },
  [NodeType.ASSEMBLY]: {
    bgColor: colorPalette.assembly,
    textColor: '#FFFFFF',
    borderColor: '#7A7977',
    hoverBgColor: '#7A7977',
    label: 'Assembly',
  },
  [NodeType.COMPONENT]: {
    bgColor: colorPalette.component,
    textColor: '#FFFFFF',
    borderColor: '#2D6B23',
    hoverBgColor: '#2D6B23',
    label: 'Component',
  },
};

export const getDraftStyle = (type: NodeType): NodeStyleConfig => {
  const baseStyle = nodeStyleMap[type];
  
  const draftColors = {
    [NodeType.EQUIPMENT]: { bg: colorPalette.equipmentDraft, text: '#003366' },
    [NodeType.EQUIPMENT_TYPE]: { bg: colorPalette.equipmentTypeDraft, text: '#8B4545' },
    [NodeType.ASSEMBLY]: { bg: colorPalette.assemblyDraft, text: '#5A5858' },
    [NodeType.COMPONENT]: { bg: colorPalette.componentDraft, text: '#2D6B2D' },
  };

  const draftColor = draftColors[type] || draftColors[NodeType.EQUIPMENT];

  return {
    ...baseStyle,
    bgColor: draftColor.bg,
    textColor: draftColor.text,
  };
};


export const getNodeStyle = (type: NodeType): NodeStyleConfig => {
  return nodeStyleMap[type];
};
