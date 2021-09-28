import React, { FC, memo, useState, useEffect, useRef } from "react";
import * as Types from "@/assets/ts/types/types";
import * as Photos from "@/assets/ts/images";
import ImagePhoto from "./ImagePhoto";

const PhotoImages = Photos.location;

export type ExpansionPhotoList = Types.PhotoList & {
  index: number;
  hasBreak: boolean;
};

const Location: FC = () => {
  const el = useRef(null);

  const [hasBreak, setHasBreak] = useState(false);

  useEffect(() => {
    if (hasBreak) {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
      return;
    }
    function checkWhetherReachBreakpoint(): void {
      const scrollPositionY = window.scrollY;
      const windowBottomY = scrollPositionY + window.innerHeight;
      if (el.current === null) return;
      const breakpoint =
        el.current.getBoundingClientRect().top + scrollPositionY;
      if (breakpoint < windowBottomY) {
        setHasBreak(true);
      }
    }

    checkWhetherReachBreakpoint();

    window.addEventListener("scroll", checkWhetherReachBreakpoint);
    window.addEventListener("resize", checkWhetherReachBreakpoint);

    return () => {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
    };
  }, [hasBreak]);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 my-4 mx-auto`}>
          Location
        </h1>
      </div>
      <ul ref={el} className={`pt-5 mx-auto`}>
        {PhotoImages.map((photo, index) => (
          <ImagePhoto
            index={index}
            key={photo.id}
            id={photo.id}
            src={photo.src}
            alt={photo.alt}
            label={photo.label}
            hasBreak={hasBreak}
          />
        ))}
      </ul>
    </>
  );
};

export default memo(Location);
