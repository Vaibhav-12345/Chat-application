import { useEffect, useRef, useState } from "react";

const App = () => {
  const [message, setMessage] = useState(['hello']);

  // input value send from client to server when button click

   
  const textRef = useRef<HTMLInputElement>(null);
 
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error 
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    // we create backend connection from client side
    const ws = new WebSocket("ws://localhost:3000");

    // server se sab message aayega
    ws.onmessage = (event) => {
      console.log(event.data);

      // setMessage(x=>[...x,event.data])

      setMessage((m) => [...m, event.data]);
    };


    wsRef.current=ws

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        "type":"join",
        "payload":{
            "roomID":"red"
        }
    }))

    return ()=>{
      ws.close()
    }
    }
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <div className="h-[95vh]">
        {message.map((message,idx) => (
          <div className="flex" key={idx}>
            <span className="bg-white   text-black rounded p-4 m-3">
              {message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex mx-5 ">
        <input
          className="text-xl flex-1 outline-none"
          type="text"
          ref={textRef}
          placeholder="enter message..."
        />
        <button
          onClick={() => {
            const message=textRef.current?.value
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: message,
                },
              })
            );
          }}
          className="bg-purple-600 flex-0.5 text-white px-4 py-2"
        >
          Send messages
        </button>
      </div>
    </div>
  );
};

export default App;
