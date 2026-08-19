"use client";

import { useState } from "react";

const junkFoods = [
  "burger",
  "cheeseburger",
  "fries",
  "french fries",
  "pizza",
  "donut",
  "doughnut",
  "cake",
  "cookie",
  "cookies",
  "candy",
  "chocolate bar",
  "chips",
  "potato chips",
  "ice cream",
  "soda",
  "soft drink",
  "hot dog",
  "instant noodles",
];

const healthyFoods = [
  "apple",
  "banana",
  "orange",
  "berries",
  "strawberries",
  "broccoli",
  "carrot",
  "spinach",
  "salad",
  "oatmeal",
  "brown rice",
  "egg",
  "eggs",
  "chicken breast",
  "salmon",
  "yogurt",
  "nuts",
  "avocado",
];

const examples = ["Apple", "Pizza", "Oatmeal", "Potato chips"];

const exampleDescriptions = {
  Apple: "Fresh and sliced, with nothing added.",
  Pizza: "Made with white-flour dough, cheese, pepperoni, and baked in an oven.",
  Oatmeal: "Rolled oats cooked in water and topped with berries.",
  "Potato chips": "Thin potato slices deep-fried in oil and sprinkled with salt.",
};

const lessHealthyPreparation = [
  "deep fried",
  "deep-fried",
  "fried in oil",
  "covered in sugar",
  "sugar coated",
  "sugar-coated",
  "candy coated",
  "processed meat",
];

const nutritiousPreparation = [
  "fresh",
  "steamed",
  "roasted",
  "grilled",
  "boiled",
  "baked",
  "whole grain",
  "whole-grain",
];

function classifyFood(food, description) {
  const cleanFood = food.trim().toLowerCase();
  const details = description.trim().toLowerCase();
  const fullDescription = `${cleanFood} ${details}`;

  if (!cleanFood) return null;
  if (
    junkFoods.some((item) => cleanFood.includes(item)) ||
    lessHealthyPreparation.some((method) => fullDescription.includes(method))
  ) {
    return "junk";
  }
  if (
    healthyFoods.some((item) => cleanFood.includes(item)) ||
    nutritiousPreparation.some((method) => details.includes(method))
  ) {
    return "healthy";
  }
  return "unknown";
}

export default function Home() {
  const [food, setFood] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  function checkFood(event) {
    event.preventDefault();
    setResult(classifyFood(food, description));
  }

  function chooseExample(example) {
    setFood(example);
    setDescription(exampleDescriptions[example]);
    setResult(classifyFood(example, exampleDescriptions[example]));
  }

  const resultContent = {
    junk: {
      emoji: "🍟",
      title: "That’s usually junk food",
      text: "Enjoy it once in a while. These foods are often high in sugar, salt, or saturated fat.",
      style: "border-amber-200 bg-amber-50 text-amber-950",
    },
    healthy: {
      emoji: "🥦",
      title: "Great everyday choice!",
      text: "This food is generally a nutritious option to include in a balanced diet.",
      style: "border-emerald-200 bg-emerald-50 text-emerald-950",
    },
    unknown: {
      emoji: "🔎",
      title: "We’re not sure about that one",
      text: "Try a simple food name, such as apple, pizza, oatmeal, or chips. The answer can also depend on how it is prepared.",
      style: "border-sky-200 bg-sky-50 text-sky-950",
    },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf2] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-2xl shadow-sm">
            🥑
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight">Junk or No</p>
            <p className="text-sm text-slate-500">A simple food checker</p>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
              Healthy eating, made easy
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[1.03] tracking-tight text-slate-950 sm:text-6xl">
              Is your food a <span className="text-emerald-600">yes</span> or a <span className="text-orange-500">no</span>?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Tell us what it is and how it&apos;s made. We&apos;ll give you a quick, friendly guide.
            </p>

            <form onSubmit={checkFood} className="mt-9 rounded-3xl bg-white p-5 shadow-[0_18px_50px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 sm:p-6">
              <div className="grid gap-5">
                <div>
                  <label htmlFor="food" className="mb-2 block text-sm font-bold text-slate-700">Food item</label>
                  <input
                    id="food"
                    value={food}
                    onChange={(event) => {
                      setFood(event.target.value);
                      setResult(null);
                    }}
                    placeholder="e.g. Homemade granola"
                    required
                    maxLength={80}
                    className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <label htmlFor="description" className="block text-sm font-bold text-slate-700">Describe it &amp; how it&apos;s made</label>
                    <span className="text-xs text-slate-400">{description.length}/240</span>
                  </div>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                      setResult(null);
                    }}
                    placeholder="What ingredients are in it? Is it baked, fried, fresh, or processed?"
                    required
                    maxLength={240}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base leading-6 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                  <p className="mt-2 text-xs leading-5 text-slate-500">A sentence or two helps us give you a better answer.</p>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 h-14 w-full rounded-2xl bg-emerald-500 px-7 text-base font-bold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                Check my food <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="mr-1 font-medium text-slate-500">Try one:</span>
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => chooseExample(example)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                >
                  {example}
                </button>
              ))}
            </div>

            {result && (
              <div role="status" className={`mt-7 rounded-3xl border p-5 ${resultContent[result].style}`}>
                <div className="flex gap-4">
                  <span className="text-3xl" aria-hidden="true">{resultContent[result].emoji}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Our quick take</p>
                    <h2 className="mt-1 text-lg font-extrabold">{resultContent[result].title}</h2>
                    <p className="mt-1 leading-6">{resultContent[result].text}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-7 top-10 h-24 w-24 rounded-full bg-orange-200/70 blur-2xl" />
            <div className="absolute -right-8 bottom-4 h-32 w-32 rounded-full bg-emerald-200/70 blur-2xl" />
            <div className="relative rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl shadow-slate-300/50 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">Quick guide</span>
                <span className="text-2xl">✨</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-orange-400 p-5 text-center shadow-lg shadow-orange-950/15">
                  <span className="text-5xl">🍩</span>
                  <p className="mt-3 font-extrabold">Sometimes food</p>
                  <p className="mt-1 text-xs text-orange-950/75">Treats and highly processed snacks</p>
                </div>
                <div className="rounded-3xl bg-emerald-400 p-5 text-center shadow-lg shadow-emerald-950/15">
                  <span className="text-5xl">🍎</span>
                  <p className="mt-3 font-extrabold">Everyday food</p>
                  <p className="mt-1 text-xs text-emerald-950/75">Fruit, vegetables, and whole foods</p>
                </div>
              </div>
              <p className="mt-7 text-center text-sm leading-6 text-slate-300">
                Food is not “good” or “bad.” This is a simple guide to help you make balanced choices.
              </p>
            </div>
          </aside>
        </section>

        <footer className="pb-2 text-center text-sm text-slate-500">
          Small choices add up. Be kind to yourself. 💚
        </footer>
      </div>
    </main>
  );
}
