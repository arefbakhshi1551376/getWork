export function error_handler(err: any, req: any, res: any, next: any)
{
    if (err)
    {
        res.status(500).json({
            Message: err['message']
        })
    }
}