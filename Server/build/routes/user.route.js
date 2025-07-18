"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const global_types_1 = require("../types/global.types");
const user_controller_1 = require("../controllers/user.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router(); //this is from the auth controller
router.post("/register", auth_controller_1.register); //this is from the auth controller
router.post("/login", auth_controller_1.login);
// router.get("/profile", authenticate(onlyUser), getProfile);
router.put("/profile", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), user_controller_1.updateProfile);
router.delete("/profile", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), user_controller_1.deleteAccount);
exports.default = router;
