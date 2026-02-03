export interface errorResponseInterface {
    message: string,
    status: number,
    timestamp: string,
}

export interface validationErrorResponseInterface {
    error: errorResponseInterface
    message: string[],
    ok: boolean,
    status: number,
}