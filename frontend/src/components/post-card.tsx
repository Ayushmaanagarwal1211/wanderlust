import { useNavigate } from 'react-router-dom';
import Post from '@/types/post-type';
import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { createSlug } from '@/utils/slug-generator';
import { TestProps } from '@/types/test-props';
import { useEffect, useRef, useState } from 'react';

export default function PostCard({ post, testId = 'postcard' }: { post: Post } & TestProps) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);
  const descriptionRef = useRef(null);
  const [incHeight,setIncHeight]=useState(false)
  useEffect(()=>{
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      const scrollHeight = descriptionElement.scrollHeight;
      const clientHeight = descriptionElement.clientHeight;
      if (clientHeight === scrollHeight) {
        setIncHeight(true)
      } 
    }
  },[incHeight])
  return (
    <div
      className={`active:scale-click group w-full sm:w-1/2 lg:w-1/3 xl:w-1/4`}
      data-testid={testId}
    >
      <div
        className={`mb-4 cursor-pointer rounded-lg bg-light shadow-md dark:bg-dark-card ${'sm:mr-8 sm:mt-4'}`}
        onClick={() => navigate(`/details-page/${slug}/${post._id}`, { state: { post } })}
      >
        <div className="h-48 w-full overflow-hidden">
          <img
            src={post.imageLink}
            alt={post.title}
            className={`sm:group-hover:scale-hover h-full w-full rounded-t-lg object-cover transition-transform ease-in-out`}
          />
        </div>
        <div className="p-3">
          <div className="mb-1 text-xs text-light-info dark:text-dark-info">
            {post.authorName} • {formatPostTime(post.timeOfPost)}
          </div>
          <h2 className="mb-2 line-clamp-1 text-base font-semibold text-light-title dark:text-dark-title">
            {post.title}
          </h2>
          <p ref={descriptionRef} className={`${incHeight?"leading-10":""} line-clamp-2  text-sm text-light-description dark:text-dark-description`}>
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <CategoryPill key={`${category}-${index}`} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
