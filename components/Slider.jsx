import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import MobileNav from "./Navbar";
import Search from "./Search";

const featuredProducts = [
  "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/274356861_148182434277389_629341167391831257_n.png?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFgzqgWUvbDP0qUZaP8tGW4v55AJIyQ1-W_nkAkjJDX5QXGZgs5eIG3TCec9cDx1ZidYT2Jl1CCGuq54DZl582D&_nc_ohc=jdBqORp0NMoAX8pzPiw&_nc_ht=scontent.fvte2-3.fna&oh=00_AT-Af2ckZvYlVeUJkJYn5dmvY03ED4D5UgblYPWOTBcmFw&oe=623F5447",
  "https://scontent.fvte2-2.fna.fbcdn.net/v/t39.30808-6/271603102_138679871894312_2526127250027106159_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEy7eSOYbagb4nX25dfMPlbP7Xdk2ctajQ_td2TZy1qNBOTSnbrJbaSbDPFiGGRMdfWbo_0XTXhz4rUgZuRirQY&_nc_ohc=IRKmm2jHTCYAX9ZG8Z7&_nc_ht=scontent.fvte2-2.fna&oh=00_AT_LQGS9p5_aaZKlUPn-6RMSf4xop1TP7Upo8MHYUiL-Zw&oe=623F5A00",
  "https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-6/275302965_151653650596934_9212390331757319191_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEyD1V4RC9ERFpPDQn4JksOT71fdU74XY1PvV91TvhdjQLGnHxZA1ve_z6qo6T5d6k47hTK_8lz2kHPuu8MRfsW&_nc_ohc=2KBC6_oFFAoAX-3No4f&tn=FK-vvCEyh36FmkOo&_nc_ht=scontent.fvte2-1.fna&oh=00_AT_bP1rKEPW_LFm6IksHPr9WAFGQ-TcjaGPfxDIjcRbYQQ&oe=623ED3CF",
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
    }, 5000);
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
  const [open, setOpen] = useState(false);

  return (
    <div ref={slideRef} className="relative w-full select-none">
      <nav>
        <div className="absolute flex items-center justify-between w-full px-3 transform top-1/2">
          <button
            className="p-1 text-white transition bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100"
            onClick={handleOnPrevClick}
          >
            <AiOutlineVerticalRight size={30} />
          </button>
          <button
            className="p-1 text-white transition bg-black bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100"
            onClick={handleOnNextClick}
          >
            <AiOutlineVerticalLeft size={30} />
          </button>
        </div>
        <MobileNav open={open} setOpen={setOpen} />
        <div className="aspect-w-20 aspect-h-10">
          <img src={featuredProducts[currentIndex]} alt="" />
        </div>
        <Search />
      </nav>
    </div>
  );
}
