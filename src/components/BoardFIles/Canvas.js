import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas({color, type, user, socket}) {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    changeColor,
    changeType,
    _setUser,
    _setSocket
  } = useCanvas();

  useEffect(() => {
    _setSocket(socket)
    prepareCanvas();
    console.log(user)
    
  }, []);

  useEffect(() => {
    _setUser(user.roomId, user.user, user.isTeacher)
  }, [user])

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