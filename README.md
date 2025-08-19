# Neo sixty

A modern Facebook clone built with React, TypeScript, and Tailwind CSS. Neo sixty allows users to connect, share posts, stories, and interact with friends in a familiar social media interface.

## Features

🚀 **Core Features**
- Facebook-like user interface
- Responsive design for all devices
- News feed with posts and interactions
- Stories feature
- Real-time chat interface
- User profiles and avatars
- Like, comment, and share functionality

✨ **Modern Tech Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 + Radix UI components
- **Backend**: Express.js integrated with Vite
- **Icons**: Lucide React
- **Build**: Production-ready with multiple deployment options

## Getting Started

### Prerequisites
- Node.js 16+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/neosixty.git
cd neosixty
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:8080`

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm typecheck` - TypeScript validation

## Project Structure

```
neosixty/
├── client/                 # React frontend
│   ├── components/         # UI components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Sidebar.tsx    # Left sidebar
│   │   ├── Post.tsx       # Post component
│   │   └── ...
│   ├── pages/             # Route components
│   ├── App.tsx           # Main app component
│   └── global.css        # Global styles
├── server/                # Express backend
│   ├── routes/           # API routes
│   └── index.ts          # Server setup
├── shared/               # Shared types
└── package.json
```

## Components

### Core Components
- **Header**: Navigation with search, menu items, and user profile
- **Sidebar**: Left navigation with shortcuts and menu items
- **RightSidebar**: Contacts, sponsored content, and group chats
- **Post**: Individual post with likes, comments, and sharing
- **Stories**: Instagram-like stories carousel
- **CreatePost**: Post creation interface

### UI Components
Built with Radix UI primitives and styled with Tailwind CSS:
- Button, Card, Avatar, Badge
- Dialog, Dropdown, Separator
- Input, Textarea, Tabs
- And many more...

## Customization

### Theming
Colors and themes can be customized in:
- `client/global.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind configuration

### Adding Features
1. Create new components in `client/components/`
2. Add new pages in `client/pages/`
3. Add API routes in `server/routes/`
4. Update routing in `client/App.tsx`

## Deployment

### Option 1: Netlify
Use the [Connect Netlify MCP](#open-mcp-popover) for easy deployment.

### Option 2: Vercel
Use the [Connect Vercel MCP](#open-mcp-popover) for easy deployment.

### Option 3: Manual Build
```bash
pnpm build
pnpm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Screenshots

*Coming soon - Screenshots of the application will be added here*

## Roadmap

- [ ] Real-time messaging
- [ ] Video calling integration
- [ ] Mobile app (React Native)
- [ ] Advanced search functionality
- [ ] Group management
- [ ] Events and marketplace
- [ ] PWA support

---

Built with ❤️ using React and modern web technologies.
