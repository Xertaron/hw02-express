const { Router } = require("express");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../decorators");
const AuthController = require("../../controllers/auth-controller");
const { authenticate, upload } = require("../../middlewares");

const router = Router();

router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  AuthController.register
);

router.post("/login", validateBody(schemas.loginSchema), AuthController.login);

router.get("/current", authenticate, AuthController.getCurrentUser);

router.post("/logout", authenticate, AuthController.logout);

router.patch(
  "/update",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  AuthController.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  AuthController.updateAvatar
);

module.exports = router;