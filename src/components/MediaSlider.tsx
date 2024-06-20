"use client"

import { useState } from "react"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa6"

// import { images } from "@/components/constants/images"

import { Button } from "./ui/button"
import { PropertyMedia } from "./datatable/data/schema"

interface PropsType {
  propdata?: PropertyMedia[];
}

const MediaSlider = ({propdata = []}:PropsType) => {
  const [activeImage, setActiveImage] = useState(0)

  const clickNext = () => {
    activeImage === propdata.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1)
  }
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(propdata.length - 1)
      : setActiveImage(activeImage - 1)
  }

  return (
    <main className="w-full flex items-center space-x-5 ">
      <Button variant="default" onClick={clickPrev} size="icon">
        <FaArrowLeft />
      </Button>
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform fade duration-1000 md:rounded-2xl p-6 md:p-0`}
      >
        {propdata.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block  w-[300px] h-[200px] lg:w-[900px] lg:h-[500px] object-cover fade duration-1000 fade"
                : "hidden"
            }`}
          >
            {elem.type === "Image" ? (
              <img
                src={`https://localhost:5000/uploads/property-media/${elem.fileName}`}
                alt=""
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl lg:rounded-xl"
              />
            ) : (
              <video src={`https://localhost:5000/uploads/property-media/${elem.fileName}`} controls />
            )}
          </div>
        ))}
      </div>
      {/* <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      /> */}
      <Button variant="default" onClick={clickNext} size="icon">
        <FaArrowLeft className = "rotate-180"/>
      </Button>
    </main>
  )
}

export default MediaSlider
