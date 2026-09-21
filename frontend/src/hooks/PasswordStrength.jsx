import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./PasswordStrength.css";

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
  { id: "length", label: "8 caracteres o más", test: (v) => v.length >= 8 },
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
  none: {
    name: "none",
    bar: "#d6d3d1",
    text: "#78716c",
  },

  danger: {
    name: "danger",
    bar: "#ef4444",
    text: "#dc2626",
  },

  caution: {
    name: "caution",
    bar: "#f59e0b",
    text: "#d97706",
  },

  warning: {
    name: "warning",
    bar: "#ffea00",
    text: "#ffff00",
  },

  safe: {
    name: "safe",
    bar: "#10b981",
    text: "#059669",
  },
};

function toneFor(score, max) {
  if (score === 0) return TONES.none;
  if (score === 1) return TONES.danger;
  if (score === 2) return TONES.caution;
  if (score === 3) return TONES.warning;
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
    <div className="password-strength">
      <div className="password-strength-bars">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`password-strength-bar ${i < score ? tone.name : ""}`}
          />
        ))}
      </div>

      <span className={`password-strength-label ${tone.name}`}>
        {labels[Math.min(score, labels.length - 1)]}
      </span>

      <ul className="password-strength-rules">
        {evaluated.map((rule) => (
          <li key={rule.id}>
            <span
              className={`password-strength-check ${rule.met ? "met" : ""}`}
            >
              {rule.met ? "✓" : ""}
            </span>

            <span>{rule.label}</span>
          </li>
        ))}
      </ul>

      {guessable && (
        <span className="password-strength-warning">
          Patrón muy fácil de adivinar
        </span>
      )}
    </div>
  );
}

export default PasswordStrength;
