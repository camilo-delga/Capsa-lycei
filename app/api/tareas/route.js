import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET - Obtener todas las tareas
export async function GET(request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { searchParams } = new URL(request.url);
    const materia_id = searchParams.get("materia_id");

    let query = supabase
      .from("tareas")
      .select("*")
      .order("fecha_limite", { ascending: true });

    // Filtrar por materia si se proporciona
    if (materia_id) {
      query = query.eq("materia_id", materia_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return NextResponse.json(
      { error: "Error al obtener tareas" },
      { status: 500 }
    );
  }
}

// POST - Crear nueva tarea
export async function POST(request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const body = await request.json();
    const { materia_id, titulo, descripcion, fecha_limite, archivo_url } = body;

    if (!materia_id || !titulo) {
      return NextResponse.json(
        { error: "materia_id y titulo son requeridos" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tareas")
      .insert([{ materia_id, titulo, descripcion, fecha_limite, archivo_url }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return NextResponse.json(
      { error: "Error al crear tarea" },
      { status: 500 }
    );
  }
}
