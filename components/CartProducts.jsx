import * as React from "react";
import styles from "../styles/CartProducts.module.css";
import NextLink from "next/link";
import { CardActionArea, CardMedia, Rating, Typography } from "@mui/material";
import { urlForThumbnail } from "../utility/image";

function CartProducts({ product, addToCartHandler }) {
  return (
    <div className={styles.cardProduct}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <div className="items-center my-auto mt-5 max-w-2xl grid-cols-2 mx-auto flex-wrap justify-center">
          <div className="flow-root">
            <div className={styles.container}>
              <div className={styles.card}>
                <div className="w-full h-full rounded-lg object-center object-cover my-auto">
                  <div className="w-full h-64 bg-gray-200 rounded-lg">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={urlForThumbnail(product.image)}
                        className="mx-auto h-64 object-center object-cover rounded-lg"
                      ></CardMedia>
                    </CardActionArea>
                  </div>
                </div>

                <h1 className={styles.cardTitle}>{product.name}</h1>
                <div className={styles.cardProduct}>
                  <Rating
                    className={styles.rating}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    value={product.rating}
                    readOnly
                  ></Rating>
                </div>
                <h1 className={styles.cardPrice}>{product.price} Kip</h1>

                <Typography className={styles.CardDesc}>
                  {product.category}
                </Typography>

                <div className={styles.cardFooterBottom}>
                  <button
                    className={styles.cardBtn}
                    onClick={() => addToCartHandler(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </div>
  );
}

export default CartProducts;
