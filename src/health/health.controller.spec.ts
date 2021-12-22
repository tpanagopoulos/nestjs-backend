import { DiskHealthIndicator, HealthCheck, HealthCheckResult, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn()
          }
        },{
          provide: TypeOrmHealthIndicator,
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: DiskHealthIndicator,
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: HttpHealthIndicator,
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: MemoryHealthIndicator,
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: 'DATABASE_CONNECTION',
          useValue: {
            save: jest.fn()
          }
        },
      ]
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should check all is ok', async () => {
      const result:HealthCheckResult = {status:'error', info:{db : {status:'up'}}, details:{}};
      
      jest.spyOn(service, 'check').mockImplementation(() =>  Promise.resolve(result));

      expect(await controller.check()).toBe(result);
    });
  });
});
