# SplitMate

A modern, minimal bill-splitting web application built with React. Split expenses effortlessly among friends, family, or colleagues.

🔗 **[Live Demo](https://split-mate-six.vercel.app/)**

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Multiple Groups** - Create and manage multiple expense groups (trips, roommates, events)
- **Group Management** - Add members and switch between groups easily
- **Expense Tracking** - Log expenses with description, amount, and payer
- **Smart Splitting** - Automatically calculates fair splits using a greedy algorithm
- **Balance Overview** - See who owes money and who is owed
- **Settlement Suggestions** - Get optimal payment recommendations to settle debts
- **Local Storage** - Data persists in browser storage
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** React 19, Vite 6
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **State:** React Hooks + Local Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mohammedshammas28/SplitMate.git
cd SplitMate

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # App header with branding
│   ├── GroupSelector.jsx # Switch between multiple groups
│   ├── GroupSetup.jsx    # Group name and member management
│   ├── ExpenseForm.jsx   # Add new expenses
│   ├── ExpenseList.jsx   # Display expense history
│   └── Summary.jsx       # Balances and settlement suggestions
├── hooks/
│   └── useLocalStorage.js # Custom hook for persistent state
├── utils/
│   └── splitLogic.js     # Core splitting algorithm
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## How It Works

1. **Add Members** - Enter names of people in your group
2. **Log Expenses** - Record who paid for what and how much
3. **View Balances** - See each person's net balance (positive = owed money, negative = owes money)
4. **Settle Up** - Follow the settlement suggestions to clear all debts with minimal transactions

### Algorithm

SplitMate uses a greedy algorithm to minimize the number of transactions needed to settle all debts:

1. Calculate each person's net balance (amount paid - fair share)
2. Separate into debtors (negative balance) and creditors (positive balance)
3. Match debtors with creditors to create optimal settlements

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT

---

Built with ❤️ for splitting bills fairly
