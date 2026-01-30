'use client';

import React from 'react';
import { colorPalette } from '@/lib/node-styles';

interface LegendItem {
  color: string;
  label: string;
}

const ColorLegend: React.FC = () => {
  const legendItems: LegendItem[] = [
    { color: colorPalette.equipmentType, label: 'Equipment Type' },
    { color: colorPalette.equipment, label: 'Equipment' },
    { color: colorPalette.equipmentDraft, label: 'Equipment (Draft)' },
    { color: colorPalette.assembly, label: 'Assembly' },
    { color: colorPalette.assemblyDraft, label: 'Assembly (Draft)' },
    { color: colorPalette.component, label: 'Component' },
    { color: colorPalette.componentDraft, label: 'Component (Draft)' },
  ];

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Node Type Legend
      </h3>
      <div className="flex flex-wrap gap-3">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: item.color }}
              aria-label={`Color for ${item.label}`}
            />
            <span className="text-xs text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorLegend;
