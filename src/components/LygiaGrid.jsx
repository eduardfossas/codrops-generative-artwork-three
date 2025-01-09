import { useMemo, useRef } from "react";
import { Color, DoubleSide, MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { makeNoise2D } from "open-simplex-noise";
import PropTypes from "prop-types";

const dummy = new Object3D();
const c = new Color();
const noise = makeNoise2D(10);

const LygiaGrid = ({
  width = 50,
  height = 80,
  columns = 12,
  rows = 10,
  palette = [
    "#B04E26",
    "#007443",
    "#263E66",
    "#CABCA2",
    "#C3C3B7",
    "#8EA39C",
    "#E5C03C",
    "#66857F",
    "#3A5D57",
  ],
}) => {
  const mesh = useRef();
  const smallColumns = useMemo(() => {
    const baseColumns = [2, 4, 7, 8, 10, 11];

    if (columns <= 12) {
      return baseColumns;
    }

    const additionalColumns = Array.from(
      { length: Math.floor((columns - 12) / 2) },
      () => Math.floor(Math.random() * (columns - 12)) + 13
    );

    return [...new Set([...baseColumns, ...additionalColumns])].sort(
      (a, b) => a - b
    );
  }, [columns]);

  const colors = useMemo(() => {
    const temp = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const rand = noise(i, j) * 1.5;
        const range = smallColumns.includes(i + 1)
          ? [0, 4]
          : [1, palette.length - 1];
        const colorIndex = Math.floor(
          MathUtils.mapLinear(rand, -1.5, 1.5, ...range)
        );
        const color = c.set(palette[colorIndex]).toArray();
        temp.push(color);
      }
    }
    return new Float32Array(temp.flat());
  }, [columns, rows, palette, smallColumns]);

  const squares = useMemo(() => {
    const temp = [];
    let x = 0;
    const row = height / rows;

    for (let i = 0; i < columns; i++) {
      const n = noise(i, 0) * 5;
      const remainingWidth = width - x;
      const ratio = remainingWidth / (columns - i);
      const column = smallColumns.includes(i + 1)
        ? ratio / MathUtils.mapLinear(n, -1, 1, 3, 4)
        : ratio * MathUtils.mapLinear(n, -1, 1, 1.5, 2);
      const adjustedColumn = i === columns - 1 ? remainingWidth : column;
      for (let j = 0; j < rows; j++) {
        temp.push({
          x: x + adjustedColumn / 2 - width / 2,
          y: j * row + row / 2 - height / 2,
          scaleX: adjustedColumn,
          scaleY: row,
        });
      }

      x += column;
    }
    return temp;
  }, [height, width, rows, columns, smallColumns]);

  useFrame(() => {
    for (let i = 0; i < squares.length; i++) {
      const { x, y, scaleX, scaleY } = squares[i];
      dummy.position.set(x, y, 0);
      dummy.scale.set(scaleX, scaleY, 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      scale={[1, 1, 1]}
      args={[null, null, columns * rows]}
    >
      <planeGeometry>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </planeGeometry>
      <meshBasicMaterial
        vertexColors
        toneMapped={false}
        transparent
        side={DoubleSide}
      />
    </instancedMesh>
  );
};

LygiaGrid.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  columns: PropTypes.number,
  rows: PropTypes.number,
  palette: PropTypes.arrayOf(PropTypes.string),
};

export { LygiaGrid };
