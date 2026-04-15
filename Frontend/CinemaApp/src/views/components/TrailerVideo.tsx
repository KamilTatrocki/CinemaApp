import React from 'react';
import { VideoView } from 'expo-video';
import { useTrailerPlayerViewModel } from '../../viewmodels/useTrailerPlayerViewModel';

interface TrailerVideoProps {
  url: string;
}

export const TrailerVideo = ({ url }: TrailerVideoProps) => {
  const { player } = useTrailerPlayerViewModel(url);

  return (
    <VideoView
      style={{ width: '100%', height: '100%' }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      contentFit="contain"
    />
  );
};
