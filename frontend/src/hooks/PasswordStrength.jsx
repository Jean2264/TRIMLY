import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

// Configuración de muelles/resortes para las animaciones fluidas
const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 };
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 };
const INSTANT = { duration: 0 };

// Expresiones regulares para detectar patrones débiles o secuencias
const COMMON =
  /^(?:password|passw0rd|qwerty|letmein|welcome|admin|iloveyou|monkey|dragon|abc123|111111|123123|123456)/i;
const RUN = /(.)\1{3,}/;
const RUN_UP =
  /(?:0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|defg|qwer|wert|erty|asdf)/i;
const SYMBOL = /[!-/:-@[-`{-~]/;

// Reglas de validación por defecto
export const defaultPasswordRules = [
  { id: "length", label: "12 caracteres o más", test: (v) => v.length >= 12 },
  {
    id: "case",
    label: "Mayúsculas y minúsculas",
    test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { id: "digit", label: "Un número", test: (v) => /\d/.test(v) },
  { id: "symbol", label: "Un símbolo (!@#$%...)", test: (v) => SYMBOL.test(v) },
];

const defaultLabels = ["Vacía", "Débil", "Aceptable", "Buena", "Fuerte"];

// Paleta de colores según la nota obtenida
const TONES = {
  none: { bar: "bg-stone-300", text: "text-stone-500" },
  danger: { bar: "bg-red-500", text: "text-red-600" },
  caution: { bar: "bg-amber-500", text: "text-amber-600" },
  safe: { bar: "bg-emerald-500", text: "text-emerald-600" },
};

function toneFor(score, max) {
  if (score === 0) return TONES.none;
  const ratio = score / max;
  if (ratio <= 0.34) return TONES.danger;
  if (ratio <= 0.67) return TONES.caution;
  return TONES.safe;
}

export function PasswordStrength({
  value,
  rules = defaultPasswordRules,
  labels = defaultLabels,
}) {
  const reduced = useReducedMotion();

  // Memoria del cálculo de puntaje y reglas evaluadas
  const {
    score,
    max,
    rules: evaluated,
    guessable,
  } = useMemo(() => {
    const evalRules = rules.map((r) => ({ ...r, met: r.test(value) }));
    const passed = evalRules.reduce((n, r) => n + (r.met ? 1 : 0), 0);
    const isGuessable =
      value.length > 0 &&
      (COMMON.test(value) || RUN.test(value) || RUN_UP.test(value));
    const currentScore =
      value.length === 0
        ? 0
        : isGuessable
          ? 1
          : Math.min(rules.length, Math.max(1, passed));

    return {
      score: currentScore,
      max: rules.length,
      rules: evalRules,
      guessable: isGuessable,
    };
  }, [value, rules]);

  const tone = toneFor(score, max);

  return (
    <div className="w-full mt-2">
      {/* Barras de progreso con animación */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className="relative h-1.5 overflow-hidden rounded-[2px] bg-stone-200"
          >
            <motion.span
              className={`absolute inset-0 origin-left rounded-[2px] transition-colors duration-200 ${tone.bar}`}
              initial={false}
              animate={{ scaleX: i < score ? 1 : 0 }}
              transition={
                reduced ? INSTANT : { ...CELL, delay: i < score ? i * 0.03 : 0 }
              }
            />
          </div>
        ))}
      </div>

      {/* Etiqueta de texto animada y alerta de patrón común */}
      <div className="mt-2 flex h-5 items-center justify-between gap-3">
        <span className="inline-grid text-[12.5px] font-medium leading-5">
          {labels.map((text, i) => (
            <motion.span
              key={text}
              className={`col-start-1 row-start-1 whitespace-nowrap transition-colors duration-200 ${tone.text}`}
              initial={false}
              animate={{
                opacity: i === Math.min(score, labels.length - 1) ? 1 : 0,
              }}
              transition={reduced ? INSTANT : CROSSFADE}
            >
              {text}
            </motion.span>
          ))}
        </span>

        {guessable && (
          <span className="whitespace-nowrap text-[11.5px] text-amber-600 font-medium">
            Patrón muy fácil de adivinar
          </span>
        )}
      </div>

      {/* Lista de requisitos con checks animados */}
      <ul className="mt-3 grid gap-1.5">
        {evaluated.map((rule) => (
          <li key={rule.id} className="flex items-center gap-2">
            <span className="relative grid size-[14px] shrink-0 place-items-center rounded-[4px] border border-stone-200 text-white">
              <motion.span
                className="absolute inset-0 rounded-[3px] bg-emerald-500"
                initial={false}
                animate={{ opacity: rule.met ? 1 : 0 }}
                transition={reduced ? INSTANT : CROSSFADE}
              />
              <motion.svg
                viewBox="0 0 12 12"
                fill="none"
                className="relative size-[9px]"
                initial={false}
                animate={{
                  opacity: rule.met ? 1 : 0,
                  scale: rule.met ? 1 : 0.6,
                }}
                transition={reduced ? INSTANT : CELL}
              >
                <path
                  d="M2 6.2 4.7 8.9 10 3.3"
                  stroke="currentColor"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
            <span
              className={`text-[12.5px] leading-5 ${rule.met ? "text-stone-700 font-medium" : "text-stone-400"}`}
            >
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordStrength;
