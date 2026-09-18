import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCorreoActivacion(email, token) {
  const activationUrl = new URL("/activar-cuenta", process.env.FRONTEND_URL);

  activationUrl.searchParams.set("token", token);

  const { data, error } = await resend.emails.send({
    from: "TRIMLY <onboarding@resend.dev>",
    to: [email],
    subject: "Activá tu cuenta de TRIMLY",

    text: `Activá tu cuenta desde este enlace: ${activationUrl.toString()}`,

    html: `
      <h1>Bienvenido a TRIMLY</h1>
      <p>Para activar tu cuenta, hacé clic en este enlace:</p>
      <p>
        <a href="${activationUrl.toString()}">Activar mi cuenta</a>
      </p>
      <p>Este enlace vence en 24 horas.</p>
    `,
  });

  if (error) {
    throw new Error(
      `No se pudo enviar el correo de activación: ${error.message}`,
    );
  }

  return data;
}
