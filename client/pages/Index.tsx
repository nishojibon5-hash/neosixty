import { Stories } from "../components/Stories";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
import { useApp } from "../context/AppContext";

export default function Index() {
  const { state } = useApp();

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      <Stories />
      <CreatePost />
      
      <div className="space-y-6">
        {state.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      
      {/* Load more indicator */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">You're all caught up!</p>
      </div>
    </div>
  );
}
