import { asyncHandler } from "../utils/async-handler.utils";
import { Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import Product from "../models/product.model";
import path from "path";
import Category from "../models/category.model";
import { removeImages } from "../cloudinary.config";
// name
// price
// description
// stock
// brand
// isFeatured

//post products  ==============
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { category: categoryId, ...data } = req.body;

    const { coverImage, images } = req.files as {
      coverImage: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    if (!coverImage || coverImage.length === 0) {
      throw new CustomError("Cover image is Required", 404);
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new CustomError("Category is Required", 404);
    }

    const product = new Product(data);
    product.category = category._id;

    //add product cover image
    product.coverImage = {
      path: coverImage[0].path,
      public_id: coverImage[0].filename,
    };

    //add product images

    if (images && images.length > 0) {
      const imagePath: { path: string; public_id: string }[] = images.map(
        (image) => ({
          path: image.path,
          public_id: image.filename,
        })
      );
      // product.images = imagePath as any;
      product.set("images", imagePath);
    }

    await product.save();

    if (!product) {
      throw new CustomError("Something went wrong", 500);
    }
    res.status(201).json({
      //201 success
      message: "Product Created Successfully.",
      success: true,
      status: "success",
      data: product,
    });
  }
);

//get all products  ==============

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    //http://localhost:port/path?......query

    const { query, minPrice, maxPrice } = req.query;
    const filter: Record<string, any> = {}; // create object or filter is an object where you can filter anything you like
    console.log(query);
    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          descrition: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        filter.price = {
          $lte: Number(maxPrice as string),
          $gte: Number(minPrice as string),
        };
      }

      if (minPrice) {
        filter.price = {
          $gte: Number(minPrice as string),
        };
      }

      if (maxPrice) {
        filter.price = {
          $lte: Number(minPrice as string),
        };
      }
    }

    const products = await Product.find(filter).populate("category"); //populate("category") means it display the data of category full data having the same ref: name from model of products
    res.status(200).json({
      message: "All Products fetched successfully",
      success: true,
      status: "success",
      data: products,
    });
  }
);

//getbyId products  ==============

export const getByIdProduct = asyncHandler(
  async (req: Request, res: Response) => {
    //get id from req.params
    const { id } = req.params; //req.params refers to an object that contains route parameters

    //get category by given id
    const product = await Product.findOne({ _id: id }).populate("category");
    if (!product) {
      throw new CustomError("Product not found", 404);
    }
    res.status(200).json({
      message: ` Product by id ${id} fetched`,
      success: true,
      status: "success",
      data: product,
    });
  }
);

// 1. json => name, category, price ..

// 2. images [5] [2 old => delete] [add 2 => new images]

//update products ==============
export const updateProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { coverImage, images } = req.files as {
      coverImage: Express.Multer.File[];
      images: Express.Multer.File[];
    };
    const {
      deletedImage,
      name,
      description,
      stock,
      brand,
      category,
      isFeatured,
      price,
    } = req.body;

    if (category) {
      const productCategory = await Category.findById(category);
      if (!productCategory) {
        throw new CustomError("Category not found", 404);
      }
    }
    const updatedproduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        stock,
        brand,
        category,
        isFeatured,
        price,
      },
      { new: true, runValidators: true } //return the document as it was before the update
    );

    if (!updatedproduct) {
      throw new CustomError("Updated Product Not Found", 404);
    }

    //update cover image
    if (coverImage) {
      if (updatedproduct.coverImage) {
        await removeImages([updatedproduct.coverImage.public_id]);
      }

      updatedproduct.coverImage = {
        path: coverImage[0].path,
        public_id: coverImage[0].filename,
      };
    }

    //images update
    if (Array.isArray(deletedImage) && deletedImage.length > 0) {
      await removeImages(deletedImage);
      if (updatedproduct.images) {
        updatedproduct.images =
          (updatedproduct.images.filter(
            (img) => !deletedImage.includes(img.public_id)
          ) as any) ?? [];
      }
    }

    //update images
    if (images && images.length > 0) {
      const newImages = images.map((img) => ({
        path: img.path,
        public_id: img.filename,
      }));
      updatedproduct.set("images", [...updatedproduct.images, ...newImages]); // ... spread operator:  it spread makes the product.image with new Array
    }

    await updatedproduct.save();

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      status: "success",
      data: updatedproduct,
    });
  }
);

//delete products  ==============
export const removeProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    //1. get product
    const deleteproduct = await Product.findById(id);

    if (!deleteproduct) {
      throw new CustomError("Deleted product Not Found", 404);
    }
    // 2. products images => delete

    //for coverImage
    if (deleteproduct.coverImage) {
      await removeImages([deleteproduct.coverImage.public_id]);
    }
    //for images
    if (deleteproduct.images && deleteproduct.images.length > 0) {
      const imageIds: string[] = deleteproduct.images.map(
        (image) => image.public_id as string
      );
      await removeImages(imageIds);
    }

    // 3. delete product
    await deleteproduct.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully!",
      success: true,
      status: "success",
      data: null,
    });
  }
);

//get all featured products

export const getFeaturedProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const featured = await Product.find({ isFeatured: true }).populate(
      "category"
    );

    res.status(200).json({
      status: "success",
      success: true,
      message: "Featured Products Fetched Successfully",
      data: featured,
    });
  }
);

//get by category id

export const getByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const categoryproduct = await Product.find({
      category: categoryId,
    }).populate("category");
    res.status(200).json({
      status: "success",
      success: true,
      message: "Producs by Category Fetched Successfully",
      data: categoryproduct,
    });
  }
);
