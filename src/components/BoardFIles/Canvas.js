import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas({color, type}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    changeColor,
    changeType
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  useEffect(() => {
    changeColor(color)
  }, [color])

  useEffect(() => {
    changeType(type)
  }, [type])

  return (
    <canvas style={{backgroundColor:"white"}}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}