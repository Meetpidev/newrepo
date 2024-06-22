// import videoFiles from "../moduls/videoFiles.js";

// export const uploadvideo = async(req,res) => {

//     if( !req.file ) 
//     {
//         res.status(404).json({message:"Please Upload '.mp4 Video File Only"})
//     }
//     else{
        
//         try{ 
//             const file = new videoFiles({
//                 videoTitle: req.body.title,
//                 fileName: req.file.originalname,
//                 filePath: req.file.path,
//                 fileType: req.file.mimetype,
//                 fileSize: req.file.size,
//                 videoChanel: req.body.chanel,
//                 Uploader: req.body.Uploader,
//             })
            
//             await file.save();
//             { console.log("Uploader:",videoFiles.Uploader)}
            
//             res.status(200).send("Video Uploaded Successfully");
//         }
//         catch(error){
//             console.log(error);
//             res.status(400).send(error.message);
//         }
//     }

// }

// export const getAllvideos = async (req, res)=>{
//     try {
//       const files= await videoFiles.find();
//       res.status(200).send(files)
//     } catch (error) {
//       res.status(404).send(error.message)
//     }
//   }

import videoFiles from "../moduls/videoFiles.js";
import cloudinary from 'cloudinary';

export const uploadvideo = async (req, res) => {
    if (req.file === undefined) {
        return res.status(404).json({ message: "Please Upload '.mp4 Video File Only" });
    } else {
        try {
            const result = await cloudinary.v2.uploader.upload_stream(
                { resource_type: "video" },
                async (error, result) => {
                    if (error) {
                        return res.status(400).send(error.message);
                    }

                    const file = new videoFiles({
                        videoTitle: req.body.title,
                        fileName: req.file.originalname,
                        filePath: result.secure_url, // Cloudinary URL
                        fileType: req.file.mimetype,
                        fileSize: req.file.size,
                        videoChanel: req.body.chanel,
                        Uploader: req.body.Uploader,
                    });

                    await file.save();
                    res.status(200).send("Video Uploaded Successfully");
                }
            );

            // Create a buffer stream to upload the video
            const bufferStream = require('stream').PassThrough();
            bufferStream.end(req.file.buffer);
            bufferStream.pipe(result);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export const getAllvideos = async (req, res) => {
    try {
        const files = await videoFiles.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }
}