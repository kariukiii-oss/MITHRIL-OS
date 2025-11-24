import { useState, useEffect } from 'react';
import { Report, Location } from '@/types';

// Mock data for demo purposes - Real Kenyan Forests & Conservancies
const mockLocations: Location[] = [
    { id: 'loc-001', name: 'MAU FOREST COMPLEX', latitude: -0.5957, longitude: 35.7297, created_at: new Date().toISOString() },
    { id: 'loc-002', name: 'ABERDARE NATIONAL PARK', latitude: -0.4201, longitude: 36.6993, created_at: new Date().toISOString() },
    { id: 'loc-003', name: 'ARABUKO SOKOKE', latitude: -3.3161, longitude: 39.9333, created_at: new Date().toISOString() },
    { id: 'loc-004', name: 'OL PEJETA CONSERVANCY', latitude: 0.0436, longitude: 36.9322, created_at: new Date().toISOString() },
    { id: 'loc-005', name: 'MT. KENYA FOREST', latitude: -0.1521, longitude: 37.3084, created_at: new Date().toISOString() },
    { id: 'loc-006', name: 'KAKAMEGA FOREST', latitude: 0.2827, longitude: 34.8550, created_at: new Date().toISOString() }
];

const mockReports: Report[] = [
    {
        id: 'RPT-8821',
        latitude: -0.5960,
        longitude: 35.7300,
        status: 'CRITICAL',
        category: 'ILLEGAL LOGGING',
        message: 'Chainsaw activity detected in Sector 4. Multiple trees felled.',
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        ndvi: 0.45, mi: 0.32, ndmi: 0.28
    },
    {
        id: 'RPT-8820',
        latitude: -0.4210,
        longitude: 36.7000,
        status: 'BAD',
        category: 'POACHING ALERT',
        message: 'Gunshots heard near waterhole. Patrol unit dispatched.',
        created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        ndvi: 0.65, mi: 0.45, ndmi: 0.42
    },
    {
        id: 'RPT-8819',
        latitude: 0.0440,
        longitude: 36.9330,
        status: 'OKAY',
        category: 'ROUTINE PATROL',
        message: 'Northern boundary secure. No signs of encroachment.',
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        ndvi: 0.78, mi: 0.62, ndmi: 0.55
    },
    {
        id: 'RPT-8818',
        latitude: -3.3170,
        longitude: 39.9340,
        status: 'CRITICAL',
        category: 'FIRE DETECTED',
        message: 'Smoke plume visible in eastern block. High wind conditions.',
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        ndvi: 0.25, mi: 0.15, ndmi: 0.10
    }
];

export const useRealtimeData = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        // Load mock data
        setReports(mockReports);
        setLocations(mockLocations);

        // Optionally: Uncomment below to use real Supabase when ready
        /*
        const fetchData = async () => {
          const { data: reportsData } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
          
          const { data: locationsData } = await supabase
            .from('locations')
            .select('*');
    
          if (reportsData) setReports(reportsData as Report[]);
          if (locationsData) setLocations(locationsData as Location[]);
        };
    
        fetchData();
    
        const reportSubscription = supabase
          .channel('reports-channel')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reports' }, (payload) => {
            const newReport = payload.new as Report;
            setReports((prev) => [newReport, ...prev]);
          })
          .subscribe();
    
        const locationSubscription = supabase
          .channel('locations-channel')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'locations' }, (payload) => {
            const newLocation = payload.new as Location;
            setLocations((prev) => [...prev, newLocation]);
          })
          .subscribe();
    
        return () => {
          supabase.removeChannel(reportSubscription);
          supabase.removeChannel(locationSubscription);
        };
        */
    }, []);

    return { reports, locations };
};
