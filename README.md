# 📱 Contact Manager

A modern, responsive web application for managing professional contacts and networking boards. Built with Next.js 15.4, TypeScript, and TailwindCSS, featuring a beautiful glassmorphism design and seamless user experience.

## 🚀 Features

- **📋 Board Management**: Create, organize, and manage professional networking boards
- **👥 Contact Management**: Add, edit, and delete professional contacts with detailed information
- **🎨 Modern UI/UX**: Beautiful glassmorphism design with smooth animations
- **📱 Fully Responsive**: Optimized for all devices from mobile phones to desktop computers
- **💾 Local Storage**: Data persistence using browser's LocalStorage
- **⚡ Real-time Updates**: Immediate reflection of changes across the application
- **🎯 Type Safety**: Full TypeScript implementation for robust development

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Persistence**: LocalStorage
- **Build Tool**: Next.js built-in bundler

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with navigation and footer
│   │   ├── page.tsx           # Home page with dashboard
│   │   ├── boards/            # Boards management pages
│   │   │   ├── page.tsx       # All boards listing
│   │   │   └── [id]/          # Dynamic board details
│   │   │       └── page.tsx   # Individual board with contacts
│   │   └── globals.css        # Global styles and TailwindCSS imports
│   ├── components/             # Reusable React components
│   │   ├── Navigation.tsx     # Top navigation bar with mobile menu
│   │   ├── BoardCard.tsx      # Individual board display card
│   │   ├── ContactCard.tsx    # Individual contact display card
│   │   └── ContactForm.tsx    # Modal form for adding/editing contacts
│   ├── lib/                    # Utility functions and data management
│   │   └── localStorage.ts    # LocalStorage operations and sample data
│   └── types/                  # TypeScript type definitions
│       └── index.ts           # Contact, Board, and AppData interfaces
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # TailwindCSS configuration
└── README.md                 # This file
```

## 🎯 How It Works

### Core Concepts

1. **Boards**: Organizational containers for grouping related contacts
2. **Contacts**: Professional individuals with detailed information
3. **LocalStorage**: Client-side data persistence for offline functionality

### Data Flow

1. **Initialization**: App loads with sample data if LocalStorage is empty
2. **Board Creation**: Users create boards to organize contacts by events, companies, or criteria
3. **Contact Management**: Add, edit, and delete contacts within boards
4. **Data Persistence**: All changes are immediately saved to LocalStorage

### User Experience

- **Home Page**: Overview dashboard with statistics and quick board creation
- **Boards Page**: Manage all boards with creation and deletion
- **Board Details**: View and manage contacts within a specific board
- **Responsive Design**: Seamless experience across all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

The application uses TailwindCSS with custom CSS variables. To modify the design:

1. **Colors**: Update CSS variables in `src/app/globals.css`
2. **Components**: Modify Tailwind classes in component files
3. **Layout**: Adjust spacing and sizing in component files

### Adding New Features

1. **New Components**: Create in `src/components/` directory
2. **New Pages**: Add to `src/app/` following Next.js App Router conventions
3. **New Types**: Extend interfaces in `src/types/index.ts`
4. **New Utilities**: Add functions to `src/lib/` directory

### Data Structure

The application uses these main data types:

```typescript
interface Contact {
  id: string;
  name: string;
  position: string;
  company: string;
  location: string;
  interests: string;
}

interface Board {
  id: string;
  name: string;
  contacts: Contact[];
}

interface AppData {
  boards: Board[];
}
```

## 🔧 Development

### Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **State Management**: React useState and useEffect hooks

### Best Practices

- **Component Structure**: Single responsibility principle
- **Error Handling**: Try-catch blocks for data operations
- **Performance**: Optimized re-renders with proper dependency arrays
- **Accessibility**: Semantic HTML and ARIA labels

### Testing

To add testing to the project:

1. **Install testing dependencies**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Create test files** alongside components
3. **Run tests** with `npm test`

## 📱 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect repository to Vercel**
3. **Deploy automatically** on every push

### Other Platforms

- **Netlify**: Build command: `npm run build`, publish directory: `out`
- **Railway**: Connect GitHub repository and deploy
- **Docker**: Create Dockerfile for containerized deployment

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dmytro Kravchenko**

- **Email**: [dmtro.kravchenko@gmail.com](mailto:dmtro.kravchenko@gmail.com)
- **GitHub**: [@dimassskq](https://github.com/dimaskq)
- **LinkedIn**: [Kravchenko Dmytro](https://www.linkedin.com/in/dmytro-kravchenko-b455572a4/)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **React Team** for the powerful UI library

## 📞 Support

If you have any questions or need help:

1. **Check the issues** section for existing solutions
2. **Create a new issue** with detailed description
3. **Contact the author** directly via email

---

**Made with ❤️ by Dmytro Kravchenko**

*Professional networking made simple and elegant*
