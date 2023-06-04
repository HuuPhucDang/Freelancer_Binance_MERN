import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { userController, userValidation } from "../../modules/user";

const router: Router = express.Router();

router.put(
  "/phonenumber",
  auth("selfUpdate"),
  validate(userValidation.verifyPhonenumber),
  userController.verifyPhonenumber
);

router.put(
  "/activeEmail",
  auth("selfUpdate"),
  validate(userValidation.activeUserEmail),
  userController.activeUserEmail
);

router.put(
  "/changeEmail",
  auth("selfUpdate"),
  validate(userValidation.changeUserEmail),
  userController.changeUserEmail
);

router.put(
  "/activeWithdrawPassword",
  auth("selfUpdate"),
  validate(userValidation.activeWithdrawPassword),
  userController.activeWithdrawPassword
);

router.put(
  "/changeWithdrawPassword",
  auth("selfUpdate"),
  validate(userValidation.changeWithdrawPassword),
  userController.changeWithdrawPassword
);

router.put(
  "/changePassword",
  auth("selfUpdate"),
  validate(userValidation.changeUserPassword),
  userController.changeUserPassword
);

export default router;
