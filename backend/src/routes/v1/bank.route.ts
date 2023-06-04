import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { userController, userValidation } from "../../modules/user";

const router: Router = express.Router();

router.put(
  "/active",
  auth("selfUpdate"),
  validate(userValidation.activeBank),
  userController.activeBank
);

export default router;
