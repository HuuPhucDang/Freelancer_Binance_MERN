import express, { Router } from "express";
import { validate } from "../../helper/validate";
import { auth } from "../../modules/auth";
import { userController, userValidation } from "../../modules/user";
import { multer } from "../../utils";

const router: Router = express.Router();

router.post(
  "/uploadIdCard",
  [auth("selfUpdate")],
  [
    validate(userValidation.uploadIDCards),
    multer.fields([
      { name: "frontImage" },
      { name: "backImage" },
      { name: "selfieImage" },
    ]),
  ],
  userController.uploadIDCards
);

export default router;
