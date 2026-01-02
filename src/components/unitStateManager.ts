/**
 * Utility functions for managing unit deployment state in localStorage
 */

export type UnitType = 'alpha' | 'bravo';

const STORAGE_PREFIX = 'flex_deployment_';

/**
 * Store fast track preference for a unit (1 = fast track, 0 = detailed track)
 */
export const setFastTrackPreference = (vin: string, isFastTrack: boolean): void => {
    localStorage.setItem(`${STORAGE_PREFIX}fasttrack_${vin}`, isFastTrack ? '1' : '0');
};

/**
 * Get fast track preference for a unit
 * Returns true if fast track, false if detailed track, null if not set
 */
export const getFastTrackPreference = (vin: string): boolean | null => {
    const value = localStorage.getItem(`${STORAGE_PREFIX}fasttrack_${vin}`);
    if (value === null) return null;
    return value === '1';
};

/**
 * Store unit type (alpha or bravo)
 */
export const setUnitType = (vin: string, type: UnitType): void => {
    localStorage.setItem(`${STORAGE_PREFIX}unittype_${vin}`, type);
};

/**
 * Get unit type for a VIN
 */
export const getUnitType = (vin: string): UnitType | null => {
    const value = localStorage.getItem(`${STORAGE_PREFIX}unittype_${vin}`);
    return value as UnitType | null;
};

/**
 * Determine unit type from VIN (mock implementation)
 * Even last digit = Alpha, Odd last digit = Bravo
 */
export const determineUnitType = (vin: string): UnitType => {
    if (!vin || vin.length === 0) return 'alpha'; // Default
    const lastDigit = parseInt(vin[vin.length - 1], 10);
    return isNaN(lastDigit) || lastDigit % 2 === 0 ? 'alpha' : 'bravo';
};

/**
 * Save current progress for a VIN
 */
export const saveProgress = (vin: string, currentSlide: number, totalSlides: number, flowType: 'fast_track' | 'detailed_track'): void => {
    const progressData = {
        currentSlide,
        totalSlides,
        flowType,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(`${STORAGE_PREFIX}progress_${vin}`, JSON.stringify(progressData));
};

/**
 * Get saved progress for a VIN
 */
export const getProgress = (vin: string): { currentSlide: number; totalSlides: number; flowType: 'fast_track' | 'detailed_track'; timestamp: string } | null => {
    const data = localStorage.getItem(`${STORAGE_PREFIX}progress_${vin}`);
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
};

/**
 * Calculate completion percentage
 */
export const getCompletionPercentage = (vin: string): number => {
    const progress = getProgress(vin);
    if (!progress || progress.totalSlides === 0) return 0;
    return Math.round((progress.currentSlide / progress.totalSlides) * 100);
};

/**
 * Clear progress for a VIN
 */
export const clearProgress = (vin: string): void => {
    localStorage.removeItem(`${STORAGE_PREFIX}progress_${vin}`);
};

/**
 * Clear all deployment data for a unit
 */
export const clearUnitData = (vin: string): void => {
    localStorage.removeItem(`${STORAGE_PREFIX}fasttrack_${vin}`);
    localStorage.removeItem(`${STORAGE_PREFIX}unittype_${vin}`);
    clearProgress(vin);
};
