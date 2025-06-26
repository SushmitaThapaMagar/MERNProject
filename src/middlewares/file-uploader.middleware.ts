import multer from "multer";

export const uploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, file.filename + "-" + uniqueSuffix);
    },
  });

  const upload = multer({ storage });
  return upload;
};
