export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface SavorceryItem {
  name: string;
  replaces: string;
  reason: string;
}

export interface SavorceryResult {
  title: string;
  nutrition: NutritionInfo;
  ingredients: SavorceryItem[];
  summary: string;
}

export interface CravingAnalysis {
  name: string;
  nutrition: NutritionInfo;
  savorcery: SavorceryResult;
}

const cravingDatabase: Record<string, CravingAnalysis> = {
  burger: {
    name: "Classic Burger",
    nutrition: { calories: 540, protein: 25, carbs: 40, fat: 30, fiber: 2, sugar: 8 },
    savorcery: {
      title: "Umami Mushroom Stack",
      nutrition: { calories: 310, protein: 22, carbs: 28, fat: 12, fiber: 7, sugar: 4 },
      ingredients: [
        { name: "Portobello mushroom cap", replaces: "Beef patty", reason: "Shares glutamate compounds that trigger the same umami receptors, satisfying the savory craving at 1/4 the calories." },
        { name: "Whole grain oat bun", replaces: "White flour bun", reason: "Complex carbs provide sustained energy; beta-glucan fiber mimics the satiety signal of the original." },
        { name: "Cashew-miso spread", replaces: "Processed cheese", reason: "Fermented miso delivers the same casomorphin-like satisfaction through naturally occurring peptides." },
        { name: "Smoked paprika & liquid aminos", replaces: "Ketchup & sauces", reason: "Maillard-reaction aromatics replicate the char-grilled flavor profile without added sugar." },
      ],
      summary: "This reconstruction targets the exact dopamine-triggering flavor compounds in a burger — glutamates, Maillard aromatics, and fat-soluble volatiles — using nutrient-dense whole-food sources.",
    },
  },
  pizza: {
    name: "Pepperoni Pizza",
    nutrition: { calories: 680, protein: 28, carbs: 72, fat: 32, fiber: 3, sugar: 6 },
    savorcery: {
      title: "Cauliflower Flatbread Margherita",
      nutrition: { calories: 340, protein: 20, carbs: 30, fat: 14, fiber: 8, sugar: 5 },
      ingredients: [
        { name: "Cauliflower & almond flour crust", replaces: "Refined wheat dough", reason: "Provides the crispy-chewy mouthfeel via roasted cauliflower's nutty notes and almond flour's fat content." },
        { name: "Nutritional yeast & cashew ricotta", replaces: "Mozzarella cheese", reason: "Nutritional yeast contains the same glutamate profile as aged cheese, triggering identical umami receptors." },
        { name: "Sun-dried tomato & roasted garlic sauce", replaces: "Processed tomato sauce", reason: "Concentrated lycopene and allicin compounds amplify the tomato-garlic aroma that defines pizza craving." },
        { name: "Smoked tempeh crumbles", replaces: "Pepperoni", reason: "Fermented soy delivers the salty-smoky-fatty trifecta through natural isoflavones and smoke compounds." },
      ],
      summary: "Pizza cravings are driven by the cheese-tomato-dough triad. This reconstruction replicates each using whole-food analogs that match the molecular aroma profile.",
    },
  },
  "ice cream": {
    name: "Vanilla Ice Cream",
    nutrition: { calories: 410, protein: 6, carbs: 48, fat: 22, fiber: 0, sugar: 42 },
    savorcery: {
      title: "Frozen Banana-Coconut Cream",
      nutrition: { calories: 220, protein: 4, carbs: 32, fat: 10, fiber: 4, sugar: 18 },
      ingredients: [
        { name: "Frozen banana base", replaces: "Cream & sugar base", reason: "Frozen banana naturally emulsifies into a creamy texture; its pectin mimics the mouthfeel of dairy fat." },
        { name: "Coconut cream", replaces: "Heavy cream", reason: "Medium-chain triglycerides provide the same rich, coating sensation while being metabolized faster." },
        { name: "Raw cacao nibs", replaces: "Chocolate chips", reason: "Contains theobromine and phenylethylamine — the actual 'feel-good' compounds in chocolate, without added sugar." },
        { name: "Madagascar vanilla bean", replaces: "Artificial vanilla", reason: "Contains 200+ aromatic compounds vs. 1 in synthetic vanillin, creating a far richer flavor perception." },
      ],
      summary: "Ice cream cravings target the cold-sweet-creamy triad. This uses frozen fruit emulsification and coconut MCTs to satisfy the same neural reward pathway.",
    },
  },
  fries: {
    name: "French Fries",
    nutrition: { calories: 365, protein: 4, carbs: 48, fat: 17, fiber: 4, sugar: 0 },
    savorcery: {
      title: "Herb-Roasted Root Medley",
      nutrition: { calories: 190, protein: 3, carbs: 32, fat: 6, fiber: 7, sugar: 5 },
      ingredients: [
        { name: "Parsnip & sweet potato batons", replaces: "White potato", reason: "Higher fiber and beta-carotene; the natural sugars caramelize at lower temps, producing deeper Maillard flavors." },
        { name: "Avocado oil mist", replaces: "Deep-fry oil", reason: "High smoke point creates the same crispy exterior with 75% less fat; oleic acid promotes satiety." },
        { name: "Rosemary-garlic salt", replaces: "Table salt", reason: "Rosemary's carnosic acid enhances flavor perception, allowing 50% less sodium for the same 'salty hit'." },
        { name: "Smoked nutritional yeast dust", replaces: "Ketchup dipping", reason: "Combines umami glutamates with smoky volatiles — the actual compounds your brain craves from fried food." },
      ],
      summary: "Fry cravings are about salt-fat-crunch. This achieves the same textural and flavor reward through high-heat roasting and strategic seasoning compounds.",
    },
  },
};

export function analyzeCraving(input: string): CravingAnalysis | null {
  const key = input.toLowerCase().trim();
  // Direct match
  if (cravingDatabase[key]) return cravingDatabase[key];
  // Partial match
  for (const [k, v] of Object.entries(cravingDatabase)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  // Fallback generic
  return {
    name: input,
    nutrition: { calories: 450, protein: 18, carbs: 45, fat: 22, fiber: 3, sugar: 10 },
    savorcery: {
      title: `Alchemized ${input}`,
      nutrition: { calories: 260, protein: 16, carbs: 30, fat: 9, fiber: 6, sugar: 5 },
      ingredients: [
        { name: "Whole-food protein base", replaces: "Processed protein", reason: "Complete amino acid profile from plant sources triggers the same satiety hormones (GLP-1, PYY)." },
        { name: "Complex carb matrix", replaces: "Refined carbs", reason: "Slow-release glucose prevents the insulin spike-crash cycle that perpetuates cravings." },
        { name: "Healthy fat blend", replaces: "Saturated fats", reason: "Omega-3 and monounsaturated fats cross the blood-brain barrier more efficiently, sustaining dopamine production." },
        { name: "Aromatic compound boost", replaces: "Artificial flavors", reason: "Natural volatile compounds from herbs and spices activate more olfactory receptors, creating richer perceived flavor." },
      ],
      summary: "This molecular reconstruction targets the core flavor compounds and neural reward pathways of your craving using nutrient-dense whole-food analogs.",
    },
  };
}
