import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    user: string
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({user: 'Ada Lovelace'});
}

export default handler;