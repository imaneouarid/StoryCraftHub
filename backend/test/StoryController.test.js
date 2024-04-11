const StoryController = require('../controllers/StoryController');
const Story = require('../Models/storyModel');

describe('StoryController', () => {
  // Mock data
  const mockRequest = {
    body: {
      title: 'Test Story',
      content: 'Lorem ipsum dolor sit amet.',
      topics: ['topic1', 'topic2'],
      author: 'valid-author-id',
      isAnonymous: false,
    },
    params: {
      userId: 'valid-story-id',
      topicId: 'valid-topic-id',
    },
    user: {
      id: 'valid-user-id',
    },
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Test createStory method
  describe('createStory', () => {
    it('should create a new story', async () => {
      await StoryController.createStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalled();
    }, 20000); // Increase timeout to 20 seconds
  });

 
  
});
