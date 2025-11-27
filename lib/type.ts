import {
  CategoryGetPayload,
  ProductGetPayload,
  StoreGetPayload,
} from "./generated/prisma/models";

export type CategoryWithProductAndStoreType = CategoryGetPayload<{
  include: {
    images: true;
    store: true;
  };
}>;

export type ProductWithImagesAndCategoryStoreType = ProductGetPayload<{
  include: {
    images: true;
    category: true;
  };
}>;

export type StoreWithChildren = StoreGetPayload<{
  include: {
    category: {
      include: {
        products: {
          include: {
            images: true;
          };
        };
      };
    };
  };
}>;
