import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useVideoPlayer } from 'expo-video';

export const useTrailerPlayerViewModel = (url: string) => {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(url, (p) => {
    p.loop = true;
  });

  React.useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused, player]);

  return { player };
};
