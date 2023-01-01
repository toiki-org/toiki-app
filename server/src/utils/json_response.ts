import { Response } from "express";

export default class JSONResponse {

    static success(res: Response, data: any, message?: string | null) {
        res.json({
            code: 200,
            message: message || "Success",
            data
        });
    }

    static error(res: Response, status: number, error: string, data?: any) {
        res.status(status).json({
            code: status,
            data,
            error
        });
    }

    static download(res: Response, headers: [string, string][], path: string) {
        if(headers.length > 0) {
            for(const header of headers) {
                res.set(header[0], header[1]);
            }
        }
        res.download(path);
    }

}
