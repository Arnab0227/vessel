import { TreeNode, NodeType } from './types';

export const vesselHierarchyData: TreeNode = {
  id: 'equipments',
  name: 'Equipments',
  type: NodeType.EQUIPMENT,
  children: [
    {
      id: 'engine',
      name: 'Engine',
      type: NodeType.EQUIPMENT,
      children: [
        {
          id: 'main-engine-propulsion',
          name: 'Main Engine & Propulsion',
          type: NodeType.EQUIPMENT_TYPE,
          children: [
            {
              id: 'main-engine',
              name: 'Main Engine',
              type: NodeType.ASSEMBLY,
              children: [
                {
                  id: 'air-exhaust-system',
                  name: 'Air & Exhaust System',
                  type: NodeType.ASSEMBLY,
                  children: [
                    { id: 'me-turbocharger', name: 'ME Turbocharger', type: NodeType.ASSEMBLY, children: [
                      { id: 'spare-parts-box', name: 'Spare Parts Box', type: NodeType.COMPONENT },
                      { id: 'seal', name: 'Seal', type: NodeType.COMPONENT },
                      { id: 'o-ring', name: 'O-Ring', type: NodeType.COMPONENT },
                      { id: 'seal-turbine', name: 'Seal - Turbine Side', type: NodeType.COMPONENT },
                      { id: 'seal-compressor', name: 'Seal - Compressor Side', type: NodeType.COMPONENT },
                      { id: 'seal-engine-mount', name: 'Seal - Engine Mount', type: NodeType.COMPONENT },
                      { id: 'seal-exhaust-flange', name: 'Seal - Exhaust Flange', type: NodeType.COMPONENT },
                      { id: 'seal-oil-pan', name: 'Seal - Oil Pan', type: NodeType.COMPONENT },
                      { id: 'seal-intake-manifold', name: 'Seal - Intake Manifold', type: NodeType.COMPONENT },
                      { id: 'seal-transmission-case', name: 'Seal Transmission Case', type: NodeType.COMPONENT },
                    ] },
                    { id: 'aux-blower', name: 'Aux Blower', type: NodeType.ASSEMBLY },
                    { id: 'aux-blower-2', name: 'Aux Blower 2', type: NodeType.ASSEMBLY },
                    { id: 'charge-air-cooler', name: 'Charge Air Cooler', type: NodeType.ASSEMBLY },
                    { id: 'exhaust-valve-complete', name: 'Exhaust Valve Complete', type: NodeType.ASSEMBLY },
                  ],
                },
                { id: 'control-safety', name: 'Control & Safety System', type: NodeType.ASSEMBLY },
                { id: 'fuel-system', name: 'Fuel System', type: NodeType.ASSEMBLY },
                { id: 'cooling-water', name: 'Cooling Water System', type: NodeType.ASSEMBLY },
                { id: 'cylinder-liner-lube', name: 'Cylinder Liner & Lubrication', type: NodeType.ASSEMBLY },
              ],
            },
            { id: 'propeller', name: 'Propeller', type: NodeType.ASSEMBLY },
            { id: 'shafting', name: 'Shafting', type: NodeType.ASSEMBLY },
          ],
        },
        { id: 'power-generation', name: 'Power Generation', type: NodeType.EQUIPMENT_TYPE },
        { id: 'aux-boiler', name: 'Aux boiler', type: NodeType.EQUIPMENT_TYPE },
        { id: 'aux-machinery', name: 'Aux Machinary', type: NodeType.EQUIPMENT_TYPE },
        { id: 'electrical-automation', name: 'Electrical & Automation', type: NodeType.EQUIPMENT_TYPE },
        { id: 'tank-systems', name: 'Tank Systems', type: NodeType.EQUIPMENT_TYPE },
        { id: 'dp-system', name: 'DP System', type: NodeType.EQUIPMENT_TYPE },
        { id: 'others', name: 'Others', type: NodeType.EQUIPMENT_TYPE },
      ],
    },
    { id: 'deck', name: 'Deck', type: NodeType.EQUIPMENT },
    { id: 'accommodation', name: 'Accomodation', type: NodeType.EQUIPMENT },
    { id: 'misc', name: 'Misc.', type: NodeType.EQUIPMENT },
  ],
};
