"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const global_types_1 = require("../types/global.types");
const router = express_1.default.Router();
// create order
router.post("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), order_controller_1.createOrder);
// delete order (admin, user)
router.delete("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), order_controller_1.removeOrder);
// get all orders (only admin)
router.get("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), order_controller_1.getAllOrders);
// get all order for users (only user)
router.get("/user", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyUser), order_controller_1.getAllByUserId);
// get order by id (user, admin)
router.get("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdminAndUser), order_controller_1.getOrderById);
//user cancel order
router.put("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), order_controller_1.updateStatus);
router.put("/cancel/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdminAndUser), order_controller_1.cancelOrder);
exports.default = router;
//mail / nodemailer
// pagination /query
