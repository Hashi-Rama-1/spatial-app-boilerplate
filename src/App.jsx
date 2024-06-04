import { Canvas, useThree } from '@react-three/fiber';
import './App.css';
import { OrbitControls, Stats } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useEffect, useState } from 'react';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';

const Cube = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene = ({ gltf }) => {
  const { scene } = useThree();

  useEffect(() => {

    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(1000, 1000); 
    scene.add(gridHelper);

    
  }, [scene]);
  

  return (
    <>
      {gltf && <primitive object={gltf.scene} position={[0, 0, 0]} />}
    </>
  );
};

export default function App() {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    dracoLoader.setDecoderConfig({ type: 'js' }); // Ensure the type is 'js'
    loader.setDRACOLoader(dracoLoader);

    loader.load('/spaceship.glb', (gltf) => {
      setGltf(gltf);
    }, undefined, (error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <Canvas camera={{ position: [-8, 5, 8] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <color attach="background" args={['#3b3b3b']} />
        <Scene gltf={gltf} />
        <OrbitControls />
        <Stats />
      </Canvas>
    </>
  );
}

