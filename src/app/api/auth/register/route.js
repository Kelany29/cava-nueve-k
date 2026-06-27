import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // 1. Verificamos si el correo ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este correo ya está registrado en la vinoteca." },
        { status: 400 },
      );
    }

    // 2. Encriptamos la contraseña matemáticamente
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Creamos el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role || "CUSTOMER", // Si no indicamos rol, será cliente
      },
    });

    // 4. Por seguridad, extraemos la contraseña antes de devolver la respuesta
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { error: "Error interno al crear el usuario." },
      { status: 500 },
    );
  }
}
