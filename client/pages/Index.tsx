import { Stories } from "../components/Stories";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";

const samplePosts = [
  {
    author: {
      name: "Ahmed Khan",
      avatar: "/placeholder.svg",
      username: "ahmed.khan"
    },
    content: "Just finished building my first React Native app! 🚀 The journey from web development to mobile has been incredible. Can't wait to share it with everyone soon.",
    timeAgo: "2 hours ago",
    likes: 42,
    comments: 8,
    shares: 3
  },
  {
    author: {
      name: "Sarah Ali",
      avatar: "/placeholder.svg",
      username: "sarah.ali"
    },
    content: "Beautiful sunset from my rooftop today. Sometimes we need to pause and appreciate the simple moments in life. 🌅 What made you smile today?",
    image: "/placeholder.svg",
    timeAgo: "4 hours ago",
    likes: 127,
    comments: 23,
    shares: 12
  },
  {
    author: {
      name: "Mohammad Rahman",
      avatar: "/placeholder.svg",
      username: "mohammad.rahman"
    },
    content: "Excited to announce that our startup just received funding! 💼 A huge thanks to everyone who believed in our vision. This is just the beginning of an amazing journey.",
    timeAgo: "6 hours ago",
    likes: 89,
    comments: 34,
    shares: 18
  },
  {
    author: {
      name: "Fatima Hassan",
      avatar: "/placeholder.svg",
      username: "fatima.hassan"
    },
    content: "Throwback to last weekend's hiking adventure 🏔️ Nature has a way of refreshing the soul. Already planning the next trip!",
    image: "/placeholder.svg",
    timeAgo: "8 hours ago",
    likes: 156,
    comments: 19,
    shares: 7
  },
  {
    author: {
      name: "Nasir Sheikh",
      avatar: "/placeholder.svg",
      username: "nasir.sheikh"
    },
    content: "Learning TypeScript has been a game-changer for my development workflow. The type safety and IntelliSense support make coding so much more enjoyable. Highly recommend it to all JavaScript developers! 💻",
    timeAgo: "12 hours ago",
    likes: 73,
    comments: 15,
    shares: 25
  }
];

export default function Index() {
  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6">
      <Stories />
      <CreatePost />
      
      <div className="space-y-6">
        {samplePosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
      
      {/* Load more indicator */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Loading more posts...</p>
      </div>
    </div>
  );
}
