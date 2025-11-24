import { Report } from '@/types';
import { MapPin, Clock } from 'lucide-react';

interface FeedSidebarProps {
    reports: Report[];
}

const FeedSidebar = ({ reports }: FeedSidebarProps) => {
    return (
        <div className="h-full w-full glass-panel flex flex-col">
            {/* Header */}
            <div className="h-10 flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
                <span className="text-[11px] font-bold tracking-[0.15em] text-slate-300 font-data">
                    LIVE FEED
                </span>
                <span className="ml-auto text-[9px] text-[#30D158] font-data animate-pulse">● LIVE</span>
            </div>

            {/* Report Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {reports.map((report) => {
                    const statusColor = report.status === 'CRITICAL' ? '#FF453A' :
                        report.status === 'BAD' ? '#FF9F0A' :
                            '#30D158';

                    return (
                        <div
                            key={report.id}
                            className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer p-3 rounded-sm"
                        >
                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className="text-[9px] font-bold font-data px-2 py-0.5 rounded-sm"
                                    style={{
                                        color: statusColor,
                                        borderColor: statusColor,
                                        backgroundColor: `${statusColor}15`,
                                        border: `1px solid ${statusColor}`
                                    }}
                                >
                                    {report.status}
                                </span>
                                <span className="text-[9px] text-slate-500 font-data">
                                    ID: {report.id.slice(0, 6).toUpperCase()}
                                </span>
                            </div>

                            {/* Message */}
                            <div className="mb-3">
                                <p className="text-xs text-slate-200 leading-relaxed">
                                    {report.message || report.category}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 mb-2 text-[10px] text-slate-400 font-data">
                                <MapPin size={10} className="text-slate-500" />
                                <span className="tabular-nums">
                                    {report.latitude.toFixed(4)}°, {report.longitude.toFixed(4)}°
                                </span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-data">
                                <Clock size={10} />
                                <span>
                                    {new Date(report.created_at).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State */}
                {reports.length === 0 && (
                    <div className="p-8 text-center border border-dashed border-slate-800">
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-data">
                            NO REPORTS
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedSidebar;
