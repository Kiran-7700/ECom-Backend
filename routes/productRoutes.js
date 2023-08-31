const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
} = require("../controllers/productController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const productRouter = require("express").Router();
const formidable = require("express-formidable");

productRouter.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update products
productRouter.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
productRouter.get("/get-product", getProductController);

//single product
productRouter.get("/get-product/:slug", getSingleProductController);


//get photo
productRouter.get("/product-photo/:pid", productPhotoController);

//delete product
productRouter.delete("/delete-product/:pid", deleteProductController);

//filter product
productRouter.post("/product-filters", productFiltersController);

//product count
productRouter.get("/product-count", productCountController);

//product per page
productRouter.get("/product-list/:page", productListController);

//search product
productRouter.get("/search/:keyword", searchProductController);

//similar product
productRouter.get("/related-product/:pid/:cid", relatedProductController);


//category wise product
productRouter.get("/product-category/:slug", productCategoryController);


module.exports = { productRouter };
