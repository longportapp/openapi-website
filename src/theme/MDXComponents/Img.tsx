import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const toolbar = ({ rotate, onRotate, onScale, scale, index }) => {
  return (
    <>
      <svg
        className="PhotoView-Slider__toolbarIcon"
        width="44"
        height="44"
        viewBox="0 0 768 768"
        fill="white"
        onClick={() => onScale(scale + 0.5)}
      >
        <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
      </svg>
      <svg
        className="PhotoView-Slider__toolbarIcon"
        width="44"
        height="44"
        viewBox="0 0 768 768"
        fill="white"
        onClick={() => onScale(scale - 0.5)}
      >
        <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
      </svg>
      <svg
        className="PhotoView-Slider__toolbarIcon"
        onClick={() => onRotate(rotate + 90)}
        width="44"
        height="44"
        fill="white"
        viewBox="0 0 768 768"
      >
        <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
      </svg>
    </>
  );
};

export default function MDXImg(props) {
  return (
    <div className="markdown-img-container">
      <PhotoProvider toolbarRender={toolbar}>
        <PhotoView src={props.src}>
          <img {...props} />
        </PhotoView>
      </PhotoProvider>
    </div>
  );
}
