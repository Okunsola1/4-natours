const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authControllers = require("./../controllers/authController");
const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authControllers.restrictTo("user"),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(
    authControllers.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .delete(
    authControllers.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
