import * as React from "react";
import styles from "../styles/CartProducts.module.css";
import NextLink from "next/link";
import { CardActionArea, CardMedia, Rating, Typography } from "@mui/material";
import { urlForThumbnail } from "../utility/image";

function CartProducts({ product, addToCartHandler }) {
  return (
    <div className={styles.cardProduct}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className="lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full h-full object-center object-cover lg:w-full lg:h-full">
              <div className="w-full h-64 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={urlForThumbnail(product.image)}
                    className="mx-auto w-full h-full object-center object-cover group-hover:opacity-75"
                  ></CardMedia>
                </CardActionArea>
              </div>
            </div>

            <h1 className={styles.cardTitle}>{product.name}</h1>
            <Rating
              className={styles.rating}
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              value={product.rating}
              readOnly
            ></Rating>
            <h1 className={styles.cardPrice}>{product.price} Kip</h1>

            <Typography className={styles.CardDesc}>
              {product.category}
            </Typography>

            <div className={styles.cardFooterBottom}>
              <button
                className={styles.cardBtn}
                // onClick={() => addToCartHandler(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </NextLink>
    </div>
  );
}

export default CartProducts;
