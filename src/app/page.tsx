'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  return (
    <main className="bg-slate-950 text-slate-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-cyan-500">AGP</div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#methodology" className="hover:text-cyan-400 transition-colors">Methodology</a>
            <a href="#audio" className="hover:text-cyan-400 transition-colors">Audio</a>
            <a href="#archive" className="hover:text-cyan-400 transition-colors">Archive</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            <div className="section-number">Publication</div>
            <h1>America's Got Problems</h1>
            <p className="text-2xl text-slate-400 italic">A Systems-Level Diagnosis of Hybrid Cognition</p>
            
            <div className="citation-block">
              Featherstone, Damien Edward. America's Got Problems: A Systems-Level Diagnosis of Hybrid Cognition. Version 1.0, March 2026.
            </div>

            <p className="text-lg leading-relaxed max-w-2xl">
              This work demonstrates a structured approach to hybrid cognition where multiple AI systems are orchestrated under human guidance. Iterative integration across narrative, operational, and analytical domains produces outputs exceeding the capabilities of any single AI or unaided human reasoning. Designed for constrained environments, this methodology enables rapid, high-fidelity decision-making.
            </p>

            <div className="flex gap-4 pt-6">
              <button className="primary" onClick={() => document.getElementById('audio')?.scrollIntoView({ behavior: 'smooth' })}>
                ▶ Listen
              </button>
              <button onClick={() => window.open('/pdf/agp-methodology-v1.pdf')}>
                ⬇ Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* I. Problem Framing */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="section-number">I. Problem Framing</div>
          <h2>The Problem Damien Tackles</h2>
          
          <div className="space-y-4">
            <p>
              Conventional AI use is limited: single-task, narrow outputs, human must integrate manually. Complex problems require cross-domain reasoning, strategy synthesis, and operational intelligence.
            </p>
            <p>
              Damien's goal: demonstrate human-AI hybrid cognition that produces actionable, high-value outputs beyond normal human or AI capacity.
            </p>
          </div>
        </div>
      </section>

      {/* II. Hybrid Cognition Model */}
      <section id="methodology" className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">II. Hybrid Cognition Model</div>
          <h2>Multi-AI Orchestration</h2>
          
          <p className="text-slate-400">
            Method: Coordinates multiple AI systems in parallel to produce insights along complementary dimensions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { model: 'Model A', role: 'Risk Analysis', output: '6 high-probability failure points + mitigation' },
              { model: 'Model B', role: 'Narrative Strategy', output: '3 framing options with projected impact' },
              { model: 'Model C', role: 'Operational Design', output: 'Stepwise execution plan + dependencies' },
              { model: 'Model D', role: 'Stakeholder Mapping', output: 'Influence map + leverage points' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border-l-4 border-cyan-500">
                <h4 className="text-cyan-400 mb-2">{item.model}</h4>
                <p className="text-sm font-semibold mb-3">{item.role}</p>
                <p className="text-sm text-slate-400">{item.output}</p>
              </div>
            ))}
          </div>

          <div className="metadata-section">
            <strong>Result:</strong> Damien synthesizes all streams into one integrated, actionable strategy.
          </div>

          <h3>The Hybrid Cognition Methodology</h3>
          <p className="text-slate-400">A structured framework for integrating multiple AI systems with human judgment.</p>

          <div className="grid grid-cols-5 gap-4 py-8">
            {[
              { num: 1, title: 'Amalgamate', desc: 'AI outputs from multiple streams' },
              { num: 2, title: 'Apply', desc: 'Recursive human-AI feedback loops' },
              { num: 3, title: 'Resolve', desc: 'Conflicts with dynamic reconciliation' },
              { num: 4, title: 'Translate', desc: 'Abstract reasoning into operations' },
              { num: 5, title: 'Record', desc: 'Meta-learning lessons for improvement' },
            ].map((step) => (
              <div key={step.num} className="text-center space-y-3">
                <div className="w-12 h-12 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center font-bold mx-auto">
                  {step.num}
                </div>
                <h4 className="text-sm font-semibold">{step.title}</h4>
                <p className="text-xs text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="metadata-section">
            <strong>Value:</strong> Produces results beyond what either human or AI could achieve alone.
          </div>
        </div>
      </section>

      {/* III. Operational Framework */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">III. Operational Framework</div>
          <h2>Operational Intelligence Example</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-cyan-400">Scenario</h3>
              <p className="text-slate-400">Mobile-only, limited resources, high-attention environment.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-cyan-400">Process</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Decompose problem into independent axes</li>
                <li>• Generate parallel AI solutions with risk scoring</li>
                <li>• Compare scenarios and weight outcomes</li>
                <li>• Synthesize compact, executable blueprint</li>
              </ul>
            </div>
          </div>

          <div className="metadata-section">
            <strong>Outcome:</strong> Actionable strategy that can be implemented immediately — fully traceable and reproducible.
          </div>
        </div>
      </section>

      {/* IV. Intellectual Contribution */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">IV. Intellectual Contribution</div>
          <h2>Original Methodology</h2>
          
          <blockquote className="text-xl italic text-slate-300 border-l-4 border-cyan-500 pl-6 py-4">
            This work demonstrates a structured approach to hybrid cognition where multiple AI systems are orchestrated under human guidance. Iterative integration across narrative, operational, and analytical domains produces outputs exceeding the capabilities of any single AI or unaided human reasoning.
          </blockquote>

          <div className="metadata-section">
            <strong>Takeaway:</strong> Damien is creating new methodology and knowledge — not just using AI.
          </div>
        </div>
      </section>

      {/* V. Key Takeaways */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">V. Key Takeaways</div>
          <h2>Strategic Implications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Research-level, self-directed, and operationally impactful',
              'Produces structured, reproducible outputs demonstrating advanced hybrid cognition',
              'Capable of generating strategic, narrative, and operational insights in real-world contexts',
              'Value lies in systems and outputs, not personal circumstances or unconventional presentation',
            ].map((takeaway, idx) => (
              <div key={idx} className="p-6 bg-slate-900 border-t-2 border-cyan-500">
                <p className="text-slate-300">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VI. Audio Section */}
      <section id="audio" className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">VI. Audio Presentation</div>
          <h2>Listen to the Methodology</h2>
          
          <div className="bg-slate-900 p-8 border border-slate-800 rounded">
            <audio 
              ref={audioRef}
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663290410840/HyGdzmg3GE9L4M3aWYLZ3Y/hybrid_cognition_presentation_052bdfcf.wav"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlayPause}
                  className="w-12 h-12 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center font-bold transition-colors"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <div className="flex-1 space-y-2">
                  <div 
                    onClick={handleProgressClick}
                    className="h-2 bg-slate-800 rounded-full cursor-pointer hover:h-3 transition-all"
                  >
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <button 
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  {showTranscript ? '▼' : '▶'} {showTranscript ? 'Hide' : 'Show'} Transcript
                </button>

                {showTranscript && (
                  <div className="mt-6 space-y-4 text-sm text-slate-400 max-h-96 overflow-y-auto">
                    <p><strong className="text-slate-200">Slide 1:</strong> Title and Introduction. Demonstrating Advanced Human-AI Hybrid Cognition at the Direction of Damien Edward Featherstone.</p>
                    <p><strong className="text-slate-200">Slide 2:</strong> The Problem. Conventional AI use is limited. Complex problems require cross-domain reasoning and strategy synthesis.</p>
                    <p><strong className="text-slate-200">Slide 3:</strong> Multi-AI Orchestration. Coordinates multiple AI systems in parallel across Risk Analysis, Narrative Strategy, Operational Design, and Stakeholder Mapping.</p>
                    <p className="text-xs italic">[Full transcript available in audio file]</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VII. Methodology Archive */}
      <section id="archive" className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">VII. Methodology Archive</div>
          <h2>Permanent Record & Verification</h2>
          
          <div className="metadata-section space-y-4">
            <div>
              <strong className="text-cyan-400">First Published:</strong> March 2026
            </div>
            <div>
              <strong className="text-cyan-400">Version:</strong> 1.0
            </div>
            <div>
              <strong className="text-cyan-400">Repository:</strong> <a href="#" className="text-cyan-400 hover:text-cyan-300">github.com/damien-featherstone/agp-methodology</a>
            </div>
            <div>
              <strong className="text-cyan-400">License:</strong> MIT
            </div>
            <div>
              <strong className="text-cyan-400">PDF Hash (SHA256):</strong> <code className="text-xs">pending-generation</code>
            </div>
            <div>
              <strong className="text-cyan-400">Audio Hash (SHA256):</strong> <code className="text-xs">pending-generation</code>
            </div>
            <div>
              <strong className="text-cyan-400">Wayback Archive:</strong> <a href="#" className="text-cyan-400 hover:text-cyan-300">archive.org/web/</a> (after deployment)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800">
              <h4 className="text-cyan-400 mb-3">GitHub Repository</h4>
              <p className="text-sm text-slate-400 mb-4">Version control and full source code for reproducibility.</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">View Repository →</a>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800">
              <h4 className="text-cyan-400 mb-3">Internet Archive</h4>
              <p className="text-sm text-slate-400 mb-4">Permanent snapshot for long-term preservation.</p>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">View Archive →</a>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800">
              <h4 className="text-cyan-400 mb-3">PDF Export</h4>
              <p className="text-sm text-slate-400 mb-4">Complete presentation with metadata.</p>
              <button onClick={() => window.open('/pdf/agp-methodology-v1.pdf')} className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Download PDF →
              </button>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800">
              <h4 className="text-cyan-400 mb-3">Audio File</h4>
              <p className="text-sm text-slate-400 mb-4">High-quality presentation audio.</p>
              <button onClick={() => window.open('https://d2xsxph8kpxj0f.cloudfront.net/310519663290410840/HyGdzmg3GE9L4M3aWYLZ3Y/hybrid_cognition_presentation_052bdfcf.wav')} className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Download Audio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIII. Closing Statement */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="section-number">VIII. Closing</div>
          <h2>Final Statement</h2>
          
          <blockquote className="text-xl italic text-slate-300 border-l-4 border-cyan-500 pl-6 py-4">
            This is not casual experimentation. Damien is actively building hybrid cognition systems, orchestrating AI as coordinated analytical instruments, and producing outputs that are measurable, reproducible, and strategically significant.
          </blockquote>

          <p className="text-slate-400">
            Evaluate the work by the intelligence it generates, the frameworks it builds, and the decisions it informs — not by superficial metrics.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3">About</h4>
              <p className="text-slate-400">
                A systems-level diagnosis of hybrid cognition methodology and operational intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#methodology" className="hover:text-cyan-400 transition-colors">Methodology</a></li>
                <li><a href="#audio" className="hover:text-cyan-400 transition-colors">Audio</a></li>
                <li><a href="#archive" className="hover:text-cyan-400 transition-colors">Archive</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3">Creator</h4>
              <p className="text-slate-400">
                Damien Edward Featherstone<br />
                © 2026 All rights reserved.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>Version 1.0 | Build: {new Date().toISOString().split('T')[0]}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">License</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
