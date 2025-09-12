import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./form.css";
import "../Button/button.css";

export default function ContactForm({ subjectBase = "Web" }) {
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const hcaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // añadir el token de hCaptcha
    const token = hcaptchaRef.current.getToken();
    if (!token) {
      setStatus("⚠️ Por favor, verifica que no eres un robot.");
      return;
    }
    formData.append("h-captcha-response", token);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("✅ ¡Mensaje enviado con éxito!");
        form.reset();
        setReason("");
        hcaptchaRef.current.resetCaptcha();
      } else {
        setStatus("❌ Hubo un error, inténtalo de nuevo.");
      }
    } catch (err) {
      setStatus("⚠️ Error de conexión, revisa tu red.");
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className="form grid">
      <input
        type="hidden"
        name="access_key"
        value="7f24ef27-3e0a-46c1-92a2-3b4343856dd3"
      />
      <input
        type="hidden"
        name="subject"
        value={`${subjectBase} - ${reason || "Consulta general"}`}
      />

      <input type="text" name="name" placeholder="Nombre completo" required />
      <input type="email" name="email" placeholder="Correo electrónico" required />
      <input type="tel" name="phone" placeholder="Teléfono si prefieres WhatsApp" pattern="[0-9]{9}" />

      <select name="reason" required value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="">Selecciona una opción</option>
        <option value="Prueba">Quiero una clase de prueba gratuita</option>
        <option value="Programas">Información sobre los programas de entrenamiento</option>
        <option value="Precios">Precios y horarios</option>
        <option value="Tienda">Tienda (equipamiento y suscripciones)</option>
        <option value="Otro">Otro</option>
      </select>

      <textarea name="message" placeholder="Escribe tu mensaje" style={{ resize: "none" }} required></textarea>

      {/* HCaptcha con clase para grid */}
      <div className="form-captcha grid-span-full">
        <HCaptcha
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          ref={hcaptchaRef}
          onVerify={() => {}}
        />
      </div>

      <div id="form-status" className="form-status">{status}</div>

      <button className="button" type="submit">
        <span>enviar</span>
        <svg viewBox="0 0 23 15.9" width="20">
          <path d="M14.9,8.7H1c-.4,0-.8-.3-.8-.8s.3-.8.8-.8h13.8c.4,0,.8.3.8.8s-.3.8-.8.8h0Z" />
          <path d="M8.9,14.7c-.2,0-.4,0-.5-.2-.3-.3-.3-.8,0-1.1l5.4-5.4-5.4-5.4c-.3-.3-.3-.8,0-1.1s.8-.3,1.1,0l6,6c.3.3.3.8,0,1.1l-6,6c-.1.1-.3.2-.5.2h-.1Z" />
        </svg>
      </button>
    </form>
  );
}