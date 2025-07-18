"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { authenticate } from "../middleware/authenticate.middleware";
const global_types_1 = require("../types/global.types");
const brand_controller_1 = require("../controllers/brand.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const router = express_1.default.Router();
router.post("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), brand_controller_1.createBrand);
router.get("/", brand_controller_1.getAllBrands);
router.get("/:id", brand_controller_1.getBrandById);
router.put("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), brand_controller_1.updateBrand);
router.delete("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), brand_controller_1.deleteBrand);
exports.default = router;
