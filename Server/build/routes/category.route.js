"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
// /category
//category post route
router.post("/", (0, authenticate_middleware_1.authenticate)([global_types_1.Role.ADMIN]), category_controller_1.create);
//get all categories
router.get("/", category_controller_1.getAll);
//getbyId
router.get("/:id", (0, authenticate_middleware_1.authenticate)(), category_controller_1.getById);
//updates
router.put("/:id", (0, authenticate_middleware_1.authenticate)(), (0, authenticate_middleware_1.authenticate)([global_types_1.Role.ADMIN]), category_controller_1.update);
//remove
router.delete("/:id", (0, authenticate_middleware_1.authenticate)(), (0, authenticate_middleware_1.authenticate)([global_types_1.Role.ADMIN]), category_controller_1.remove);
exports.default = router;
