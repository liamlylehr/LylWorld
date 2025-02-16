import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
// import CharacterController from './components/CharacterController';
import { Experience } from './components/Experience';
import { KeyboardControls } from "@react-three/drei";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "orbitControl", keys: ["Space"]}
];

function App() {
  return (
    <>
    {/* XXX - need to fix styling so banner stays in place, or animate an intro + gameplay instructions, probably going to go with the second one */}
      {/* <div><h1>The World</h1></div> */}
      <KeyboardControls map={keyboardMap}>
      <Canvas shadows camera={{ position: [-3, 1, 15], fov: 40 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;