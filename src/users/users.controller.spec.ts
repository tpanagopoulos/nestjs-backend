import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
          findAll: jest.fn(),
          update: jest.fn(),
          remove: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  const mock_users = [{id:1, name:"name1", surname:"surname1"},{id:2, name:"name2", surname:"surname2"}];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const result = mock_users[0];
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await controller.create(result)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = mock_users[0];
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne(''+result.id)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = mock_users;
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = mock_users[0];
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne(''+result.id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = mock_users[0];
      const result = new UpdateResult();
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(result));

      expect(await controller.update(''+user.id, user)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = mock_users[0];
      const result = new DeleteResult();
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await controller.remove(''+user.id)).toBe(result);
    });
  });

});
