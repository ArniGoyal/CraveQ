import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FlaskConical,
  ChevronDown,
  Flame,
} from "lucide-react";
import { GrimoireButton } from "@/components/ui/GrimoireButton";
import craveqLogo from "@/assets/craveq-logo.png";

/* ---------------- TYPES ---------------- */

type RecipeResult = {
  title: string;
  calories: number;
  region: string;
  continent: string;
  health_score: number;
  ingredients: string[];
};

/* ---------------- MAIN COMPONENT ---------------- */

const Decode = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<RecipeResult[]>([]);
  const [selected, setSelected] = useState<RecipeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setResults([]);
    setSelected(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ craving: input }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();

      if (!data || data.length === 0) {
        alert("No healthier alternatives found.");
        return;
      }

      setResults(data);
      setSelected(data[0]);
    } catch (err) {
      console.error(err);
      alert("Make sure Flask server is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* 🌌 3D Background Effects */}
      <div className="absolute inset-0 gradient-radial-glow opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-grimoire-charcoal pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <img
          src={craveqLogo}
          alt="CraveQ"
          className="w-10 h-10 drop-shadow-[0_0_12px_hsl(150_100%_50%/0.4)]"
        />
      </header>

      <main className="relative z-10 container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="grimoire-heading text-4xl md:text-5xl mb-3">
              <span className="neon-text">Decode</span> Your Craving
            </h1>
            <p className="text-muted-foreground text-sm">
              Molecular reconstruction powered by Foodoscope AI
            </p>
          </div>

          {/* Input */}
          <div className="flex gap-3 mb-10">
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="e.g. Burger, Pizza, Fries..."
                className="w-full h-12 bg-card border border-border rounded-lg px-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(150_100%_50%/0.3)] transition-all"
              />
              <FlaskConical className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <GrimoireButton onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "Scanning..." : "Analyze"}
            </GrimoireButton>
          </div>

          {/* Loading */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground mt-4">
                  Scanning molecular structure...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Cards */}
          <AnimatePresence>
            {results.length > 0 && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {results.map((recipe, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, rotateY: 6 }}
                    onClick={() => setSelected(recipe)}
                    className="glass-dark p-6 rounded-xl cursor-pointer transition-all border border-primary/20 hover:border-primary"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {recipe.region}, {recipe.continent}
                    </p>
                    <div className="mt-4 text-sm">
                      🔥 {recipe.calories} kcal
                    </div>
                    <div className="mt-1 text-sm text-primary">
                      💚 Health Score: {recipe.health_score}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Recipe Detail */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-8 rounded-xl border border-primary/20 space-y-6"
              >
                <h2 className="text-3xl neon-text text-center">
                  {selected.title}
                </h2>

                <div className="text-center text-muted-foreground">
                  {selected.region}, {selected.continent}
                </div>

                <div className="flex justify-center gap-8 text-lg">
                  <div>🔥 {selected.calories} kcal</div>
                  <div className="text-primary">
                    💚 {selected.health_score}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-primary" />
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {selected.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
          
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Decode;
