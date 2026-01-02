import React from 'react';
interface DeviceStatus {
    router: boolean;
    vrm: boolean;
    poe: boolean;
    shelly: boolean;
    cvr: boolean;
    camera: boolean;
}

interface DeviceStatusCheckProps {
    vin: string;
    deviceStatus: DeviceStatus;
}

export const DeviceStatusCheck: React.FC<DeviceStatusCheckProps> = ({ deviceStatus }) => {
    const hasOfflineDevices = Object.values(deviceStatus).some(status => !status);

    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-8 tw-w-full tw-max-w-5xl tw-mx-auto tw-font-primary tw-text-white">
            {/* Device Status Grid */}
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-5 tw-w-full">
                {Object.entries(deviceStatus).map(([key, status]) => (
                    <div
                        key={key}
                        className={`tw-group tw-relative tw-p-6 tw-rounded-xl tw-border-2 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-transition-all tw-duration-300 tw-shadow-lg hover:tw-shadow-2xl hover:tw-scale-105 ${
                            status
                                ? 'tw-bg-gradient-to-br tw-from-emerald-900/30 tw-to-green-900/20 tw-border-emerald-500/50 hover:tw-border-emerald-400'
                                : 'tw-bg-gradient-to-br tw-from-red-900/30 tw-to-rose-900/20 tw-border-red-500/50 hover:tw-border-red-400'
                        }`}
                    >
                        <div className="tw-absolute tw-inset-0 tw-rounded-xl tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-bg-white/5"></div>
                        <span className="tw-relative tw-text-white/90 tw-uppercase tw-font-bold tw-text-sm tw-tracking-wider tw-text-center">
                            {key}
                        </span>
                        <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-black/20">
                            <span className="tw-text-3xl tw-drop-shadow-lg">
                                {status ? '✓' : '✕'}
                            </span>
                        </div>
                        <span className={`tw-relative tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide ${status ? 'tw-text-emerald-400' : 'tw-text-red-400'}`}>
                            {status ? 'Online' : 'Offline'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Support Contact Card */}
            {hasOfflineDevices && (
                <div className="tw-relative tw-w-full tw-bg-gradient-to-br tw-from-red-950/40 tw-to-rose-950/30 tw-border-2 tw-border-red-500/60 tw-rounded-2xl tw-p-8 tw-shadow-2xl tw-backdrop-blur-sm">
                    <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-1 tw-bg-gradient-to-r tw-from-red-500 tw-via-rose-500 tw-to-red-500"></div>
                    <div className="tw-flex tw-flex-col tw-gap-6">
                        <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                            <svg className="tw-w-8 tw-h-8 tw-text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-text-center">
                                Device Support Required
                            </h3>
                        </div>
                        <p className="tw-text-white/80 tw-text-center tw-text-lg tw-font-light">
                            One or more devices are offline. Please contact support for assistance:
                        </p>
                        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-5 tw-items-center tw-justify-center tw-mt-2">
                            <a
                                href="tel:1855happyrv"
                                className="tw-group tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3 tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-text-white tw-font-semibold tw-transition-all tw-duration-300 hover:tw-bg-white/20 hover:tw-border-white/40 hover:tw-scale-105 hover:tw-shadow-lg"
                            >
                                <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>1-855-HAPPY-RV</span>
                            </a>
                            <div className="tw-hidden md:tw-block tw-w-px tw-h-8 tw-bg-white/20"></div>
                            <a
                                href="mailto:securitysupport@rvmp.co"
                                className="tw-group tw-flex tw-items-center tw-gap-3 tw-px-6 tw-py-3 tw-bg-white/10 tw-border tw-border-white/20 tw-rounded-lg tw-text-white tw-font-semibold tw-transition-all tw-duration-300 hover:tw-bg-white/20 hover:tw-border-white/40 hover:tw-scale-105 hover:tw-shadow-lg"
                            >
                                <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>securitysupport@rvmp.co</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
