# NEXUS - Digital Investigation Agency 🕵️‍♂️

An immersive FBI-style digital forensics investigation game built with Nuxt 3. Solve cyber crimes through email analysis, file exploration, and evidence gathering in realistic investigation scenarios.

## 🎯 What is NEXUS?

**NEXUS** is a web-based investigation simulation where you play as a digital detective. Using realistic tools and methodologies, investigate cyber crimes, analyze digital evidence, and uncover conspiracies.

### Current Features
- � **User Authentication**: Secure JWT-based login system
- 👤 **Agent Profiles**: Customizable agent badges and credentials  
- 💻 **Full Laptop Simulation**: Realistic desktop environment
- 📧 **Email Investigation**: Analyze suspicious communications
- 💬 **Message Analysis**: Track chat conversations
- 📁 **File Exploration**: Document and evidence management
- 🪟 **Advanced Window Management**: Draggable, resizable, minimizable windows
- ⚙️ **Settings Management**: Profile editing and password changes

### First Investigation: "The Internal Leak"
Someone within the organization is leaking confidential documents. Your mission:
1. Review suspicious emails between employees and external contacts
2. Analyze chat messages coordinating document transfers  
3. Examine file access logs showing unauthorized downloads
4. Track financial transactions indicating payments

## 🛠️ Tech Stack

- **Frontend**: Nuxt 3 + TypeScript + Vue 3 Composition API
- **Backend**: Nitro server with MongoDB + Mongoose
- **Authentication**: JWT tokens with bcrypt password hashing
- **Styling**: SCSS with custom variables and responsive design
- **State Management**: Pinia stores
- **Typography**: Inter (UI) + JetBrains Mono (code/terminal)

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to start investigating!

### Building for Production
```bash
npm run build
```

## 🌐 Netlify Deployment

### 1. Environment Variables
Set these in Netlify dashboard (Site settings > Environment variables):

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nexus
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

### 2. MongoDB Atlas Setup
1. Create MongoDB Atlas cluster
2. Create database user with read/write access
3. Whitelist Netlify IPs (0.0.0.0/0 for simplicity)
4. Copy connection string to MONGODB_URI

### 3. Deploy
1. Connect GitHub repository to Netlify
2. Build settings auto-detect:
   - **Build command**: `npm run build`
   - **Publish directory**: `.output/public`
3. Add environment variables
4. Deploy and investigate! 🕵️

## 🏗️ Project Architecture

```
nexus/
├── server/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   └── user/           # User management endpoints
│   └── utils/              # Database & JWT utilities
├── pages/
│   ├── index.vue           # Main dashboard
│   ├── auth.vue            # Login/register
│   └── settings.vue        # User profile management
├── components/
│   ├── apps/               # Investigation applications
│   │   ├── Email.vue       # Email forensics
│   │   ├── Messages.vue    # Chat analysis
│   │   ├── Evidence.vue    # Evidence management
│   │   └── Notes.vue       # Case notes
│   ├── LaptopScreen.vue    # Desktop simulation
│   └── Window.vue          # Window management system
├── stores/
│   ├── auth.ts             # Authentication state
│   ├── game.ts             # Game progression
│   └── laptop.ts           # Desktop applications
└── assets/scss/            # Styling and variables
```

## 🎮 How to Play

1. **Register/Login** with your agent credentials
2. **Select an investigation** from the main dashboard
3. **Open the laptop** to access investigation tools
4. **Use applications** to analyze evidence:
   - 📧 **Email**: Review suspicious communications
   - 💬 **Messages**: Track chat conversations
   - 📁 **Files**: Examine documents and logs
   - 📝 **Notes**: Document your findings
5. **Solve the case** by connecting the evidence

## 🔒 Security Features

- JWT authentication with HTTP-only cookies
- bcrypt password hashing (12 rounds)
- Protected routes via global middleware
- Input validation and sanitization
- CORS protection and security headers

## 🎨 Design Philosophy

- **Dark Theme**: Professional investigation agency aesthetics
- **FBI-Inspired UI**: Realistic government interfaces
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: Proper contrast and navigation

## 🔮 Roadmap

- � **Multiple Stories**: Additional investigation scenarios
- 🏆 **Achievement System**: Progress tracking and rewards
- 📊 **Analytics Dashboard**: Case completion statistics
- 🎵 **Audio Integration**: Ambient sounds and effects
- 🌍 **Internationalization**: Multi-language support
- 💳 **Premium Content**: Advanced cases and tools

---

**Developed by**: rol2005hun  
**License**: MIT  
**Version**: 1.0.0

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.