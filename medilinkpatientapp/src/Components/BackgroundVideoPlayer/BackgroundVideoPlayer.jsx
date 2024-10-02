import React from 'react'
import ReactPlayer from 'react-player'

const BackgroundVideoPlayer = ({ data }) => {
  return (
    <div id="bgndVideo" className="player">
      <ReactPlayer 
        url={`videoURL:${data}`}
        playing={true}
        loop={true}
        muted={true} />
    </div>
  )
}

export default BackgroundVideoPlayer
