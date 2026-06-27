export default function AboutPage() {
  return (
    <div className="bg-cava-bg min-h-screen pb-20">
      {/* Banner Principal */}
      <div className="bg-cava-dark text-white py-16 px-6 text-center shadow-md border-b-4 border-cava-brown">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider mb-3">
          Nuestra Historia
        </h1>
        <p className="text-cava-brown uppercase tracking-[0.2em] text-xs font-semibold">
          El arte de seleccionar momentos
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 flex flex-col gap-12 text-cava-dark">
        {/* Bloque 1: El Origen */}
        <div className="bg-white p-8 rounded-2xl border border-cava-brown/10 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-cava-dark mb-4 border-b border-cava-brown/10 pb-2">
            El Legado de Cava Nueve K
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nacimos con una premisa clara: el vino no es solo una bebida, es un
            puente hacia los recuerdos, las conversaciones profundas y las
            celebraciones que marcan la vida. Fundada por{" "}
            <span className="font-bold text-cava-dark">Kelany Blanco</span>,
            Cava Nueve K comenzó como un espacio íntimo de apreciación y hoy se
            consolida como una curaduría exclusiva para los paladares más
            exigentes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            No buscamos cantidad, perseguimos la excelencia. Cada etiqueta que
            ingresa a nuestra cava pasa por un riguroso proceso de selección,
            evaluando su origen, las manos que moldearon la tierra y la historia
            que duerme dentro de cada botella.
          </p>
        </div>

        {/* Bloque 2: Los Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-cava-brown/10 shadow-sm flex flex-col gap-3">
            <span className="text-3xl">🍇</span>
            <h3 className="font-serif font-bold text-lg text-cava-dark">
              Bodegas Boutique
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Colaboramos estrechamente con productores artesanales de regiones
              vitivinícolas de altura, garantizando tiradas limitadas de un
              valor incalculable.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-cava-brown/10 shadow-sm flex flex-col gap-3">
            <span className="text-3xl">🍷</span>
            <h3 className="font-serif font-bold text-lg text-cava-dark">
              Conservación Perfecta
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mantenemos estándares estrictos de temperatura, luz y humedad en
              nuestros centros de almacenamiento para que cada nota de cata
              llegue intacta a tu copa.
            </p>
          </div>
        </div>

        {/* Bloque 3: El Manifiesto */}
        <div className="bg-cava-dark text-white p-8 rounded-2xl text-center border-l-4 border-cava-brown shadow-md">
          <p className="font-serif italic text-lg text-cava-brown mb-2">
            "Un gran vino requiere de un loco para hacerlo crecer, un hombre
            sabio para velar por él, un poeta lúcido para fabricarlo y un amante
            que lo entienda."
          </p>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            — Kelany Blanco
          </span>
        </div>
      </div>
    </div>
  );
}
