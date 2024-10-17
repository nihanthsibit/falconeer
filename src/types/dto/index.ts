import { IsString } from 'class-validator';

export class SignUpRequest {
    @IsString()
    email: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    password: string;

    @IsString()
    gender: string;
}

export class SignInRequest {
    @IsString()
    email: string;

    @IsString()
    password: string;
}