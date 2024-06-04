import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService
  ){}

  async create(postData: CreatePostDto) {

    const foundedUser = await this.usersService.findOne(postData.authorId)

    if(!foundedUser){throw new HttpException("no existe el usuario",HttpStatus.NOT_FOUND)}

    const newPostInstance = this.postRepository.create(postData)
    const newPost = this.postRepository.save(newPostInstance)

    return newPost;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
