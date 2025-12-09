import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Step } from './Step';
import { DeploymentsApp } from './DeploymentsApp';
import { DeviceStatusCheck } from './DeviceStatusCheck';
import { ProgressIndicator } from './ProgressIndicator';
import {
    setFastTrackPreference,
    setUnitType,
    getProgress,
    getUnitType,
    getFastTrackPreference,
    saveProgress,
    getCompletionPercentage,
    clearUnitData,
    type UnitType
} from './unitStateManager';

// Types for the flow
type FlowStep =
    | 'EXPERIENCE_CHECK'
    | 'VIN_INPUT'
    | 'SOLAR_PANELS'
    | 'SUPPORT_LEGS'
    | 'GENERATOR_LP'
    | 'CAMERA_HOUSING'
    | 'POWER_BOX'
    | 'DEVICE_STATUS'
    | 'RAISE_MAST'
    | 'FINISH_UPLOAD'
    | 'DETAILED_TRACK'
    | 'FINISHED';

// Use a linear scale for fast-track progress so it moves predictably between questions
const FAST_TRACK_PROGRESS_TOTAL = 10; // include finish/upload as its own step
const FAST_TRACK_PROGRESS_SAVE_TOTAL = FAST_TRACK_PROGRESS_TOTAL - 1; // for stored progress math (100% when currentSlide === totalSlides)
const FAST_TRACK_PROGRESS_INDEX: Record<FlowStep, number> = {
    'EXPERIENCE_CHECK': 0,
    'VIN_INPUT': 0,
    'SOLAR_PANELS': 0,
    'SUPPORT_LEGS': 1,
    'GENERATOR_LP': 2,
    'CAMERA_HOUSING': 3,
    'POWER_BOX': 4,
    'DEVICE_STATUS': 6, // push closer to 100
    'RAISE_MAST': 7,
    'FINISH_UPLOAD': 8,
    'DETAILED_TRACK': 0,
    'FINISHED': 9,
};

interface DeviceStatus {
    router: boolean;
    vrm: boolean;
    poe: boolean;
    shelly: boolean;
    cvr: boolean;
    camera: boolean;
}

