const {
  updateCategoryController,
  createCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/CategoryController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const categoryRouter = require("express").Router();

//create-category
categoryRouter.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
categoryRouter.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category
categoryRouter.get("/get-category", categoryController);

//single category
categoryRouter.get("/single-category/:slug", singleCategoryController);

//delete category
categoryRouter.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = { categoryRouter };
