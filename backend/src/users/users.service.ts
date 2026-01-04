import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from 'src/generics/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
         private jwtSer : JwtService
      ) {}
  async register(newUser) {
    let newUserEntity =this.userRepo.create( {
      firstName:newUser.firstName ,
      lastName:newUser.firstName, 
      email: newUser.email, 
      role: RoleEnum.ROLE_USER, 
      salt: await bcrypt.genSalt(),
      phone:newUser.phone,
     
      
    })
     newUserEntity.password= await bcrypt.hash(
          newUser.password,
          newUserEntity.salt
        );
    return await this.userRepo.save(newUserEntity);
  } 
  async login(user) {
         let qb = await this.userRepo.createQueryBuilder('users');
      const u = await qb
        .select('users')
        .where('users.email = :ident')//aamel el login yaa bel email wala username
        .setParameter('ident', user.identifiant)
        .getOne();
      if (!u)
        throw new NotFoundException(
          'Aucun utilisateur trouvé avec cet identifiant',
        );
      const test = await bcrypt.compare(user.password, u.password);
      if (!test) throw new NotFoundException('Mot de passe invalide');
      const token = this.jwtSer.sign(
        {
            id : u.id,
            role : u.role
        }
    )
      return {
        message : "Connexion réussie",
        access_token: token,
      };

  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
