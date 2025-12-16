const StatCard = ({ title, value }) => {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <h3 className="text-3xl font-semibold mt-2">{value}</h3>
    </div>
  );
};

export default StatCard;
