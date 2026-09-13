import style from "./ColorSelect.module.scss";
import { Flex } from "@mantine/core";
import MotionGrow from "../motion/MotionGrow.tsx";
import { type ColorOption, useColorOptions } from "./hooks/useColorOptions.ts";

type ColorSelectProps = {
  onChange: (selection: ColorOption) => void;
};
const ColorSelect = ({ onChange }: ColorSelectProps) => {
  const COLOR_OPTIONS = useColorOptions();

  return (
    <Flex gap={8}>
      {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
        <MotionGrow
          style={value}
          className={style.colorCircle}
          withHoverControl
          onClick={() => onChange(key as ColorOption)}
        />
      ))}
    </Flex>
  );
};

export default ColorSelect;
