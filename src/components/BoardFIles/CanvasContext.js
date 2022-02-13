import React, { useContext, useRef, useState, useEffect } from "react";

// import io, { Socket } from "socket.io-client";

// const socket = io.connect("http://localhost:5000")

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {

  const [socket, setSocket] = useState(null)
  

  const [User, setUser] = useState({roomId: '', user: '', isTeacher: false})

  const [isDrawing, setIsDrawing] = useState(false)
  
  const [Color, setColor] = useState("green")
  const [Type, setType] = useState("pencil")

  const [MousePos, setMousePos] = useState({x: 0, y: 0})
  const [ClickMousePos, setClickMousePos] = useState({x: 0, y: 0})

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Effect hook

  // useEffect(() => {
  //   console.log(User)
  //   if (User.roomId !== '' && User.user !== "")
  //     socket.emit("join-room", User); 
  // }, [User])

  useEffect(() => {
    if (socket !== null){
      socket.on("recieve-canvas", data => {
        console.log("data")
        let image = new Image();
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d')
        image.onload = () => {
          ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2)
        }
        image.src = data
      })
    }
  }, [socket])

  useEffect(() => {

    function pasteImage(e){
      console.log(e.clipboardData.items)

        if (e.clipboardData == false){
            return
        }

        let items = e.clipboardData.items
        let src = null
    
        if (items == undefined){
            return
        }


        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.type.indexOf("image") == -1) continue

            let blob = item.getAsFile()
            let URLObj = window.URL || window.webkitURL;
            
            src = URLObj.createObjectURL(blob)

            console.log(blob)
        }

        drawImage(src, MousePos.x, MousePos.y, 300, 300)
    }

    window.addEventListener("paste", pasteImage)

    return () => {
      window.removeEventListener("paste", pasteImage)
    }
  })

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = (e) => {
    setClickMousePos({x: e.clientX, y: e.clientY})
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    console.log("Sart")

    switch (Type) {
      case "eraser":
        contextRef.current.strokeStyle="white"
        contextRef.current.lineWidth=25
        break;
    
      default:
        contextRef.current.strokeStyle=Color
        contextRef.current.lineWidth=5
        break;
    }

    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {

    if (Type === "rect"){
      contextRef.current.rect(ClickMousePos.x, ClickMousePos.y, MousePos.x - ClickMousePos.x, MousePos.y - ClickMousePos.y)
      contextRef.current.stroke()
    } else if (Type == "circle"){
      contextRef.current.ellipse(ClickMousePos.x, ClickMousePos.y ,50, 50, 0, 0, Math.PI * 2)
      contextRef.current.stroke()
    }

    contextRef.current.closePath();
    setIsDrawing(false);

    socket.emit("send-canvas", { roomId: User.roomId, image: canvasRef.current.toDataURL("image/png")})
  };

  const drawPencil = (offsetX, offsetY) => {
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const drawImage = (url, x, y, width, height) => {
    const image = new Image()

    image.src = url

    image.onload = () => {
      contextRef.current.drawImage(image, x - width / 2, y - width / 2, width, height)
    }
  }

  const draw = (e) => {

    setMousePos({x: e.clientX, y: e.clientY})

    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = e.nativeEvent;

    switch (Type) {
      case "pencil":
        drawPencil(offsetX, offsetY)
        
        break;
      case "eraser":
        drawPencil(offsetX, offsetY)
        break;
      case "rect":
        break;
      default:
        break;
    }
    
  };
   
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const changeColor = (color) => {
    setColor(color)
  }

  const changeType = (type) => {
    setType(type)
  }

  const _setUser = (roomId, user, isTeacher) => {
    setUser({roomId: roomId, user: user, isTeacher})
  }

  const _setSocket =  (socket) =>{
    setSocket(socket)
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        changeColor,
        changeType,
        _setUser,
        _setSocket
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
