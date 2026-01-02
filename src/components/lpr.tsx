export interface LPRProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const LPRdata = [
  [
  {
    "id": "VehicleTrace-20250814-082530-112-us-lane1-dir-l1",
    "time": "2025-08-14T08:25:30.112Z",
    "vehicle": {
      "class": 5,
      "color": "white",
      "confidence": 94,
      "counter": 1,
      "country": "US",
      "direction": 1,
      "maker": "toyota",
      "model": "camry",
      "number": "JDK4521",
      "subdivision": "PA"
    }
  },
  {
    "id": "VehicleTrace-20250814-094215-305-us-lane2-dir-r1",
    "time": "2025-08-14T09:42:15.305Z",
    "vehicle": {
      "class": 4,
      "color": "black",
      "confidence": 91,
      "counter": 2,
      "country": "US",
      "direction": -1,
      "maker": "honda",
      "model": "civic",
      "number": "XZY9012",
      "subdivision": "NY"
    }
  },
  {
    "id": "VehicleTrace-20250813-141030-287-us-lane3-dir-l2",
    "time": "2025-08-13T14:10:30.287Z",
    "vehicle": {
      "class": 7,
      "color": "blue",
      "confidence": 97,
      "counter": 3,
      "country": "US",
      "direction": 1,
      "maker": "ford",
      "model": "f-150",
      "number": "BTR7755",
      "subdivision": "MI"
    }
  },
  {
    "id": "VehicleTrace-20250813-155545-114-us-lane1-dir-r2",
    "time": "2025-08-13T15:55:45.114Z",
    "vehicle": {
      "class": 6,
      "color": "silver",
      "confidence": 92,
      "counter": 4,
      "country": "US",
      "direction": -1,
      "maker": "chevrolet",
      "model": "malibu",
      "number": "KQW8890",
      "subdivision": "IL"
    }
  },
  {
    "id": "VehicleTrace-20250812-071300-448-us-lane2-dir-l1",
    "time": "2025-08-12T07:13:00.448Z",
    "vehicle": {
      "class": 3,
      "color": "gray",
      "confidence": 95,
      "counter": 5,
      "country": "US",
      "direction": 1,
      "maker": "tesla",
      "model": "model 3",
      "number": "EV2025",
      "subdivision": "CA"
    }
  },
  {
    "id": "VehicleTrace-20250812-084519-223-us-lane3-dir-r1",
    "time": "2025-08-12T08:45:19.223Z",
    "vehicle": {
      "class": 7,
      "color": "dark gray",
      "confidence": 93,
      "counter": 6,
      "country": "US",
      "direction": -1,
      "maker": "bmw",
      "model": "x5",
      "number": "LHG6623",
      "subdivision": "NJ"
    }
  },
  {
    "id": "VehicleTrace-20250812-091250-501-us-lane1-dir-l1",
    "time": "2025-08-12T09:12:50.501Z",
    "vehicle": {
      "class": 6,
      "color": "red",
      "confidence": 89,
      "counter": 7,
      "country": "US",
      "direction": 1,
      "maker": "nissan",
      "model": "altima",
      "number": "MNP3381",
      "subdivision": "TX"
    }
  },
  {
    "id": "VehicleTrace-20250812-112500-659-us-lane2-dir-r2",
    "time": "2025-08-12T11:25:00.659Z",
    "vehicle": {
      "class": 5,
      "color": "dark blue",
      "confidence": 90,
      "counter": 8,
      "country": "US",
      "direction": -1,
      "maker": "kia",
      "model": "sorento",
      "number": "ZXP4710",
      "subdivision": "FL"
    }
  },
  {
    "id": "VehicleTrace-20250811-101445-278-us-lane3-dir-l1",
    "time": "2025-08-11T10:14:45.278Z",
    "vehicle": {
      "class": 4,
      "color": "green",
      "confidence": 92,
      "counter": 9,
      "country": "US",
      "direction": 1,
      "maker": "hyundai",
      "model": "elantra",
      "number": "HYD2287",
      "subdivision": "GA"
    }
  },
  {
    "id": "VehicleTrace-20250811-113022-882-us-lane1-dir-r1",
    "time": "2025-08-11T11:30:22.882Z",
    "vehicle": {
      "class": 6,
      "color": "white",
      "confidence": 93,
      "counter": 10,
      "country": "US",
      "direction": -1,
      "maker": "volkswagen",
      "model": "jetta",
      "number": "VWG5566",
      "subdivision": "VA"
    }
  },
  {
    "id": "VehicleTrace-20250810-074200-392-us-lane2-dir-l2",
    "time": "2025-08-10T07:42:00.392Z",
    "vehicle": {
      "class": 7,
      "color": "dark green",
      "confidence": 94,
      "counter": 11,
      "country": "US",
      "direction": 1,
      "maker": "subaru",
      "model": "outback",
      "number": "SBR9231",
      "subdivision": "CO"
    }
  },
  {
    "id": "VehicleTrace-20250810-095510-775-us-lane1-dir-r2",
    "time": "2025-08-10T09:55:10.775Z",
    "vehicle": {
      "class": 5,
      "color": "black",
      "confidence": 96,
      "counter": 12,
      "country": "US",
      "direction": -1,
      "maker": "mercedes-benz",
      "model": "c-class",
      "number": "MBZ0098",
      "subdivision": "DC"
    }
  },
  {
    "id": "VehicleTrace-20250809-151230-999-us-lane3-dir-l1",
    "time": "2025-08-09T15:12:30.999Z",
    "vehicle": {
      "class": 6,
      "color": "white",
      "confidence": 91,
      "counter": 13,
      "country": "US",
      "direction": 1,
      "maker": "audi",
      "model": "a4",
      "number": "AUD4452",
      "subdivision": "MA"
    }
  },
  {
    "id": "VehicleTrace-20250809-163355-227-us-lane2-dir-r1",
    "time": "2025-08-09T16:33:55.227Z",
    "vehicle": {
      "class": 7,
      "color": "silver",
      "confidence": 92,
      "counter": 14,
      "country": "US",
      "direction": -1,
      "maker": "mazda",
      "model": "cx-5",
      "number": "MAZ9834",
      "subdivision": "NC"
    }
  },
  {
    "id": "VehicleTrace-20250809-170215-510-us-lane1-dir-l2",
    "time": "2025-08-09T17:02:15.510Z",
    "vehicle": {
      "class": 5,
      "color": "maroon",
      "confidence": 93,
      "counter": 15,
      "country": "US",
      "direction": 1,
      "maker": "jeep",
      "model": "wrangler",
      "number": "JEP8821",
      "subdivision": "AZ"
    }
  }
]

]


