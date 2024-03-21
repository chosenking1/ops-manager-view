import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineGasMeter } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { MdOutlineRoute } from "react-icons/md";
import { MdInsights } from "react-icons/md";
import { RxSpeakerModerate } from "react-icons/rx";
import { FaPenSquare } from "react-icons/fa";
import { FaCloudBolt } from "react-icons/fa6";
import { TbCloudDataConnection } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import logo from '../img/ibedc.jpg';

export const mainLinks = [
    { name: "IBEDC", icon: logo, gap: true },
    { name: 'Dashboard', link: '/' },
    { name: 'Customers', link: '/customers' }, 
    { name: "Enumeration", icon: TiDocumentText },
    { name: "Meter Reading", icon: MdOutlineGasMeter, gap: true },
    { name: "DT Meter Reading", icon: MdOutlineGasMeter },
    { name: "Bill Distribution", icon: MdOutlineDashboard },
    { name: "DSS ", icon: IoDocumentTextOutline, gap: true },
    { name: "CRO Management", icon: ImUsers },
    { name: "CRO Route Map", icon: MdOutlineRoute },
    { name: "Performance ", icon: MdInsights },
    { name: "Evaluation", icon: RxSpeakerModerate },
    { name: "MD Audit", icon: FaPenSquare, gap: true },

    { name: "Disconnection", icon: FaCloudBolt },
    { name: "Reconnection", icon: TbCloudDataConnection },
    { name: "DT Complaint ", icon: RiCustomerService2Fill, gap: true },
    { name: "Customer Engagement", icon: TbUsersGroup },
    // Add more main links as needed
  ];


  export const allLinks = [
    ...mainLinks,
    { name: 'Collections', link: '#' },
    { name: 'Men', link: '#' },
    { name: 'About', link: '#' },
    { name: 'Contact', link: '#' },

    // Add more links for the Navbar as needed
  ];