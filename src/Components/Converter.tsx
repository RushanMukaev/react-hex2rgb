import { useState } from "react";

export default function Converter() {
  const [result, setResult] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  function onInput(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.value !== "" && !e.target.value.startsWith("#")) {
      setResult("Ошибка! Введите hex, начиная с #");
      setIsError(true);
      return;
    }
    const hex = e.target.value.slice(1);

    if (hex.length === 6 && /^[0-9A-Fa-f]{6}$/.test(hex)) {
      const result = parseInt(hex, 16);
      const r = (result >> 16) & 255;
      const g = (result >> 8) & 255;
      const b = result & 255;

      setResult(`rgb(${r}, ${g}, ${b})`);
      setIsError(false);
    } else if (hex.length === 6) {
      setResult("Ошибка!");
      setIsError(true);
    } else {
      setResult("");
      setIsError(false);
    }
  }

  function changeColor(rgb: string, amount: number): string {
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return rgb;

    const r = Math.max(0, parseInt(rgbValues[0]) - amount);
    const g = Math.max(0, parseInt(rgbValues[1]) - amount);
    const b = Math.max(0, parseInt(rgbValues[2]) - amount);

    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: isError ? "#d90404" : result }}
    >
      <form className="form">
        <input
          className="input"
          id="color"
          type="text"
          maxLength={7}
          onInput={onInput}
          placeholder="Введите hex"
        />
      </form>
      <div
        className="result"
        style={{
          backgroundColor: isError ? "#ab1515" : changeColor(result, 15),
          color: isError ? "#f2eded" : changeColor(result, -50),
        }}
      >
        {result}
      </div>
    </div>
  );
}
