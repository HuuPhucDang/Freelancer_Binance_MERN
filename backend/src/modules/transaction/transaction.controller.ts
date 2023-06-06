import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { responsePayload } from "../../utils";
import * as transactionService from "./transaction.service";

export const rechangeMoney = catchAsync(async (req: Request, res: Response) => {
  const user = await transactionService.rechangeMoney(req.body);
  res.send(responsePayload(true, "Rechange successfully!", user));
});

export const withdrawMoney = catchAsync(async (req: Request, res: Response) => {
  const user = await transactionService.rechangeMoney(req.body);
  res.send(responsePayload(true, "Withdraw money successfully!", user));
});
