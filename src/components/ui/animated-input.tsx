"use client";

import NumberFlow from "@number-flow/react";
import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface AnimatedInputProps
  extends Omit<
    React.ComponentProps<typeof Input>,
    "type" | "onChange" | "value"
  > {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function AnimatedInput({
  value = 0,
  min = -Infinity,
  max = Infinity,
  onChange,
  className,
  ...props
}: AnimatedInputProps) {
  const defaultValue = React.useRef(value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = React.useState(true);
  const [showCaret, setShowCaret] = React.useState(true);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: el,
  }) => {
    setAnimated(false);
    let next = value;
    if (el.value === "") {
      next = defaultValue.current;
    } else {
      const num = parseInt(el.value);
      if (!isNaN(num) && min <= num && num <= max) next = num;
    }
    el.value = String(next);
    onChange?.(next);
  };

  return (
    <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
      <Input
        {...props}
        ref={inputRef}
        className={cn(
          "text-transparent text-center",
          showCaret ? "caret-primary" : "caret-transparent",
          className
        )}
        style={{ fontKerning: "none" }}
        type="number"
        min={min}
        step={1}
        autoComplete="off"
        inputMode="numeric"
        max={max}
        value={value}
        onInput={handleInput}
      />
      <NumberFlow
        value={value}
        format={{ useGrouping: false }}
        aria-hidden="true"
        animated={animated}
        onAnimationsStart={() => setShowCaret(false)}
        onAnimationsFinish={() => setShowCaret(true)}
        className="pointer-events-none"
        willChange
      />
    </div>
  );
}
