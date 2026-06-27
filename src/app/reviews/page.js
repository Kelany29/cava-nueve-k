"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados del formulario
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5); // 5 estrellas por defecto
  const [hoveredStar, setHoveredStar] = useState(0); // Para el efecto visual al pasar el mouse
  const [submitting, setSubmitting] = useState(false);

  // 1. Traer las reseñas de la base de datos
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 2. Enviar una nueva reseña
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !content.trim()) {
      toast.error("Por favor completa tu nombre y tu opinión.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, content, rating }),
      });

      if (res.ok) {
        toast.success("¡Gracias por compartir tu experiencia!");
        setUserName("");
        setContent("");
        setRating(5);
        fetchReviews(); // Recargamos la lista automáticamente
      } else {
        toast.error("Hubo un error al publicar tu reseña.");
      }
    } catch (error) {
      toast.error("Error de conexión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cava-bg min-h-screen pb-20">
      {/* Banner Superior */}
      <div className="bg-cava-dark text-white py-16 px-6 text-center shadow-md border-b-4 border-cava-brown">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider mb-3">
          Experiencias
        </h1>
        <p className="text-cava-brown uppercase tracking-[0.2em] text-xs font-semibold">
          Lo que dicen nuestros clientes
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* COLUMNA IZQUIERDA: Formulario */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-cava-brown/20 sticky top-28">
            <h2 className="text-2xl font-serif font-bold text-cava-dark mb-6 border-b border-cava-brown/10 pb-4">
              Deja tu opinión
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-cava-dark mb-2 uppercase tracking-wider">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ej: Lisa"
                  className="w-full p-3 rounded-lg border border-cava-brown/30 focus:outline-none focus:border-cava-brown focus:ring-1 focus:ring-cava-brown bg-cava-bg/50 text-cava-dark"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-cava-dark mb-2 uppercase tracking-wider">
                  Calificación
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={`${
                          star <= (hoveredStar || rating)
                            ? "fill-cava-brown text-cava-brown"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-cava-dark mb-2 uppercase tracking-wider">
                  Tu Experiencia
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="¿Qué te pareció nuestro servicio y selección de vinos?"
                  rows={4}
                  className="w-full p-3 rounded-lg border border-cava-brown/30 focus:outline-none focus:border-cava-brown focus:ring-1 focus:ring-cava-brown bg-cava-bg/50 text-cava-dark resize-none"
                  maxLength={300}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-cava-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-cava-brown transition-colors shadow-md disabled:bg-gray-400"
              >
                {submitting ? "Publicando..." : "Publicar Reseña"}
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: Lista de Reseñas */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cava-brown"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-cava-brown/10 shadow-sm">
              <Star size={48} className="mx-auto text-cava-brown/30 mb-4" />
              <h3 className="text-xl font-serif font-bold text-cava-dark mb-2">
                Sé el primero en opinar
              </h3>
              <p className="text-gray-500">
                Aún no hay reseñas en nuestra cava.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-cava-brown/10 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-cava-dark">
                        {review.userName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString(
                          "es-AR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "fill-cava-brown text-cava-brown"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 italic border-l-4 border-cava-brown/20 pl-4 py-1">
                    "{review.content}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
