import { createInquiry, fetchInquiries } from "@/libs/database";
import type { NextApiRequest, NextApiResponse } from "next";


const postInquiry = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body

    const inquiry = await createInquiry({
        name: body.name,
        email: body.email,
        subject: body.subject,
        productName: body.productName,
        message: body.message,
    })

    return res.status(201).json(inquiry);
}

const getInquiries = async (req: NextApiRequest, res: NextApiResponse) => {
    const inquiries = await fetchInquiries();

    return res.status(200).json(inquiries);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "POST":
            return await postInquiry(req, res);
        case "GET":
            return await getInquiries(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"})
    }
}
