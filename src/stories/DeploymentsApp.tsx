import React from 'react';
import { Wizard } from './Wizard';
import type { WizardSlideConfig } from './Wizard';
import { DeviceStatusCheck } from './DeviceStatusCheck';
import { Button } from './Button';
import { Step } from './Step';
import type { UnitType } from './unitStateManager';
import { getFastTrackPreference, getCompletionPercentage, saveProgress, getProgress } from './unitStateManager';
import { ProgressIndicator } from './ProgressIndicator';


// Battery SOC voltage-to-percentage mapping
const SOC_OPTIONS = [
  { id: '13_5_plus', label: '13.5V or higher (after holding for 3+ minutes)', recommendedSoc: 100, note: 'Full SOC reset after balancing' },
  { id: '13_4', label: '13.4V', recommendedSoc: 95, note: undefined },
  { id: '13_2', label: '13.2V', recommendedSoc: 85, note: undefined },
  { id: '13_0', label: '13.0V', recommendedSoc: 70, note: undefined },
  { id: '12_8', label: '12.8V', recommendedSoc: 50, note: undefined },
  { id: '12_6', label: '12.6V', recommendedSoc: 30, note: undefined },
  { id: '12_5_or_lower', label: '12.5V or lower', recommendedSoc: 20, note: undefined },
] as const;

// Low battery threshold - alert RVMP if below this percentage
const LOW_BATTERY_ALERT_THRESHOLD = 50; // 50% SOC or lower

