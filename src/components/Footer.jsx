import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark text-paper rounded-t-[3rem] px-6 py-12 md:py-20 mt-12 relative z-30 w-full flex flex-col items-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="font-heading font-bold text-3xl mb-1 text-paper tracking-tight">Amru Rasyid Hammami</h3>
                    <p className="font-data text-xs text-paper/40 uppercase tracking-widest mb-8">Data Analyst / Business Intelligence</p>

                    <div className="flex items-center gap-3 bg-paper/5 px-4 py-2 border border-paper/10 rounded-full">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75"></div>
                            <div className="relative w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                        </div>
                        <span className="font-data text-[10px] uppercase text-paper/70 tracking-widest">System Operational</span>
                    </div>
                </div>

                <div className="font-data text-[10px] text-paper/30 uppercase tracking-widest text-center md:text-right flex flex-col gap-2">
                    <p>© {new Date().getFullYear()} ARH. All sequences verified.</p>
                    <p className="text-paper/20 bg-paper/5 px-2 py-1 rounded self-center md:self-end">CTRL_ROOM_PROTOCOL_V1</p>
                </div>
            </div>
        </footer>
    );
}
