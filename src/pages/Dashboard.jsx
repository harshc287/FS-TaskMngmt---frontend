import PageWrapper from "../components/pageWrapper";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-950 text-white flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
          <h2 className="text-xl font-semibold tracking-wide">Task Manager</h2>

          <nav className="mt-10 space-y-4 text-sm">
            <p className="text-amber-400 font-medium">Dashboard</p>
            <p className="text-zinc-400 hover:text-white cursor-pointer">Tasks</p>
            <p className="text-zinc-400 hover:text-white cursor-pointer">Assigned</p>
            <p className="text-zinc-400 hover:text-white cursor-pointer">Settings</p>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <button className="bg-amber-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-400 transition">
              New Task
            </button>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard title="Total Tasks" value="24" />
            <StatCard title="Completed" value="18" />
            <StatCard title="Pending" value="6" />
          </div>

          {/* Empty State */}
          <div className="border border-white/10 rounded-xl p-10 text-center text-zinc-400">
            No tasks yet. Start by creating one.
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
