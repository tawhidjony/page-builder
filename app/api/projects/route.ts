import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// 🔹 GET → সব প্রোজেক্ট
export async function GET() {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
}

// 🔹 POST → নতুন প্রোজেক্ট তৈরি
export async function POST(req: Request) {
    const body = await req.json();

    const project = await prisma.project.create({
        data: {
            projectName: body.projectName,
            image: body.image,
            description: body.description,
            time: new Date(body.time),
            template: body.template,
            publish: body.publish ?? false,
        },
    });

    return NextResponse.json(project);
}
