export type { ForumComment, ForumPost } from './forum/types';
import type { ForumPost } from './forum/types';
import { forumPostsEn } from './forum/posts/en-threads';

export const forumCategories = [
  { name: 'General Discussion', tone: 'purple', icon: 'layers' },
  { name: 'Features & Questions', tone: 'blue', icon: 'tag' },
  { name: 'Updates & Status', tone: 'orange', icon: 'refresh' },
  { name: 'Safety & Account Questions', tone: 'green', icon: 'shieldCheck' },
  { name: 'Buying Advice', tone: 'purple', icon: 'tag' },
  { name: 'Help & Support', tone: 'green', icon: 'headphones' },
] as const;

export const forumPosts: ForumPost[] = forumPostsEn;

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
