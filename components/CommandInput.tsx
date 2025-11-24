import { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, X } from 'lucide-react';

interface CommandInputProps {
    onClose: () => void;
}

const CommandInput = ({ onClose }: CommandInputProps) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Command:', input);
        setInput('');
        onClose();
    };

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[500px] max-w-[90vw]">
            <div className="bg-white/95 border border-gray-300 shadow-2xl backdrop-blur-xl rounded-md overflow-hidden">
                {/* Terminal Header */}
                <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2 justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono tracking-widest">
                        <Terminal size={10} />
                        <span>MITHRIL_CMD_LINE</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
                        <X size={12} />
                    </button>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="flex items-center p-3 gap-3">
                    <span className="text-green-600 font-mono font-bold">{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="ENTER COORDINATES (LAT, LNG)..."
                        className="flex-1 bg-transparent border-none outline-none text-gray-800 font-mono text-sm placeholder-gray-400 uppercase"
                    />
                    <button type="submit" className="text-green-600 hover:text-green-800 transition-colors">
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommandInput;
