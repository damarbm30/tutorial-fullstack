import Link from "next/link";

const SIDEBAR_ITEMS = [
  {
    href: "portal",
    name: "Portal",
    role: "",
  },
  {
    href: "dashboard",
    name: "Dashboard",
    role: "",
  },
  {
    href: "balances",
    name: "Balances",
    role: "",
  },
  {
    href: "leaves",
    name: "Leaves",
    role: "",
  },
  {
    href: "users",
    name: "Users",
    role: "",
  },
  {
    href: "settings",
    name: "Settings",
    role: "",
  },
  {
    href: "dashboard",
    name: "Dashboard",
    role: "",
  },
  {
    href: "history",
    name: "History",
    role: "",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800">
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {SIDEBAR_ITEMS.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
