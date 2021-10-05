import multer from 'multer';
import moment from 'moment';

const types = ['image/png', 'image/jpeg', 'image/jpg'];
// const limits = {
//   fileSize: 1024 * 1024 * 5,
// };

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },

  filename(req, file, cb) {
    const date = moment().format('DD.MM.YYYY-HH.mm.ss-SSS');
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({ storage, fileFilter });
