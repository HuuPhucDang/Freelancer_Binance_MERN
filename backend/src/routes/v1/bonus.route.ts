import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import {
  rechangeBonusValidation,
  rechangeBonusController,
} from "../../modules/rechageBonus";

const router: Router = express.Router();

router
  .put(
    "/:inforId",
    [auth("updateSystemInfor")],
    [validate(rechangeBonusValidation.updateSystemInfor)],
    rechangeBonusController.updateSystemInfor
  )
  .get("/", rechangeBonusController.getSystemInfor);

export default router;
