import { Report } from '@/types';
import { Leaf, Droplets, Activity, X } from 'lucide-react';

interface DetailHUDProps {
    report: Report;
    onClose: () => void;
}

const DetailHUD = ({ report, onClose }: DetailHUDProps) => {
    const isCritical = report.status === 'CRITICAL';

    // Calculate progress percentages (0-100)
    const ndviPercent = Math.max(0, Math.min(100, report.ndvi * 100));
    const miPercent = Math.max(0, Math.min(100, report.mi * 100));
    const ndmiPercent = Math.max(0, Math.min(100, report.ndmi * 100));

    return (
        <div className="w-80 pointer-events-auto">
            {/* Ranger HUD - Glassmorphism Card */}
            <div className="glass-panel backdrop-blur-md shadow-2xl scanline-container">

                {/* Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/30">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-[#FF453A] critical-pulse' : 'bg-[#30D158]'}`}
                                    style={{ boxShadow: isCritical ? '0 0 8px #FF453A' : '0 0 8px #30D158' }}
                                />
                                <span className="text-[9px] text-slate-400 font-data tracking-widest">
                                    TARGET ACQUIRED
                                </span>
                            </div>
                            <h2 className="text-lg font-bold font-data text-slate-100 tracking-wider">
                                {report.message ? report.message.toUpperCase() : `LOC: ${Math.abs(report.latitude).toFixed(0)}°S, ${Math.abs(report.longitude).toFixed(0)}°E`}
                            </h2>
                            <span className="text-[10px] text-slate-500 font-data tabular-nums">
                                {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Metrics Grid with Progress Bars */}
                <div className="p-4 space-y-4">
                    {/* NDVI */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Leaf size={14} />
                                <span className="text-[11px] font-data tracking-wider">NDVI</span>
                            </div>
                            <span className="text-sm font-bold font-data text-slate-100 tabular-nums">
                                {report.ndvi.toFixed(2)}
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-900 border border-slate-800 overflow-hidden">
                            <div
                                className="h-full transition-all"
                                style={{
                                    width: `${ndviPercent}%`,
                                    backgroundColor: report.ndvi < 0.2 ? '#FF453A' : '#30D158',
                                    boxShadow: report.ndvi < 0.2 ? '0 0 8px #FF453A' : '0 0 8px #30D158'
                                }}
                            />
                        </div>
                    </div>

                    {/* MI */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Droplets size={14} />
                                <span className="text-[11px] font-data tracking-wider">MI</span>
                            </div>
                            <span className="text-sm font-bold font-data text-slate-100 tabular-nums">
                                {report.mi.toFixed(2)}
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-900 border border-slate-800 overflow-hidden">
                            <div
                                className="h-full transition-all"
                                style={{
                                    width: `${miPercent}%`,
                                    backgroundColor: report.mi < 0.2 ? '#FF453A' : '#0A84FF',
                                    boxShadow: report.mi < 0.2 ? '0 0 8px #FF453A' : '0 0 8px #0A84FF'
                                }}
                            />
                        </div>
                    </div>

                    {/* NDMI */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Activity size={14} />
                                <span className="text-[11px] font-data tracking-wider">NDMI</span>
                            </div>
                            <span className="text-sm font-bold font-data text-slate-100 tabular-nums">
                                {report.ndmi.toFixed(2)}
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-900 border border-slate-800 overflow-hidden">
                            <div
                                className="h-full transition-all"
                                style={{
                                    width: `${ndmiPercent}%`,
                                    backgroundColor: report.ndmi < 0.2 ? '#FF453A' : '#FF9F0A',
                                    boxShadow: report.ndmi < 0.2 ? '0 0 8px #FF453A' : '0 0 8px #FF9F0A'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer: State Indicator */}
                <div className={`p-3 border-t border-slate-800 text-center ${isCritical ? 'bg-[#FF453A]/10' : 'bg-slate-900/30'
                    }`}>
                    <h3 className={`text-base font-black font-data tracking-[0.2em] ${isCritical ? 'text-[#FF453A] critical-pulse' :
                        report.status === 'BAD' ? 'text-[#FF9F0A]' :
                            'text-[#30D158]'
                        }`}>
                        STATE: {report.status}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DetailHUD;
