import { useState, useEffect, type ReactNode } from 'react';
import { Button } from './Button';
import { Step } from './Step';
import { saveProgress } from './unitStateManager';

export interface WizardAnswer {
  label: string;
  nextSlide: number;
}

export type MediaItem =
  | { image: string }
  | { youtube: string }
  | { googleDrive: string };

export interface WizardSlideConfig {
  text: string;
  answers: WizardAnswer[];
  media?: MediaItem[];
  description?: string;
  customContent?: ReactNode;
  skipButton?: {
    label: string;
    show: boolean;
    target: string;
  };
}

export interface WizardProps {
  slides: WizardSlideConfig[];
  initialSlide?: number;
  onFinish?: () => void;
  onSkip?: (target: string) => void;
  vin?: string;
  flowType?: 'fast_track' | 'detailed_track';
  onSlideChange?: (index: number, totalSlides: number) => void;
}

const convertYouTubeUrl = (url: string): string => {
  // Handle youtu.be short links
  const youtuBeMatch = url.match(/youtu\.be\/([^?]+)/);
  if (youtuBeMatch) {
    const videoId = youtuBeMatch[1];
    const urlParams = new URL(url).searchParams;
    const time = urlParams.get('t');
    return `https://www.youtube.com/embed/${videoId}${time ? `?start=${time}` : ''}`;
  }

  // Handle youtube.com/watch links
  const youtubeMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const urlParams = new URL(url).searchParams;
    const time = urlParams.get('t');
    return `https://www.youtube.com/embed/${videoId}${time ? `?start=${time}` : ''}`;
  }

  // Return as-is if already an embed URL or unrecognized format
  return url;
};

const convertGoogleDriveUrl = (url: string): string => {
  // Handle drive.google.com/file/d/{fileId}/view format
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) {
    const fileId = fileMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // Handle drive.google.com/uc?export=download&id={fileId} format
  const downloadMatch = url.match(/drive\.google\.com\/uc\?export=download&id=([^&]+)/);
  if (downloadMatch) {
    const fileId = downloadMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // Return as-is if already a preview URL or unrecognized format
  return url;
};

export const Wizard = ({ slides, initialSlide = 0, onFinish, onSkip, vin, flowType = 'detailed_track', onSlideChange }: WizardProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [history, setHistory] = useState<number[]>([initialSlide]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);

  // Save progress whenever currentSlide changes
  useEffect(() => {
    if (vin) {
      const totalForStorage = flowType === 'detailed_track' ? Math.max(slides.length - 1, 1) : slides.length;
      saveProgress(vin, currentSlide, totalForStorage, flowType);
    }
    if (onSlideChange) {
      onSlideChange(currentSlide, slides.length);
    }
  }, [currentSlide, vin, slides.length, flowType, onSlideChange]);

  const handleAnswer = (nextSlide: number) => {
    if (nextSlide === -1) {
      if (onFinish) {
        onFinish();
      }
      return;
    }
    setDirection('forward');
    setIsAnimating(true);
    setHistory([...history, nextSlide]);
    setCurrentSlide(nextSlide);
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setDirection('backward');
      setIsAnimating(true);
      const newHistory = [...history];
      newHistory.pop();
      const previousSlide = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentSlide(previousSlide);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }
  };

  const slide = slides[currentSlide];

  if (!slide) {
    return null;
  }

  const canGoBack = history.length > 1;

  return (
    <div className="tw-bg-flex-security-black tw-w-full tw-flex tw-justify-start tw-flex-col tw-gap-20px tw-overflow-y-auto tw-overflow-x-hidden tw-font-primary tw-text-white">
      <div
        key={`step-${currentSlide}`}
        className={`tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 ${isAnimating
          ? direction === 'forward'
            ? 'tw-translate-x-[-100%] tw-opacity-0'
            : 'tw-translate-x-[100%] tw-opacity-0'
          : 'tw-translate-x-0 tw-opacity-100'
          }`}
      >
        <Step text={slide.text} />
      </div>
      <div
        key={`desc-${currentSlide}`}
        className={`tw-font-primary tw-text-white tw-font-thin tw-text-center tw-transition-all tw-duration-300 ${isAnimating
          ? direction === 'forward'
            ? 'tw-translate-x-[-100%] tw-opacity-0'
            : 'tw-translate-x-[100%] tw-opacity-0'
          : 'tw-translate-x-0 tw-opacity-100'
          } ${!slide.description ? 'tw-h-0 tw-overflow-hidden' : ''}`}
      >
        {slide.description}
      </div>
      <div
        key={`answers-${currentSlide}`}
        className={`tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-transition-all tw-duration-300 ${isAnimating
          ? direction === 'forward'
            ? 'tw-translate-x-[-100%] tw-opacity-0'
            : 'tw-translate-x-[100%] tw-opacity-0'
          : 'tw-translate-x-0 tw-opacity-100'
          }`}
      >
        {slide.answers.map((answer, index) => (
          <Button
            key={index}
            label={answer.label}
            minWidth
            onClick={() => handleAnswer(answer.nextSlide)}
          />
        ))}
        {slide.skipButton?.show && onSkip && slide.skipButton.target && (
          <Button
            label={slide.skipButton.label}
            minWidth
            onClick={() => onSkip(slide.skipButton!.target)}
          />
        )}
      </div>
      <div
        key={`media-${currentSlide}`}
        className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-px-4 tw-transition-all tw-duration-300 ${isAnimating
          ? direction === 'forward'
            ? 'tw-translate-x-[-100%] tw-opacity-0'
            : 'tw-translate-x-[100%] tw-opacity-0'
          : 'tw-translate-x-0 tw-opacity-100'
          } ${!slide.media || slide.media.length === 0 ? 'tw-h-0 tw-overflow-hidden' : ''}`}
      >
        {slide.media && slide.media.map((mediaItem, index) => {
          if ('image' in mediaItem) {
            return (
              <img
                key={index}
                src={mediaItem.image}
                alt=""
                className="tw-max-w-full tw-max-h-[300px] tw-object-contain"
              />
            );
          }
          if ('youtube' in mediaItem) {
            const embedUrl = convertYouTubeUrl(mediaItem.youtube);
            return (
              <iframe
                key={index}
                src={embedUrl}
                title={`YouTube video ${index + 1}`}
                className="tw-w-full tw-max-w-[560px] tw-aspect-video tw-border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }
          if ('googleDrive' in mediaItem) {
            const embedUrl = convertGoogleDriveUrl(mediaItem.googleDrive);
            console.log('Google Drive embed URL:', embedUrl);
            return (
              <iframe
                key={`${currentSlide}-${index}-${embedUrl}`}
                src={embedUrl}
                title={`Google Drive video ${index + 1}`}
                className="tw-w-full tw-max-w-[560px] tw-aspect-video tw-border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }
          return null;
        })}
      </div>
      <div
        key={`custom-${currentSlide}`}
        className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-transition-all tw-duration-300 ${isAnimating
          ? direction === 'forward'
            ? 'tw-translate-x-[-100%] tw-opacity-0'
            : 'tw-translate-x-[100%] tw-opacity-0'
          : 'tw-translate-x-0 tw-opacity-100'
          } ${!slide.customContent ? 'tw-h-0 tw-overflow-hidden' : ''}`}
      >
        {slide.customContent}
      </div>
      {canGoBack && (
        <div className="tw-flex tw-justify-center">
          <Button label="Back" onClick={handleBack} />
        </div>
      )}
    </div>
  );
};
