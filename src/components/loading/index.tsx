import React from 'react';
import styled from './index.module.scss';

const Index = () => {
  return (
    <div className={styled['loading-container']}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        // width="32px"
        viewBox="0 0 32 30"
        xmlSpace="preserve"
        style={{ width: '100%' }}
      >
        <rect x="0" y="10" width="4" height="10" fill="black">
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="8" y="10" width="4" height="10" fill="#FFC700">
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.25s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.25s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="16" y="10" width="4" height="10" fill="#37A0FF">
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.5s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.5s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="24" y="10" width="4" height="10" fill="#FF4040">
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.75s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.75s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};
export default Index;
