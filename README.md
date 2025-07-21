# Operation: Nexus - Digital Investigation Agency 🕵️‍♂️

An immersive FBI-style digital forensics investigation game where you solve cyber crimes through email analysis, file exploration, and evidence gathering. Step into the shoes of a digital detective and uncover conspiracies in realistic investigation scenarios.

## 🎯 About Operation: Nexus

**Operation: Nexus** is a cutting-edge web-based investigation simulation that puts you in control of digital forensics cases. Using realistic tools and methodologies, players must:

- 🔍 **Investigate Cyber Crimes**: Analyze digital evidence like a real FBI agent
- 💻 **Use Professional Tools**: Email clients, file explorers, and chat analyzers
- 🕵️ **Solve Complex Cases**: Uncover internal leaks, cyber espionage, and digital heists
- 📊 **Follow Digital Trails**: Track communications, file access, and financial transactions
- 🧩 **Connect the Dots**: Piece together evidence to solve intricate conspiracies

## ✨ Key Features

- 🎮 **Interactive Story Selection**: Choose from different investigation cases
- 💻 **Full Laptop Simulation**: Realistic desktop environment with applications
- 📧 **Email Investigation**: Analyze suspicious communications
- 💬 **Message Analysis**: Track chat conversations
- 📁 **File Exploration**: Document and evidence management
- 🪟 **Window Management**: Draggable, resizable windows

## 🛠️ Tech Stack

- **Framework**: Nuxt 3 + TypeScript
- **Styling**: SCSS with custom variables
- **State Management**: Pinia
- **Fonts**: Inter (UI) + JetBrains Mono (code)

## 🚀 Installation

Install dependencies:

```bash
npm install
```

## 📱 Development

Start the development server:

```bash
npm run dev
```

The game will be available at `http://localhost:3000`.

## 🕵️ First Story: "The Internal Leak"

Someone within the organization is leaking confidential documents to external parties. Your mission:

1. 📧 **Review Emails**: Search for suspicious communications
2. 💬 **Analyze Messages**: Monitor chat conversations
3. 📄 **Examine Documents**: Review file access logs
4. 💰 **Follow Money Trail**: Track suspicious transactions

## 🎯 Gameplay

1. **Select a case** from the main menu
2. **Open the laptop** - full desktop environment awaits
3. **Explore applications**:
   - 📧 SecureMail - email client
   - 💬 InstantMsg - messaging app
   - 📁 FileExplorer - file manager
   - 🌐 WebBrowser - web browser
   - 📝 Notepad - note taking
   - 🔍 Evidence Locker - evidence storage

## ⌨️ Controls

- **ESC**: Exit laptop
- **Double click**: Open application
- **Drag windows**: Grab title bar
- **Resize**: Drag bottom-right corner

## 🏗️ Project Structure

```
opnexus/
├── assets/scss/          # Global styles
├── components/           # Vue components
│   ├── apps/             # Application components
│   │   ├── Email.vue     # Email application
│   │   ├── Messages.vue  # Messages application
│   │   ├── Evidence.vue  # Evidence management
│   │   ├── Notes.vue     # Notes application
│   │   └── Default.vue   # Default/placeholder app
│   ├── LaptopScreen.vue  # Laptop simulation
│   └── Window.vue        # Window manager
├── pages/               # Pages
├── stores/              # Pinia stores
│   ├── game.ts          # Game state
│   └── laptop.ts        # Laptop simulation
└── nuxt.config.ts       # Nuxt configuration
```

## 🎨 Design

- **Dark Theme**: Professional investigation agency aesthetics
- **Blue Accents**: #007acc primary color
- **Responsive**: Playable on mobile devices
- **Animations**: Smooth transitions and effects

## 🔮 Planned Features

- 🌐 **Stripe Integration**: Premium story packages
- 📊 **Analytics**: Performance tracking
- 🏆 **Achievements**: Scoring and leaderboards
- 🎵 **Sound Effects**: Enhanced atmosphere
- 🌍 **Internationalization**: Additional language support

---

**Developed by**: NEXUS Development Team  
**Version**: 1.0.0  
**License**: MIT

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

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
