const handler = (req: any, res: any) => {
    res.status(200).json({user: 'Ada Lovelace'});
}

export default handler;