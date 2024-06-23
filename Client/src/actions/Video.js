import * as api from "../api";

// export const uploadVideo = (videoData) => async (dispatch) => {
//   try {
//     const { fileData, fileOptions } = videoData;
//     const {data}= await api.uploadVideo(fileData, fileOptions)
//     dispatch({type:'POST_VIDEO',data})
//     dispatch(getAllvideos())
//   } catch (error) {
//     alert(error.response.data.message)
//   }

// };

export const uploadVideo = (fileData, onUploadProgress) => async (dispatch) => {
  try {
    const { data } = await api.uploadVideo(fileData, { onUploadProgress });
    console.log("Data:",data)
    dispatch({ type: 'POST_VIDEO', data });
    dispatch(getAllvideos());
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getAllvideos = () => async (dispatch) =>{
    try {
      const {data}= await api.getVideos();
      dispatch({type:'FETCH_ALL_VIDEOS',payload:data})
    } catch (error) {
        console.log(error)
    }
  }

export const likeVideo=(LikeDate)=>async(dispatch)=>{
    try {
      const {id,Like}=LikeDate;
      console.log("Id:",id);
      console.log("Like:",Like);
      const {data}= await api.LikeVideo(id,Like);
      console.log(data);
      dispatch({type:"POST_LIKE",payload:data});
      dispatch(getAllvideos());
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  export const viewVideo=(ViewDate)=>async(dispatch)=>{
    try {
      const {id}=ViewDate;
      console.log(id)
      const {data}= await api.viewsVideo(id)
      dispatch({type:'POST_VIEWS',data})
      dispatch(getAllvideos())
    } catch (error) {
      console.log(error)
    }
  }  