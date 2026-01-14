import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { RoleEnum } from "src/generics/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @MinLength(10)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  public phone: string;
}
