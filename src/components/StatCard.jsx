const StatCard = ({ title, value, icon: Icon, valueColor = "text-white" }) => {
  const getIconBgColor = (color) => {
    if (color.includes("green")) return "bg-green-500/20";
    if (color.includes("blue")) return "bg-blue-500/20";
    if (color.includes("yellow")) return "bg-yellow-500/20";
    if (color.includes("purple")) return "bg-purple-500/20";
    if (color.includes("red")) return "bg-red-500/20";
    return "bg-zinc-800";
  };

  const iconBgColor = getIconBgColor(valueColor);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm mb-2">{title}</p>
          <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={valueColor} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;