import React, { useEffect } from "react";
import { folder, LevaPanel, useControls } from "leva";
import { RichterGrid } from "../components/RichterGrid";

const RichterFarben = () => {
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
    color10,
    color11,
    color12,
    color13,
    color14,
    color15,
    color16,
    color17,
    color18,
    color19,
    color20,
    color21,
    color22,
    color23,
    color24,
  } = useControls("Richter Farben", {
    width: { value: 80, min: 1, max: 224, step: 1 },
    height: { value: 80, min: 1, max: 224, step: 1 },
    columns: { value: 70, min: 1, max: 500, step: 1 },
    rows: { value: 70, min: 1, max: 500, step: 1 },
    palette: folder({
      color1: "#909495",
      color2: "#ED7140",
      color3: "#C38CBA",
      color4: "#E95C06",
      color5: "#018933",
      color6: "#FFEB1B",
      color7: "#023F28",
      color8: "#062C6A",
      color9: "#FDCC02",
      color10: "#41338A",
      color11: "#F7B6BE",
      color12: "#C6CC04",
      color13: "#FBA601",
      color14: "#FFF7F5",
      color15: "#E5020D",
      color16: "#C10E22",
      color17: "#0B0A06",
      color18: "#EB5F64",
      color19: "#0376B6",
      color20: "#065797",
      color21: "#411943",
      color22: "#6B2B6B",
      color23: "#02603C",
      color24: "#BF2C45",
    }),
  });

  useEffect(() => {
    console.log("camera");
  }, []);

  return (
    <>
      <LevaPanel />
      <RichterGrid
        width={width}
        height={height}
        columns={columns}
        rows={rows}
        isRandom={false}
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
          color10,
          color11,
          color12,
          color13,
          color14,
          color15,
          color16,
          color17,
          color18,
          color19,
          color20,
          color21,
          color22,
          color23,
          color24,
        ]}
      />
    </>
  );
};

export { RichterFarben };
