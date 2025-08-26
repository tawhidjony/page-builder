import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// 🔹 GET → একক প্রোজেক্ট
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const project = await prisma.project.findUnique({
        where: { id: Number(params.id) },
    });

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

// 🔹 PUT → প্রোজেক্ট আপডেট
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    try {
        const updated = await prisma.project.update({
            where: { id: Number(params.id) },
            data: {
                projectName: body.projectName,
                image: body.image,
                description: body.description,
                time: body.time ? new Date(body.time) : undefined,
                template: body.template,
                publish: body.publish,
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

// 🔹 DELETE → প্রোজেক্ট ডিলিট
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.project.delete({
            where: { id: Number(params.id) },
        });

        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
}
