import { LygiaGrid } from "../components/LygiaGrid";
import { folder, useControls } from "leva";

const Lygia = () => {
  const {
    width,
    height,
    columns,
    rows,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
    color9,
  } = useControls("Lygia", {
    width: { value: 50, min: 1, max: 224, step: 1 },
    height: { value: 80, min: 1, max: 224, step: 1 },
    columns: { value: 12, min: 1, max: 500, step: 1 },
    rows: { value: 10, min: 1, max: 500, step: 1 },
    palette: folder({
      color1: "#B04E26",
      color2: "#007443",
      color3: "#263E66",
      color4: "#CABCA2",
      color5: "#C3C3B7",
      color6: "#8EA39C",
      color7: "#E5C03C",
      color8: "#66857F",
      color9: "#3A5D57",
    }),
  });

  return (
    <>
      <LygiaGrid
        width={width}
        height={height}
        columns={columns}
        rows={rows}
        palette={[
          color1,
          color2,
          color3,
          color4,
          color5,
          color6,
          color7,
          color8,
          color9,
        ]}
      />
    </>
  );
};

export { Lygia };
