import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module'; // Importar UsersModule para que PostsService tenga acceso a UsersService

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule], // Registrar PostRepository y UsersModule
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
