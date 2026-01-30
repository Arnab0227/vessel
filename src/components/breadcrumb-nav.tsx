'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Fleet Management' },
  { label: 'Sagar Kanya' },
  { label: 'Vessel Hierarchy Tree' },
];

export default function BreadcrumbNav() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
          <span className={index === breadcrumbs.length - 1 ? 'font-semibold text-gray-900' : 'text-gray-600'}>
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
