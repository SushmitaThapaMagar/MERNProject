import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.config";

export const uploader = () => {
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + "-" + file.originalname;
  //     cb(null, file.fieldname + "-" + uniqueSuffix);
  //   },
  // });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: async () => {
      return {
        folder: "/shop-kart",
        allowed_format: ["jpg", "jpeg", "png", "webp", "avif", "pdf"],
      };
    },
  });

  const upload = multer({ storage });
  return upload;
};
