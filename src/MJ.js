import './index.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { FaPiggyBank, FaBook, FaChartLine, FaUser, FaGamepad, FaHome, 
         FaMedal, FaCog, FaTrophy, FaCoins, FaArrowUp, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

// ======= UI Components =======

const Card = ({ title, icon, children, color = "text-yellow-600", bgColor = "bg-white" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`${bgColor} p-5 rounded-xl shadow-lg mb-6`}
  >
    <div className="flex items-center space-x-2 mb-4">
      <span className={`text-2xl ${color}`}>{icon}</span>
      <h2 className={`text-xl font-bold ${color}`}>{title}</h2>
    </div>
    {children}
  </motion.div>
);

const PageContainer = ({ children, bgColor = "bg-yellow-50" }) => (
  <div className={`min-h-screen ${bgColor} pb-16 md:pb-8`}>
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {children}
    </div>
  </div>
);

const Badge = ({ title, icon }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-3 rounded-lg shadow-md flex items-center space-x-2"
  >
    <span className="text-yellow-800 text-xl">{icon}</span>
    <span className="font-medium text-yellow-900">{title}</span>
  </motion.div>
);

const PageHeader = ({ title, subtitle, color }) => (
  <div className="text-center mb-6">
    <h1 className={`text-3xl font-bold ${color}`}>{title}</h1>
    <p className="text-gray-700">{subtitle}</p>
  </div>
);

const ActionButton = ({ onClick, children, color }) => (
  <button 
    onClick={onClick} 
    className={`inline-block ${color} text-white py-2 px-4 rounded-lg shadow hover:${color.replace('bg-', 'bg-')}-600 transition-colors`}
  >
    {children}
  </button>
);

// ======= Navigation Components =======

const NavLink = ({ to, icon, label, color }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`p-3 ${color} text-white rounded-lg shadow-md flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${isActive ? 'ring-4 ring-yellow-300' : ''}`}
    >
      {icon} <span className="font-medium">{label}</span>
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaPiggyBank className="text-3xl text-pink-600" />
          <span className="text-2xl font-bold text-pink-600">KidVest</span>
        </Link>
        
        <div className="hidden md:flex space-x-2">
          <NavLink to="/" icon={<FaHome />} label="Home" color="bg-yellow-500" />
          <NavLink to="/savings" icon={<FaPiggyBank />} label="Savings" color="bg-pink-500" />
          <NavLink to="/lessons" icon={<FaBook />} label="Lessons" color="bg-purple-500" />
          <NavLink to="/investments" icon={<FaChartLine />} label="Investments" color="bg-green-500" />
          <NavLink to="/games" icon={<FaGamepad />} label="Games" color="bg-blue-500" />
          <NavLink to="/profile" icon={<FaUser />} label="Profile" color="bg-orange-500" />
        </div>
        
        <button 
          className="md:hidden text-pink-600 text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 p-2 bg-white rounded-lg shadow-lg"
        >
          <div className="flex flex-col space-y-2">
            <NavLink to="/" icon={<FaHome />} label="Home" color="bg-yellow-500" />
            <NavLink to="/savings" icon={<FaPiggyBank />} label="Savings" color="bg-pink-500" />
            <NavLink to="/lessons" icon={<FaBook />} label="Lessons" color="bg-purple-500" />
            <NavLink to="/investments" icon={<FaChartLine />} label="Investments" color="bg-green-500" />
            <NavLink to="/games" icon={<FaGamepad />} label="Games" color="bg-blue-500" />
            <NavLink to="/profile" icon={<FaUser />} label="Profile" color="bg-orange-500" />
          </div>
        </motion.div>
      )}
    </header>
  );
};

const MobileNav = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 z-10">
    <div className="flex justify-around">
      <Link to="/" className="flex flex-col items-center text-yellow-600">
        <FaHome className="text-xl" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/savings" className="flex flex-col items-center text-pink-600">
        <FaPiggyBank className="text-xl" />
        <span className="text-xs">Savings</span>
      </Link>
      <Link to="/lessons" className="flex flex-col items-center text-purple-600">
        <FaBook className="text-xl" />
        <span className="text-xs">Lessons</span>
      </Link>
      <Link to="/investments" className="flex flex-col items-center text-green-600">
        <FaChartLine className="text-xl" />
        <span className="text-xs">Invest</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center text-orange-600">
        <FaUser className="text-xl" />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  </div>
);

// ======= Feature Components =======

