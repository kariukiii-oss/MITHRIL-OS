'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AddLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddLocationModal = ({ isOpen, onClose }: AddLocationModalProps) => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // For demo: Just simulate success
            console.log('Adding location:', { name, latitude, longitude });

            // Real implementation (uncomment when Supabase is configured):
            /*
            const { error } = await supabase
              .from('locations')
              .insert([
                {
                  name,
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude)
                }
              ]);
      
            if (error) throw error;
            */

            // Reset form
            setName('');
            setLatitude('');
            setLongitude('');
            alert(`Location "${name}" added successfully! (Demo mode - not saved to DB)`);
            onClose();
        } catch (error) {
            console.error('Error adding location:', error);
            alert('Failed to add location');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 w-96 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-green-400 tracking-wider">ADD LOCATION</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 tracking-wide">LOCATION NAME</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                            placeholder="e.g., Forest Area 12"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1 tracking-wide">LATITUDE</label>
                        <input
                            type="number"
                            step="any"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                            placeholder="e.g., -1.2921"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1 tracking-wide">LONGITUDE</label>
                        <input
                            type="number"
                            step="any"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                            placeholder="e.g., 36.8219"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'ADDING...' : 'ADD LOCATION'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLocationModal;
