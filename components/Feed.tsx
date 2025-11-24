import { Report } from '@/types';
import { Leaf, Droplets, Activity } from 'lucide-react';

interface FeedProps {
    reports: Report[];
}

const Feed = ({ reports }: FeedProps) => {
    return (
        <div className="h-full overflow-y-auto bg-gray-900 text-white p-4 border-r border-gray-700 w-80">
            <h2 className="text-xl font-bold mb-4 tracking-wider border-b border-gray-700 pb-2">LIVE FEED</h2>
            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-gray-400">{report.id.slice(0, 6)}</span>
                            <span className="text-xs text-gray-400">{new Date(report.created_at).toLocaleTimeString()}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            {report.image_url ? (
                                <img src={report.image_url} alt="Report" className="w-12 h-12 object-cover rounded" />
                            ) : (
                                <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs">IMG</div>
                            )}
                            <div>
                                <p className="text-sm font-semibold">{report.category}</p>
                                <p className={`text-xs font-bold ${report.status === 'CRITICAL' ? 'text-red-500' :
                                        report.status === 'BAD' ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                    {report.status}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-xs text-gray-300">
                            <div className="flex items-center gap-1" title="NDVI">
                                <Leaf size={12} /> {report.ndvi.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-1" title="MI">
                                <Droplets size={12} /> {report.mi.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-1" title="NDMI">
                                <Activity size={12} /> {report.ndmi.toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
