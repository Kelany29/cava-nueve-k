"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Por favor completa todos los campos del formulario.");
      return;
    }
    toast.success(
      "¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.",
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-cava-bg min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-cava-dark text-white py-16 px-6 text-center shadow-md border-b-4 border-cava-brown">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider mb-3">
          Contacto & Experiencias
        </h1>
        <p className="text-cava-brown uppercase tracking-[0.2em] text-xs font-semibold">
          Reserva tu lugar en nuestra mesa de cata
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info de contacto */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl border border-cava-brown/10 shadow-sm flex flex-col gap-6">
            <h2 className="text-2xl font-serif font-bold text-cava-dark border-b border-cava-brown/10 pb-3">
              Información de la Cava
            </h2>

            <div className="flex items-start gap-4 text-gray-700">
              <MapPin className="text-cava-brown shrink-0 mt-1" size={20} />
              <div>
                <p className="font-bold text-cava-dark">Ubicación Principal</p>
                <p className="text-sm text-gray-500">
                  Distrito del Vino, Corrientes, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-700">
              <Clock className="text-cava-brown shrink-0 mt-1" size={20} />
              <div>
                <p className="font-bold text-cava-dark">Horarios de Atención</p>
                <p className="text-sm text-gray-500">
                  Lunes a Sábados: 17:00 a 23:00 hs
                </p>
                <p className="text-xs text-cava-brown italic mt-1">
                  * Catas exclusivas con reserva previa los días Jueves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-700">
              <Phone className="text-cava-brown shrink-0 mt-1" size={20} />
              <div>
                <p className="font-bold text-cava-dark">Teléfono Exclusivo</p>
                <p className="text-sm text-gray-500">+54 (379) 400-九K</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-700">
              <Mail className="text-cava-brown shrink-0 mt-1" size={20} />
              <div>
                <p className="font-bold text-cava-dark">Correo Electrónico</p>
                <p className="text-sm text-gray-500">
                  contacto@cavanuevek.com.ar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-8 rounded-2xl border border-cava-brown/20 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-cava-dark mb-6 border-b border-cava-brown/10 pb-3">
            Escríbenos
          </h2>
          <form onSubmit={handleSend} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-cava-dark mb-2 uppercase tracking-wider">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Tom"
                className="w-full p-3 rounded-lg border border-cava-brown/30 focus:outline-none focus:border-cava-brown bg-cava-bg/30 text-cava-dark text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cava-dark mb-2 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tom@email.com"
                className="w-full p-3 rounded-lg border border-cava-brown/30 focus:outline-none focus:border-cava-brown bg-cava-bg/30 text-cava-dark text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cava-dark mb-2 uppercase tracking-wider">
                Consulta o Reserva de Cata
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos en qué podemos ayudarte..."
                rows={4}
                className="w-full p-3 rounded-lg border border-cava-brown/30 focus:outline-none focus:border-cava-brown bg-cava-bg/30 text-cava-dark text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-cava-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-cava-brown transition-colors shadow-md mt-2 text-sm"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
