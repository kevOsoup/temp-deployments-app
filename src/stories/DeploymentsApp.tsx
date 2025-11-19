
import { Wizard } from './Wizard';
import type { WizardSlideConfig } from './Wizard';


export const DeploymentsApp = () => {
  const deploymentSlides: WizardSlideConfig[] = [
    {
      text: 'Face the unit north with solar panels facing south',
      description: 'Solar panels need to be facing south in order to get the best sunlight to recharge the unit.',
      answers: [
        { label: 'Continue', nextSlide: 1 },
      ],
    },
    {
      text: 'Deploy the legs of the unit.',
      description: 'Extend the legs of the unit. Pull the pin, extend and rotate the legs, and level the unit. Watch the video below for a step-by-step on how to do it.',
      answers: [
        { label: 'Continue', nextSlide: 2 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=y_hEMDqFbRRkvbK_&t=25' },
      ],
    },
    {
      text: 'Deploy solar mast all the way up',
      description: 'This will allow you to open the storage boxes.',
      answers: [
        { label: 'Continue', nextSlide: 3 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=y_hEMDqFbRRkvbK_&t=25' },
      ],
    },
    {
      text: 'Mount horn above spot for camera 2',
      answers: [
        { label: 'Continue', nextSlide: 4 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=vrut8Ce9fysOybkg&t=67' },
      ],
    },
    {
      text: 'Mount camera 2',
      answers: [
        { label: 'Continue', nextSlide: 5 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=vrut8Ce9fysOybkg&t=67' },
      ],
    },
    {
      text: 'Plug in deutsch/ethernet cables for camera',
      answers: [
        { label: 'Continue', nextSlide: 6 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=vrut8Ce9fysOybkg&t=67' },
      ],
    },
    {
      text: 'Repeat steps for cameras 1 and 3',
      answers: [
        { label: 'Continue', nextSlide: 7 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=vrut8Ce9fysOybkg&t=67' },
      ],
    },
    {
      text: 'Set up Mopeka sensors to bottom of tanks',
      description: '(need to make a new video specific to setting it up using your phone) 1. (unscrew and remove the central fastening piece, gauge and crossbar…)',
      answers: [
        { label: 'Continue', nextSlide: 8 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=xpB0a-ltCISE0WJI&t=99' },
      ],
    },
    {
      text: 'Screw on the hoses and open the propane valve',
      answers: [
        { label: 'Continue', nextSlide: 9 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/open-propane.png?v=1763578336' },
      ],
    },
    {
      text: 'Attach camera housing atop the mast',
      description: 'Camera housing can face in any directions. Make sure to tighten the clamp around the base. Plug the cord from the mast into the camera connection port.',
      answers: [
        { label: 'Continue', nextSlide: 10 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=UL08FnNIe4tJe0_e&t=145' },
      ],
    },
    {
      text: 'Plug the cord from the mast into the camera connection port',
      answers: [
        { label: 'Continue', nextSlide: 11 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=MxVOAZiMh1GCY-HJ&t=157' },
      ],
    },
    {
      text: 'Turn on all 4 breakers inside the camera housing',
      answers: [
        { label: 'Continue', nextSlide: 12 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/camera-housing-breakers.png?v=1763578774' },
      ],
    },
    {
      text: 'Open front left box to find the control panel',
      answers: [
        { label: 'Continue', nextSlide: 13 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/control-panel-box.png?v=1763578983' },
      ],
    },
    {
      text: 'Turn on the inverter',
      description: 'Rotate from the red "off" to the green "on" position.',
      answers: [
        { label: 'Continue', nextSlide: 14 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-inverter.png?v=1763585591' },
      ],
    },
    {
      text: 'Turn inverter to the charged position: "CHR"',
      answers: [
        { label: 'Continue', nextSlide: 15 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/inverter-chr.png?v=1763585653' },
      ],
    },
    {
      text: 'Turn on the first and third breakers',
      answers: [
        { label: 'Continue', nextSlide: 16 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/power-box-breakers.png?v=1763585703' },
      ],
    },
    {
      text: 'Push in the main power disconnect lever breaker',
      answers: [
        { label: 'Continue', nextSlide: 17 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/main-power-disconnect.png?v=1763585830' },
      ],
    },
    {
      text: 'Turn on the generator',
      description: 'Open side and front panel of the generator, flip the breaker "ON" and push the lever to "GAS"',
      answers: [
        { label: 'Continue', nextSlide: 18 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-generator.png?v=1763588481' },
      ],
    },
    {
      text: 'Turn on the middle breaker, which turns on the generator.',
      answers: [
        { label: 'Continue', nextSlide: 19 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/turn-on-generator-breaker.png?v=1763588746' },
      ],
    },
    {
      text: 'Verify solar panel breaker is turned "On"',
      answers: [
        { label: 'Continue', nextSlide: 20 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/solar-panel-breaker.png?v=1763588930' },
      ],
    },
    {
      text: 'Push down charge control levers',
      description: 'might need to add more details to this',
      answers: [
        { label: 'Continue', nextSlide: 21 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/charge-controllers1.png?v=1763589300' },
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/charge-controllers2.png?v=1763589300' },
      ],
    },
    {
      text: 'Adjust the solar panels and make sure storage boxes are closed',
      description: 'When solar panels are at approximately 60 degrees it allows them to charge the best.',
      answers: [
        { label: 'Continue', nextSlide: 22 },
      ],
      media: [
        { youtube: 'https://youtu.be/s8mebfGn3I0?si=2vfis3QSsUiaKGp6&t=239' },
      ],
    },
    {
      text: 'Raise the camera housing mast to its maximum height',
      description: 'Use a hand crank or a drill (not an impact drill) rotating clockwise.',
      answers: [
        { label: 'Continue', nextSlide: 23 },
      ],
      media: [
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/raise-mast-1.png?v=1763589791' },
        { image: 'https://cdn.shopify.com/s/files/1/0576/7941/3301/files/raise-mast-2.png?v=1763589791' },
      ],
    },
    {
      text: '{end}',
      answers: [
        { label: 'Finish', nextSlide: 1 },
      ]
    },
  ];

  return (
    <div className="deployments-app tw-px-4 md:tw-px-8 tw-bg-[#1e1d1b]">
      <Wizard slides={deploymentSlides} />
    </div>
  );
};
