import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Scratchpad from '../components/scratchpad/Scratchpad';

const ScratchpadPage = () => {
    return (
        <div className="flex h-screen bg-[var(--surface)] text-[var(--on-surface)] overflow-hidden">
            <div className="fixed inset-y-0 left-0 flex flex-col justify-center px-8 z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <SideBar />
                </div>
            </div>

            <div className="flex-1 flex flex-col pl-[120px] pr-8 pb-8">
                <div className="w-full max-w-[1800px] h-full mx-auto flex flex-col py-8">
                    <div className="flex-1 min-h-0 bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 shadow-[var(--shadow-focus)] overflow-hidden border border-[var(--surface-container-low)]">
                        <Scratchpad fullScale={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScratchpadPage;
