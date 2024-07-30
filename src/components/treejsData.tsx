"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    let currentTime = 0;
    const timeAddition = Math.random() * 1000;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      100
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const startTime = new Date().getTime();

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 1 + timeAddition },
      resolution: { value: new THREE.Vector2(width, height) }
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 resolution;
        uniform float time;
        
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
          return mod289(((x * 34.0) + 1.0) * x);
        }

        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;

          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        float addColorStop(float noise, float start, float length) {
          float distance = start - noise;
          float fadeLength = 1.0;
          if (distance < 0.0) { distance *= -1.0; }

          if (distance < length / 2.0) {
            return 1.0;
          } else if (distance < length / 2.0 + fadeLength) {
            float fadeDist = fadeLength / (distance + length / 2.0);
            return fadeDist * 0.05;
          } else {
            return 0.0;
          }
        }

        void main() {
          float speed = 8.0;
          float scale = 0.6;
          float opacity = 1.0;

          vec2 st = gl_FragCoord.xy / resolution.xy;
          st.x *= resolution.x / resolution.y;
          st *= scale;

          vec3 noisePosition = vec3(st.x, st.y, time * speed * 0.06);
          float noise = snoise(noisePosition);

          // 计算渐变颜色
          vec3 color = vec3(0.9); // 默认白色背景

    // 计算渐变颜色，随时间变化
    float t = (sin(time * 20.0) + 1.0) / 2.0; // 使用 sin 函数平滑过渡
  
     float gradientStrength = smoothstep(0.0, 0.1, noise);

  vec3 noiseColor;

  vec3 startColor = vec3(1.0, 0.84, 0.0); // 金黄色
  vec3 endColor = vec3(0.9, 0.9, 0.9); // 白色

    vec3 color1 = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), t); // 红色到绿色随时间渐变
  
  if (noise < 0.14) {
    noiseColor = mix(color1, endColor, noise / 0.14 * t);
  } else {
    noiseColor = mix(endColor, endColor, (noise - 0.14) / 0.14 * t);
   }

          color = mix(color, noiseColor, gradientStrength);
          opacity -= addColorStop(noise, 0.1, 0.04);

          gl_FragColor = vec4(color, opacity);
        }
      `,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });

    const geometry = new THREE.PlaneGeometry(width, height, 32);
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(plane);
    plane.position.z = 0.5;

    camera.position.y = 0;
    camera.position.x = 0;
    camera.position.z = 100;

    const render = () => {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 9000;
      uniforms.time.value = currentTime + timeAddition;

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;
