import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    jest.resetAllMocks();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
      {
        provide: 'USER_REPOSITORY',
        useValue: {
          save: jest.fn(),
          findOne: jest.fn(),
          find: jest.fn(),
          update: jest.fn(),
          delete: jest.fn()
        }
      }]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>('USER_REPOSITORY');
  });

  const mock_users = [{id:1, name:"name1", surname:"surname1"},{id:2, name:"name2", surname:"surname2"}];

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = mock_users[0];
      
      jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await service.create(mock_users[0])).toBe(result);
    });
  });

  describe('find', () => {
    it('should return an array of users', async () => {
      const result = mock_users;
      
      jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(result));

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const result = mock_users[0];
      
      jest.spyOn(repository, 'findOne').mockImplementation(() =>  Promise.resolve(result));

      expect(await service.findOne(mock_users[0].id)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return an array of users', async () => {
      const result = new UpdateResult;
      
      jest.spyOn(repository, 'update').mockImplementation(() => Promise.resolve(result));

      expect(await service.update(mock_users[0].id, mock_users[0])).toBe(result);
    });
  });

  describe('remove', () => {
    it('should return an array of users', async () => {
      const result = new DeleteResult;
      
      jest.spyOn(repository, 'delete').mockImplementation(() => Promise.resolve(result));

      expect(await service.remove(mock_users[0].id)).toBe(result);
    });
  });
});
