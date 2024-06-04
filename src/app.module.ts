import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Profile } from './users/entities/profile.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      host: "localhost",
      port: 3306,
      password: "",
      database: "nestdb",
      entities: [User, Profile, Post],
      synchronize: true
    }),
    UsersModule,
    PostsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
