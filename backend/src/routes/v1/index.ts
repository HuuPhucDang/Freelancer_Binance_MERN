import express, { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import securityRoute from "./security.route";
import bankRoute from "./bank.route";
import verificationRoute from "./verification.route";
import transactionRoute from "./transaction.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/security",
    route: securityRoute,
  },
  {
    path: "/bank",
    route: bankRoute,
  },
  {
    path: "/verification",
    route: verificationRoute,
  },
  {
    path: "/transactions",
    route: transactionRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
