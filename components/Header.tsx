import { Activity, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
    showFeed: boolean;
    setShowFeed: (show: boolean) => void;
    showWatchlist: boolean;
    setShowWatchlist: (show: boolean) => void;
}

const Header = ({ showFeed, setShowFeed, showWatchlist, setShowWatchlist }: HeaderProps) => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        // Set initial time
        setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));

        // Update time every minute
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="h-9 w-full bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-3 z-50 backdrop-blur-sm">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#30D158] rounded-sm animate-pulse" style={{ boxShadow: '0 0 8px #30D158' }} />
                <h1 className="text-xs font-bold tracking-[0.2em] text-slate-100 font-data">
                    MITHRIL<span className="text-[#0A84FF]">-OS</span>
                </h1>
                <span className="text-[8px] text-slate-500 font-data border border-slate-700 px-1 py-0.5">v2.0</span>
            </div>

            {/* Center: Toggles */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setShowWatchlist(!showWatchlist)}
                    className={`flex items-center gap-1.5 text-[10px] font-data tracking-wider px-2 py-1 border transition-all ${showWatchlist
                        ? 'border-[#0A84FF] text-[#0A84FF] bg-[#0A84FF]/10 tactical-glow'
                        : 'border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                >
                    <div className={`w-1 h-1 ${showWatchlist ? 'bg-[#0A84FF]' : 'bg-slate-600'}`} />
                    WATCHLIST
                </button>

                <button
                    onClick={() => setShowFeed(!showFeed)}
                    className={`flex items-center gap-1.5 text-[10px] font-data tracking-wider px-2 py-1 border transition-all ${showFeed
                        ? 'border-[#0A84FF] text-[#0A84FF] bg-[#0A84FF]/10 tactical-glow'
                        : 'border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                >
                    <div className={`w-1 h-1 ${showFeed ? 'bg-[#0A84FF]' : 'bg-slate-600'}`} />
                    FEED
                </button>
            </div>

            {/* Right: Status */}
            <div className="flex items-center gap-3 text-[9px] text-slate-400 font-data">
                <div className="flex items-center gap-1">
                    <Radio size={9} className="text-[#30D158]" />
                    <span>LINK ACTIVE</span>
                </div>
                <div className="flex items-center gap-1">
                    <Activity size={9} className="text-[#0A84FF]" />
                    <span>SYS NOMINAL</span>
                </div>
                <div className="text-slate-500 tabular-nums min-w-[30px] text-right">
                    {time}
                </div>
            </div>
        </header>
    );
};

export default Header;
