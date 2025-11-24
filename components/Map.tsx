'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report, Location } from '@/types';

// Fix for default Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Tactical Marker Icons
const createTacticalIcon = (status: string) => {
    const color = status === 'CRITICAL' ? '#FF453A' :
        status === 'BAD' ? '#FF9F0A' :
            '#30D158';

    return L.divIcon({
        className: 'custom-tactical-icon',
        html: `
            <div style="
                background-color: ${color};
                width: 10px;
                height: 10px;
                border-radius: 50%;
                box-shadow: 0 0 12px ${color}, 0 0 24px ${color};
                border: 1px solid rgba(255,255,255,0.3);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 24px;
                    height: 24px;
                    border: 1px solid ${color};
                    border-radius: 50%;
                    opacity: 0.4;
                    animation: pulse 2s infinite;
                "></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const flagIcon = L.divIcon({
    className: 'custom-flag-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>`,
    iconSize: [20, 20],
    iconAnchor: [4, 20]
});

interface MapProps {
    reports: Report[];
    locations: Location[];
    onReportSelect: (report: Report | null) => void;
}

const MapEvents = ({ onMapClick }: { onMapClick: () => void }) => {
    useMapEvents({
        click: () => onMapClick(),
    });
    return null;
};

const Map = ({ reports, locations, onReportSelect }: MapProps) => {
    // Helper to generate consistent mock indices for locations (same as WatchlistSidebar)
    const getMockIndices = (id: string) => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = ((hash << 5) - hash) + id.charCodeAt(i);
            hash |= 0;
        }
        const normalize = (val: number) => Math.abs((val % 100) / 100);
        return {
            ndvi: 0.2 + (normalize(hash) * 0.6),
            mi: 0.2 + (normalize(hash + 1) * 0.6),
            ndmi: 0.2 + (normalize(hash + 2) * 0.6)
        };
    };

    // Convert location to report-like structure for HUD
    const handleLocationClick = (location: Location) => {
        const indices = getMockIndices(location.id);
        // Determine status based on NDVI
        const status = indices.ndvi < 0.3 ? 'CRITICAL' : indices.ndvi < 0.5 ? 'BAD' : 'OKAY';

        const mockReport: Report = {
            id: location.id,
            latitude: location.latitude,
            longitude: location.longitude,
            created_at: location.created_at,
            status: status,
            category: 'MONITORED ZONE',
            message: location.name, // Use name as message
            ndvi: indices.ndvi,
            mi: indices.mi,
            ndmi: indices.ndmi
        };
        onReportSelect(mockReport);
    };

    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={[-1.2921, 36.8219]}
                zoom={13}
                style={{ height: '100%', width: '100%', background: '#1e293b' }}
                zoomControl={true}
                zoomControlOptions={{ position: 'bottomright' }}
            >
                {/* Standard OSM tiles - full color */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                />

                <MapEvents onMapClick={() => onReportSelect(null)} />

                {/* Report Markers */}
                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[report.latitude, report.longitude]}
                        icon={createTacticalIcon(report.status)}
                        eventHandlers={{
                            click: (e) => {
                                L.DomEvent.stopPropagation(e);
                                onReportSelect(report);
                            }
                        }}
                    />
                ))}

                {/* Watchlist Markers */}
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.latitude, location.longitude]}
                        icon={flagIcon}
                        eventHandlers={{
                            click: (e) => {
                                L.DomEvent.stopPropagation(e);
                                handleLocationClick(location);
                            }
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
