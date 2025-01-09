import { ShapesGrid } from "../components/ShapesGrid";
import { folder, useControls } from "leva";

const Shapes = () => {
  const { width, height, columns, rows, color1 } = useControls("Shapes", {
    width: { value: 70, min: 1, max: 224, step: 1 },
    height: { value: 70, min: 1, max: 224, step: 1 },
    columns: { value: 11, min: 1, max: 500, step: 1 },
    rows: { value: 11, min: 1, max: 500, step: 1 },
    palette: folder({
      color1: "#000000",
    }),
  });

  return (
    <>
      <ShapesGrid
        width={width}
        height={height}
        columns={columns}
        rows={rows}
        palette={[color1]}
      />
    </>
  );
};

export { Shapes };
