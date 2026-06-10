import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
  name: "Chat",
  path: "/chat",
},
    {
      name: "Documents",
      path: "/documents",
    },
    {
      name: "AI Config",
      path: "/config",
    },
    {
  name: "Analytics",
  path: "/analytics",
},
    {
      name: "Tickets",
      path: "/tickets",
    },
    {
      name: "Conversations",
      path: "/conversations",
    },
  ];

  return (
    <div
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-5
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        Support AI
      </h2>

      <div className="flex flex-col gap-3">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`
              p-3
              rounded
              ${
                location.pathname ===
                link.path
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
              }
            `}
          >
            {link.name}
          </Link>

        ))}

      </div>

    </div>
  );
};

export default Sidebar;