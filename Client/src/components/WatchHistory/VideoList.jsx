import ShowWatchhistory from "../ShowWatchHistory/ShowWatchhistory"
import PropTypes from 'prop-types';


function VideoLis({page,VideoList,CurrentUser}) {

console.log(VideoList?.data);

  return (
    <>
    {
      CurrentUser ? (
        <>
       {
        VideoList?.data?.map(m=>{
          return(
            <> 
              <ShowWatchhistory videoId={m?.videoId} key={m._id}></ShowWatchhistory>
            </>
          )
        })
       }
        </>
    ) : (
        <>
          <h2 style={{color:"white", paddingTop:"2rem"}}>Plz Login To Watch Your {page} </h2>
        </>
    )
    }
       
    </>
  )
}


VideoLis.propTypes = {
  VideoList: PropTypes.array.isRequired,
};


VideoLis.defaultProps = {
  VideoList: [],
};

export default VideoLis