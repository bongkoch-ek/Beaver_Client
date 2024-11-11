import React, { useEffect, useRef, useState } from "react";
import Homepic from "../pictures/homepic-keeptrack.png";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import typeSound from "../sounds/typing-sound.m4a"; // Import ไฟล์เสียง
import { Howl } from "howler";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMouseMove, setIsMouseMove] = useState(true);

  const navigate = useNavigate();
  // const [audio] = useState(new Audio(typeSound)); // Initialize the Audio object

  // --autoplay-policy=no-user-gesture-required
  const playSound = () => sound.play();

  useEffect(() => {
    playSound();
  }, []);

  const sound = new Howl({
    src: [typeSound],
    autoplay: true, // Automatically plays on load if set to true, but requires user interaction
    onload: () => console.log("Sound loaded"),
  });

  const goToProject = () => {
    console.log("OK");
    navigate("/project");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isMouseMove && (
        <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 relative">
          <div className="text-center p-10 bg-white/75 rounded-xl shadow-lg relative z-10 max-w-[50%]">
            <h1 className="text-5xl font-bold leading-snug text-black">
              <Typewriter
                options={{
                  delay: 75,
                  autoStart: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    // .callFunction(()=>{
                    //   playTypeSound()
                    // })
                    // .callFunction(playTypeSound)
                    .typeString(
                      'Keep Your Projects <span style="color: #FFE066;">on Track</span> from <span style="color: #FFE066;">Start</span> to <span style="color: #FFE066;">Finish</span>'
                    )
                    .start()
                    .callFunction(() => console.log("runn"))
                    .callFunction(() => setIsOpen(true));
                }}
              />
            </h1>
            {isOpen && (
              <>
                  <p className="mt-6 text-gray-600 text-lg">
                    Effortless planning, task assignment and real - time updates
                    for total project control.
                  </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  }}
                >
                  <button
                    onClick={goToProject}
                    className="mt-6 px-6 py-2 bg-[#FFE066] text-black rounded-lg hover:bg-yellow-400 shadow-md z-50"
                  >
                    Create a Project
                  </button>
                </motion.div>
              </>
            )}
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 flex justify-center items-center ">
            <img
              src={Homepic}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
