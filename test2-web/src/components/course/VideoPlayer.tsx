"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration } from "@/lib/utils";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

export default function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full bg-black aspect-video rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            muted={isMuted}
            playsinline
            pip
            light={thumbnailUrl}
            onProgress={handleProgress}
            onDuration={handleDuration}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
                },
              },
            }}
          />
        </motion.div>
      )}
      <div className="absolute bottom-4 left-4 text-xs bg-background/70 backdrop-blur-sm px-2 py-1 rounded-md text-foreground">
        {isLoading ? "Loading..." : `${formatDuration(played * duration)} / ${formatDuration(duration)}`}
      </div>
    </div>
  );
} 