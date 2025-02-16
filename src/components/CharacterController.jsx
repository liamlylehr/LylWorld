import React from 'react';
import Character from './Character';
import { RigidBody, CapsuleCollider} from '@react-three/rapier';
import { useRef, useState, useEffect } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from 'leva';


export default function CharacterController() {
    const { WALK_SPEED, RUN_SPEED, JUMP_POWER, ROTATION_SPEED } = useControls(
        "Character Control",
        {
            WALK_SPEED: { value: 2, min: 0.1, max: 4, step: 0.1 },
            RUN_SPEED: { value: 6, min: 0.2, max: 12, step: 0.1 },
            JUMP_POWER: { value: 1, min: 1, max: 10, step: 0.5 },
            ROTATION_SPEED: {
                value: degToRad(1),
                min: degToRad(0.1),
                max: degToRad(5),
                step: degToRad(0.1),
          },
        }
      );
    const rb = useRef();
    const container = useRef();

    // XXX - for setting character rotation
    const rotationTarget = useRef(0);

    const cameraTarget = useRef();
    const cameraPosition = useRef();
    const character = useRef();
    const cameraWorldPosition = useRef(new Vector3());
    const cameraLookAtWorldPosition = useRef(new Vector3());
    const cameraLookAt = useRef(new Vector3());
    const [, get] = useKeyboardControls();

    const [animation, setAnimation] = useState("BreathingIdle");
    const [orbitControl, setOrbitControl] = useState(false);

    useEffect(() => {
        // XXX - trying to set orbitControl toggle
        if (get().orbitControl) {
            setOrbitControl(!orbitControl);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.code === 'Space') {
            // Apply an upward force to the character's rigid body
            if (rb.current) {
              rb.current.applyImpulse(new Vector3(0, JUMP_POWER, 0), true);
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    // handles camera angle and position
    // lerping returns the value between two numbers at a specified position
    useFrame(({ camera }) => {
        if (rb.current) {
            const vel = rb.current.linvel();
            const movement = {
                x: 0,
                z: 0,
            };
            // handle direction of movement (forward, backward, left, right)
            if (get().forward) {
                movement.z = 1;
            }
            if (get().backward) {
                movement.z = -1;
            }
            if (get().left) {
                movement.x = 1;
                setAnimation("LeftTurn");
            }
            if (get().right) {
                movement.x = -1;
                setAnimation("RightTurn");
            }

            // set rotation speed
            if (movement.x !== 0) {
                rotationTarget.current += ROTATION_SPEED * movement.x;
            }

            // set speed of movement
            let speed = get().run ? RUN_SPEED : WALK_SPEED;

            // handle animation logic
            if (movement.x === 0 && movement.z === 0) {
                setAnimation("BreathingIdle");
            }
            if (movement.z > 0) {
                // set speed of movement
                let speed = get().run ? RUN_SPEED : WALK_SPEED;

                vel.x = Math.sin(rotationTarget.current) * speed;
                vel.z = Math.cos(rotationTarget.current) * speed;
                setAnimation(get().run ? "Run" : "ForwardWalk");
            }
            if (movement.z < 0) {
                // set speed of movement
                let speed = get().run ? (RUN_SPEED/2) : WALK_SPEED;

                vel.x = -Math.sin(rotationTarget.current) * speed;
                vel.z = -Math.cos(rotationTarget.current) * speed;
                setAnimation(get().run ? "MoonWalk" : "BackwardWalk");
            }

            rb.current.setLinvel(vel, true);
        }

        // CAMERA logic
        container.current.rotation.y = MathUtils.lerp(
            container.current.rotation.y,
            rotationTarget.current,
            0.1
        );

        cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
        camera.position.lerp(cameraWorldPosition.current, 0.01);

        if (orbitControl == false && cameraTarget.current) {
            cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
            cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.005);

            camera.lookAt(cameraLookAt.current);
        }
    });

    return (
        // Add your component's JSX code here
        <RigidBody position={[0,0,0]} colliders={false} lockRotations ref={rb}>
            <group ref={container} >
                <group ref={cameraTarget} position-y={1.2} position-z={0} />
                <group ref={cameraPosition} position-y={3} position-z={-10} />
                {/* rotation-x={-Math.PI/2} */}
                <group ref={character}>
                    <Character animation={animation}/>
                </group>
            </group>
            <CapsuleCollider position={[0,0.91,0]} args={[0.75, 0.2]} />
        </RigidBody>
    );
}
