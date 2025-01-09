import { useMemo, useRef } from "react";
import { Color, DoubleSide, MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { makeNoise2D } from "open-simplex-noise";
import PropTypes from "prop-types";

const dummy = new Object3D();
const c = new Color();
const noise = makeNoise2D(10);

const DeStijlGrid = ({
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
  const colorRef = useRef([]);
  const smallColumns = useMemo(() => {
    const baseColumns = [2, 4, 6, 9];

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
        const rand = noise(i, j) * 1.2;
        const range = smallColumns.includes(i + 1)
          ? 0
          : Math.floor(MathUtils.mapLinear(rand, -1, 1, ...[1, 4]));

        const color = c.set(palette[range]).toArray();
        colorRef.current.push(palette[range]);
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
      const n = noise(i, 0);
      const remainingWidth = width - x;
      const ratio = remainingWidth / (columns - i);
      const column = smallColumns.includes(i + 1)
        ? 1.5
        : ratio * MathUtils.mapLinear(n, -1, 1, 1.5, 2);
      const adjustedColumn = i === columns - 1 ? remainingWidth : column;

      for (let j = 0; j < rows; j++) {
        const currentColor = colorRef.current[i * rows + j];
        let z = 0;

        if (currentColor === palette[0]) {
          z = 0;
        } else if (currentColor === palette[1]) {
          z = -10;
        } else if (currentColor === palette[2]) {
          z = 0;
        } else if (currentColor === palette[3]) {
          z = 8;
        } else if (currentColor === palette[4]) {
          z = -5000;
        }

        temp.push({
          x: x + adjustedColumn / 2 - width / 2,
          y: j * row + row / 2 - height / 2,
          z: z,
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
      const { x, y, z, scaleX, scaleY } = squares[i];
      dummy.position.set(x, y, z);
      dummy.scale.set(scaleX, scaleY, 4);
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
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial
        vertexColors
        toneMapped={false}
        transparent
        side={DoubleSide}
      />
    </instancedMesh>
  );
};

DeStijlGrid.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  columns: PropTypes.number,
  rows: PropTypes.number,
  palette: PropTypes.arrayOf(PropTypes.string),
};

export { DeStijlGrid };
