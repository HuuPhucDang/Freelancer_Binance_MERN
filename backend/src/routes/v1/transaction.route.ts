import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  transactionController,
  transactionValidation,
} from "../../modules/transaction";

const router: Router = express.Router();

router.put(
  "/recharge",
  auth("actionMoney"),
  validate(transactionValidation.actionMoney),
  transactionController.rechangeMoney
);

router.put(
  "/withdraw",
  auth("actionMoney"),
  validate(transactionValidation.actionMoney),
  transactionController.withdrawMoney
);

export default router;
