"use client";
import { expressionColors, isExpressionColor } from "@/utils/expressionColors";
import { motion } from "framer-motion";
import { CSSProperties } from "react";
import * as R from "remeda";

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

export default function Expressions({
  values,
}: {
  values: Record<string, number>;
}) {
  const top3 = R.pipe(
    values,
    R.entries(),
    R.sortBy(([_, value]) => -value),
    R.take(3)
  );

  return (
    <div
      className={
        "text-xs p-3 w-full border-t border-border flex flex-col md:flex-row gap-3"
      }
    >
      {top3.map(([key, value]) => {
        const bgColor = isExpressionColor(key) ? expressionColors[key] : "var(--bg)";
        const textColor = getContrastColor(bgColor);

        return (
          <div key={key} className={"w-full overflow-hidden"}>
            <div className={"flex items-center justify-between gap-1 font-mono pb-1"}>
              <div className={"font-medium truncate"} style={{ color: textColor }}>{key}</div>
              <div className={"tabular-nums opacity-75"} style={{ color: textColor }}>{value.toFixed(2)}</div>
            </div>
            <div
              className={"relative h-3 rounded-full overflow-hidden"}
              style={{
                backgroundColor: bgColor,
                opacity: 0.3,
                borderColor: textColor,
              }}
            >
              <motion.div
                className={"absolute top-0 left-0 h-full"}
                style={{
                  backgroundColor: bgColor,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${R.pipe(
                    value,
                    R.clamp({ min: 0, max: 1 }),
                    (value) => `${value * 100}%`
                  )}`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
