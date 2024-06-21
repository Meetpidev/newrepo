import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "./UploadVideo.css";
import { uploadVideo } from "../../actions/Video.js";

function UploadVideo({setvideoUploadPage}) {
    
    const [title,settitle] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const [progress, setProgress] = useState(0);

    const CurrentUser = useSelector(state=>state?.currentUserReducer)

    const dispatch = useDispatch();

    let handleFile = (e) => {
        setVideoFile(e.target.files[0]);
    }

    let FileOptions = () => {
            onUploadProgress: (progressEvent) => {
            const { loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded/1000)*100)/(total/100))
            setProgress(percentage);
            if(percentage===100)
              {
                setTimeout(function(){},3000)
                setvideoUploadPage(false)
              }
          }

    }
    

    let handleUploadVideo = () => {
        if(!title){
            alert("Enter Title");
        }
        else if(!videoFile){
            alert("Upload Video");
        }
        else if(videoFile.size > 100000000000){
            alert("Please Upload Video Les Then 1Tb Size");
        }
        else{
            const fileData = new FormData();
            fileData.append("file", videoFile);
            fileData.append("title", title);
            fileData.append("chanel", CurrentUser?.result._id);
            fileData.append("Uploader", CurrentUser?.result.name);
            console.log("videoFiles:",videoFile)
            dispatch(uploadVideo({
                fileData: fileData, 
                fileOptions: FileOptions
            }))
            alert("Video Uploaded Successfully");
            setvideoUploadPage(false);
        }
    }

  return (
    <>
        <div className="container_VidUpload">
      <input
        type="submit"
        name="text"
        value={"X"}
        className="ibtn_x"
        onClick={() => setvideoUploadPage(false)}
      />

      <div className="container_VidUpload2">
        <div className="ibox_div_vidupload">
          <input
           onChange={(e) => {settitle(e.target.value)}}
            type="text"
            className="ibox_vidupload"
            maxLength={100}
            placeholder="Enter Title of your video"
          />
          <label htmlFor="file" className="ibox_vidupload btn_vidUpload">
            <input
              type="file"
              name="file"
              className="ibox_vidupload"
              style={{ fontSize: "1rem" }}
              onChange={(e) => {handleFile(e)}}
            />
          </label>
        </div>

        <div className="ibox_div_vidupload">
          <input
            type="submit"
            value="Upload"
            className="ibox_vidupload btn_vidUpload"
            onClick={()=>{handleUploadVideo()}}
          />
        </div>
        
        <div className="loader ibox_div_vidupload">
          <CircularProgressbar
          value={progress}
          text={`${progress}`}
          styles={buildStyles(
            {
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "20px",
              pathTransitionDuration: 0.5,
              pathColor:`rgba(255,255,255,${progress/100})`,
              textColor: "#f88",
              trailColor: "#adff2f",
              backgroundColor: "#3e98c7",
            }
          )}>

          </CircularProgressbar>
        </div>
      
      </div>
    </div>
    
    </>
  )
}

export default UploadVideo