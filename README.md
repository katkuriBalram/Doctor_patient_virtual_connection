# Doctor-Patient Virtual Connection

A modern web application for booking doctor appointments, viewing doctor profiles, and connecting patients with healthcare professionals virtually.

## Features

- Browse doctors by specialization
- View detailed doctor profiles
- Book appointments (chat, video, or physical)
- Responsive and modern UI (Tailwind CSS, shadcn-ui)
- Toast notifications for user feedback
- About Us and Contact Us pages
- Built with React, TypeScript, Vite, and React Router

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [date-fns](https://date-fns.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- Backend: Python (see `/backend/main.py`)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Python 3](https://www.python.org/) (for backend)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd Doctor_patient_virtual_connection
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the frontend development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Start the backend (from `/backend`):**
   ```sh
   cd backend
   python main.py
   ```

5. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
Doctor_patient_virtual_connection/
├── backend/                # Python backend (API)
├── public/                 # Static assets
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components (AboutUs, ContactUs, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main app component
├── package.json
├── tailwind.config.ts
└── README.md
```

## Customization

- **Add doctors:** Update the doctor data in the backend or mock data in frontend pages.
- **Styling:** Modify Tailwind CSS classes or add custom styles in `src/index.css` or `src/App.css`.
- **Routes:** Edit `src/App.tsx` to add or change routes.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Made with ❤️ for healthcare innovation.**