// Savings Progress Bar Component
const SavingsProgressBar = ({ current, goal }) => {
  const progressPercentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">Goal: ${goal}</span>
        <span className="font-medium text-gray-700">Saved: ${current}</span>
      </div>
      
      <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white drop-shadow-md">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Add Savings Component
const AddSavingsForm = ({ onSave }) => {
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onSave(value);
      setAmount("");
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Add to Savings</label>
        <div className="flex space-x-3">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
          />
          <button 
            onClick={handleSave} 
            className="bg-pink-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
          >
            <FaCoins /> <span>Add</span>
          </button>
        </div>
      </div>
      
      {/* Quick add buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 5, 10, 20].map(quickAmount => (
          <button
            key={quickAmount}
            onClick={() => setAmount(quickAmount.toString())}
            className="py-2 px-4 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
          >
            +${quickAmount}
          </button>
        ))}
      </div>
    </>
  );
};

// Set Goal Component
const GoalSetting = ({ currentGoal, onGoalChange }) => (
  <div className="mb-6">
    <label className="block text-gray-700 mb-2 font-medium">Set New Goal</label>
    <input
      type="number"
      value={currentGoal}
      onChange={(e) => onGoalChange(Math.max(parseFloat(e.target.value) || 0, 1))}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
    />
  </div>
);

// Achievements Component
const Achievements = ({ badges }) => (
  <Card title="My Achievements" icon={<FaTrophy />} color="text-yellow-600" bgColor="bg-white">
    {badges.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <Badge key={index} title={badge} icon={<FaMedal />} />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center py-4">
        Complete challenges to earn badges!
      </p>
    )}
  </Card>
);

// Tips List Component
const TipsList = ({ tips }) => (
  <Card title="Savings Tips" icon={<FaArrowUp />} color="text-blue-600" bgColor="bg-white">
    <ul className="space-y-3">
      {tips.map((tip, index) => (
        <li key={index} className="flex items-start space-x-2">
          <span className="text-blue-500 mt-1">•</span>
          <span className="text-gray-700">{tip}</span>
        </li>
      ))}
    </ul>
  </Card>
);

// Home Feature Card Component
const FeatureCard = ({ title, description, icon, linkTo, buttonText, color, bgColor }) => (
  <Card 
    title={title} 
    icon={icon} 
    color={color} 
    bgColor={bgColor}
  >
    <p className="text-gray-700 mb-4">{description}</p>
    <Link to={linkTo} className={`inline-block ${color.replace('text', 'bg')} text-white py-2 px-4 rounded-lg shadow hover:${color.replace('text', 'bg').replace('-600', '-700')} transition-colors`}>
      {buttonText}
    </Link>
  </Card>
);

// Stat Card Component
const StatCard = ({ label, value, color = "text-orange-600" }) => (
  <div className="bg-orange-50 p-4 rounded-lg text-center">
    <p className="text-gray-600 text-sm">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

// ======= Page Components =======

const Home = () => {
  const features = [
    { 
      title: "Track Your Savings", 
      description: "Set savings goals and watch your money grow!",
      icon: <FaPiggyBank />, 
      color: "text-pink-600", 
      bgColor: "bg-gradient-to-br from-white to-pink-50",
      linkTo: "/savings",
      buttonText: "Start Saving"
    },
    { 
      title: "Learn About Money", 
      description: "Fun lessons about saving, spending, and investing!",
      icon: <FaBook />, 
      color: "text-purple-600", 
      bgColor: "bg-gradient-to-br from-white to-purple-50",
      linkTo: "/lessons",
      buttonText: "Start Learning"
    },
    { 
      title: "Play Mini Games", 
      description: "Fun games that teach you about money!",
      icon: <FaGamepad />, 
      color: "text-blue-600", 
      bgColor: "bg-gradient-to-br from-white to-blue-50",
      linkTo: "/games",
      buttonText: "Play Now"
    },
    { 
      title: "Investment Basics", 
      description: "Learn how to grow your money over time!",
      icon: <FaChartLine />, 
      color: "text-green-600", 
      bgColor: "bg-gradient-to-br from-white to-green-50",
      linkTo: "/investments",
      buttonText: "Explore"
    }
  ];

  return (
    <PageContainer bgColor="bg-gradient-to-b from-yellow-50 to-yellow-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-600">
          <span className="text-pink-500">Kid</span>Vest
        </h1>
        <p className="text-xl text-gray-700">Financial literacy for kids - made fun!</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </PageContainer>
  );
};

const SavingsJar = () => {
  const [savings, setSavings] = useState(0);
  const [goal, setGoal] = useState(100);
  const [badges, setBadges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleSave = (value) => {
    const newSavings = Math.min(savings + value, goal);
    setSavings(newSavings);

    if (newSavings === goal && badges.indexOf("Goal Achiever") === -1) {
      setBadges([...badges, "Goal Achiever"]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  const savingsTips = [
    "Save a little bit regularly instead of a lot at once.",
    "Set realistic goals you can achieve.",
    "Ask for chores you can do to earn money."
  ];

  return (
    <PageContainer bgColor="bg-gradient-to-b from-pink-50 to-pink-100">
      <PageHeader 
        title="My Savings Goals" 
        subtitle="Track your savings and complete challenges!" 
        color="text-pink-600"
      />
      
      <Card 
        title="Savings Tracker" 
        icon={<FaPiggyBank />} 
        color="text-pink-600"
        bgColor="bg-white"
      >
        <SavingsProgressBar current={savings} goal={goal} />
        <GoalSetting currentGoal={goal} onGoalChange={setGoal} />
        <AddSavingsForm onSave={handleSave} />
      </Card>
      
      <Achievements badges={badges} />
      <TipsList tips={savingsTips} />
    </PageContainer>
  );
};

const Profile = () => {
  const stats = [
    { label: "Total Saved", value: "$87.50" },
    { label: "Goals Completed", value: "3" },
    { label: "Badges Earned", value: "5" },
    { label: "Lessons Completed", value: "7" }
  ];

  return (
    <PageContainer bgColor="bg-gradient-to-b from-orange-50 to-orange-100">
      <PageHeader 
        title="My Profile" 
        subtitle="Track your progress and achievements" 
        color="text-orange-600"
      />
      
      <Card 
        title="My Information" 
        icon={<FaUser />} 
        color="text-orange-600"
        bgColor="bg-white"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center mb-4">
            <FaUser className="text-4xl text-orange-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-800">Mann Jivani</h3>
          <p className="text-gray-600">Super Saver</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Savings Level</h4>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-orange-500 h-4 rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Beginner</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card 
        title="My Stats" 
        icon={<FaChartLine />} 
        color="text-orange-600"
        bgColor="bg-white"
      >
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} />
          ))}
        </div>
      </Card>
    </PageContainer>
  );
};

const GameCard = ({ title, description }) => (
  <Card 
    title={title} 
    icon={<FaGamepad />} 
    color="text-blue-600"
    bgColor="bg-white"
  >
    <p className="text-gray-700 mb-4">{description}</p>
    <button className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors">
      Play Now
    </button>
  </Card>
);

const MiniGames = () => {
  const games = [
    {
      title: "Money Matcher",
      description: "Match coins and bills to their values in this fun memory game!"
    },
    {
      title: "Budget Builder",
      description: "Create a balanced budget and learn to manage your money!"
    }
  ];

  return (
    <PageContainer bgColor="bg-gradient-to-b from-blue-50 to-blue-100">
      <PageHeader 
        title="Finance Games" 
        subtitle="Have fun while learning about money!" 
        color="text-blue-600"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game, index) => (
          <GameCard key={index} title={game.title} description={game.description} />
        ))}
      </div>
    </PageContainer>
  );
};

const LessonCard = ({ title, description }) => (
  <Card 
    title={title} 
    icon={<FaBook />} 
    color="text-purple-600"
    bgColor="bg-white"
  >
    <p className="text-gray-700 mb-4">{description}</p>
    <button className="inline-block bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600 transition-colors">
      Start Lesson
    </button>
  </Card>
);

const Lessons = () => {
  const lessons = [
    {
      title: "Introduction to Money",
      description: "Learn about what money is and how we use it!"
    },
    {
      title: "Saving Basics",
      description: "Discover why saving is important and how to get started!"
    }
  ];

  return (
    <PageContainer bgColor="bg-gradient-to-b from-purple-50 to-purple-100">
      <PageHeader 
        title="Finance Lessons" 
        subtitle="Learn important money concepts" 
        color="text-purple-600"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => (
          <LessonCard key={index} title={lesson.title} description={lesson.description} />
        ))}
      </div>
    </PageContainer>
  );
};

const Investments = () => {
  return (
    <PageContainer bgColor="bg-gradient-to-b from-green-50 to-green-100">
      <PageHeader 
        title="Investment Basics" 
        subtitle="Learn how to grow your money over time" 
        color="text-green-600"
      />
      
      <Card 
        title="What Are Investments?" 
        icon={<FaChartLine />} 
        color="text-green-600"
        bgColor="bg-white"
      >
        <p className="text-gray-700 mb-4">
          Investments are ways to make your money grow over time. When you invest, you're putting your money to work!
        </p>
        <button className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition-colors">
          Learn More
        </button>
      </Card>
    </PageContainer>
  );
};

// ======= Main App Component =======

const KidVest = () => {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/savings" element={<SavingsJar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<MiniGames />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/lessons" element={<Lessons />} />
        </Routes>
        <MobileNav />
      </div>
    </Router>
  );
};

export default KidVest;