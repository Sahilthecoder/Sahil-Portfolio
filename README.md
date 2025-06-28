# Sahil's Portfolio
[![GitHub stars](https://img.shields.io/github/stars/Sahilthecoder/Sahil-Portfolio?style=social)](https://github.com/Sahilthecoder/Sahil-Portfolio/stargazers)
[![GitHub license](https://img.shields.io/github/license/Sahilthecoder/Sahil-Portfolio)](https://github.com/Sahilthecoder/Sahil-Portfolio/blob/main/LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fsahil-ali.vercel.app)](https://sahil-ali.vercel.app)

A modern, responsive, and performant portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

🔗 **Live Demo**: [sahil-ali.vercel.app](https://sahil-ali.vercel.app)  
📂 **Source Code**: [github.com/Sahilthecoder/Sahil-Portfolio](https://github.com/Sahilthecoder/Sahil-Portfolio)

## 🚀 Features

- ⚡ Blazing fast performance with Vite
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🌓 Dark/Light mode
- 📝 Blog section with Markdown support
- 🎨 Custom animations and transitions
- 🔍 SEO optimized
- 🧪 Comprehensive test coverage with Jest and React Testing Library
- 🛠️ Developer experience with ESLint, Prettier, and Husky
- 🤖 AI Assistant with voice input and file uploads

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) 18 with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom configuration
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: React Context API
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **AI Integration**: [LangChain](https://js.langchain.com/), [OpenAI](https://openai.com/)
- **Voice Recognition**: Web Speech API
- **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/)
- **Linting**: [ESLint](https://eslint.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Code Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/#/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or yarn/pnpm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key and other required environment variables
   ```bash
   cp .env.example .env
   ```
   - Edit the `.env` file with your API keys

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🧪 Testing

This project uses Jest and React Testing Library for testing. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Writing Tests

- Test files should be placed in `__tests__` directories next to the components they test.
- Test files should be named with the pattern `ComponentName.test.jsx`.
- Use `@testing-library/react` for rendering and interacting with components.
- Follow the [React Testing Library best practices](https://testing-library.com/docs/react-testing-library/intro/).

## 🧹 Linting and Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🚀 Deployment

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## 🤖 AI Assistant Setup

The portfolio includes an AI assistant with the following features:

- 💬 Chat interface for asking questions about projects and skills
- 🎤 Voice input using the Web Speech API
- 📁 File upload support (PDF, DOC, DOCX, XLS, XLSX, images)
- 🔍 Context-aware responses using LangChain and OpenAI
- 📱 Fully responsive design

### Enabling AI Features

1. **Basic Setup** (required):
   - Add your OpenAI API key to `.env`
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Advanced Setup** (optional):
   - For vector search, set up Pinecone and add your credentials
   - Enable/disable features in `.env`
   ```
   REACT_APP_ENABLE_VOICE_INPUT=true
   REACT_APP_ENABLE_FILE_UPLOAD=true
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based UI library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) for 3D graphics
- [React Icons](https://react-icons.github.io/react-icons/) for icons

## 📬 Contact

For any questions or suggestions, feel free to reach out:

- Email: your.email@example.com
- Twitter: [@yourusername](https://twitter.com/yourusername)
- GitHub: [@yourusername](https://github.com/yourusername)
## 📬 Contact Me

- 💼 [LinkedIn](https://linkedin.com/in/yourusername)
- 📧 [Email](mailto:your.email@example.com)
- 🐦 [Twitter](https://twitter.com/yourusername)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tooling
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons
- All contributors who have helped improve this project