export const FastTrackDeploymentsApp = () => {
    const [currentStep, setCurrentStep] = useState<FlowStep>('EXPERIENCE_CHECK');
    const [vin, setVin] = useState('');
    const [experience, setExperience] = useState<boolean | null>(null);
    const [unitType, setUnitTypeState] = useState<UnitType>('alpha');
    const [progressVersion, setProgressVersion] = useState(0);
    const [fastTrackPercent, setFastTrackPercent] = useState(0);
    const [allowFastTrackShortcuts, setAllowFastTrackShortcuts] = useState(true);
    const [deploymentImage, setDeploymentImage] = useState<string | null>(null);
    const [imageFileName, setImageFileName] = useState<string>('');
    const [lpFullAndInstalled, setLpFullAndInstalled] = useState(false);
    const [agsBreakerOn, setAgsBreakerOn] = useState(false);
    const { vinProgress, completionPercentage } = React.useMemo(() => {
        const versionKey = progressVersion;
        if (vin.length === 4 && versionKey >= 0) {
            const progress = getProgress(vin);
            return {
                vinProgress: progress,
                completionPercentage: getCompletionPercentage(vin)
            };
        }
        return { vinProgress: null, completionPercentage: 0 };
    }, [vin, progressVersion]);

    // Keep a local fast-track percentage that updates only on fast-track steps
    React.useEffect(() => {
        if (currentStep === 'DETAILED_TRACK') return; // don't advance during detailed track fallback
        const idx = FAST_TRACK_PROGRESS_INDEX[currentStep];
        if (idx !== undefined) {
            const pct = Math.round((idx / FAST_TRACK_PROGRESS_SAVE_TOTAL) * 100);
            setFastTrackPercent(pct);
        }
    }, [currentStep]);

    // When a VIN has saved fast-track progress, seed the percent from storage
    React.useEffect(() => {
        if (vinProgress && vinProgress.flowType === 'fast_track' && vinProgress.totalSlides === FAST_TRACK_PROGRESS_SAVE_TOTAL) {
            const pct = Math.round((vinProgress.currentSlide / vinProgress.totalSlides) * 100);
            setFastTrackPercent(pct);
        }
    }, [vinProgress]);

    const getStepFromProgressIndex = (index: number): FlowStep => {
        if (index >= FAST_TRACK_PROGRESS_INDEX.FINISHED) return 'FINISHED';
        if (index >= FAST_TRACK_PROGRESS_INDEX.FINISH_UPLOAD) return 'FINISH_UPLOAD';
        if (index >= FAST_TRACK_PROGRESS_INDEX.RAISE_MAST) return 'RAISE_MAST';
        if (index >= FAST_TRACK_PROGRESS_INDEX.DEVICE_STATUS) return 'DEVICE_STATUS';
        if (index >= FAST_TRACK_PROGRESS_INDEX.POWER_BOX) return 'POWER_BOX';
        if (index >= FAST_TRACK_PROGRESS_INDEX.CAMERA_HOUSING) return 'CAMERA_HOUSING';
        if (index >= FAST_TRACK_PROGRESS_INDEX.GENERATOR_LP) return 'GENERATOR_LP';
        if (index >= FAST_TRACK_PROGRESS_INDEX.SUPPORT_LEGS) return 'SUPPORT_LEGS';
        return 'SOLAR_PANELS';
    };

    // Save fast track progress when step changes
    useEffect(() => {
        if (vin && experience === true && currentStep !== 'EXPERIENCE_CHECK' && currentStep !== 'VIN_INPUT' && currentStep !== 'DETAILED_TRACK') {
            const progressIndex = FAST_TRACK_PROGRESS_INDEX[currentStep] ?? 0;
            saveProgress(vin, progressIndex, FAST_TRACK_PROGRESS_SAVE_TOTAL, 'fast_track');
        }
    }, [currentStep, vin, experience]);

    // Mock device status - all online
    const [deviceStatus] = useState<DeviceStatus>({
        router: true,
        vrm: true,
        poe: true,
        shelly: true,
        cvr: true,
        camera: true,
    });

    const [detailedTrackInitialSlide, setDetailedTrackInitialSlide] = useState(0);

    const handleBack = () => {
        switch (currentStep) {
            case 'VIN_INPUT':
                setCurrentStep('EXPERIENCE_CHECK');
                break;
            case 'SOLAR_PANELS':
                setCurrentStep('VIN_INPUT');
                break;
            case 'SUPPORT_LEGS':
                setCurrentStep('SOLAR_PANELS');
                break;
            case 'GENERATOR_LP':
                setCurrentStep('SUPPORT_LEGS');
                break;
            case 'CAMERA_HOUSING':
                setCurrentStep('GENERATOR_LP');
                break;
            case 'POWER_BOX':
                setCurrentStep('CAMERA_HOUSING');
                break;
            case 'DEVICE_STATUS':
                setCurrentStep('POWER_BOX');
                break;
            case 'RAISE_MAST':
                setCurrentStep('DEVICE_STATUS');
                break;
            case 'FINISH_UPLOAD':
                setCurrentStep('RAISE_MAST');
                break;
            default:
                break;
        }
    };

    const handleExperience = (hasExperience: boolean) => {
        setExperience(hasExperience);
        setCurrentStep('VIN_INPUT');
    };

    const handleVinSubmit = () => {
        if (vin.length !== 4) {
            alert('Please enter the last 4 digits of the VIN to continue.');
            return;
        }

        // Check if there's saved progress for this VIN
        const savedProgress = getProgress(vin);
        const savedUnitType = getUnitType(vin);
        const savedExperience = getFastTrackPreference(vin);

        console.log('Saved progress for VIN:', vin, savedProgress);

        if (savedProgress && savedProgress.flowType) {
            // Resume from saved progress
            console.log(`Resuming deployment for VIN ${vin} from slide ${savedProgress.currentSlide}`);

            // Restore saved unit type and prefer fast track experience when resuming
            if (savedUnitType) {
                setUnitTypeState(savedUnitType);
            }
            const experiencePref = savedExperience !== null ? savedExperience : true;
            setExperience(experiencePref);
            setFastTrackPreference(vin, experiencePref);

            if (savedProgress.flowType === 'fast_track' && savedProgress.totalSlides === FAST_TRACK_PROGRESS_SAVE_TOTAL) {
                const step = getStepFromProgressIndex(savedProgress.currentSlide);
                setCurrentStep(step);
            } else if (savedProgress.flowType === 'detailed_track') {
                setDetailedTrackInitialSlide(savedProgress.currentSlide);
                setCurrentStep('DETAILED_TRACK');
                setAllowFastTrackShortcuts(false);
            } else {
                setCurrentStep('SOLAR_PANELS');
            }
        } else {
            // No saved progress - start fresh
            // Store manually selected unit type
            setUnitType(vin, unitType);

            // Store fast track preference
            if (experience !== null) {
                setFastTrackPreference(vin, experience);
            }

            console.log(`Unit ${vin} is type: ${unitType}, Fast Track: ${experience} `);

            if (experience) {
                setCurrentStep('SOLAR_PANELS');
            } else {
                // No experience -> Start from beginning of Detailed Track
                setDetailedTrackInitialSlide(0);
                setCurrentStep('DETAILED_TRACK');
            }
        }
    };

    const handleFastTrackCheck = (passed: boolean) => {
        if (passed) {
            switch (currentStep) {
                case 'SOLAR_PANELS': setCurrentStep('SUPPORT_LEGS'); break;
                case 'SUPPORT_LEGS': setCurrentStep('GENERATOR_LP'); break;
                case 'GENERATOR_LP': setCurrentStep('CAMERA_HOUSING'); break;
                case 'CAMERA_HOUSING': setCurrentStep('POWER_BOX'); break;
                case 'POWER_BOX': setCurrentStep('DEVICE_STATUS'); break;
                default: break;
            }
        } else {
            // Failed check -> Redirect to specific Detailed Track slide with fast track shortcuts enabled
            let slideIndex = 0;
            switch (currentStep) {
                case 'SOLAR_PANELS':
                    slideIndex = 0; // Shows slides 0,4,5,30,31,32 - "Position the unit facing north..."
                    break;
                case 'SUPPORT_LEGS':
                    slideIndex = 1; // Shows slides 1,2,3 - "Extend the unit's legs..."
                    break;
                case 'GENERATOR_LP':
                    slideIndex = 12; // Shows slides 12,13,14,15,16,26,27,28,29 - "Return foam..."
                    break;
                case 'CAMERA_HOUSING':
                    slideIndex = 7; // Shows slides 7,8,9,10,11,17,18,19,20 - "Open left rear storage..."
                    break;
                case 'POWER_BOX':
                    slideIndex = 21; // Shows slides 21,22,23,24,25,26,27,28,29,30,31,32,33 - "Open the front left storage box..."
                    break;
                case 'DEVICE_STATUS':
                    slideIndex = 34; // "Device Status Checks"
                    break;
                default:
                    slideIndex = 0;
            }
            setDetailedTrackInitialSlide(slideIndex);
            setCurrentStep('DETAILED_TRACK');
            // Keep fast track shortcuts enabled when coming from a failed fast track check
            setAllowFastTrackShortcuts(true);
        }
    };

    const handleRaiseMastFinish = () => {
        // Send GPS and Timestamp (mock)
        const now = new Date();
        console.log('Sending GPS location...');
        console.log('Sending timestamp (UTC):', now.toISOString());
        console.log('Sending timestamp (Local):', now.toLocaleString());
        console.log('Saving deployment for VIN:', vin);
        alert('Deployment Submitted!');
        // Persist completion progress
        if (vin) {
            saveProgress(vin, FAST_TRACK_PROGRESS_SAVE_TOTAL, FAST_TRACK_PROGRESS_SAVE_TOTAL, 'fast_track');
        }
        // Reset to experience check to start new deployment
        setExperience(null);
        setVin('');
        setCurrentStep('EXPERIENCE_CHECK');
    };

    const renderStepContent = () => {
        let content = null;
        switch (currentStep) {
            case 'EXPERIENCE_CHECK':
                content = (
                    <>
                        <div className="tw-flex tw-items-center tw-justify-center">
                            <Step text="Do you have experience deploying Flex Security Trailers?" />
                        </div>
                        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                            <Button label="Yes" onClick={() => handleExperience(true)} minWidth />
                            <Button label="No" onClick={() => handleExperience(false)} minWidth />
                        </div>
                    </>
                );
                break;

            case 'VIN_INPUT':
                {
                    content = (
                        <>
                            <div className="tw-flex tw-items-center tw-justify-center">
                                <Step text="What is the last 4 digits of the VIN number?" />
                            </div>
                            {vinProgress && completionPercentage > 0 && (
                                <ProgressIndicator
                                    percentage={completionPercentage}
                                    message="Saved progress found - will resume automatically"
                                />
                            )}
                            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4">
                                <input
                                    type="text"
                                    value={vin}
                                    onChange={(e) => setVin(e.target.value)}
                                    className="tw-p-2 tw-text-black tw-text-xl tw-text-center tw-rounded tw-w-48 tw-border-2 tw-border-blue-500 tw-bg-white/90 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                                    placeholder="0000"
                                    maxLength={4}
                                />
                                {vinProgress && (
                                    <Button
                                        label="Reset Progress"
                                        onClick={() => {
                                            clearUnitData(vin);
                                            setDetailedTrackInitialSlide(0);
                                            setProgressVersion((v) => v + 1);
                                        }}
                                        minWidth
                                    />
                                )}
                                <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                    <label className="tw-text-white tw-text-sm">Unit Type:</label>
                                    <select
                                        value={unitType}
                                        onChange={(e) => setUnitTypeState(e.target.value as UnitType)}
                                        className="tw-p-2 tw-text-black tw-text-lg tw-text-center tw-rounded tw-w-48 tw-border-2 tw-border-blue-500 tw-bg-white/90 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                                    >
                                        <option value="alpha">Alpha</option>
                                        <option value="bravo">Bravo</option>
                                    </select>
                                </div>
                                <Button label="Continue" onClick={handleVinSubmit} minWidth />
                            </div>
                            <div className="tw-flex tw-justify-center tw-mt-4">
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </>
                    );
                }
                break;

            case 'SOLAR_PANELS':
                {
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                <Step text="Solar Panels & Direction" />
                                <Step text="Are solar panels deployed and facing south?" />

                                {/* Reference Images - All Solar Panel Related */}
                                <div className="tw-w-full tw-max-w-4xl tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/solar-panel-breaker.png?v=1763588930"
                                        alt="Solar panel breaker"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/charge-controllers1.png?v=1763589300"
                                        alt="Charge controllers 1"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/charge-controllers2.png?v=1763589300"
                                        alt="Charge controllers 2"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                                <Button label="Yes" onClick={() => handleFastTrackCheck(true)} minWidth />
                                <Button label="No" onClick={() => handleFastTrackCheck(false)} minWidth />
                            </div>
                            <div className="tw-flex tw-justify-center tw-mt-4">
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </>
                    );
                }
                break;

            case 'SUPPORT_LEGS':
                {
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                <Step text="Support Legs" />
                                <Step text="Is the unit stable and safe?" />
                            </div>
                            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                                <Button label="Yes" onClick={() => handleFastTrackCheck(true)} minWidth />
                                <Button label="No" onClick={() => handleFastTrackCheck(false)} minWidth />
                            </div>
                            <div className="tw-flex tw-justify-center tw-mt-4">
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </>
                    );
                }
                break;

            case 'GENERATOR_LP':
                {
                    // Skip this section for Bravo units
                    if (unitType === 'bravo') {
                        content = (
                            <>
                                <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                                <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                    <Step text="Generator & LP" />
                                    <div className="tw-bg-blue-900/30 tw-border tw-border-blue-500 tw-rounded-lg tw-p-6 tw-max-w-md">
                                        <p className="tw-text-white tw-text-center">
                                            This unit is a <span className="tw-font-bold">Bravo</span> model.
                                        </p>
                                        <p className="tw-text-white tw-text-center tw-mt-2">
                                            Generator & LP section not applicable - skipping to next section.
                                        </p>
                                    </div>
                                    <Button label="Continue" onClick={() => setCurrentStep('CAMERA_HOUSING')} minWidth />
                                </div>
                                <div className="tw-flex tw-justify-center tw-mt-4">
                                    <Button label="Back" onClick={handleBack} />
                                </div>
                            </>
                            );
                        } else {
                            const allChecked = lpFullAndInstalled && agsBreakerOn;
                            content = (
                                <>
                                    <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                        <Step text="Generator & LP" />

                                        {/* Reference Images - All Generator & LP Related */}
                                        <div className="tw-w-full tw-max-w-4xl tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/open-propane.png?v=1763578336"
                                                alt="Open propane valve"
                                                className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                            />
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-generator.png?v=1763588481"
                                                alt="Turn on generator"
                                                className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                            />
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-generator-breaker.png?v=1763588746"
                                                alt="Turn on generator breaker"
                                                className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                            />
                                        </div>

                                        {/* Checklist Card */}
                                        <div className="tw-w-full tw-max-w-xl tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-2xl tw-p-6 tw-shadow-xl tw-backdrop-blur-md">
                                            <h3 className="tw-text-white tw-text-lg tw-font-bold tw-mb-6 tw-text-center">Pre-flight Checklist</h3>
                                            <div className="tw-space-y-4">
                                                {/* LP Full Checkbox */}
                                                <label className="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-lg tw-border-2 tw-border-white/10 tw-bg-white/5 tw-cursor-pointer tw-transition-all tw-duration-300 hover:tw-border-blue-500/50 hover:tw-bg-white/10">
                                                    <input
                                                        type="checkbox"
                                                        checked={lpFullAndInstalled}
                                                        onChange={(e) => setLpFullAndInstalled(e.target.checked)}
                                                        className="tw-mt-1 tw-w-5 tw-h-5 tw-rounded tw-border-2 tw-border-blue-500 tw-bg-slate-800 tw-cursor-pointer checked:tw-bg-blue-500 tw-transition-colors"
                                                    />
                                                    <div className="tw-flex-1">
                                                        <p className="tw-text-white tw-font-semibold tw-text-base">LP and Mopekas installed correctly, valves are open?</p>
                                                        <p className="tw-text-white/60 tw-text-sm tw-mt-1">Verify propane tanks are full and installed correctly, Mopeka sensors are installed correctly, and valves are open</p>
                                                    </div>
                                                </label>

                                                {/* AGS Breaker Checkbox */}
                                                <label className="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-lg tw-border-2 tw-border-white/10 tw-bg-white/5 tw-cursor-pointer tw-transition-all tw-duration-300 hover:tw-border-blue-500/50 hover:tw-bg-white/10">
                                                    <input
                                                        type="checkbox"
                                                        checked={agsBreakerOn}
                                                        onChange={(e) => setAgsBreakerOn(e.target.checked)}
                                                        className="tw-mt-1 tw-w-5 tw-h-5 tw-rounded tw-border-2 tw-border-blue-500 tw-bg-slate-800 tw-cursor-pointer checked:tw-bg-blue-500 tw-transition-colors"
                                                    />
                                                    <div className="tw-flex-1">
                                                        <p className="tw-text-white tw-font-semibold tw-text-base">Is AGS Breaker turned on?</p>
                                                        <p className="tw-text-white/60 tw-text-sm tw-mt-1">Confirm Auto Generator Start breaker is activated</p>
                                                    </div>
                                                </label>
                                            </div>

                                            {/* Progress Indicator */}
                                            {!allChecked && (
                                                <div className="tw-mt-6 tw-flex tw-items-center tw-gap-3 tw-p-3 tw-bg-yellow-900/20 tw-border tw-border-yellow-500/40 tw-rounded-lg">
                                                    <svg className="tw-w-5 tw-h-5 tw-text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="tw-text-yellow-400 tw-text-sm tw-font-medium">Complete all checks to continue</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                                        <Button
                                            label="Yes - All Checks Complete"
                                            onClick={() => handleFastTrackCheck(true)}
                                            minWidth
                                            disabled={!allChecked}
                                        />
                                        <Button label="No - Go to Detailed Steps" onClick={() => handleFastTrackCheck(false)} minWidth />
                                    </div>
                                    <div className="tw-flex tw-justify-center tw-mt-4">
                                        <Button label="Back" onClick={handleBack} />
                                    </div>
                                </>
                        );
                    }
                }
                break;

            case 'CAMERA_HOUSING':
                {
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                <Step text="Camera Housing" />
                                <Step text="Is the camera housing assembled and installed correctly?" />

                                {/* Reference Image - Camera Housing Breakers Only */}
                                <div className="tw-w-full tw-max-w-md">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/camera-housing-breakers.png?v=1763578774"
                                        alt="Camera housing breakers"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                                <Button label="Yes" onClick={() => handleFastTrackCheck(true)} minWidth />
                                <Button label="No" onClick={() => handleFastTrackCheck(false)} minWidth />
                            </div>
                            <div className="tw-flex tw-justify-center tw-mt-4">
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </>
                    );
                }
                break;

            case 'POWER_BOX':
                {
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                <Step text="Power Box" />
                                <Step text="Are all breakers and switches in the correct positions?" />

                                {/* Reference Images */}
                                <div className="tw-w-full tw-max-w-4xl tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/control-panel-box.png?v=1763578983"
                                        alt="Control panel box"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-inverter.png?v=1763585591"
                                        alt="Turn on inverter"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/inverter-chr.png?v=1763585653"
                                        alt="Inverter CHG position"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/power-box-breakers.png?v=1763585703"
                                        alt="Power box breakers"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/main-power-disconnect.png?v=1763585830"
                                        alt="Main power disconnect"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-generator-breaker.png?v=1763588746"
                                        alt="AGS breaker"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
                                <Button label="Yes" onClick={() => handleFastTrackCheck(true)} minWidth />
                                <Button label="No" onClick={() => handleFastTrackCheck(false)} minWidth />
                            </div>
                            <div className="tw-flex tw-justify-center tw-mt-4">
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </>
                    );
                }
                break;

            case 'DEVICE_STATUS':
                {
                    const allGreen = Object.values(deviceStatus).every(status => status);
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center">
                                <Step text="Device Status Checks" />
                                <div className="tw-w-full tw-max-w-5xl tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-2xl tw-p-6 tw-shadow-xl tw-backdrop-blur-md">
                                    <DeviceStatusCheck vin={vin} deviceStatus={deviceStatus} />
                                </div>
                                <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4 tw-mt-2">
                                    {allGreen ? (
                                        <Button label="Continue to Raise the Mast" onClick={() => setCurrentStep('RAISE_MAST')} minWidth />
                                    ) : (
                                        <Button label="Go to Detailed Track" onClick={() => {
                                            setDetailedTrackInitialSlide(0);
                                            setCurrentStep('DETAILED_TRACK');
                                            setAllowFastTrackShortcuts(false);
                                        }} minWidth />
                                    )}
                                </div>
                                <div className="tw-flex tw-justify-center tw-mt-2">
                                    <Button label="Back" onClick={handleBack} />
                                </div>
                            </div>
                        </>
                    );
                }
                break;

            case 'RAISE_MAST':
                {
                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
                                <Step text="Raise the camera housing mast to its maximum height" />
                                <p className="tw-text-white tw-text-center tw-max-w-md">
                                    Use a hand crank or a drill (not an impact drill) rotating clockwise.
                                </p>

                                {/* Reference Images - Raising Mast */}
                                <div className="tw-w-full tw-max-w-4xl tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/raise-mast-1.png?v=1763589791"
                                        alt="Raise mast 1"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0576/7941/3301/files/raise-mast-2.png?v=1763589791"
                                        alt="Raise mast 2"
                                        className="tw-w-full tw-rounded-lg tw-shadow-lg tw-border tw-border-white/10"
                                    />
                                </div>

                                <iframe
                                    src="https://drive.google.com/file/d/15wJe3qy8-KGzaJIizvBlQ6afC8t5vr5V/preview"
                                    title="Raise camera mast video"
                                    className="tw-w-full tw-max-w-[560px] tw-aspect-video tw-border-0 tw-rounded-lg tw-shadow-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <Button label="Continue to Finish Deployment" onClick={() => setCurrentStep('FINISH_UPLOAD')} size="large" minWidth />
                            </div>
                        </>
                    );
                }
                break;

            case 'FINISH_UPLOAD':
                {
                    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files?.[0];
                        if (file) {
                            setImageFileName(file.name);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setDeploymentImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    };

                    content = (
                        <>
                            <ProgressIndicator percentage={fastTrackPercent} message="Deployment Progress" />
                            <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-font-primary tw-text-white">
                                <Step text="Finish Deployment" />
                                <p className="tw-text-white/90 tw-text-center tw-max-w-md tw-font-normal">
                                    Upload a final photo or document for this deployment before submitting.
                                </p>
                                <div className="tw-w-full tw-max-w-md tw-bg-white/10 tw-p-6 tw-rounded tw-border tw-border-blue-500">
                                    <h3 className="tw-text-white tw-font-semibold tw-mb-4 tw-text-center">Upload Deployment Photo</h3>
                                    <p className="tw-text-white/80 tw-text-sm tw-mb-4 tw-text-center tw-font-normal">
                                        Please take a horizontal/landscape photo of the completed deployment for liability records
                                    </p>
                                    <label className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-32 tw-border-2 tw-border-blue-500 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-blue-900/20 hover:tw-bg-blue-900/30 tw-transition-colors tw-font-semibold">
                                        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                                            <svg className="tw-w-8 tw-h-8 tw-mb-3 tw-text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="tw-mb-2 tw-text-sm tw-text-blue-300">
                                                <span className="tw-font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="tw-text-xs tw-text-blue-400">PNG, JPG or JPEG (MAX. 10MB)</p>
                                        </div>
                                        <input type="file" className="tw-hidden" accept="image/*" capture="environment" onChange={handleImageUpload} />
                                    </label>
                                    {deploymentImage && (
                                        <div className="tw-mt-4">
                                            <p className="tw-text-green-400 tw-text-sm tw-mb-2 tw-text-center">✓ Image uploaded: {imageFileName}</p>
                                            <img src={deploymentImage} alt="Deployment preview" className="tw-w-full tw-rounded tw-border tw-border-blue-500" />
                                        </div>
                                    )}
                                </div>

                                {!deploymentImage && (
                                    <p className="tw-text-yellow-400 tw-text-sm tw-text-center tw-max-w-md">
                                        ⚠️ Photo upload required to complete deployment
                                    </p>
                                )}
                                <Button
                                    label="Finish Deployment"
                                    onClick={handleRaiseMastFinish}
                                    size="large"
                                    minWidth
                                    disabled={!deploymentImage}
                                />
                            </div>
                        </>
                    );
                }
                break;

            case 'DETAILED_TRACK':
                content = (
                    <div className="tw-w-full">
                        <DeploymentsApp
                            initialSlide={detailedTrackInitialSlide}
                            vin={vin}
                            unitType={unitType}
                            onFinish={() => {
                                console.log('Detailed Track Finished - Redirecting to Experience Check');
                                setExperience(null);
                                setVin('');
                                setCurrentStep('EXPERIENCE_CHECK');
                                setAllowFastTrackShortcuts(true);
                            }}
                            onSkip={(target) => {
                                console.log('Skipping to Fast Track step:', target);
                                setCurrentStep(target as FlowStep);
                                setAllowFastTrackShortcuts(true);
                            }}
                            disableFastTrackShortcuts={!allowFastTrackShortcuts}
                        />
                    </div>
                );
                break;

            case 'FINISHED':
                content = (
                    <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
                        <Step text="Deployment Complete" />
                        <p className="tw-text-white">Thank you for your submission.</p>
                        <Button label="Start New Deployment" onClick={() => {
                            setCurrentStep('EXPERIENCE_CHECK');
                            setVin('');
                            setExperience(null);
                        }} minWidth />
                    </div>
                );
                break;

            default:
                return null;
        }

        return (
            <div className="tw-max-w-5xl tw-w-full tw-mx-auto tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-3xl tw-shadow-2xl tw-backdrop-blur-md tw-flex tw-justify-start tw-flex-col tw-gap-20px tw-overflow-y-auto tw-overflow-x-hidden tw-animate-fade-in tw-p-4 md:tw-p-8 tw-font-primary tw-text-white">
                {content}
            </div>
        );
    };

    return (
        <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#0b1021] tw-via-[#0f172a] tw-to-[#0b132b] tw-text-white tw-font-primary">
            <div className="deployments-app tw-p-4 md:tw-p-8 tw-flex tw-justify-center">
                {renderStepContent()}
            </div>
        </div>
    );
};
