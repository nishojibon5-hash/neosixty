import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, 
  ExternalLink, 
  Eye, 
  Clock,
  Play,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import { AdCampaign } from '@shared/types';

interface AdDisplayProps {
  ad: AdCampaign;
  contentType: 'video' | 'image' | 'story' | 'text';
  onAdView: () => void;
  onAdClick: () => void;
  onAdClose?: () => void;
  autoPlay?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function AdDisplay({ 
  ad, 
  contentType, 
  onAdView, 
  onAdClick, 
  onAdClose,
  autoPlay = false,
  showCloseButton = true,
  className = ""
}: AdDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(5); // 5 second skip timer
  const [canSkip, setCanSkip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Record ad view when component mounts
    onAdView();

    // Start countdown for skippable ads
    if (contentType === 'video' && ad.videoUrl) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanSkip(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // For non-video ads, allow immediate skip
      setCanSkip(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onAdClose?.();
  };

  const handleAdClick = () => {
    onAdClick();
    // Open target URL in new tab
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  // Video Ad Component
  if (contentType === 'video' && ad.videoUrl) {
    return (
      <Card className={`relative overflow-hidden bg-black ${className}`}>
        <div className="relative aspect-video">
          <video
            className="w-full h-full object-cover"
            autoPlay={isPlaying}
            muted={isMuted}
            loop
            playsInline
          >
            <source src={ad.videoUrl} type="video/mp4" />
          </video>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="bg-black/60 text-white">
                  <Eye className="h-3 w-3 mr-1" />
                  বিজ্ঞাপন
                </Badge>
                
                {showCloseButton && canSkip && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClose}
                    className="bg-black/60 hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                {!canSkip && (
                  <Badge variant="secondary" className="bg-black/60 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {countdown}s
                  </Badge>
                )}
              </div>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="bg-black/60 hover:bg-black/80 rounded-full w-16 h-16"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAdClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  আরও জানুন
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Info */}
        <CardContent className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{ad.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{ad.description}</p>
            </div>
            <Button 
              onClick={handleAdClick}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              ভিজিট করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Image/Banner Ad Component
  return (
    <Card className={`relative overflow-hidden cursor-pointer group ${className}`}>
      <div className="relative" onClick={handleAdClick}>
        {/* Close Button */}
        {showCloseButton && (
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Ad Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 z-10 bg-black/60 text-white"
        >
          <Eye className="h-3 w-3 mr-1" />
          বিজ্ঞাপন
        </Badge>

        {/* Ad Image */}
        {ad.imageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        )}

        {/* Ad Content */}
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
              {ad.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {ad.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {ad.advertiserName}
              </span>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-3 w-3 mr-1" />
                ভিজিট করুন
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Inline Ad Component for Posts/Stories
interface InlineAdProps {
  ads: AdCampaign[];
  onAdInteraction: (adId: string, type: 'view' | 'click') => void;
}

export function InlineAd({ ads, onAdInteraction }: InlineAdProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    // Rotate ads every 30 seconds
    const interval = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % ads.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads.length) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <div className="my-4">
      <AdDisplay
        ad={currentAd}
        contentType="image"
        onAdView={() => onAdInteraction(currentAd.id, 'view')}
        onAdClick={() => onAdInteraction(currentAd.id, 'click')}
        showCloseButton={false}
        className="border-l-4 border-blue-500"
      />
    </div>
  );
}

// Story Ad Component
interface StoryAdProps {
  ad: AdCampaign;
  onAdInteraction: (adId: string, type: 'view' | 'click') => void;
  onNext: () => void;
}

export function StoryAd({ ad, onAdInteraction, onNext }: StoryAdProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Record view
    onAdInteraction(ad.id, 'view');

    // Auto-advance after 7 seconds
    const duration = 7000; // 7 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onNext, 100);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ad Badge */}
      <Badge 
        variant="secondary" 
        className="absolute top-4 left-4 bg-black/60 text-white"
      >
        <Eye className="h-3 w-3 mr-1" />
        বিজ্ঞাপন
      </Badge>

      {/* Skip Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={onNext}
        className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white"
      >
        এড়িয়ে যান
      </Button>

      {/* Ad Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
        {ad.imageUrl && (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-32 h-32 object-cover rounded-lg mb-6"
          />
        )}
        
        <h2 className="text-2xl font-bold mb-4">{ad.title}</h2>
        <p className="text-lg mb-6 opacity-90">{ad.description}</p>
        
        <Button
          onClick={() => {
            onAdInteraction(ad.id, 'click');
            if (ad.targetUrl) {
              window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
            }
          }}
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          আরও জানুন
        </Button>
      </div>
    </div>
  );
}
