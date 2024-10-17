import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUp {
    @Field()
    @IsString()
    email: string;

    @Field()
    @IsString()
    first_name: string;

    @Field()
    @IsString()
    last_name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;

    @Field()
    @IsString()
    gender: string;
}