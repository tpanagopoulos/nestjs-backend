import { Controller, Get, Inject } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Controller('health')
export class HealthController {

    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
        private http: HttpHealthIndicator,
        @Inject('DATABASE_CONNECTION')
        private defaultConnection: Connection,
    ) {}

    @Get()
    @HealthCheck()
    check() {
      return this.health.check([
        () => this.db.pingCheck('database', { connection: this.defaultConnection }),
        () => this.http.pingCheck('http', 'https://www.google.com'),
        () => this.memory.checkHeap('memory', 150 * 1024 * 1024),
        () => this.disk.checkStorage('disk', { thresholdPercent: 0.5, path: '/' }),
      ]);
    }

}
