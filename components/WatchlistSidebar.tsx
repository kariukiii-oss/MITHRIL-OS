import { Location } from '@/types';
import { MapPin, Leaf, Droplets, Activity } from 'lucide-react';

interface WatchlistSidebarProps {
    locations: Location[];
}

const WatchlistSidebar = ({ locations }: WatchlistSidebarProps) => {
    // Mock indices for demo (stable values based on location ID to avoid hydration mismatch)
    const getMockIndices = (id: string) => {
        // Simple hash function to generate stable "random" numbers from string ID
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = ((hash << 5) - hash) + id.charCodeAt(i);
            hash |= 0;
        }
        const normalize = (val: number) => Math.abs((val % 100) / 100);

        return {
            ndvi: 0.2 + (normalize(hash) * 0.6), // 0.2 - 0.8
            mi: 0.2 + (normalize(hash + 1) * 0.6),
            ndmi: 0.2 + (normalize(hash + 2) * 0.6)
        };
    };

    return (
        <div className="h-full w-full glass-panel flex flex-col">
            {/* Header */}
            <div className="h-10 flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
                <span className="text-[11px] font-bold tracking-[0.15em] text-slate-300 font-data">
                    WATCHLIST
                </span>
                <span className="ml-auto text-[9px] text-slate-500 font-data bg-slate-800 px-1.5 py-0.5 rounded-sm">
                    {locations.length} ZONES
                </span>
            </div>

            {/* Location Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {locations.map((location) => {
                    const indices = getMockIndices(location.id);

                    return (
                        <div
                            key={location.id}
                            className="bg-slate-900/60 border border-slate-800 hover:border-[#0A84FF] transition-all cursor-pointer p-3 rounded-sm"
                        >
                            {/* Location Name */}
                            <h3 className="text-sm font-bold text-slate-200 mb-2 uppercase tracking-wide">
                                {location.name}
                            </h3>

                            {/* Coordinates */}
                            <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-400 font-data">
                                <MapPin size={10} className="text-slate-500" />
                                <span className="tabular-nums">
                                    {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
                                </span>
                            </div>

                            {/* Environmental Indices */}
                            <div className="space-y-2 pt-2 border-t border-slate-700/50">
                                {/* NDVI */}
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Leaf size={10} className="text-green-500" />
                                        <span className="font-data">NDVI</span>
                                    </div>
                                    <span className="font-bold font-data text-slate-200 tabular-nums">
                                        {indices.ndvi.toFixed(2)}
                                    </span>
                                </div>

                                {/* MI */}
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Droplets size={10} className="text-blue-500" />
                                        <span className="font-data">MI</span>
                                    </div>
                                    <span className="font-bold font-data text-slate-200 tabular-nums">
                                        {indices.mi.toFixed(2)}
                                    </span>
                                </div>

                                {/* NDMI */}
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Activity size={10} className="text-purple-500" />
                                        <span className="font-data">NDMI</span>
                                    </div>
                                    <span className="font-bold font-data text-slate-200 tabular-nums">
                                        {indices.ndmi.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State */}
                {locations.length === 0 && (
                    <div className="p-8 text-center border border-dashed border-slate-800">
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-data">
                            NO ZONES
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchlistSidebar;
