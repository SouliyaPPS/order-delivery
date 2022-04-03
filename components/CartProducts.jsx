import React from "react";
import styles from "../styles/CartProducts.module.css";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { urlForThumbnail } from "../utility/image";

function CartProducts({ product, addToCartHandler }) {
  return (
    <Card className={styles.card}>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className="lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={urlForThumbnail(product.image)}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                    width={300}
                    height={210}
                  ></CardMedia>
                </CardActionArea>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <CardContent>
                <h1 className={styles.cardTitle}>{product.name}</h1>
                <Rating
                  className={styles.rating}
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  value={product.rating}
                  readOnly
                ></Rating>
                <span className={styles.cardPrice}>{product.price} Kip</span>
              </CardContent>
              <Typography>
                <p className={styles.CardDesc}>{product.category}</p>
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
        </div>
      </NextLink>
    </Card>
  );
}

export default CartProducts;
