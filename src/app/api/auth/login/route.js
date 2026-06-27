import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // 4 saltos exactos hacia atrás
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Buscamos si el correo existe en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 },
      );
    }

    // 2. Comparamos la contraseña enviada con la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta." },
        { status: 401 },
      );
    }

    // 3. ¡Todo correcto! Fabricamos el Token (Pase VIP)
    // Guardamos el ID y el Rol adentro del token. Durará 1 día (1d).
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // 4. Devolvemos el token y los datos básicos (nunca la contraseña)
    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 },
    );
  }
}
