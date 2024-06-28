import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoints } from "../../actions/points.js";
import { useParams, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import JSConfetti from 'js-confetti';
import "./VideoPlayer.css";


const VideoPlayer = ({ videoSrc, showLocation }) => {
  const dispatch = useDispatch();
  const jsConfetti = new JSConfetti();
  const { vid } = useParams();
  const points = useSelector(state => state.pointsReducer.points);
  const currentUser = useSelector(state => state.currentUserReducer);


  const videos = useSelector(state => state.videoReducer);
  console.log("Videos:",videos)

  const userId = currentUser?.result?._id;

  const videoRef = useRef(null);

  const [Points, setPoints] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showForwardIcon, setShowForwardIcon] = useState(false);
  const [showBackwardIcon, setShowBackwardIcon] = useState(false);

  const handleVideoComplete = () => {
    if (!videoCompleted && userId) {
      setVideoCompleted(true);
      setPoints(points + 5);
      dispatch(addPoints(userId));
      alert("You Earn Five Points For Complete The Video.");
    }
  };

  let handleVideoEndedAnimation = () => {
    currentUser && jsConfetti.addConfetti();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEndedAnimation);

      videoRef.current.addEventListener('fullscreenchange', handleFullScreenChange);
      videoRef.current.addEventListener('webkitfullscreenchange', handleFullScreenChange);
      videoRef.current.addEventListener('mozfullscreenchange', handleFullScreenChange);
      videoRef.current.addEventListener('msfullscreenchange', handleFullScreenChange);
    }
    setPoints(points);

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('fullscreenchange', handleFullScreenChange);
        videoRef.current.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
        videoRef.current.removeEventListener('mozfullscreenchange', handleFullScreenChange);
        videoRef.current.removeEventListener('msfullscreenchange', handleFullScreenChange);
      }
    };
  }, [videoRef]);


  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTap = (e) => {
    const video = videoRef.current;
    const { clientX, clientY } = e.nativeEvent;
    const videoRect = video.getBoundingClientRect();
    const videoWidth = videoRect.width;
    const videoHeight = videoRect.height;
    const videoLeft = videoRect.left;
    const videoTop = videoRect.top;

    const singleTap = () => {
      if (
        clientX > videoLeft + videoWidth / 3 &&
        clientX < videoLeft + (videoWidth / 3) * 2 &&
        clientY > videoTop + videoHeight / 3 &&
        clientY < videoTop + (videoHeight / 3) * 2
      ) {
        handlePlayPause();
      }
      if (
        clientX > videoLeft + (videoWidth / 3) * 2 &&
        clientY < videoTop + videoHeight / 3
      ) {
        showLocation();
      }
    };

    if (e.detail === 2) {
      e.preventDefault();
      if (clientX > videoLeft + videoWidth / 2) {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        setShowForwardIcon(true);
        setTimeout(() => setShowForwardIcon(false), 1000);
      } else {
        video.currentTime = Math.max(0, video.currentTime - 10);
        setShowBackwardIcon(true);
        setTimeout(() => setShowBackwardIcon(false), 1000);
      }
    } else if (e.detail === 3) {
  
      if (clientX > videoLeft + (videoWidth / 3) * 2) {
       window.close();
      } else if (
        clientX < videoLeft + videoWidth / 3 &&
        clientY < videoTop + videoHeight / 3
      ) {
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          alert("There are no comments.");
        }
      }
    } else {
      singleTap();
    }
  };

  const handleHold = (e, isRight) => {
    const video = videoRef.current;
    if (isRight) {
      video.playbackRate = 2.0;
    } else {
      video.playbackRate = 0.5;
    }
  };

  const handleMouseUp = () => {
    const video = videoRef.current;
    video.playbackRate = 1.0;
  };

  const handleFullScreenChange = (e) => {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      document.exitFullscreen && document.exitFullscreen();
      document.webkitExitFullscreen && document.webkitExitFullscreen();
      document.mozCancelFullScreen && document.mozCancelFullScreen();
      document.msExitFullscreen && document.msExitFullscreen();
    }
  };

  return (
    <>
      <div className="video-containerss">
        <video
          ref={videoRef}
          onMouseDown={(e) =>
            handleHold(
              e,
              e.clientX > videoRef.current.getBoundingClientRect().left + 847 / 2
            )
          }
          onMouseUp={handleMouseUp}
          onTouchStart={(e) =>
            handleHold(
              e,
              e.touches[0].clientX > videoRef.current.getBoundingClientRect().left + 847 / 2
            )
          }
          onTouchEnd={handleMouseUp}
          onEnded={() => { handleVideoComplete(), handleVideoEndedAnimation() }}
          controls
          src={videoSrc}
          width="847"
          height="488"
          onClick={handleTap}
          className='vvido'
        ></video>

        <button className="play-pause-btn" onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>

        {showForwardIcon && <FontAwesomeIcon icon={faForward} className="overlay-icon forward-icon" />}
        {showBackwardIcon && <FontAwesomeIcon icon={faBackward} className="overlay-icon backward-icon" />}
      </div>
    </>
  );
};

export default VideoPlayer;
