import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { addPoints } from "../../actions/points.js";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import JSConfetti from 'js-confetti'
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
// import FastForwardIcon from '@mui/icons-material/FastForward';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
import "./VideoPlayer.css";


 const VideoPlayer = ({ videoSrc, showLocation })  => {

  const dispatch = useDispatch();
  const jsConfetti = new JSConfetti();
  const { vid } = useParams();
  const points = useSelector(state => state.pointsReducer.points);
  const currentUser = useSelector(state => state.currentUserReducer);

  const userId = currentUser?.result?._id;

  const videoRef = useRef(null);
  // const overlayRef = useRef(null);

  // useEffect(() => {
  //   const preventFullScreen = (event) => {
  //     if (document.fullscreenElement) {
  //       document.exitFullscreen();
  //     }
  //   };

  //   document.addEventListener('fullscreenchange', preventFullScreen);

  //   return () => {
  //     document.removeEventListener('fullscreenchange', preventFullScreen);
  //   };
  // }, []);

 
  // const [tapCount, setTapCount] = useState(0);
  // const [tapTimeout, setTapTimeout] = useState(null);
  // const [is2XSpeed, setIs2XSpeed] = useState(false);
  // const [tapIndicator, setTapIndicator] = useState({ show: false, x: 0, y: 0 });
  // const [isPaused, setIsPaused] = useState(false);
  // const [showForwardIcon, setShowForwardIcon] = useState(false);
  // const [showBackwardIcon, setShowBackwardIcon] = useState(false);

  const [Points,setPoints] = useState(0);
 const [videoCompleted, setVideoCompleted] = useState(false);
//  const [showPopup, setShowPopup] = useState(false);
//   const [popupContent, setPopupContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleVideoComplete = () => {
    if (!videoCompleted && userId) {
      setVideoCompleted(true);
      setPoints(points+5);
      dispatch(addPoints(userId));
      alert("You Earn Five Points For Complete The Video.");
    }
  };

  let handleVideoEndedAnimation = () => {
   currentUser && jsConfetti.addConfetti();
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEndedAnimation);
    }
  }, [videoRef]);

  const handleTap = (e) => {
    const video = videoRef.current;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const singleTap = () => {
      // Single tap in the middle to pause/play
      if (clientX > innerWidth / 3 && clientX < (innerWidth / 3) * 2) {
        if (clientY > innerHeight / 3 && clientY < (innerHeight / 3) * 2) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      }
      // Single tap on top right corner to show location and temperature
      if (clientX > (innerWidth / 3) * 2 && clientY < innerHeight / 3) {
        // setPopupContent('Current location and temperature...');
        // setShowPopup(true);
        showLocation();
        // setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      }
    };

    if (e.detail === 2) {
      // Double tap handling
      if (clientX > innerWidth / 2) {
        video.currentTime = Math.min(video.duration, video.currentTime + 10); // Forward
      } else {
        video.currentTime = Math.max(0, video.currentTime - 10); // Backward
      }
    } else if (e.detail === 3) {
      // Triple tap handling
      if (clientX > innerWidth / 2) {
        window.close(); // Close website
      } else if (clientX < innerWidth / 2) {
        setShowComments((prevShowComments) => !prevShowComments); // Toggle comment section
      }
    } else {
      // Single tap
      singleTap();
    }
  };

  const handleHold = (e, isRight) => {
    const video = videoRef.current;
    if (isRight) {
      video.playbackRate = 2.0; // 2X speed
    } else {
      video.playbackRate = 0.5; // 0.5X speed
    }
  };

  const handleMouseUp = () => {
    const video = videoRef.current;
    video.playbackRate = 1.0; // Reset to normal speed
  };

  // const handleTap = (event) => {
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;

  //   clearTimeout(tapTimeout);

  //   setTapIndicator({ show: true, x, y });
  //   setTimeout(() => setTapIndicator({ show: false, x: 0, y: 0 }), 300);

  //   setTapCount((prevCount) => prevCount + 1);

  //   const newTimeout = setTimeout(() => {
  //     if (tapCount === 1) {
  //       handleSingleTap(x, y);
  //     } else if (tapCount === 2) {
  //       handleDoubleTap(x);
  //     } else if (tapCount === 3) {
  //       handleTripleTap(x, y);
  //     }
  //     setTapCount(0);
  //   }, 300);

  //   setTapTimeout(newTimeout);
  // };

  // const handleSingleTap = (x, y) => {
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   if (x > rect.width * 0.75 && y < rect.height * 0.25) {
  //     showLocation();
  //   } else {
  //     if (videoRef.current.paused) {
  //       videoRef.current.play();
  //       setIsPaused(false);
  //     } else {
  //       videoRef.current.pause();
  //       setIsPaused(true);
  //     }
  //   }
  // };

  // const handleDoubleTap = (x) => {
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   if (x < rect.width / 2) {
  //     videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  //     setShowBackwardIcon(true);
  //     setTimeout(() => setShowBackwardIcon(false), 500);
  //   } else {
  //     videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
  //     setShowForwardIcon(true);
  //     setTimeout(() => setShowForwardIcon(false), 500);
  //   }
  // };

  // const handleTripleTap = (x, y) => {
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   if (x < rect.width / 2) {
  //     showComments();
  //   } else if (x > rect.width * 0.75) {
  //     closeWebsite();
  //   } else {
  //     nextVideo();
  //   }
  // };

  // const handleHold = (event) => {
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;

  //   if (x < rect.width / 2) {
  //     videoRef.current.playbackRate = 0.5;
  //   } else {
  //     videoRef.current.playbackRate = 2.0;
  //   }

  //   setIs2XSpeed(true);
  // };

  // const handleRelease = () => {
  //   videoRef.current.playbackRate = 1.0;
  //   setIs2XSpeed(false);
  // };

  return (
    <>
         <div className="video-container" onClick={handleTap}>
      <video
        ref={videoRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => handleHold(e, e.clientX > window.innerWidth / 2)}
        onMouseUp={handleMouseUp}
        onTouchStart={(e) => handleHold(e, e.touches[0].clientX > window.innerWidth / 2)}
        onTouchEnd={handleMouseUp}
        onEnded={()=>{handleVideoComplete(),handleVideoEndedAnimation()}}
        controls
        src={videoSrc}
        className='vvido'
      ></video>
      {/* {showPopup && <div className="popup">{popupContent}</div>} */}
      {showComments && (
        <div className="comments-section">
          <h2>Comments</h2>
          <p>This is the comment section. You can add your comments here.</p>
          {/* Add more comment elements here */}
        </div>
      )}
    </div>
    </>
    // <div className="video-container" >

    //   <video 
    //   ref={videoRef} 
    //   src={videoSrc} 
    //   onEnded={()=>{handleVideoComplete(),handleVideoEndedAnimation()}}
    //   className='vvido' 
    //   controls 
    //   autoPlay/>

    
    //   <div
    //     className="overlay"
    //     ref={overlayRef}
    //     onClick={handleTap}
    //     onMouseDown={handleHold}
    //     onMouseUp={handleRelease}
    //   ></div>
       

    //   {is2XSpeed && <div className="speed-indicator">2X Speed</div>}

    //   {isPaused && (
    //     <div className="icon-indicator pause-icon">
    //       <PlayArrowIcon fontSize="large" />
    //     </div>
    //   )}
    //   {!isPaused && (
    //     <div className="icon-indicator play-icon">
    //       <PauseIcon fontSize="large" />
    //     </div>
    //   )}
    //   {showForwardIcon && (
    //     <div className="icon-indicator forward-icon">
    //       <FastForwardIcon fontSize="large" />
    //     </div>
    //   )}
    //   {showBackwardIcon && (
    //     <div className="icon-indicator backward-icon">
    //       <FastRewindIcon fontSize="large" />
    //     </div>
    //   )}
    // </div>
  );
};

export default VideoPlayer;