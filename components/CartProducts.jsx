import * as React from "react";
import styles from "../styles/CartProducts.module.css";
import NextLink from "next/link";
import { CardActionArea, CardMedia, Rating } from "@mui/material";
import { urlForThumbnail } from "../utility/image";
import styled from "styled-components";

function CartProducts({ product, addToCartHandler }) {
  return (
    <NextLink href={`/product/${product.slug.current}`} passHref>
      <Container>
        <Image>
          <CardActionArea>
            <CardMedia
              component="img"
              image={urlForThumbnail(product.image)}
              className="mx-auto h-64 object-center object-cover rounded-lg "
            ></CardMedia>
          </CardActionArea>
        </Image>
        <Description>
          <h2 className="subpixel-antialiased font-sans text-lg font-medium">
            {product.name}
          </h2>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            value={product.rating}
            className={styles.rating}
          />

          <p>{product.price} Kip</p>

          <p className={styles.CardDesc}>{product.category}</p>

          <div className={styles.cardFooterBottom}>
            <button
              className={styles.cardBtn}
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </button>
          </div>
        </Description>
      </Container>
    </NextLink>

    // <div className=" 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full">
    // <div className={styles.cardProduct}>
    // <NextLink href={`/product/${product.slug.current}`} passHref>
    //   {/* <div className="items-center my-auto mt-5 max-w-2xl grid-cols-2 mx-auto flex-wrap justify-center">
    //       <div className={styles.container}> */}
    //   <div className={styles.card}>
    //     <div className="w-full h-full rounded-lg object-center object-cover my-auto">
    //       <div className="w-full h-64 bg-gray-200 rounded-lg">
    //         <CardActionArea>
    //           <CardMedia
    //             component="img"
    //             image={urlForThumbnail(product.image)}
    //             className="mx-auto h-64 object-center object-cover rounded-lg "
    //           ></CardMedia>
    //         </CardActionArea>
    //       </div>
    //     </div>

    //     <h1 className={styles.cardTitle}>{product.name}</h1>
    //     <div className={styles.cardProduct}>
    //       <Rating
    //         className={styles.rating}
    //         name="half-rating"
    //         defaultValue={2.5}
    //         precision={0.5}
    //         value={product.rating}
    //         readOnly
    //       ></Rating>
    //     </div>
    //     <h1 className={styles.cardPrice}>{product.price} Kip</h1>

    //     <Typography className={styles.CardDesc}>{product.category}</Typography>

    //     <div className={styles.cardFooterBottom}>
    //       <button
    //         className={styles.cardBtn}
    //         onClick={() => addToCartHandler(product)}
    //       >
    //         Add To Cart
    //       </button>
    //     </div>
    //   </div>
    //   {/* </div>
    //     </div> */}
    // </NextLink>
    // // </div>
    // // </div>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 10;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem /* 8px */;
  box-shadow: 0 0 20px 5px #dddddd;
  place-items: center;
  grid-auto-rows: 420px;
  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
`;
const Image = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.3;

  img {
    width: 180px;
    height: 200px;
    @media only screen and (max-width: 767px) {
      &:nth-child(1) {
        width: 175px;
        height: 200px;
      }
    }
  }
`;
const Description = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.7;
  justify-content: center;
  align-items: center;
  h5 {
    font-size: 16px;
    font-weight: 600;
  }
  p {
    font-weight: 600;
  }
  button {
    width: 100%;
    height: 33px;
    background-color: #fa8900;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export default CartProducts;
