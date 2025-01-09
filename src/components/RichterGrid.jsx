import { useCallback, useMemo, useRef } from "react";
import { Color, DoubleSide, MathUtils, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { makeNoise2D } from "open-simplex-noise";
import PropTypes from "prop-types";

const dummy = new Object3D();
const c = new Color();
const noise = makeNoise2D(Date.now());

const RichterGrid = ({
  width = 50,
  height = 80,
  columns = 12,
  rows = 10,
  isRandom,
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

  const randomValues = useMemo(() => {
    const values = [];
    for (let i = 0; i < columns * rows; i++) {
      values.push(MathUtils.randInt(0, palette.length - 1));
    }
    return values;
  }, [columns, rows]);

  const colors = useMemo(() => {
    const temp = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const rand = noise(i, j) * 1.5;
        const colorIndex = isRandom
          ? smallColumns.includes(i + 1)
            ? Math.floor(MathUtils.mapLinear(rand, -1, 1, 0, 4))
            : Math.floor(
                MathUtils.mapLinear(rand, -1, 1, 1, palette.length - 1)
              )
          : randomValues[i * rows + j];

        temp.push(c.set(palette[colorIndex]).toArray());
      }
    }
    return new Float32Array(temp.flat());
  }, [columns, rows, palette, smallColumns]);

  const squares = useMemo(() => {
    const temp = [];
    let x = 0;
    const row = height / rows;

    for (let i = 0; i < columns; i++) {
      const remainingWidth = width - x;
      const ratio = remainingWidth / (columns - i);
      const column = ratio;
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
  }, [height, width, rows, columns]);

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

RichterGrid.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  columns: PropTypes.number,
  rows: PropTypes.number,
  palette: PropTypes.arrayOf(PropTypes.string),
  isRandom: PropTypes.bool,
};

export { RichterGrid };
