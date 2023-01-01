import { IsString } from "class-validator";

export default class ConvertInput {
    @IsString({ message: "url is required"})
    url!: string;
}
