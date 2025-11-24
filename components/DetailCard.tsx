'use client';

import { Report } from '@/types';
import { X, Leaf, Droplets, Activity } from 'lucide-react';

interface DetailCardProps {
    report: Report | null;
    onClose: () => void;
}

const DetailCard = ({ report, onClose }: DetailCardProps) => {
    if (!report) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CRITICAL': return 'text-red-500 border-red-500 bg-red-900/20';
            case 'BAD': return 'text-yellow-500 border-yellow-500 bg-yellow-900/20';
            case 'OKAY': return 'text-green-500 border-green-500 bg-green-900/20';
            default: return 'text-gray-500 border-gray-500';
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1500] bg-gray-900/95 backdrop-blur-md border-2 border-green-500 rounded-lg p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-green-400 tracking-wider">LOCATION DETAIL</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Coordinates */}
            <div className="mb-4 pb-4 border-b border-gray-700">
                <p className="text-xs text-gray-400 mb-1">COORDINATES</p>
                <p className="font-mono text-sm">{report.latitude.toFixed(4)}°S, {report.longitude.toFixed(4)}°E</p>
            </div>

            {/* Environmental Indices */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                        <Leaf size={16} />
                        <span className="text-xs font-bold">NDVI</span>
                    </div>
                    <p className="text-xl font-mono">{report.ndvi.toFixed(2)}</p>
                </div>

                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                        <Droplets size={16} />
                        <span className="text-xs font-bold">MI</span>
                    </div>
                    <p className="text-xl font-mono">{report.mi.toFixed(2)}</p>
                </div>

                <div className="bg-gray-800 p-3 rounded border border-gray-700">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                        <Activity size={16} />
                        <span className="text-xs font-bold">NDMI</span>
                    </div>
                    <p className="text-xl font-mono">{report.ndmi.toFixed(2)}</p>
                </div>
            </div>

            {/* State */}
            <div className={`p-4 rounded border-2 text-center ${getStatusColor(report.status)}`}>
                <p className="text-xs tracking-wide mb-1">STATE</p>
                <p className="text-2xl font-bold tracking-wider">{report.status}</p>
            </div>

            {/* Message */}
            {report.message_text && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">MESSAGE</p>
                    <p className="text-sm text-gray-300">{report.message_text}</p>
                </div>
            )}

            {/* Image */}
            {report.image_url && (
                <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-2">IMAGE</p>
                    <img src={report.image_url} alt="Report" className="w-full rounded border border-gray-700" />
                </div>
            )}

            {/* Metadata */}
            <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                <p>Report ID: {report.id.slice(0, 8)}</p>
                <p>Time: {new Date(report.created_at).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default DetailCard;
