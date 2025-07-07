import express from "express";

import {
  cancelOrder,
  createOrder,
  getAllByUserId,
  getAllOrders,
  getOrderById,
  removeOrder,
  updateStatus,
} from "../controllers/order.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import {
  onlyAdmin,
  onlyAdminAndUser,
  onlyUser,
  Role,
} from "../types/global.types";

const router = express.Router();

// create order
router.post("/", authenticate(onlyUser), createOrder);
// delete order (admin, user)
router.delete("/:id", authenticate(onlyAdmin), removeOrder);
// get all orders (only admin)
router.get("/", authenticate(onlyAdmin), getAllOrders);
// get all order for users (only user)
router.get("/user", authenticate(onlyUser), getAllByUserId);
// put status
router.put("/:id", authenticate(onlyAdmin), updateStatus);
// get order by id (user, admin)
router.get("/:id", authenticate(onlyAdminAndUser), getOrderById);
//user cancel order
router.delete("/:id", authenticate(onlyAdminAndUser), cancelOrder);

export default router;

//mail / nodemailer
// pagination /query
