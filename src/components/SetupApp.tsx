import { Wizard } from './Wizard';
import type { WizardSlideConfig } from './Wizard';


export const SetupApp = () => {
  const setupSlides: WizardSlideConfig[] = [
    {
      text: 'Position the unit facing north, ensuring the solar panels are oriented toward the south.',
      answers: [
        { label: 'Continue', nextSlide: 1 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1gAMjV7Yw0u9UY0_j1BnKAIyEF8x1sWyY/view' },
      ],
    },
    {
      text: 'Extend the unit\'s legs by pulling the retaining pin.',
      answers: [
        { label: 'Continue', nextSlide: 2 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1AxQuHcfsTMngSRwHS5J1n62G8meq0RQH/view' },
      ],
    },
    {
      text: 'Rotate the legs, utilizing the pin to unlock and secure them in the desired position.',
      answers: [
        { label: 'Continue', nextSlide: 3 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/198gi_YTV-s3A6E6_KcfiLFkZrLFnfYGh/view' },
      ],
    },
    {
      text: 'Level the unit using the built-in spirit levels located on the front and left side.',
      answers: [
        { label: 'Continue', nextSlide: 4 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1XsOVrcOiAiCiUjMK8l78-l6QTOi0ANGm/view' },
      ],
    },
    {
      text: 'Extend the solar panels by releasing the two yellow clips on the outer edge.',
      answers: [
        { label: 'Continue', nextSlide: 5 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1s6Bp4hzRoscfDdmQP4eOfZhKJMA2bZvP/view' },
      ],
    },
    {
      text: 'Elevate the solar mast to a vertical orientation by removing the pins.',
      answers: [
        { label: 'Continue', nextSlide: 6 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/10KC9MCO1EZN5PSRAquEjFMcxh9wYxfff/view' },
      ],
    },
    {
      text: 'Ensure the mast is securely locked in position by reinserting the pins.',
      answers: [
        { label: 'Continue', nextSlide: 7 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1sKT6TXRJHOnhwfCYEogYFlOmeOZS5SqG/view' },
      ],
    },
    {
      text: 'Open the left rear storage compartment.',
      answers: [
        { label: 'Continue', nextSlide: 8 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1zc-GKg6qqSQAuE8kTqLKim_mJM-4pnAW/view' },
      ],
    },
    {
      text: 'Retrieve the camera housing from the storage box in preparation for assembly.',
      answers: [
        { label: 'Continue', nextSlide: 9 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/19ti4aRGx_Y45JAdoHKsNxuMtHOKj4QC7/view' },
      ],
    },
    {
      text: 'Affix the horn above the designated location for Camera 2.',
      answers: [
        { label: 'Continue', nextSlide: 10 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1WX-32xYzs9ECkzcSTsjCJzedw5NERyo7/view' },
      ],
    },
    {
      text: 'Install Camera 2 beneath the horn and follow the same procedure for Cameras 1 and 3.',
      answers: [
        { label: 'Continue', nextSlide: 11 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1uqS3mpax44qGg0xKFfW_QOFhi9uBvmGo/view' },
      ],
    },
    {
      text: 'Return the foam packaging material to the white storage box for future transportation.',
      answers: [
        { label: 'Continue', nextSlide: 12 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/16flLJaLSJ2jMnzd0Qc-3S2ROUNjX-1zd/view' },
      ],
    },
    {
      text: 'Locate and remove the Mopeka sensors.',
      answers: [
        { label: 'Continue', nextSlide: 13 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1soE976RxxlbVR4yHLAKjGxFYYzEVbpZE/view' },
      ],
    },
    {
      text: 'Unscrew and detach the central fastening piece, gauge, and crossbar.',
      answers: [
        { label: 'Continue', nextSlide: 14 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1kGRKuHoeNtRlOVMf-BjFiKdd1dDDYBF_/view' },
      ],
    },
    {
      text: 'Affix a sensor to the bottom of each propane tank.',
      answers: [
        { label: 'Continue', nextSlide: 15 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dupXcN-mzR3eYpJsg3ivYgSzyouR5Fw2/view' },
      ],
    },
    {
      text: 'Reinstall the crossbar, gauge, and fastening piece.',
      answers: [
        { label: 'Continue', nextSlide: 16 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dcZBVIbkIVE2o2rItV-Bf14C9Cx_sNz7/view' },
      ],
    },
    {
      text: 'Connect the propane hose and open the valve.',
      answers: [
        { label: 'Continue', nextSlide: 17 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/10jRdbPGCJl-NrakAzTlvJ5gVp58kSW7Q/view' },
      ],
    },
    {
      text: 'Attach the fully assembled camera housing to the top of the mast.',
      answers: [
        { label: 'Continue', nextSlide: 18 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1F1rZ86lB1YH9_sewmuGjCoTARjW7zl3x/view' },
      ],
    },
    {
      text: 'Tighten the clamp at the base of the camera housing to ensure security.',
      answers: [
        { label: 'Continue', nextSlide: 19 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1zG-OMSP0RjNOjtoy3tAOPw6R6SVSXlJT/view' },
      ],
    },
    {
      text: 'Connect the cable from the camera mast into the bottom receptacle of the camera housing.',
      answers: [
        { label: 'Continue', nextSlide: 20 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/14OYqYSK1ubmDRpCbnAx_AlESplTPNMbe/view' },
      ],
    },
    {
      text: 'Activate all four breakers sequentially from left to right within the camera housing.',
      answers: [
        { label: 'Continue', nextSlide: 21 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1LV7JclM6Ni6tc3Aq6X1v1Acyl88qy2PN/view' },
      ],
    },
    {
      text: 'Open the front left storage box.',
      answers: [
        { label: 'Continue', nextSlide: 22 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1MzOPKolY59r_14q8QezrbbahlyW13_lg/view' },
      ],
    },
    {
      text: 'Rotate the control dial from left to right.',
      answers: [
        { label: 'Continue', nextSlide: 23 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1prfeF58LqhtwxN7YVA99dV0HC_J04-Im/view' },
      ],
    },
    {
      text: 'Verify that the inverter is in the "charged" position.',
      answers: [
        { label: 'Continue', nextSlide: 24 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1tzk-6cNVNgkd2CEk4zkMNSgQFZYrMswa/view' },
      ],
    },
    {
      text: 'Engage the first and third breakers.',
      answers: [
        { label: 'Continue', nextSlide: 25 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1fnKiKQw60luUZ2LaY2P2bzRPvznSWlWj/view' },
      ],
    },
    {
      text: 'Identify the main power disconnect switch.',
      answers: [
        { label: 'Continue', nextSlide: 26 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1ff-7xKpbDPH24Ham364UxxzqKSK_cLzf/view' },
      ],
    },
    {
      text: 'Locate the generator within the rear right storage box.',
      answers: [
        { label: 'Continue', nextSlide: 27 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1dYdUC3Rkideib_zaBK1iBUpKqhfLQHzs/view' },
      ],
    },
    {
      text: 'Flip the breaker to the "ON" position.',
      answers: [
        { label: 'Continue', nextSlide: 28 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1wJ_WRkPwStBW7VgTTtGFCWsWxAgpFgrn/view' },
      ],
    },
    {
      text: 'Reattach the panel and close the storage box.',
      answers: [
        { label: 'Continue', nextSlide: 29 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1qFRXZkWQZaYcXYZfx3BtWXssTqLccUYE/view' },
      ],
    },
    {
      text: 'Activate the middle breaker.',
      answers: [
        { label: 'Continue', nextSlide: 30 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1eT-TF1tezmFt-PnvzEa45DGdYl1sE5Pp/view' },
      ],
    },
    {
      text: 'Confirm that the solar panel breaker is in the "ON" position.',
      answers: [
        { label: 'Continue', nextSlide: 31 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1UATv-s1eYNUd-PRoHCPcBv90gf0x1juf/view' },
      ],
    },
    {
      text: 'Ensure both red controller levers are depressed.',
      answers: [
        { label: 'Continue', nextSlide: 32 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1K1Ps0zMcHIiv-gmpxfjE8p0TUtPXcaVX/view' },
      ],
    },
    {
      text: 'Lower the solar mast to an angle of approximately 60 degrees.',
      answers: [
        { label: 'Continue', nextSlide: 33 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/1C5HLqVbWNY0QDQW4LD2XNdFhSGC61A9n/view' },
      ],
    },
    {
      text: 'Raise the camera housing mast to its maximum elevation.',
      answers: [
        { label: 'Finish', nextSlide: 1 },
      ],
      media: [
        { googleDrive: 'https://drive.google.com/file/d/15wJe3qy8-KGzaJIizvBlQ6afC8t5vr5V/view' },
      ],
    },
  ];

  return (
    <div className='tw-min-h-screen tw-bg-[#1e1d1b]'>
      <div className="setup-app tw-p-4 md:tw-p-8 ">
        <Wizard slides={setupSlides} />
      </div>
    </div>

  );
};
