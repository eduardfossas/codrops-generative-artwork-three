import { DeStijlGrid } from "../components/DeStijlGrid";
import { folder, useControls } from "leva";

const DeStijl = () => {
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
  } = useControls("De Stijl", {
    width: { value: 60, min: 1, max: 224, step: 1 },
    height: { value: 60, min: 1, max: 224, step: 1 },
    columns: { value: 10, min: 1, max: 500, step: 1 },
    rows: { value: 12, min: 1, max: 500, step: 1 },
    palette: folder({
      color1: "#1a1a1a",
      color2: "#4d74cc",
      color3: "#bc3d30",
      color4: "#ffef00",
      color5: "#ffffff",
    }),
  });

  return (
    <DeStijlGrid
      width={width}
      height={height}
      columns={columns}
      rows={rows}
      palette={[color1, color2, color3, color4, color5]}
    />
  );
};

export { DeStijl };
