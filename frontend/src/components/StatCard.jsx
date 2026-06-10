const StatCard = ({
  title,
  value,
}) => {
  return (
    <div className="border p-4 rounded">

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
};

export default StatCard;