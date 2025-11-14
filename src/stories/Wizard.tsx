import React, { useState } from 'react';
import { Button } from './Button';
import { Step } from './Step';

export interface WizardAnswer {
  label: string;
  nextSlide: number;
}

export type MediaItem =
  | { image: string }
  | { youtube: string };

export interface WizardSlideConfig {
  text: string;
  answers: WizardAnswer[];
  media?: MediaItem[];
}

export interface WizardProps {
  slides: WizardSlideConfig[];
  initialSlide?: number;
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

export const Wizard: React.FC<WizardProps> = ({ slides, initialSlide = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [history, setHistory] = useState<number[]>([initialSlide]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (nextSlide: number) => {
    setDirection('forward');
    setIsAnimating(true);
    setTimeout(() => {
      setHistory([...history, nextSlide]);
      setCurrentSlide(nextSlide);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setDirection('backward');
      setIsAnimating(true);
      setTimeout(() => {
        const newHistory = [...history];
        newHistory.pop();
        const previousSlide = newHistory[newHistory.length - 1];
        setHistory(newHistory);
        setCurrentSlide(previousSlide);
        setIsAnimating(false);
      }, 300);
    }
  };

  const slide = slides[currentSlide];

  if (!slide) {
    return null;
  }

  const canGoBack = history.length > 1;

  return (
    <div className="tw-bg-flex-security-black tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center tw-flex-col tw-gap-20px tw-overflow-hidden">
      <div
        className={`tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 ${
          isAnimating
            ? direction === 'forward'
              ? 'tw-translate-x-[-100%] tw-opacity-0'
              : 'tw-translate-x-[100%] tw-opacity-0'
            : 'tw-translate-x-0 tw-opacity-100'
        }`}
      >
        <Step text={slide.text} />
      </div>
      <div
        className={`tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-transition-all tw-duration-300 ${
          isAnimating
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
      </div>
      {slide.media && slide.media.length > 0 && (
        <div
          className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-transition-all tw-duration-300 ${
            isAnimating
              ? direction === 'forward'
                ? 'tw-translate-x-[-100%] tw-opacity-0'
                : 'tw-translate-x-[100%] tw-opacity-0'
              : 'tw-translate-x-0 tw-opacity-100'
          }`}
        >
          {slide.media.map((mediaItem, index) => {
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
                  className="tw-w-full tw-max-w-[560px] tw-aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {canGoBack && (
        <div className="tw-flex tw-justify-center">
          <Button label="Back" onClick={handleBack} />
        </div>
      )}
    </div>
  );
};
