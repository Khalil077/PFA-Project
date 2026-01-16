import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "./admin.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  create(@Body() user: CreateUserDto) {
    return this.usersService.register(user);
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() req) {
    // req.user comes from JwtStrategy validate()
    return req.user; // { userId, userRole }
  }

  @Get("findall")
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("find/:id")
  findOne(@Param("id", ParseIntPipe) id) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("update")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async update(@Req() req, @Body() body: UpdateUserDto) {
    return await this.usersService.update(req.userId, body);
  }

  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @Delete("remove/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.usersService.remove(id);
  }
  @Post("login")
  async SignIn(@Body() body) {
    return await this.usersService.login(body);
  }
}
