import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      width={'100%'}
      height={'100%'}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
)
export default Video
