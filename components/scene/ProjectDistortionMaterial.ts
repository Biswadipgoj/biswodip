import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const ProjectDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uHoverState: 0,
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHoverState;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Add a slight wave to the geometry when hovered
      float wave = sin(pos.x * 5.0 + uTime * 3.0) * 0.05 * uHoverState;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHoverState;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion effect based on hover state
      float dist = distance(uv, vec2(0.5));
      vec2 offset = vec2(sin(uv.y * 10.0 + uTime), cos(uv.x * 10.0 + uTime)) * 0.03 * uHoverState;
      
      vec4 texColor = texture2D(uTexture, uv + offset);
      
      // Convert to grayscale when not hovered, full color when hovered
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      vec3 finalColor = mix(vec3(gray), texColor.rgb, uHoverState);
      
      gl_FragColor = vec4(finalColor, texColor.a);
      
      // Add linear sRGB conversion for proper color rendering in React Three Fiber
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
);

extend({ ProjectDistortionMaterial });

export { ProjectDistortionMaterial };

// Declaration for TypeScript
declare module '@react-three/fiber' {
  interface IntrinsicElements {
    projectDistortionMaterial: any;
  }
}
