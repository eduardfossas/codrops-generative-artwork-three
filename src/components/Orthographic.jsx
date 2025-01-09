import * as THREE from "three";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "wouter";

export const OrthographicCamera = () => {
  const [location] = useLocation();
  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const cameraRef = useRef(
    new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000)
  );
  const perspectiveRef = useRef(new THREE.PerspectiveCamera(75, 0, 0.1, 1000));

  console.log(location);

  useEffect(() => {
    const oldCam = camera;
    if (location === "/de-stijl") {
      cameraRef.current.left = size.width / -2;
      cameraRef.current.right = size.width / 2;
      cameraRef.current.top = size.height / 2;
      cameraRef.current.bottom = size.height / -2;
      cameraRef.current.position.set(-10, 8, 10);
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.zoom = 10;

      cameraRef.current.updateProjectionMatrix();
      cameraRef.current.updateMatrix();
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    } else {
      perspectiveRef.current.position.set(0, 0, 64);
      perspectiveRef.current.aspect = size.width / size.height;
      perspectiveRef.current.updateProjectionMatrix();

      perspectiveRef.current.updateMatrix();
      set(() => ({ camera: perspectiveRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, set, size, location]);

  return null;
};

OrthographicCamera.propTypes = {
  makeDefault: PropTypes.bool,
};
