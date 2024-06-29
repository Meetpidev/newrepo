import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllchanel } from './actions/ChanelUser.js';
import { getAllvideos } from './actions/Video.js';
import { AlllikeVideo } from './actions/likeVideo.js';
import { addPoints } from './actions/points.js';
import { getAllwatchLater } from './actions/watchLater.js';
import { getAllHistory } from './actions/History.js';
import { getAllComment } from './actions/comments.js';
import Nav from './components/navbar/nav.jsx';
import DrawerSidebar from './components/leftSidebar/drawerSidebar.jsx';
import AllRoutes from './components/AllRoutes.jsx';
import CreateChennel from './pages/Chanel/CreateChennel.jsx';
// import ScaleLoader from "react-spinners/ScaleLoader";
import "./App.css";


import UploadVideo from './pages/UploadVideo/UploadVideo.jsx';
function App() {

  const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            dispatch(fetchAllchanel()),
            dispatch(getAllvideos()),
            dispatch(AlllikeVideo()),
            dispatch(getAllwatchLater()),
            dispatch(getAllHistory()),
            dispatch(getAllComment()),
            dispatch(addPoints())
        ]).then(() => {
            setTimeout(()=>{
              setLoading(false);
            },7000)
        }).catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); 
        });
    }, [dispatch]);

    const [togglebar, settogglebar] = useState({ display: "none" });

    const toggleDrawer = () => {
        if (togglebar.display === "none") {
            settogglebar({ display: "flex" });
        } else {
            settogglebar({ display: "none" });
        }
    }

    // let note = () => {
    //     alert("Please give the meaningful title of your video and your channel. Don't give it a random name.");
    // }

    const [Creatchanel, setCreatchanel] = useState(false);
    const [videoUploadPage, setvideoUploadPage] = useState(false);

    // if (loading) {
    //     return (
    //         <div className="loader-container">
    //             <ScaleLoader className="loaders1" color={'#36D7B7'} loading={true} height={100} width={10} radius={2} margin={6} />
    //         </div>
    //     );
    // }
    // else{

    return (
        <>
        <div className="content-home">
            <Router>
                {
                    videoUploadPage && <UploadVideo setvideoUploadPage={setvideoUploadPage}></UploadVideo>
                }
                { Creatchanel && <CreateChennel setCreatchanel={setCreatchanel}></CreateChennel> }
                <Nav toggleDrawer={toggleDrawer} setCreatchanel={setCreatchanel}></Nav>
                <DrawerSidebar toggleDrawer={toggleDrawer} totoggleDrawerStyle={togglebar}></DrawerSidebar>
                <AllRoutes setCreatchanel={setCreatchanel} setvideoUploadPage={setvideoUploadPage}></AllRoutes>
            </Router>
            </div>
        </>
    );
// }
}

export default App
