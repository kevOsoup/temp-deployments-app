interface ProgressIndicatorProps {
    percentage: number;
    message?: string;
}

export const ProgressIndicator = ({ percentage, message }: ProgressIndicatorProps) => {
    return (
        <div className="tw-w-full tw-max-w-2xl tw-mx-auto tw-px-4 tw-py-6 tw-font-primary tw-text-white">
            <div className="tw-relative tw-bg-gradient-to-br tw-from-slate-900/80 tw-to-slate-800/60 tw-border-2 tw-border-blue-500/40 tw-rounded-2xl tw-p-6 tw-shadow-2xl tw-backdrop-blur-sm">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                    <div className="tw-flex tw-items-center tw-gap-3">
                        <svg className="tw-w-5 tw-h-5 tw-text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="tw-text-white tw-text-base tw-font-semibold tw-tracking-wide">
                            {message || 'Progress'}
                        </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2">
                        <span className="tw-text-blue-400 tw-text-2xl tw-font-bold tw-tabular-nums">
                            {percentage}
                        </span>
                        <span className="tw-text-blue-400/70 tw-text-sm tw-font-semibold">%</span>
                    </div>
                </div>
                <div className="tw-relative tw-w-full tw-h-3 tw-bg-slate-950/60 tw-rounded-full tw-overflow-hidden tw-border tw-border-slate-700/50">
                    <div
                        className="tw-absolute tw-inset-y-0 tw-left-0 tw-bg-gradient-to-r tw-from-blue-600 tw-via-blue-500 tw-to-cyan-500 tw-rounded-full tw-transition-all tw-duration-500 tw-ease-out tw-shadow-lg tw-shadow-blue-500/50"
                        style={{ width: `${percentage}%` }}
                    >
                        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-transparent tw-to-white/30"></div>
                    </div>
                    {percentage > 0 && (
                        <div
                            className="tw-absolute tw-inset-y-0 tw-w-20 tw-bg-gradient-to-r tw-from-transparent tw-via-white/40 tw-to-transparent tw-animate-shimmer"
                            style={{ left: `${Math.max(0, percentage - 20)}%` }}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    );
};
