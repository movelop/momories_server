import express from 'express';
import auth from '../middleware/auth.js';
import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost, getPostsByCreator } from '../controllers/posts.js';
const router = express.Router();

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth,  deletePost);
router.patch('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentPost);

export default router;