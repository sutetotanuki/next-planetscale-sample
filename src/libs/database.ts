import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type InquiryInput = {
    name: string,
    email: string,
    subject: string,
    message: string,
}


export async function createInquiry(params: InquiryInput) {
    return await prisma.inquiry.create({data: params});
}

export async function fetchInquiries() {
    return await prisma.inquiry.findMany();
}