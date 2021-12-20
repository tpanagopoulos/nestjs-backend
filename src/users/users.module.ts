import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [  
    ...userProviders,
    UsersService]
})
export class UsersModule {}
