'use client';

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/auth`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
}

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload