import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Phone, ArrowRight, Leaf } from 'lucide-react';
import * as THREE from 'three';

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#e8f5e9') }, // Soft green
    uColor2: { value: new THREE.Color('#fdfdfb') }, // Background
  });

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      uniforms.current.uTime.value = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={1.5}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        wireframe={false}
        uniforms={uniforms.current}
        transparent={true}
        opacity={0.6}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          // Classic Perlin 3D Noise by Stefan Gustavson
          vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
          vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
          
          float cnoise(vec3 P){
            vec3 Pi0 = floor(P); // Integer part for indexing
            vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;
            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);
            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);
            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);
            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;
            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);
            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }

          void main() {
            vUv = uv;
            vec3 pos = position;
            float noiseFreq = 1.5;
            float noiseAmp = 0.4;
            vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime, pos.z * noiseFreq);
            float elevation = cnoise(noisePos) * noiseAmp;
            pos += normal * elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vElevation;
          
          void main() {
            float mixStrength = (vElevation + 0.4) * 1.5;
            vec3 color = mix(uColor2, uColor1, mixStrength);
            gl_FragColor = vec4(color, 0.6);
          }
        `}
      />
    </mesh>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Three.js Blob */}
      {webglSupported && (
        <div className="absolute inset-0 z-0 opacity-70">
          <WebGLErrorBoundary>
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ failIfMajorPerformanceCaveat: false }}>
              <Blob />
            </Canvas>
          </WebGLErrorBoundary>
        </div>
      )}

      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] z-0 pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          
          <motion.div 
            style={{ y, opacity }}
            className="flex flex-col items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">Ayurvedic Wellness Clinic</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground leading-[1.1] tracking-tight mb-6"
            >
              Natural Healing <br />
              <span className="italic text-primary">Through Ayurveda</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 sm:mb-10 max-w-lg leading-relaxed"
            >
              Experience authentic Ayurvedic treatments for a healthier, happier life. 
              Restoring balance with nature's wisdom.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => scrollTo('#book')}
                className="group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10">Book Appointment</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
              
              <a 
                href="tel:+919872870081"
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Phone size={18} className="text-primary group-hover:text-current" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Call Now</span>
                  <span className="font-mono font-medium">+91 9872870081</span>
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 mt-10 lg:mt-0"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-2xl">
              <img 
                src="/hero-doctor.png" 
                alt="Ayurvedic Doctor" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-20 bg-card/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-border/50 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Leaf className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Authentic</p>
                  <p className="text-foreground font-serif font-semibold">Panchakarma</p>
                </div>
              </motion.div>
              
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -inset-4 border border-primary/20 rounded-[2.5rem] -z-10 transform rotate-3" />
          </motion.div>

        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}