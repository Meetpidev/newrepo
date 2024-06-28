import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home.jsx";
import Librery from "../pages/Librery/Librery.jsx";
import LikedVideos from "../pages/LikedVideos/LikedVideos.jsx";
import WatchLater from "../pages/WatchLater/WatchLater.jsx";
import YourVideos from "../pages/YourVideos/YourVideos.jsx";
import History from "../pages/History/History.jsx";
import PlayList from "../pages/PlayList/PlayList.jsx";
import VideoPage from "../pages/VideoPage/VideoPage.jsx";
import Chanel from "../pages/Chanel/Chanel.jsx";
import Search from "../pages/search/search.jsx";
import Lobby from "../pages/Screens/Lobby.jsx";
import Room from "../pages/Screens/Room.jsx";
import VideoRecord from "../pages/VideoRecord/VideoRecord.jsx";
import "./AllRouts.css";
import Callstream from "../pages/Screens/callstream.jsx";
// import ScaleLoader from "react-spinners/ScaleLoader";
// import { useState, useEffect } from 'react';

export default function AllRoutes({ setCreatchanel, setvideoUploadPage }) {
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);
    // }, []);

    // const color = "#123abc"; // Define the color variable

    return (
        <>
            {/* {loading ? (
                <ScaleLoader
                    color={color}
                    loading={loading}
                    className="loaders"
                />
            ) : ( */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/librery" element={<Librery />} />
                    <Route path="/like" element={<LikedVideos />} />
                    <Route path="/watchlater" element={<WatchLater />} />
                    <Route path="/yourvideos" element={<YourVideos />} />
                    <Route path="/feed/history" element={<History />} />
                    <Route path="/feed/playlist" element={<PlayList />} />
                    <Route path="/videopage/:vid" element={<VideoPage />} />
                    <Route path="/chanel/:cid" element={<Chanel setCreatchanel={setCreatchanel} setvideoUploadPage={setvideoUploadPage} />} />
                    <Route path="/search/:searchQuery" element={<Search />} />
                    <Route path="/meeting" element={<Lobby />} />
                    <Route path="/meeting2" element={<Callstream />} />
                    <Route path="/room/:id" element={<Room />} />
                    <Route path="/record" element={<VideoRecord />} />
                </Routes>
        </>
    );
}
