import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) { }


  async create(user: CreateUserDto) { //recibe en el formato del DTO

    console.log("creando usuario...")
    console.log("user desde servicio", user)


    const foundUser = await this.userRepository.findOne({ //retorna la primera entidad de la base de datos que coincida con la busqueda
      where: {
        username: user.username
      }
    })

    if (foundUser) {
      return new HttpException("User already exists", HttpStatus.BAD_REQUEST)
    }

    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)

  }

  findAll() { //retorna toods los usuarios

    return this.userRepository.find()

  }

  async findOne(id: number) {

    const user = await this.userRepository.findOne({ //retorna la primera entidad de la base de datos que coincida con la busqueda
      where: {
        id: id
      }
    })

    console.log("user found:", user)

    if (!user) {
      return new HttpException("EL usuario con el id " + id + " no existe", HttpStatus.NOT_FOUND)
    }

    return user


  }

  async update(id: number, newInfo: UpdateUserDto) {

    const userToUpdate = await this.userRepository.findOne({ //retorna la primera entidad de la base de datos que coincida con la busqueda
      where: {
        id: id
      }
    })

    if (!userToUpdate) {
      return new HttpException("No se actualizó pues no existe el usuario", 404)
    }

    if (userToUpdate.username === newInfo.username && userToUpdate.password === newInfo.password) {
      return new HttpException("No se actualizó pues son los mismos datos", 404)
    }

    return this.userRepository.update({ id: id }, newInfo)

  }

  async remove(id: number) {


    const result = await this.userRepository.delete({ //retorna la primera entidad de la base de datos que coincida con la busqueda
      id: id
    })
 
    if (result.affected === 0) {
      return new HttpException("No se borró nada pues no existe el usuario", 404)
    }

    return await this.userRepository.delete({ //retorna la primera entidad de la base de datos que coincida con la busqueda
      id: id
    })


  }


  async createProfile(id: number, profileData: CreateProfileDto){

    const userFound = await this.userRepository.findOne({where: {
      id: id
    }})

    if(!userFound){
      return new HttpException("user not found", 404)
    }

   const newProfile = this.profileRepository.create(profileData)

   const savedProfile = await this.userRepository.save(newProfile)

   userFound.profile = savedProfile

   return this.userRepository.save(userFound)

  }

}
