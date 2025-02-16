import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const lightACoord = [0, 3, 0];
const lightBCoord = [5, 3, 5];
const lightCCoord = [-5, 3, 5];
const lightDCoord = [5, 3, -5];
const lightECoord = [-5, 3, -5];

const intensity = 3;

const Lighting = () => {
  return (
    <>
    <pointLight
      position={lightACoord}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
    />
    <mesh position={lightACoord}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>

    <pointLight
      position={lightBCoord}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
    />
    <mesh position={lightBCoord}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>

    <pointLight
      position={lightCCoord}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
    />
    <mesh position={lightCCoord}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>

    <pointLight
      position={lightDCoord}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
    />
    <mesh position={lightDCoord}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>

    <pointLight
      position={lightECoord}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
    />
    <mesh position={lightECoord}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
    
    </>
  );
};

export default Lighting;