export const DeploymentsApp = ({ initialSlide = 0, onFinish, vin = '', unitType = 'alpha', onSkip, disableFastTrackShortcuts = false }: { initialSlide?: number; onFinish?: () => void; vin?: string; unitType?: UnitType; onSkip?: (target: string) => void; disableFastTrackShortcuts?: boolean }) => {
  const [showCompletion, setShowCompletion] = React.useState(false);
  const [progressPercent, setProgressPercent] = React.useState(() => vin ? getCompletionPercentage(vin) : 0);
  const [deploymentImage, setDeploymentImage] = React.useState<string | null>(null);
  const [imageFileName, setImageFileName] = React.useState<string>('');
  const [selectedSocOptionId, setSelectedSocOptionId] = React.useState<string | null>(null);
  const [socUpdated, setSocUpdated] = React.useState(false);

  // Mock device status for Detailed Track (assuming all green for now or could be passed in)
  const deviceStatus = {
    router: true,
    vrm: true,
    poe: true,
    shelly: true,
    cvr: true,
    camera: true,
  };

  const sendLowBatteryAlert = (voltage: string, socPercentage: number) => {
    // Alert RVMP when battery SOC is below threshold
    const now = new Date();
    console.log('⚠️ LOW BATTERY ALERT ⚠️');
    console.log('VIN:', vin);
    console.log('Battery Voltage:', voltage);
    console.log('SOC Percentage:', socPercentage + '%');
    console.log('Timestamp:', now.toISOString());
    console.log('Risk: Unit may have been turned off - potential liability/malfunction');
    // TODO: Implement actual API call to alert RVMP
  };

  const handleRaiseMastFinish = () => {
    // Send GPS and Timestamp (mock)
    const now = new Date();
    console.log('Sending GPS location...');
    console.log('Sending timestamp (UTC):', now.toISOString());
    console.log('Sending timestamp (Local):', now.toLocaleString());
    console.log('Saving deployment for VIN:', vin);
    console.log('Triggering Victron/VRM automatic turn-on for VIN:', vin);
    alert('Deployment Submitted!');
    // Save completion progress to allow resume showing 100%
    if (vin) {
      const lastIndex = Math.max(deploymentSlides.length - 1, 0);
      saveProgress(vin, lastIndex, lastIndex, 'detailed_track');
    }
    // Automatically call onFinish to return to experience check
    if (onFinish) {
      onFinish();
    } else {
      setShowCompletion(true);
    }
  };

  const handleStartNewDeployment = () => {
    console.log('Start New Deployment clicked in DeploymentsApp');
    console.log('onFinish callback exists:', !!onFinish);
    if (onFinish) {
      console.log('Calling onFinish callback...');
      onFinish();
      // Reset completion state after callback (in case component is reused)
      setShowCompletion(false);
    } else {
      console.warn('No onFinish callback provided to DeploymentsApp');
      // Only reset if no callback (standalone mode)
      setShowCompletion(false);
    }
  };

  const deploymentSlides: WizardSlideConfig[] = (() => {
    // Check fast track preference - call getFastTrackPreference even if VIN is empty
  // Only look up fast track preference when we have a VIN
  const fastTrackPref = vin ? getFastTrackPreference(vin) : null;
  const isFastTrack = fastTrackPref === true; // Only true if explicitly set to true

    // Only apply fast track modifications if:
    // 1. User has fast track preference (isFastTrack = true)
    // 2. onSkip callback is provided (coming from FastTrackDeploymentsApp)
    // 3. initialSlide matches one of the fast track starting points (0, 1, 7, 12, 21)
    // 4. Fast track shortcuts are not explicitly disabled (disableFastTrackShortcuts = false)
  const shouldApplyFastTrack = Boolean(vin) && isFastTrack && onSkip && [0, 1, 7, 12, 21].includes(initialSlide) && !disableFastTrackShortcuts;

    const slides: WizardSlideConfig[] = [
      // Step 1: Position the unit
    {
      text: 'Position the unit facing north, ensuring the solar panels are oriented toward the south.',
      description: 'Solar panels need to be facing south in order to get the best sunlight to recharge the unit.',
      answers: [
        { label: 'Continue', nextSlide: 1 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1gAMjV7Yw0u9UY0_j1BnKAIyEF8x1sWyY/view' },
      ],
    },
    // Step 2: Extend legs
    {
      text: 'Extend the unit\'s legs by pulling the retaining pin.',
      answers: [
        { label: 'Continue', nextSlide: 2 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1AxQuHcfsTMngSRwHS5J1n62G8meq0RQH/view' },
      ],
    },
    // Step 3: Rotate legs
    {
      text: 'Rotate the legs, utilizing the pin to unlock and secure them in the desired position.',
      answers: [
        { label: 'Continue', nextSlide: 3 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/198gi_YTV-s3A6E6_KcfiLFkZrLFnfYGh/view' },
      ],
    },
    // Step 4: Level unit
    {
      text: 'Level the unit using the built-in spirit levels located on the front and left side.',
      answers: [
        { label: 'Continue', nextSlide: 4 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1XsOVrcOiAiCiUjMK8l78-l6QTOi0ANGm/view' },
      ],
    },
    // Step 5: Extend solar panels
    {
      text: 'Extend the solar panels by releasing the two yellow clips on the outer edge.',
      answers: [
        { label: 'Continue', nextSlide: 5 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1s6Bp4hzRoscfDdmQP4eOfZhKJMA2bZvP/view' },
      ],
    },
    // Step 6: Elevate solar mast
    {
      text: 'Elevate the solar mast to a vertical orientation by removing the pins.',
      description: 'This will allow you to open the storage boxes.',
      answers: [
        { label: 'Continue', nextSlide: 6 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/10KC9MCO1EZN5PSRAquEjFMcxh9wYxfff/view' },
      ],
    },
    // Step 7: Lock mast
    {
      text: 'Ensure the mast is securely locked in position by reinserting the pins.',
      answers: [
        { label: 'Continue', nextSlide: 7 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1sKT6TXRJHOnhwfCYEogYFlOmeOZS5SqG/view' },
      ],
    },
    // Step 8: Open left storage
    {
      text: 'Open the left rear storage compartment.',
      answers: [
        { label: 'Continue', nextSlide: 8 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1zc-GKg6qqSQAuE8kTqLKim_mJM-4pnAW/view' },
      ],
    },
    // Step 9: Remove camera housing
    {
      text: 'Retrieve the camera housing from the storage box in preparation for assembly.',
      answers: [
        { label: 'Continue', nextSlide: 9 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/19ti4aRGx_Y45JAdoHKsNxuMtHOKj4QC7/view' },
      ],
    },
    // Step 10: Mount horn
    {
      text: 'Affix the horn above the designated location for Camera 2.',
      answers: [
        { label: 'Continue', nextSlide: 10 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1WX-32xYzs9ECkzcSTsjCJzedw5NERyo7/view' },
      ],
    },
    // Step 11: Mount cameras
    {
      text: 'Install Camera 2 beneath the horn and follow the same procedure for Cameras 1 and 3.',
      answers: [
        { label: 'Continue', nextSlide: 11 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1uqS3mpax44qGg0xKFfW_QOFhi9uBvmGo/view' },
      ],
    },
    // Step 12: Store foam
    {
      text: 'Return the foam packaging material to the white storage box for future transportation.',
      answers: [
        { label: 'Continue', nextSlide: 12 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/16flLJaLSJ2jMnzd0Qc-3S2ROUNjX-1zd/view' },
      ],
    },
    // Step 13: Locate sensors
    {
      text: 'Locate and remove the Mopeka sensors.',
      answers: [
        { label: 'Continue', nextSlide: 13 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1soE976RxxlbVR4yHLAKjGxFYYzEVbpZE/view' },
      ],
    },
    // Step 14: Locate propane tanks
    {
      text: 'Unscrew and detach the central fastening piece, gauge, and crossbar.',
      answers: [
        { label: 'Continue', nextSlide: 14 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1kGRKuHoeNtRlOVMf-BjFiKdd1dDDYBF_/view' },
      ],
    },
    // Step 15: Place sensors
    {
      text: 'Affix a sensor to the bottom of each propane tank.',
      answers: [
        { label: 'Continue', nextSlide: 15 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dupXcN-mzR3eYpJsg3ivYgSzyouR5Fw2/view' },
      ],
    },
    // Step 16: Lock tanks
    {
      text: 'Reinstall the crossbar, gauge, and fastening piece.',
      answers: [
        { label: 'Continue', nextSlide: 16 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dcZBVIbkIVE2o2rItV-Bf14C9Cx_sNz7/view' },
      ],
    },
    // Step 17: Screw on hoses
    {
      text: 'Connect the propane hose and open the valve.',
      answers: [
        { label: 'Continue', nextSlide: 17 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/10jRdbPGCJl-NrakAzTlvJ5gVp58kSW7Q/view' },
      ],
    },
    // Step 18: Mount camera housing
    {
      text: 'Attach the fully assembled camera housing to the top of the mast.',
      answers: [
        { label: 'Continue', nextSlide: 18 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1F1rZ86lB1YH9_sewmuGjCoTARjW7zl3x/view' },
      ],
    },
    // Step 19: Tighten clamp
    {
      text: 'Tighten the clamp at the base of the camera housing to ensure security.',
      answers: [
        { label: 'Continue', nextSlide: 19 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1zG-OMSP0RjNOjtoy3tAOPw6R6SVSXlJT/view' },
      ],
    },
    // Step 20: Plug in cord
    {
      text: 'Connect the cable from the camera mast into the bottom receptacle of the camera housing.',
      answers: [
        { label: 'Continue', nextSlide: 20 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/14OYqYSK1ubmDRpCbnAx_AlESplTPNMbe/view' },
      ],
    },
    // Step 21: Turn on breakers
    {
      text: 'Activate all four breakers sequentially from left to right within the camera housing.',
      answers: [
        { label: 'Continue', nextSlide: 21 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1LV7JclM6Ni6tc3Aq6X1v1Acyl88qy2PN/view' },
      ],
    },
    // Step 22: Locate control panel
    {
      text: 'Open the front left storage box.',
      answers: [
        { label: 'Continue', nextSlide: 22 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1MzOPKolY59r_14q8QezrbbahlyW13_lg/view' },
      ],
    },
    // Step 23: Inverter on
    {
      text: 'Rotate the control dial from left to right.',
      description: 'Rotate from the red "off" to the green "on" position.',
      answers: [
        { label: 'Continue', nextSlide: 23 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1prfeF58LqhtwxN7YVA99dV0HC_J04-Im/view' },
      ],
    },
    // Step 24: Charge position
    {
      text: 'Verify that the inverter is in the "CHG" position.',
      answers: [
        { label: 'Continue', nextSlide: 24 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1tzk-6cNVNgkd2CEk4zkMNSgQFZYrMswa/view' },
      ],
    },
    // Step 25: Breakers on
    {
      text: 'Engage the first and third breakers.',
      answers: [
        { label: 'Continue', nextSlide: 25 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1fnKiKQw60luUZ2LaY2P2bzRPvznSWlWj/view' },
      ],
    },
    // Step 26: Main power disconnect
    {
      text: 'Identify the main power disconnect switch.',
      answers: [
        { label: 'Continue', nextSlide: 26 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1ff-7xKpbDPH24Ham364UxxzqKSK_cLzf/view' },
      ],
    },
    // Step 27: Open generator box
    {
      text: 'Locate the generator within the rear right storage box.',
      answers: [
        { label: 'Continue', nextSlide: 27 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dYdUC3Rkideib_zaBK1iBUpKqhfLQHzs/view' },
      ],
    },
    // Step 28: ON position
    {
      text: 'Flip the breaker to the "ON" position.',
      answers: [
        { label: 'Continue', nextSlide: 28 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1wJ_WRkPwStBW7VgTTtGFCWsWxAgpFgrn/view' },
      ],
    },
    // Step 29: Replace panel
    {
      text: 'Reattach the panel and close the storage box.',
      answers: [
        { label: 'Continue', nextSlide: 29 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1qFRXZkWQZaYcXYZfx3BtWXssTqLccUYE/view' },
      ],
    },
    // Step 30: Turn on middle breaker
    {
      text: 'Activate the middle breaker.',
      description: 'This turns on the generator.',
      answers: [
        { label: 'Continue', nextSlide: 30 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1eT-TF1tezmFt-PnvzEa45DGdYl1sE5Pp/view' },
      ],
    },
    // Step 31: Solar panel on
    {
      text: 'Confirm that the solar panel breaker is in the "ON" position.',
      answers: [
        { label: 'Continue', nextSlide: 31 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1UATv-s1eYNUd-PRoHCPcBv90gf0x1juf/view' },
      ],
    },
    // Step 32: Controller levers down
    {
      text: 'Ensure both red controller levers are depressed.',
      answers: [
        { label: 'Continue', nextSlide: 32 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1K1Ps0zMcHIiv-gmpxfjE8p0TUtPXcaVX/view' },
      ],
    },
    // Step 33: Lower solar mast
    {
      text: 'Lower the solar mast to an angle of approximately 60 degrees.',
      description: 'When solar panels are facing south and at approximately 60 degrees, it allows optimal charging.',
      answers: [
        { label: 'Continue', nextSlide: 33 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1C5HLqVbWNY0QDQW4LD2XNdFhSGC61A9n/view' },
      ],
    },
    // Step 34: Raise camera mast
    {
      text: 'Raise the camera housing mast to its maximum elevation.',
      description: 'Use a hand crank or a drill (not an impact drill) rotating clockwise.',
      answers: [
        { label: 'Continue', nextSlide: 35 }, // Go to Battery SOC Check
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/15wJe3qy8-KGzaJIizvBlQ6afC8t5vr5V/view' },
      ],
    },
    // Battery State of Charge Check
    {
      text: 'Battery State of Charge Reset (Mandatory)',
      description: 'Update the SOC to match measured battery voltage. Incorrect SOC causes controllers to shut down early, AGS to overrun, rapid LP loss, and units going offline overnight.',
      answers: [
        {
          label: 'Continue to Device Status',
          nextSlide: 36,
          disabled: () => !selectedSocOptionId || !socUpdated
        }
      ],
      customContent: (
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-w-full tw-mt-4">
          <p className="tw-text-green-300 tw-text-center tw-text-sm tw-max-w-2xl">
            If SOC already reads 90–100% and voltage is 13.4V+ (held for 3+ minutes), it is acceptable to proceed.
          </p>

          <div className="tw-w-full tw-max-w-3xl tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-2xl tw-p-6 tw-shadow-xl tw-backdrop-blur-md tw-space-y-4">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-3 tw-items-start md:tw-items-center md:tw-justify-between">
              <div>
                <p className="tw-text-white tw-font-semibold">Charge to 13.5V+ whenever possible</p>
                <p className="tw-text-white/70 tw-text-sm tw-max-w-xl">Hold 13.5V+ for at least 3 minutes, then set SOC to 100%. This re-syncs the BMS and balances batteries.</p>
              </div>
              <div className="tw-text-yellow-300 tw-text-sm tw-font-semibold tw-bg-yellow-900/30 tw-border tw-border-yellow-500/40 tw-rounded-md tw-px-3 tw-py-2">Required before continuing</div>
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
              {SOC_OPTIONS.map((option) => {
                const isLowBattery = option.recommendedSoc <= LOW_BATTERY_ALERT_THRESHOLD;
                return (
                  <label
                    key={option.id}
                    className={`tw-flex tw-gap-3 tw-items-start tw-p-4 tw-rounded-lg tw-border-2 tw-cursor-pointer tw-transition-all tw-duration-200 ${
                      selectedSocOptionId === option.id
                        ? isLowBattery
                          ? 'tw-border-red-500 tw-bg-red-900/30'
                          : 'tw-border-blue-500 tw-bg-blue-900/30'
                        : 'tw-border-white/10 tw-bg-white/5 hover:tw-border-blue-500/50 hover:tw-bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="socOption"
                      value={option.id}
                      checked={selectedSocOptionId === option.id}
                      onChange={() => {
                        setSelectedSocOptionId(option.id);
                        setSocUpdated(false);
                        if (option.recommendedSoc <= LOW_BATTERY_ALERT_THRESHOLD) {
                          sendLowBatteryAlert(option.label, option.recommendedSoc);
                        }
                      }}
                      className="tw-mt-1 tw-w-5 tw-h-5 tw-rounded-full tw-border-2 tw-border-blue-500 tw-bg-slate-800 tw-cursor-pointer checked:tw-bg-blue-500 tw-transition-colors"
                    />
                    <div className="tw-flex-1">
                      <p className="tw-text-white tw-font-semibold">{option.label}</p>
                      <p className={`tw-text-sm tw-mt-1 ${isLowBattery ? 'tw-text-red-300' : 'tw-text-blue-300'}`}>
                        Set SOC to {option.recommendedSoc}%
                        {isLowBattery && ' ⚠️ Low Battery Alert'}
                      </p>
                      {option.note && <p className="tw-text-white/60 tw-text-xs tw-mt-1">{option.note}</p>}
                    </div>
                  </label>
                );
              })}
            </div>
            <label className="tw-flex tw-items-start tw-gap-3 tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-lg tw-p-4">
              <input
                type="checkbox"
                checked={socUpdated}
                disabled={!selectedSocOptionId}
                onChange={(e) => setSocUpdated(e.target.checked)}
                className="tw-mt-1 tw-w-5 tw-h-5 tw-rounded tw-border-2 tw-border-blue-500 tw-bg-slate-800 tw-cursor-pointer checked:tw-bg-blue-500 tw-transition-colors disabled:tw-opacity-50"
              />
              <div>
                <p className="tw-text-white tw-font-semibold">I updated SOC in VRM/monitoring to match the selected voltage.</p>
                <p className="tw-text-white/60 tw-text-sm tw-mt-1">This prevents false 100% readings, shutdowns, and AGS loops. Do not continue until SOC is corrected.</p>
              </div>
            </label>
            {!selectedSocOptionId || !socUpdated ? (
              <div className="tw-bg-yellow-900/20 tw-border tw-border-yellow-500/40 tw-rounded-lg tw-p-4 tw-text-center">
                <p className="tw-text-yellow-300 tw-text-sm">
                  ⚠️ Please select a voltage and confirm you've updated the SOC before continuing
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )
    },
    // Device Status Check
    {
      text: 'Device Status Checks',
      description: 'Make sure all devices are online before finishing deployment',
      answers: [
        { label: 'Continue to Finish Deployment', nextSlide: 37 },
      ],
      customContent: <DeviceStatusCheck vin={vin} deviceStatus={deviceStatus} />
    },
    // Finished Deployment
    {
      text: 'Finished Deployment',
      answers: [],
      customContent: (
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-8">
          <div className="tw-w-full tw-max-w-md tw-bg-white/10 tw-p-6 tw-rounded tw-border tw-border-blue-500">
            <h3 className="tw-text-white tw-font-bold tw-mb-4 tw-text-center">Upload Deployment Photo</h3>
            <p className="tw-text-white/80 tw-text-sm tw-mb-4 tw-text-center">Please take a horizontal/landscape photo of the completed deployment for liability records</p>
            <label className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-32 tw-border-2 tw-border-blue-500 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-blue-900/20 hover:tw-bg-blue-900/30 tw-transition-colors">
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                <svg className="tw-w-8 tw-h-8 tw-mb-3 tw-text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="tw-mb-2 tw-text-sm tw-text-blue-300">
                  <span className="tw-font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="tw-text-xs tw-text-blue-400">PNG, JPG or JPEG (MAX. 10MB)</p>
              </div>
              <input type="file" className="tw-hidden" accept="image/*" capture="environment" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFileName(file.name);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setDeploymentImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }} />
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
          <Button label="Finished" onClick={handleRaiseMastFinish} size="large" minWidth disabled={!deploymentImage} />
        </div>
      )
    },
    ];

    // Handle Bravo unit type - Skip Generator & LP section
    if (unitType === 'bravo') {
      // Replace Slide 12 (Store foam) with a skip message and jump to Slide 18 (Mount camera housing)
      // Skipping slides 13-17 (Mopeka sensors and propane-related steps)
      slides[12] = {
      text: 'Generator & LP',
      description: 'This unit is a Bravo model.',
      answers: [
        { label: 'Continue', nextSlide: 18 }, // Jump to camera housing
      ],
      customContent: (
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-4">
          <div className="tw-bg-blue-900/30 tw-border tw-border-blue-500 tw-rounded-lg tw-p-6 tw-max-w-md">
            <p className="tw-text-white tw-text-center">
              This unit is a <span className="tw-font-bold">Bravo</span> model.
            </p>
            <p className="tw-text-white tw-text-center tw-mt-2">
              Generator & LP section not applicable - skipping to next section.
            </p>
          </div>
        </div>
      )
      };
    }

    // Check fast track preference and add skip buttons if applicable
    // Only add skip buttons when coming from FastTrackDeploymentsApp with a valid fast track starting point
    console.log('DeploymentsApp - VIN:', vin, 'initialSlide:', initialSlide, 'fastTrackPref:', fastTrackPref, 'isFastTrack:', isFastTrack, 'onSkip provided:', !!onSkip, 'shouldApplyFastTrack:', shouldApplyFastTrack);

    if (shouldApplyFastTrack) {
      const skipTargets: Record<number, string> = {};

      // Modify slide navigation for solar panels fast track (starting from slide 0)
      if (initialSlide === 0) {
        console.log('Fast Track Solar: Modifying slides for solar panels path');
        console.log('Before modification - Slide 0 nextSlide:', slides[0].answers[0].nextSlide);

        // Slide 0 (Position unit) -> 4 (Level unit)
        slides[0].answers[0].nextSlide = 4;
        // Slide 4 (Level unit) -> 5 (Extend solar panels)
        slides[4].answers[0].nextSlide = 5;
        // Slide 5 (Extend panels) -> 30 (Turn on middle breaker) - skip slides 6-29
        slides[5].answers[0].nextSlide = 30;
        // Slide 30 (Turn on middle breaker) -> 31 (Solar panel breaker)
        slides[30].answers[0].nextSlide = 31;
        // Slide 31 (Solar panel breaker) -> 32 (Controller levers)
        slides[31].answers[0].nextSlide = 32;
        // Add skip button to slide 32 (Controller levers) to go to next fast track question
        skipTargets[32] = 'SUPPORT_LEGS';

        console.log('After modification - Slide 0 nextSlide:', slides[0].answers[0].nextSlide);
        console.log('After modification - Slide 4 nextSlide:', slides[4].answers[0].nextSlide);
        console.log('After modification - Slide 5 nextSlide:', slides[5].answers[0].nextSlide);
      }

      // Modify slide navigation for support legs fast track (starting from slide 1)
      if (initialSlide === 1) {
        // Slide 1 (Extend legs) -> 2 (Rotate legs)
        slides[1].answers[0].nextSlide = 2;
        // Slide 2 (Rotate legs) -> 3 (Level unit)
        slides[2].answers[0].nextSlide = 3;
        // Add skip button to slide 3 (Level unit) to go to next fast track question
        skipTargets[3] = 'GENERATOR_LP';
      }

      // Modify slide navigation for generator/LP fast track (starting from slide 12)
      if (initialSlide === 12) {
        // Show slides: 12, 13, 14, 15, 16, 26, 27, 28, 29
        // Slide 12 (Return foam) -> 13 (Locate Mopeka sensors)
        slides[12].answers[0].nextSlide = 13;
        // Slide 13 (Locate Mopeka) -> 14 (Unscrew fastening)
        slides[13].answers[0].nextSlide = 14;
        // Slide 14 (Unscrew) -> 15 (Affix sensors)
        slides[14].answers[0].nextSlide = 15;
        // Slide 15 (Affix sensors) -> 16 (Reinstall crossbar)
        slides[15].answers[0].nextSlide = 16;
        // Slide 16 (Reinstall crossbar) -> 26 (Identify disconnect switch) - skip slides 17-25
        slides[16].answers[0].nextSlide = 26;
        // Slide 26 (Identify disconnect) -> 27 (Open generator box)
        slides[26].answers[0].nextSlide = 27;
        // Slide 27 (Open generator) -> 28 (Flip breaker)
        slides[27].answers[0].nextSlide = 28;
        // Slide 28 (Flip breaker) -> 29 (Replace panel)
        slides[28].answers[0].nextSlide = 29;
        // Add skip button to slide 29 (Replace panel) to go to next fast track question
        skipTargets[29] = 'CAMERA_HOUSING';
      }

      // Modify slide navigation for camera fast track (starting from slide 7)
      if (initialSlide === 7) {
        // Show slides: 7, 8, 9, 10, 11, 17, 18, 19, 20
        // Slide 7 (Open left rear storage) -> 8 (Retrieve camera housing)
        slides[7].answers[0].nextSlide = 8;
        // Slide 8 (Retrieve camera housing) -> 9 (Affix horn)
        slides[8].answers[0].nextSlide = 9;
        // Slide 9 (Affix horn) -> 10 (Install Camera 2)
        slides[9].answers[0].nextSlide = 10;
        // Slide 10 (Install Camera 2) -> 11 (Mount cameras)
        slides[10].answers[0].nextSlide = 11;
        // Slide 11 (Mount cameras) -> 17 (Attach camera housing) - skip slides 12-16
        slides[11].answers[0].nextSlide = 17;
        // Slide 17 (Attach camera housing) -> 18 (Tighten clamp)
        slides[17].answers[0].nextSlide = 18;
        // Slide 18 (Tighten clamp) -> 19 (Connect cable)
        slides[18].answers[0].nextSlide = 19;
        // Slide 19 (Connect cable) -> 20 (Turn on breakers)
        slides[19].answers[0].nextSlide = 20;
        // Add skip button to slide 20 (Turn on breakers) to go to next fast track question
        skipTargets[20] = 'POWER_BOX';
      }

      // Modify slide navigation for power box fast track (starting from slide 21)
      if (initialSlide === 21) {
        // Show slides: 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33
        // Slide 21 (Open storage - Step 22) -> 22 (Rotate dial - Step 23)
        slides[21].answers[0].nextSlide = 22;
        // Slide 22 (Open storage) -> 23 (Rotate control dial)
        slides[22].answers[0].nextSlide = 23;
        // Slide 23 (Rotate dial) -> 24 (Verify inverter)
        slides[23].answers[0].nextSlide = 24;
        // Slide 24 (Verify inverter) -> 25 (Engage breakers)
        slides[24].answers[0].nextSlide = 25;
        // Slide 25 (Engage breakers) -> 26 (Identify disconnect)
        slides[25].answers[0].nextSlide = 26;
        // Slide 26 (Identify disconnect) -> 27 (Open generator box)
        slides[26].answers[0].nextSlide = 27;
        // Slide 27 (Open generator) -> 28 (Flip breaker)
        slides[27].answers[0].nextSlide = 28;
        // Slide 28 (Flip breaker) -> 29 (Replace panel)
        slides[28].answers[0].nextSlide = 29;
        // Slide 29 (Replace panel) -> 30 (Activate middle breaker)
        slides[29].answers[0].nextSlide = 30;
        // Slide 30 (Activate middle breaker) -> 31 (Confirm solar panel breaker)
        slides[30].answers[0].nextSlide = 31;
        // Slide 31 (Confirm solar breaker) -> 32 (Ensure red levers)
        slides[31].answers[0].nextSlide = 32;
        // Slide 32 (Ensure red levers) -> 33 (Lower solar mast)
        slides[32].answers[0].nextSlide = 33;
        // Add skip button to slide 33 (Lower solar mast) to go back to battery SOC fast track check
        skipTargets[33] = 'BATTERY_SOC';
      }

      Object.entries(skipTargets).forEach(([slideIndex, target]) => {
        const index = parseInt(slideIndex);
        if (slides[index]) {
          slides[index].skipButton = {
            label: 'Resume Checklist',
            show: true,
            target: target
          };
        }
      });
    }

    return slides;
  })();

  const resolvedInitialSlide = React.useMemo(() => {
    if (!vin) return initialSlide;
    const saved = getProgress(vin);
    const lastIndex = deploymentSlides.length - 1;
    if (saved && saved.flowType === 'detailed_track') {
      return Math.min(saved.currentSlide, lastIndex);
    }
    return Math.min(initialSlide, lastIndex);
  }, [vin, initialSlide, deploymentSlides.length]);

  // Refresh progress when VIN changes (e.g., re-entering)
  React.useEffect(() => {
    setProgressPercent(vin ? getCompletionPercentage(vin) : 0);
  }, [vin]);

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#0b1021] tw-via-[#0f172a] tw-to-[#0b132b] tw-text-white">
      <div className="deployments-app tw-p-4 md:tw-p-8">
        <div className="tw-max-w-5xl tw-mx-auto tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-3xl tw-shadow-2xl tw-backdrop-blur-md tw-p-4 md:tw-p-8 tw-space-y-6 tw-font-primary tw-text-white">
          {showCompletion ? (
            <div className="tw-w-full tw-flex tw-justify-start tw-flex-col tw-gap-20px tw-overflow-y-auto tw-overflow-x-hidden">
              <div className="tw-flex tw-flex-col tw-items-center tw-gap-8">
                <Step text="Deployment Complete" />
                <p className="tw-text-white">Thank you for your submission.</p>
                <Button label="Start New Deployment" onClick={handleStartNewDeployment} minWidth />
              </div>
            </div>
          ) : (
            <>
              {vin && (
                <ProgressIndicator percentage={progressPercent} message="Deployment Progress" />
              )}
              <Wizard
                slides={deploymentSlides}
                key={`${vin || 'novin'}-${resolvedInitialSlide}`}
                initialSlide={resolvedInitialSlide}
                onFinish={onFinish}
                onSkip={onSkip}
                vin={vin}
                flowType="detailed_track"
                onSlideChange={(index, total) => {
                  const percent = total > 1 ? Math.round((index / (total - 1)) * 100) : 0;
                  setProgressPercent(percent);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
