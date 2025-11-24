import { Location } from '@/types';
import { MapPin } from 'lucide-react';

interface WatchlistProps {
    locations: Location[];
}

const Watchlist = ({ locations }: WatchlistProps) => {
    return (
        <div className="h-full overflow-y-auto bg-gray-900 text-white p-4 border-l border-gray-700 w-64">
            <h2 className="text-xl font-bold mb-4 tracking-wider border-b border-gray-700 pb-2">WATCHLIST</h2>
            <div className="space-y-3">
                {locations.map((loc) => (
                    <div key={loc.id} className="bg-gray-800 p-3 rounded border border-gray-700 flex items-center gap-3 hover:bg-gray-750 cursor-pointer">
                        <div className="bg-blue-900 p-2 rounded-full">
                            <MapPin size={16} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{loc.name}</p>
                            <p className="text-xs text-gray-400">{loc.latitude.toFixed(2)}, {loc.longitude.toFixed(2)}</p>
                        </div>
                    </div>
                ))}

                {locations.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No locations watched.</p>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
