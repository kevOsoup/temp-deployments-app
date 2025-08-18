export interface LPRProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const LPRdata = [
  {
    "make": "Toyota",
    "model": "Camry",
    "dateCaptured": "2025-08-14T08:25:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=ABC1234"
  },
  {
    "make": "Honda",
    "model": "Civic",
    "dateCaptured": "2025-08-14T09:42:15Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=XYZ9876"
  },
  {
    "make": "Ford",
    "model": "F-150",
    "dateCaptured": "2025-08-13T14:10:30Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=JKL4521"
  },
  {
    "make": "Chevrolet",
    "model": "Malibu",
    "dateCaptured": "2025-08-13T15:55:45Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=QWE7654"
  },
  {
    "make": "Tesla",
    "model": "Model 3",
    "dateCaptured": "2025-08-12T07:13:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=EV2025"
  },
  {
    "make": "BMW",
    "model": "X5",
    "dateCaptured": "2025-08-12T08:45:19Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=GER4432"
  },
  {
    "make": "Nissan",
    "model": "Altima",
    "dateCaptured": "2025-08-12T09:12:50Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=USA9991"
  },
  {
    "make": "Kia",
    "model": "Sorento",
    "dateCaptured": "2025-08-12T11:25:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=KIA8832"
  },
  {
    "make": "Hyundai",
    "model": "Elantra",
    "dateCaptured": "2025-08-11T10:14:45Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=HYU7745"
  },
  {
    "make": "Volkswagen",
    "model": "Jetta",
    "dateCaptured": "2025-08-11T11:30:22Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=VWG5566"
  },
  {
    "make": "Subaru",
    "model": "Outback",
    "dateCaptured": "2025-08-10T07:42:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=SUB1235"
  },
  {
    "make": "Mercedes-Benz",
    "model": "C-Class",
    "dateCaptured": "2025-08-10T09:55:10Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=MBZ0098"
  },
  {
    "make": "Audi",
    "model": "A4",
    "dateCaptured": "2025-08-09T15:12:30Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=AUD4452"
  },
  {
    "make": "Mazda",
    "model": "CX-5",
    "dateCaptured": "2025-08-09T16:33:55Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=MAZ9834"
  },
  {
    "make": "Jeep",
    "model": "Wrangler",
    "dateCaptured": "2025-08-09T17:02:15Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=JEEP992"
  },
  {
    "make": "GMC",
    "model": "Sierra",
    "dateCaptured": "2025-08-08T12:45:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=GMC4390"
  },
  {
    "make": "Lexus",
    "model": "RX 350",
    "dateCaptured": "2025-08-08T13:30:40Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=LXS2841"
  },
  {
    "make": "Acura",
    "model": "MDX",
    "dateCaptured": "2025-08-08T14:55:12Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=ACU8810"
  },
  {
    "make": "Infiniti",
    "model": "Q50",
    "dateCaptured": "2025-08-07T10:15:29Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=INF7782"
  },
  {
    "make": "Dodge",
    "model": "Charger",
    "dateCaptured": "2025-08-07T11:22:41Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=DOD3321"
  },
  {
    "make": "Ram",
    "model": "1500",
    "dateCaptured": "2025-08-07T12:31:52Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=RAM7712"
  },
  {
    "make": "Chrysler",
    "model": "300",
    "dateCaptured": "2025-08-06T08:42:33Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=CHR9921"
  },
  {
    "make": "Buick",
    "model": "Enclave",
    "dateCaptured": "2025-08-06T09:55:14Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=BUI1198"
  },
  {
    "make": "Cadillac",
    "model": "Escalade",
    "dateCaptured": "2025-08-06T11:10:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=CAD7752"
  },
  {
    "make": "Volvo",
    "model": "XC90",
    "dateCaptured": "2025-08-05T07:25:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=VOL1983"
  },
  {
    "make": "Jaguar",
    "model": "F-Pace",
    "dateCaptured": "2025-08-05T09:18:40Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=JAG7771"
  },
  {
    "make": "Porsche",
    "model": "Macan",
    "dateCaptured": "2025-08-05T10:45:15Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=POR5220"
  },
  {
    "make": "Mitsubishi",
    "model": "Outlander",
    "dateCaptured": "2025-08-04T08:33:59Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=MIT4490"
  },
  {
    "make": "Land Rover",
    "model": "Range Rover",
    "dateCaptured": "2025-08-04T09:55:00Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=LRR8801"
  },
  {
    "make": "Alfa Romeo",
    "model": "Giulia",
    "dateCaptured": "2025-08-04T11:42:20Z",
    "licensePlateImageUrl": "https://placehold.co/400x200?text=ALF1209"
  }
]


import React from 'react';

export const LPR = () => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="tw-container tw-bg-[#1E1D1B] tw-mx-auto tw-p-2 sm:tw-p-3 md:tw-p-4 lg:tw-p-6 tw-uppercase tw-leading-none tw-font-[400] tw-text-base sm:tw-text-lg md:tw-text-xl lg:tw-text-2xl tw-text-white tw-min-h-screen tw-font-primary">
      <div className="tw-w-full tw-border tw-border-gray-700">
        {/* Header Row */}
        <div className="tw-grid tw-grid-cols-4 tw-font-light tw-text-xs sm:tw-text-sm md:tw-text-lg lg:tw-text-xl" style={{ background: "linear-gradient(302deg, rgba(33, 46, 94, 1) 0%, rgba(21, 73, 153, 1) 52%, rgba(0, 120, 255, 1) 79%, rgba(39, 59, 137, 1) 100%)" }}>
          <div className="tw-p-1 sm:tw-p-2 md:tw-p-3">License Plate</div>
          <div className="tw-p-1 sm:tw-p-2 md:tw-p-3">Date Captured</div>
          <div className="tw-p-1 sm:tw-p-2 md:tw-p-3">Make</div>
          <div className="tw-p-1 sm:tw-p-2 md:tw-p-3">Model</div>
        </div>

        {/* Data Rows */}
        {LPRdata.map((item, index) => (
          <div
            key={index}
            className="tw-grid tw-grid-cols-4 hover:tw-bg-zinc-800 tw-transition-colors tw-duration-150"
          >
            <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-700">
              <img
                src={item.licensePlateImageUrl}
                alt="License Plate"
                className="tw-max-w-full tw-h-auto"
              />
            </div>
            <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-700 tw-flex tw-items-center tw-text-sm sm:tw-text-base md:tw-text-lg lg:tw-text-xl">{formatDate(item.dateCaptured)}</div>
            <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-700 tw-flex tw-items-center tw-text-sm sm:tw-text-base md:tw-text-lg lg:tw-text-xl">{item.make}</div>
            <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-700 tw-flex tw-items-center tw-text-sm sm:tw-text-base md:tw-text-lg lg:tw-text-xl">{item.model}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
