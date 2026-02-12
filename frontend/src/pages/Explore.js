"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-10 mb-20" style={{ background: "inherit" }}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a96d277c71d23e804cf29f61a2d45cff1082f98b"
        alt="Lore Zone Logo"
        className="w-[967px] max-w-full h-auto mb-[40px] object-contain"
      />

      <h1 className="text-8xl font-bold text-center text-black max-md:text-7xl max-sm:text-5xl leading-tight" style={{ color: "inherit" }}>
        Welcome to Lore Zone
      </h1>

      <div className="mt-10">
        <button
          className="px-10 py-2.5 text-3xl text-white bg-indigo-600 rounded-[65px] hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          aria-label="Explore Now"
        >
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
