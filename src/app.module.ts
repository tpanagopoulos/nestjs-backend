import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(
        await getConnectionOptions(
          process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
        ),
      ),
  }), TerminusModule, UsersModule, HttpModule],
  exports: [UsersModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {

  constructor(private connection: Connection) {
    console.log("DB connected: " + connection.name);
  }

}
