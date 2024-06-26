"use strict";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
      );
    },
  });

const filefilter=(req,file,cb)=>{
    if(file.mimetype === "video/mp4"){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({ storage,filefilter });

export default upload;




// "use strict";
// import multer from "multer";
// // import { storage } from "../cloudConfig.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//     );
//   },
// });

// const filefilter=(req,file,cb)=>{
//     if(req.file.mimetype  === "video/mp4"){
//         cb(null,true);
//     }else{
//         cb(null,false);
//     }
// }
// const upload = multer({ storage });

// export default upload;

