'use client';

import config from '@/lib/config'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import React from 'react'

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint}>
    <IKVideo path={videoUrl} controls={true} loop={true} />

  </ImageKitProvider>
}

export default BookVideo