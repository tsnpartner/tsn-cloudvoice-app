// import * as React from "react";
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Laptop,
//   Phone,
//   Settings,
//   MessageSquareMore,
//   FileText,
//   Tickets,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
//   LayoutDashboard,
// } from "lucide-react";

// import { NavMain } from "src/components/nav-main";
// import { NavProjects } from "src/components/nav-projects";
// import { NavUser } from "src/components/nav-user";
// import { TeamSwitcher } from "src/components/team-switcher";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "src/components/ui/sidebar";
// import { SidebarMenu } from "./ui/sidebar";
// import { SidebarMenuItem } from "./ui/sidebar";
// import { SidebarMenuButton } from "./ui/sidebar";

// const data = {
//   navMain: [
//     {
//       title: "CRM",
//       url: "#",
//       icon: Laptop,
//       isActive: true,
//       items: [
//         {
//           title: "Segments ",
//           url: "#",
//         },
//         {
//           title: "Contacts",
//           url: "#",
//         },
//         {
//           title: "Leads",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Calls",
//       url: "#",
//       icon: Phone,
//       items: [
//         {
//           title: "Call Logs",
//           url: "/call/call-log",
//         },
//         {
//           title: "Live Call",
//           url: "/call/initiate-call",
//         },
//         {
//           title: "Missed Call",
//           url: "/call/miss-call",
//         },
//       ],
//     },
//     {
//       title: "SMS",
//       url: "#",
//       icon: MessageSquareMore,
//       items: [
//         {
//           title: "Sender Id ",
//           url: "#",
//         },
//         {
//           title: "SMS tempelete",
//           url: "#",
//         },
//         {
//           title: "SMS Logs",
//           url: "#",
//         },
//       ],
//     },
//   ],
// };
// const menuItems = [
//   {
//     title: "Tickets",
//     url: "#",
//     icon: Tickets,
//   },
//   {
//     title: "Admin Setting",
//     url: "#",
//     icon: Settings,
//   },
//   {
//     title: "Reporting",
//     url: "#",
//     icon: FileText,
//   },
//   {
//     title: "AI Call",
//     url: "/ai/ai-call",
//     icon: Bot,
//   },
// ];

// export function AppSidebar({ ...props }) {
//   return (
//     <>
//       <Sidebar collapsible="icon" {...props}>
//         <SidebarContent>
//           <NavMain items={data.navMain} />
//           <SidebarMenu>
//             {menuItems.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild>
//                   <a href={item.url}>
//                     <item.icon />
//                     <span>{item.title}</span>
//                   </a>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarContent>

//         {/* <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter> */}
//         {/* <SidebarRail /> */}
//       </Sidebar>
//       {/* <div className="flex h-16 shrink-0 items-center gap-2 border-b">
//         <NavUser user={data.user} />
//     </div> */}
//     </>
//   );
// }

import * as React from "react";
import {
  ChevronRight,
  LayoutDashboard,
  Laptop,
  Settings,
  FileText,
  Users,
  Ticket,
  Bot,
  Phone,
  MessageSquareMore,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "src/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "src/components/ui/sidebar";
import { Link } from "react-router-dom";

// Define icons for each main title
const iconMap = {
  Dashboard: <LayoutDashboard className="w-4 h-4 mr-2" />,
  CRM: <Laptop className="w-4 h-4 mr-2" />,
  Calls: <Phone className="w-4 h-4 mr-2" />,
  SMS: <MessageSquareMore className="w-4 h-4 mr-2" />,
  Community: <Users className="w-4 h-4 mr-2" />,
  Tickets: <Ticket className="w-4 h-4 mr-2" />,
  "Admin Setting": <Settings className="w-4 h-4 mr-2" />,
  Reporting: <FileText className="w-4 h-4 mr-2" />,
  "AI Call": <Bot className="w-4 h-4 mr-2" />,
};

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", isActive: true, items: [] },
    {
      title: "CRM",
      url: "#",
      items: [
        { title: "Segments", url: "/crm/segments" },
        { title: "Contacts", url: "/crm/contacts" },
        { title: "Leads", url: "/crm/leads" },
      ],
    },
    {
      title: "Calls",
      url: "#",
      items: [
        { title: "Call Logs", url: "/call/call-log" },
        { title: "Live Call", url: "/call/initiate-call" },
        { title: "Missed Call", url: "/call/miss-call" },
      ],
    },
    {
      title: "SMS",
      url: "#",
      items: [
        { title: "Sender Id ", url: "/sms/sender-id" },
        { title: "SMS Template", url: "/sms/sms-tempelete" },
        { title: "SMS Logs", url: "/sms/sms-logs" },
      ],
    },
    { title: "Tickets", url: "/tickets", items: [] },
    { title: "Admin Setting", url: "/admin/setting", items: [] },
    { title: "Reporting", url: "/reporting", items: [] },
    { title: "AI Call", url: "/ai/ai-call", items: [] },
  ],
};

export function AppSidebar({ ...props }) {
  // Store open state for each collapsible menu
  const [openSections, setOpenSections] = React.useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar {...props}>
      <SidebarGroupLabel className="bottom-1 pb-2 pt-8">
        <div className="dashboard flex items-center text-blue-500 font-semibold text-xl p-5">
          <Link to="/dashboard">TSN Voice Bot</Link>
        </div>
      </SidebarGroupLabel>
      <SidebarContent className="gap-0 mt-5 border-t-2">
        {data.navMain.map((item) =>
          item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              open={!!openSections[item.title]} // Only this collapsible opens
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger
                    className="flex items-center"
                    onClick={() => toggleSection(item.title)}
                  >
                    {iconMap[item.title]} {item.title}{" "}
                    <ChevronRight
                      className={`ml-auto transition-transform ${
                        openSections[item.title] ? "rotate-90" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="list-none">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem
                          key={subItem.title}
                          className="list-none ml-4"
                        >
                          <SidebarMenuButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title} className="list-none">
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="w-full px-3 py-2 flex items-center"
                >
                  {iconMap[item.title]} {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
