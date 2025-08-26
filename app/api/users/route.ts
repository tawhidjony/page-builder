/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = "nodejs";
// POST - Create User
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, age } = body

        const user = await prisma.user.create({
            data: {
                name,
                email,
                age: age ? parseInt(age) : null,
            },
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}

// GET - Get All Users
export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        )
    }
}