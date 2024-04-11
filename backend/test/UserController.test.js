const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController');
const User = require('../Models/userModel');
const validator = require('validator');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../Models/userModel');
jest.mock('validator');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



  describe('getUserProfile', () => {
    it('should get user profile', async () => {
      const req = { params: { userId: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockUser = { _id: 'userId', username: 'testuser', email: 'test@example.com', interests: ['coding', 'reading'] };
      User.findById.mockResolvedValue(mockUser);

      await UserController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle user not found', async () => {
      const req = { params: { userId: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue(null);

      await UserController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle internal server error', async () => {
      const req = { params: { userId: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockRejectedValue(new Error('Database error'));

      await UserController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const req = { params: { userId: 'userId' }, body: { interests: ['music', 'sports'] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockUser = { _id: 'userId', username: 'testuser', email: 'test@example.com', interests: ['coding', 'reading'] };
      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      await UserController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle user not found', async () => {
      const req = { params: { userId: 'userId' }, body: { interests: ['music', 'sports'] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findByIdAndUpdate.mockResolvedValue(null);

      await UserController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle internal server error', async () => {
      const req = { params: { userId: 'userId' }, body: { interests: ['music', 'sports'] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await UserController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});















































//   describe('register', () => {
//     it('should register a new user', async () => {
//       const req = { body: { username: 'testuser', email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       bcrypt.hash.mockResolvedValue('hashedPassword');
//       User.findOne.mockResolvedValue(null);
//       validator.isEmail.mockReturnValue(true);
//       validator.isStrongPassword.mockReturnValue(true);
//       User.create.mockResolvedValue({ username: 'testuser', email: 'test@example.com', role: 'user' });

//       await UserController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', role: 'user' });
//     });

//     it('should handle existing user', async () => {
//       const req = { body: { username: 'testuser', email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       User.findOne.mockResolvedValue({});

//       await UserController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
//     });

//     it('should handle invalid email format', async () => {
//       const req = { body: { username: 'testuser', email: 'test', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       await UserController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
//     });

//     it('should handle weak password', async () => {
//       const req = { body: { username: 'testuser', email: 'test@example.com', password: 'weak' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       User.findOne.mockResolvedValue(null);
//       validator.isEmail.mockReturnValue(true);
//       validator.isStrongPassword.mockReturnValue(false);

//       await UserController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Password is too weak' });
//     });

//     it('should handle internal server error', async () => {
//       const req = { body: { username: 'testuser', email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       User.findOne.mockRejectedValue(new Error('Database error'));

//       await UserController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//     });
//   });

//   describe('login', () => {
//     it('should login user with valid credentials', async () => {
//       const req = { body: { email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       const mockUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };
//       User.findOne.mockResolvedValue(mockUser);
//       bcrypt.compare.mockResolvedValue(true);
//       jwt.sign.mockReturnValue('accessToken');

//       await UserController.login(req, res);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', accessToken: 'accessToken', id: 'userId', username: undefined });
//     });

//     it('should handle invalid credentials', async () => {
//       const req = { body: { email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       User.findOne.mockResolvedValue(null);

//       await UserController.login(req, res);

//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
//     });

//     it('should handle incorrect password', async () => {
//       const req = { body: { email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       const mockUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' };
//       User.findOne.mockResolvedValue(mockUser);
//       bcrypt.compare.mockResolvedValue(false);

//       await UserController.login(req, res);

//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
//     });

//     it('should handle internal server error', async () => {
//       const req = { body: { email: 'test@example.com', password: 'Test1234' } };
//       const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//       User.findOne.mockRejectedValue(new Error('Database error'));

//       await UserController.login(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//     });
//   });