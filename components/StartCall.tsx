import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function StartCall() {
  const { status, connect } = useVoice();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    console.log("StartCall: status changed", status.value);
    if (status.value === "connected") {
      setIsConnecting(false);
    }
  }, [status.value]);

  const handleConnect = async () => {
    console.log("StartCall: handleConnect called");
    setIsConnecting(true);
    try {
      console.log("StartCall: Calling connect()");
      await connect();
      console.log("StartCall: connect() completed");
    } catch (error) {
      console.error("StartCall: Failed to connect:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      } else {
        console.error("Non-Error object thrown:", error);
      }
      setIsConnecting(false);
    }
  };

  console.log("StartCall: Rendering, status:", status.value, "isConnecting:", isConnecting);

  return (
    <AnimatePresence>
      {status.value !== "connected" && !isConnecting ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5"}
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>{isConnecting ? "Connecting..." : "Start Call"}</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
