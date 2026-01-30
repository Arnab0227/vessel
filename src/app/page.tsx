import VesselTreeFlow from '@/components/vessel-tree-flow';
import Sidebar from '@/components/sidebar';
import BreadcrumbNav from '@/components/breadcrumb-nav';
import { vesselHierarchyData } from '@/lib/vessel-data';

export default function Home() {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Area */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <BreadcrumbNav />
        </div>

        {/* Whiteboard Container */}
        <div className="flex-1 overflow-hidden m-4 rounded-lg border-2 border-dashed border-gray-300 bg-white">
          <VesselTreeFlow rootNode={vesselHierarchyData} />
        </div>
      </main>
    </div>
  );
}
