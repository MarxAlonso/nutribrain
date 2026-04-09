"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="w-full h-[600px] bg-[#030812] rounded-3xl border border-slate-800/50 overflow-hidden relative group shadow-2xl shadow-emerald-950/20">
      {/* HUD Info */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h3 className="text-emerald-400 font-bold text-xl uppercase tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Explorador Neuronal 3D</h3>
        <p className="text-xs text-slate-500 font-medium">Click para navegar • Zoom para profundizar • Drag para rotar</p>
      </div>
      
      <div className="absolute bottom-6 left-8 z-10 flex gap-6 pointer-events-none bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
           <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Estudio Clínico</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-6 h-[1px] bg-emerald-800"></div>
           <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Conexión Evidente</span>
        </div>
      </div>

      <div className="w-full h-full opacity-0 animate-in fade-in fill-mode-forwards duration-1000">
        <ForceGraph3D
          graphData={data}
          nodeLabel="name"
          nodeColor={() => '#10b981'}
          linkColor={() => 'rgba(16, 185, 129, 0.2)'}
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
          linkWidth={1.5}
          showNavInfo={false}
          nodeRelSize={7}
        />
      </div>
    </div>
  );
}