import React, { useState } from 'react';

// Type for sort direction
type SortDirection = 'asc' | 'desc' | null;

// Type for sort field
type SortField = 'number' | 'maker' | 'model' | 'color' | 'subdivision' | 'country' | null;

export const LPR = () => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle column header click for sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction or reset
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      // If sorting by a new field, set field and direction
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter and sort data
  const getFilteredAndSortedData = () => {
    // Start with all data
    let filteredData = LPRdata[0];

    // Apply search filter if search term exists
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item => {
        // Search across all vehicle fields
        return (
          item.vehicle.number.toLowerCase().includes(term) ||
          item.vehicle.maker.toLowerCase().includes(term) ||
          item.vehicle.model.toLowerCase().includes(term) ||
          item.vehicle.color.toLowerCase().includes(term) ||
          item.vehicle.subdivision.toLowerCase().includes(term) ||
          item.vehicle.country.toLowerCase().includes(term)
        );
      });
    }

    // Apply sorting if sort field exists
    if (sortField && sortDirection) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a.vehicle[sortField]?.toString().toLowerCase() || '';
        const bValue = b.vehicle[sortField]?.toString().toLowerCase() || '';

        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return filteredData;
  };

  // Get filtered and sorted data
  const filteredAndSortedData = getFilteredAndSortedData();

  // Function to render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;

    return (
      <span className="tw-ml-3 tw-text-xs tw-text-flex-security-light">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="tw-container tw-bg-[#1E1D1B] tw-mx-auto tw-p-2 sm:tw-p-3 md:tw-p-4 lg:tw-p-6 tw-uppercase tw-leading-none tw-font-[400] tw-text-base sm:tw-text-lg md:tw-text-xl lg:tw-text-2xl tw-text-white tw-min-h-screen tw-font-primary">
      {/* Search Bar */}
      <div className="tw-mb-2 md:tw-mb-4 tw-w-full">
        <div className="tw-relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="tw-appearance-none tw-shadow-none tw-px-4 tw-py-2 tw-bg-flex-security-black-accent tw-border tw-w-1/3 tw-rounded tw-font-light tw-text-xs tw-text-white focus:tw-outline-none"
            style={{outline: "none",
                    appearance: "none",
                    boxShadow: "none",
                  border: "1px solid #4B5563" }}
          />
          {searchTerm && (
            <button
              className="tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-zinc-400 hover:tw-text-white"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        {filteredAndSortedData.length === 0 && (
          <div className="tw-mt-2 tw-text-zinc-400 tw-text-sm">
            No results found for "{searchTerm}"
          </div>
        )}
        {searchTerm && filteredAndSortedData.length > 0 && (
          <div className="tw-mt-2 tw-text-zinc-400 tw-text-sm">
            Found {filteredAndSortedData.length} results for "{searchTerm}"
          </div>
        )}
      </div>

      {/* Table container with overflow handling */}
      <div className="tw-w-full tw-border tw-border-gray-700 tw-overflow-x-auto">
        {/* Table content */}
        <div className="tw-min-w-max">
          {/* Header Row */}
          <div
            className="tw-grid tw-font-light tw-text-xs sm:tw-text-sm md:tw-text-lg lg:tw-text-2xl"
            style={{
              gridTemplateColumns: "minmax(80px, 1fr) minmax(100px, 1.5fr) minmax(100px, 1.5fr) minmax(80px, 1fr) minmax(80px, 1fr) minmax(80px, 1fr)",
              background: "#353535"
            }}
          >
            <div
              className="tw-font-light tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('number')}
            >
              Number {renderSortIndicator('number')}
            </div>
            <div
              className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('maker')}
            >
              Maker {renderSortIndicator('maker')}
            </div>
            <div
              className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('model')}
            >
              Model {renderSortIndicator('model')}
            </div>
            <div
              className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('color')}
            >
              Color {renderSortIndicator('color')}
            </div>
            <div
              className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('subdivision')}
            >
              State {renderSortIndicator('subdivision')}
            </div>
            <div
              className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-break-words tw-whitespace-normal tw-overflow-hidden tw-cursor-pointer tw-select-none tw-flex tw-items-center"
              onClick={() => handleSort('country')}
            >
              Country {renderSortIndicator('country')}
            </div>
          </div>

          {/* Data Rows */}
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((item, index) => (
              <div
                key={index}
                className="tw-grid hover:tw-bg-zinc-800 tw-transition-colors tw-duration-150"
                style={{
                  gridTemplateColumns: "minmax(80px, 1fr) minmax(100px, 1.5fr) minmax(100px, 1.5fr) minmax(80px, 1fr) minmax(80px, 1fr) minmax(80px, 1fr)"
                }}
              >
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.number}</div>
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.maker}</div>
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.model}</div>
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.color}</div>
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.subdivision}</div>
                <div className="tw-p-1 sm:tw-p-2 md:tw-p-3 tw-border-t tw-border-gray-300 tw-flex tw-items-center tw-font-light tw-text-xs sm:tw-text-sm tw-break-words tw-whitespace-normal tw-overflow-hidden">{item.vehicle.country}</div>
              </div>
            ))
          ) : (
            <div className="tw-p-4 tw-text-center tw-text-zinc-400">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
