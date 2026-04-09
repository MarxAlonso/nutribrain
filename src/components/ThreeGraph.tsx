"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Move } from 'lucide-react';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4 bg-[#030812]">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-500/50">Cargando Mapa Neuronal 3D...</span>
    </div>
  )
});

export default function ThreeGraph() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [SpriteText, setSpriteText] = useState<any>(null);
  const router = useRouter();
  const fgRef = useRef<any>(null);

  useEffect(() => {
    // Load graph data
    fetch('/api/graph')
      .then(res => res.json())
      .then(setData);

    // Load SpriteText dynamically to avoid SSR issues
    import('three-spritetext').then((mod) => {
      setSpriteText(() => mod.default);
    });
  }, []);

  const handlePan = useCallback((dx: number, dy: number) => {
    if (fgRef.current) {
      const camPos = fgRef.current.cameraPosition();
      fgRef.current.cameraPosition(
        { x: camPos.x + dx, y: camPos.y + dy, z: camPos.z },
        { x: camPos.x + dx, y: camPos.y + dy, z: 0 },
        500
      );
    }
  }, []);

  return (
    <div className="w-full h-[450px] md:h-[600px] bg-[#030812] rounded-2xl md:rounded-3xl border border-slate-800/50 overflow-hidden relative group shadow-2xl shadow-emerald-950/20">
      {/* HUD Info */}
      <div className="absolute top-4 md:top-6 left-4 md:left-8 z-10 pointer-events-none max-w-[calc(100%-2rem)]">
        <h3 className="text-emerald-400 font-bold text-sm md:text-xl uppercase tracking-[0.2em] mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Explorador Neuronal 3D</h3>
        <p className="text-[10px] md:text-xs text-slate-500 font-medium">Click para navegar • Zoom para profundizar</p>
      </div>
      
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-8 z-10 flex flex-col gap-2 md:gap-3 pointer-events-none bg-black/40 backdrop-blur-md px-3 md:px-5 py-2 md:py-4 rounded-xl md:rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 md:gap-3">
           <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"></div>
           <span className="text-[9px] md:text-[11px] text-slate-200 font-bold uppercase tracking-wider">Estudio Clínico</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
           <div className="w-4 md:w-6 h-[1.5px] md:h-[2px] bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
           <span className="text-[9px] md:text-[11px] text-slate-200 font-bold uppercase tracking-wider">Conexión Neuronal</span>
        </div>
      </div>

      {/* Pan Navigation Controls */}
      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-8 z-10 flex flex-col items-center gap-1 bg-black/50 backdrop-blur-md p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-emerald-900/50 shadow-lg scale-90 md:scale-100">
        <button onClick={() => handlePan(0, 100)} className="p-1.5 md:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg md:rounded-xl transition-all"><ChevronUp size={18} /></button>
        <div className="flex gap-1">
          <button onClick={() => handlePan(-100, 0)} className="p-1.5 md:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg md:rounded-xl transition-all"><ChevronLeft size={18} /></button>
          <div className="p-1.5 md:p-2 text-emerald-900"><Move size={18} /></div>
          <button onClick={() => handlePan(100, 0)} className="p-1.5 md:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg md:rounded-xl transition-all"><ChevronRight size={18} /></button>
        </div>
        <button onClick={() => handlePan(0, -100)} className="p-1.5 md:p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg md:rounded-xl transition-all"><ChevronDown size={18} /></button>
      </div>

      <div className="w-full h-full transition-opacity duration-1000">
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
          nodeLabel="name"
          nodeColor={() => '#10b981'}
          linkColor={() => 'rgba(16, 185, 129, 0.6)'}
          linkDirectionalParticles={4}
          linkDirectionalParticleSpeed={0.01}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleColor={() => '#4ade80'}
          backgroundColor="#030812"
          nodeThreeObject={(node: any) => {
            if (!SpriteText) return false;
            const sprite = new SpriteText(node.name);
            sprite.color = '#e2e8f0';
            sprite.textHeight = 8;
            sprite.fontWeight = 'bold';
            return sprite;
          }}
          onNodeClick={(node: any) => {
            router.push(`/n/${node.id}`);
          }}
          nodeResolution={24}
          linkWidth={2}
          showNavInfo={false}
          nodeRelSize={7}
        />
      </div>
    </div>
  );
}
