import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";

const featuredProducts = [
  "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/274356861_148182434277389_629341167391831257_n.png?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFgzqgWUvbDP0qUZaP8tGW4v55AJIyQ1-W_nkAkjJDX5QXGZgs5eIG3TCec9cDx1ZidYT2Jl1CCGuq54DZl582D&_nc_ohc=jdBqORp0NMoAX8pzPiw&_nc_ht=scontent.fvte2-3.fna&oh=00_AT-Af2ckZvYlVeUJkJYn5dmvY03ED4D5UgblYPWOTBcmFw&oe=623F5447",
  "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/274356861_148182434277389_629341167391831257_n.png?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFgzqgWUvbDP0qUZaP8tGW4v55AJIyQ1-W_nkAkjJDX5QXGZgs5eIG3TCec9cDx1ZidYT2Jl1CCGuq54DZl582D&_nc_ohc=jdBqORp0NMoAX8pzPiw&_nc_ht=scontent.fvte2-3.fna&oh=00_AT-Af2ckZvYlVeUJkJYn5dmvY03ED4D5UgblYPWOTBcmFw&oe=623F5447",
  "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/274356861_148182434277389_629341167391831257_n.png?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFgzqgWUvbDP0qUZaP8tGW4v55AJIyQ1-W_nkAkjJDX5QXGZgs5eIG3TCec9cDx1ZidYT2Jl1CCGuq54DZl582D&_nc_ohc=jdBqORp0NMoAX8pzPiw&_nc_ht=scontent.fvte2-3.fna&oh=00_AT-Af2ckZvYlVeUJkJYn5dmvY03ED4D5UgblYPWOTBcmFw&oe=623F5447",
];

let count = 0;
let slideInterval;
export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 50);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <div ref={slideRef} className="w-full select-none relative">
      <div className="aspect-w-20 aspect-h-10">
        <img src={featuredProducts[currentIndex]} alt="" />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <AiOutlineVerticalRight size={30} />
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <AiOutlineVerticalLeft size={30} />
        </button>
      </div>
    </div>
  );
}
