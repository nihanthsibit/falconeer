type ResponseStatus = {
    status: "success" | "error";
};

type SuccessResponse = ResponseStatus & {
    status: "success";
    data: unknown;
};

type ErrorResponse = ResponseStatus & {
    status: "error";
    error: {
        code: number;
        message: string;
    };
};

export type Response = SuccessResponse | ErrorResponse;