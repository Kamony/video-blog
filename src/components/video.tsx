import * as React from "react"

const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div
    className="video"
    style={{
      position: "relative",
      paddingBottom: "56.25%" /* 16:9 */,
      paddingTop: 25,
      height: 0,
    }}
  >
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  </div>
)
export default Video
