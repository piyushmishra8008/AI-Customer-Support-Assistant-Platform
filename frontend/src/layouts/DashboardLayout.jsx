import Sidebar from
"../components/Sidebar";

const DashboardLayout = ({
  children,
}) => {

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;