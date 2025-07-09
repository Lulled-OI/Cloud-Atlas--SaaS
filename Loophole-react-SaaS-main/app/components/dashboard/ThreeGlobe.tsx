import React from "react";

// Three.js Globe Component (separate file to avoid SSR issues)
export default function ThreeGlobe({ newsData }: { newsData: any[] }) {
  // If Three.js is not available, return fallback
  try {
    // This would normally contain the Three.js Canvas component
    // For now, return a placeholder that won't break
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-4 text-white">
          <div className="text-lg font-semibold">3D Globe Loading...</div>
          <p className="text-blue-200">Three.js globe will render here</p>
          <div className="text-sm text-blue-300">
            Install Three.js dependencies: npm install three @types/three @react-three/fiber @react-three/drei
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-4 text-white">
          <div className="text-lg font-semibold">3D Globe Unavailable</div>
          <p className="text-blue-200">Using 2D visualization</p>
        </div>
      </div>
    );
  }
}
