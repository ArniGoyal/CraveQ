import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Beef, Wheat, Droplets, Leaf, CandyIcon, FlaskConical, ChevronDown } from 'lucide-react';
import { GrimoireButton } from '@/components/ui/GrimoireButton';
import { analyzeCraving, type CravingAnalysis, type NutritionInfo } from '@/lib/cravingData';
import craveqLogo from '@/assets/craveq-logo.png';

const NutritionBar = ({ label, value, unit, max, icon: Icon, color }: {
  label: string; value: number; unit: string; max: number; icon: any; color: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between data-text text-xs">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="w-3.5 h-3.5" style={{ color }} />
        {label}
      </span>
      <span style={{ color }}>{value}{unit}</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const NutritionPanel = ({ nutrition, title }: { nutrition: NutritionInfo; title: string }) => (
  <div className="glass-dark rounded-lg p-5 space-y-4">
    <h3 className="data-text text-xs text-muted-foreground">{title}</h3>
    <div className="text-center mb-4">
      <span className="grimoire-heading text-3xl neon-text">{nutrition.calories}</span>
      <span className="data-text text-xs text-muted-foreground ml-2">kcal</span>
    </div>
    <div className="space-y-3">
      <NutritionBar label="Protein" value={nutrition.protein} unit="g" max={50} icon={Beef} color="hsl(150 100% 50%)" />
      <NutritionBar label="Carbs" value={nutrition.carbs} unit="g" max={100} icon={Wheat} color="hsl(45 100% 60%)" />
      <NutritionBar label="Fat" value={nutrition.fat} unit="g" max={50} icon={Droplets} color="hsl(0 80% 60%)" />
      <NutritionBar label="Fiber" value={nutrition.fiber} unit="g" max={15} icon={Leaf} color="hsl(120 60% 50%)" />
      <NutritionBar label="Sugar" value={nutrition.sugar} unit="g" max={50} icon={CandyIcon} color="hsl(300 70% 60%)" />
    </div>
  </div>
);

const Decode = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<CravingAnalysis | null>(null);
  const [showSavorcery, setShowSavorcery] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setShowSavorcery(false);
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysis(analyzeCraving(input));
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-radial-glow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-grimoire-charcoal pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 data-text text-xs text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <img src={craveqLogo} alt="CraveQ" className="w-10 h-10 drop-shadow-[0_0_10px_hsl(150_100%_50%/0.4)]" />
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="grimoire-heading text-3xl md:text-5xl mb-3">
              <span className="neon-text">Decode</span> Your Craving
            </h1>
            <p className="data-text text-xs text-muted-foreground">Enter a food craving to analyze its molecular profile</p>
          </div>

          {/* Input */}
          <div className="flex gap-3 mb-10">
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                placeholder="e.g. Burger, Pizza, Ice Cream, Fries..."
                className="w-full h-12 bg-card border border-border rounded-lg px-4 data-text text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_hsl(150_100%_50%/0.2)] transition-all"
              />
              <FlaskConical className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <GrimoireButton onClick={handleAnalyze} disabled={!input.trim() || isAnalyzing}>
              {isAnalyzing ? "Scanning..." : "Analyze"}
            </GrimoireButton>
          </div>

          {/* Loading */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                <div className="w-16 h-16 mx-auto border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="data-text text-xs text-muted-foreground mt-4">Scanning molecular profile...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {analysis && !isAnalyzing && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                {/* Craving analysis */}
                <div className="text-center">
                  <span className="data-text text-xs text-primary">⚗ Craving Detected</span>
                  <h2 className="grimoire-heading text-2xl md:text-3xl mt-1">{analysis.name}</h2>
                </div>

                <NutritionPanel nutrition={analysis.nutrition} title="" />

                {/* Reconstruct button */}
                {!showSavorcery && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
                    <GrimoireButton size="lg" onClick={() => setShowSavorcery(true)} className="animate-glow-pulse">
                      <FlaskConical className="w-4 h-4 mr-1" />
                      Reconstruct with Savorcery
                    </GrimoireButton>
                    <div className="flex justify-center mt-3">
                      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown className="w-4 h-4 text-primary/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Savorcery result */}
                <AnimatePresence>
                  {showSavorcery && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
                      <div className="text-center">
                        <span className="data-text text-xs text-primary">⚗ Savorcery Reconstruction</span>
                        <h2 className="grimoire-heading text-2xl md:text-3xl mt-1 neon-text">{analysis.savorcery.title}</h2>
                      </div>

                      <NutritionPanel nutrition={analysis.savorcery.nutrition} title="" />

                      {/* Calorie comparison */}
                      <div className="glass-dark rounded-lg p-4 text-center">
                        <span className="data-text text-xs text-muted-foreground">Calorie Reduction</span>
                        <div className="grimoire-heading text-2xl neon-text mt-1">
                          -{Math.round(((analysis.nutrition.calories - analysis.savorcery.nutrition.calories) / analysis.nutrition.calories) * 100)}%
                        </div>
                        <span className="data-text text-[10px] text-muted-foreground">
                          {analysis.nutrition.calories} → {analysis.savorcery.nutrition.calories} kcal
                        </span>
                      </div>

                      {/* Ingredient replacements */}
                      <div className="space-y-4">
                        <h3 className="data-text text-xs text-muted-foreground"></h3>
                        {analysis.savorcery.ingredients.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-dark rounded-lg p-4 border-l-2 border-primary/50"
                          >
                            <div className="flex items-start gap-3">
                              <Flame className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="data-text text-xs text-primary">{item.name}</span>
                                  <span className="data-text text-[10px] text-muted-foreground">replaces</span>
                                  <span className="data-text text-xs text-destructive line-through">{item.replaces}</span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Summary */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="glass-dark rounded-lg p-5 border border-primary/20"
                      >
                        <h3 className="data-text text-xs text-primary mb-2"></h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{analysis.savorcery.summary}</p>
                      </motion.div>

                      {/* Try another */}
                      <div className="text-center pt-4">
                        <GrimoireButton variant="secondary" onClick={() => { setAnalysis(null); setShowSavorcery(false); setInput(''); }}>
                          Decode Another Craving
                        </GrimoireButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Decode;
