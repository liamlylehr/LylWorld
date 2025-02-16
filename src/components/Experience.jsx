import { Environment, Torus, Sphere, Box, OrbitControls } from "@react-three/drei";
import { CapsuleCollider, ConeCollider, ConvexHullCollider, MeshCollider, RigidBody, TrimeshCollider } from "@react-three/rapier";
import { useRef } from "react";
import { useState } from "react";
import { useControls } from 'leva';

import { Map } from "./Map";
import Lighting from "./Lighting";
import CharacterController from "./CharacterController";

const maps = {
  white_round_exhibition_gallery: {
    scale: 1,
    position: [-6, -7, 0],
  },
  vr_exhibition_gallery_baked: {
    scale: 0.6,
    position: [-6, 0, 0],
  },
};

export const Experience = () => {
  const [hover, setHover] = useState(false);

  const cube = useRef();
  const jump = () => {
    cube.current.applyImpulse({ x: 4, y: 2, z: 0 });
  };

  const { map } = useControls("Map", {
    map: {
      value: "vr_exhibition_gallery_baked",
      options: Object.keys(maps),
    },
  });

  const dirLightIntensity = 2;
  const boxDim = [0.7, 0.2, 0.7];

  return (
    <>
      {/* orbit controls offers ability to navigate 3d space w cursor (command, cursor) */}
      <OrbitControls />
      <Environment preset="night" />
      {/* <ambientLight intensity={0.5} /> */}
      
      <Lighting />

      {/* <RigidBody ref={cube} position={[-2.5, 1, 3]} type="dynamic" >
        <Box 
          castShadow
        // onPointerEnter={() => setHover(true)} 
        // onPointerLeave={() => setHover(false)}
        // onClick={jump}
        >
          <meshStandardMaterial color={hover ? "hotpink": "royalblue"}/>
        </Box>
      </RigidBody> */}

      <RigidBody ref={cube} position={[2.5, 1, 2.5]} args={boxDim} type="fixed">
        <Box castShadow receiveShadow args={boxDim}>
          <meshStandardMaterial color="lightgray" />
        </Box>
      </RigidBody>
      <RigidBody ref={cube} position={[-2.5, 1, 2.5]}  args={boxDim} type="fixed">
        <Box castShadow receiveShadow args={boxDim}>
          <meshStandardMaterial color="lightgray" />
        </Box>
      </RigidBody>
      <RigidBody ref={cube} position={[2.5, 1, -2.5]} args={boxDim} type="fixed">
        <Box castShadow receiveShadow args={boxDim}>
          <meshStandardMaterial color="lightgray" />
        </Box>
      </RigidBody>
      <RigidBody ref={cube} position={[-2.5, 1, -2.5]}  args={boxDim} type="fixed">
        <Box castShadow receiveShadow args={boxDim}>
          <meshStandardMaterial color="lightgray" />
        </Box>
      </RigidBody>

      {/* the character controller has the character with the controls and animations wrapped in */}
      <CharacterController />

      {/* <RigidBody position={[3,100,3]} args={[25,1,25]} type="dynamic" colliders={"ball"} restitution={1}>
        <Sphere castShadow>
        <meshStandardMaterial color="hotpink" />
        </Sphere>
      </RigidBody> */}

      <RigidBody type="fixed" friction={2}>
        <Box receiveShadow position={[0, 0, 0]} args={[25,1,25]}>
          <meshStandardMaterial color="beige" />
        </Box>
      </RigidBody>

      {/* This map component would be from the 3d model glb */}
      {/* <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        /> */}

      {/* Restitution is the bounciness of the object */}
      {/* <RigidBody position={[3,5,0]} type="dynamic" restitution={1}>
        <Box args={[1,1,1]}>
          <meshStandardMaterial color="royalblue" />
        </Box>
      </RigidBody> */}

      {/* <RigidBody position={[0,5,0]} rotation-x={Math.PI/2} type="dynamic" colliders={"trimesh"}>
      <Torus>
        <meshStandardMaterial color="orange" />
      </Torus>
      </RigidBody> */}
      
    </>
  );
};
