const multer = require('multer')
function upload(path) {
  const storage = multer.diskStorage({
    destination: path || './public',
    filename: function (req, file, cb) {

      let fnamelist = file.originalname.split('.');
      let ext = '.' + fnamelist.pop();
      // let fname = fnamelist.join('.');
      cb(null, req.user._id + Date.now() + ext)
    }
  })
  return multer({storage:storage}).any();
//   const _upload = multer({
//     storage: storage,
//     limits:
//     {
//       fileSize: '20mb'
//     },

//   }).fields(
//     [
//       {
//         name: 'video',
//         maxCount: 1
//       },
//       {
//         name: 'images',
//         maxCount: 5
//       }
//     ]
//   )

//   return _upload
}
module.exports = upload;