import { Router } from "express";

import * as viewController from "../controllers/viewController.js";

const viewRouter = Router();

viewRouter.get("/", viewController.getHomePage);
viewRouter.get("/login", viewController.getLoginPage);
viewRouter.get("/signup", viewController.getSignupPage);
viewRouter.get("/create_user", viewController.getCreateUserPage);


export default viewRouter;