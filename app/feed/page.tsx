import { getComments } from "@/services/comments/apiComments";
import { getPosts } from "@/services/posts/apiPosts";

export default async function FeedPage() {
  try {
    const posts = await getPosts();
    
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        try {
          const comments = await getComments(post.id);
          return {
            ...post,
            commentsData: comments || [],
            commentsCount: comments?.length || 0,
          };
        } catch (error) {
          console.error(`Error fetching comments for post ${post.id}:`, error);
          return {
            ...post,
            commentsData: [],
            commentsCount: 0,
          };
        }
      })
    );

    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              Latest Updates
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Stay informed with curated content and insights from our community
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">No posts available</h3>
              <p className="text-slate-500">Check back later for new content</p>
            </div>
          ) : (
            <section className="space-y-8" aria-label="Posts feed">
              {postsWithComments.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  {post.image && (
                    <div className="relative w-full h-72 overflow-hidden bg-slate-50">
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <header className="mb-6">
                      <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-700 text-base leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                    </header>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white font-semibold text-sm">
                              {post.name?.charAt(0).toUpperCase() || 'A'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {post.name || 'Anonymous'}
                            </p>
                            <time 
                              className="text-slate-500 text-sm"
                              dateTime={post.created_at}
                            >
                              {new Date(post.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                        </div>
                      </div>

                      {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-150"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <footer className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center space-x-6">
                          <button 
                            className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors duration-150 group"
                            aria-label={`Like post (${post.like || 0} likes)`}
                          >
                            <svg
                              className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium">{post.like || 0}</span>
                          </button>
                          
                          <button 
                            className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors duration-150 group"
                            aria-label={`View comments (${post.commentsCount || 0} comments)`}
                          >
                            <svg
                              className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium">{post.commentsCount || 0}</span>
                          </button>
                        </div>
                        
                        <button 
                          className="text-slate-400 hover:text-slate-600 transition-colors duration-150"
                          aria-label="Share post"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                        </button>
                      </footer>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading feed:', error);
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Unable to load feed</h2>
          <p className="text-slate-600">Please try refreshing the page</p>
        </div>
      </main>
    );
  }
}
