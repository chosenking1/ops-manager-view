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
import { HiUsers } from "react-icons/hi2";
import logo from '../img/ibedc.jpg';

export const mainLinks = [
    { name: "IBEDC", icon: logo, gap: true },
    { name: 'Dashboard', icon: MdOutlineDashboard, link: '/' },
    { name: 'Customers', icon: HiUsers, link: '/customers' }, 
    { name: "Enumeration", icon: TiDocumentText, link: '/enumeration' },
    { name: "Meter Reading", icon: MdOutlineGasMeter, gap: true, link:'/meter-reading' },
    { name: "DT Meter Reading", icon: MdOutlineGasMeter, link:'/dt-meter-reading'},
    { name: "Bill Distribution", icon: MdOutlineDashboard, link: '/bill-distribution' },
    { name: "DSS ", icon: IoDocumentTextOutline, gap: true, link:'/dss' },
    { name: "CRO Management", icon: ImUsers, link:'/cro' },
    { name: "CRO Route Map", icon: MdOutlineRoute, link:'/cro-map' },
    { name: "Performance ", icon: MdInsights, link:'/performance' },
    { name: "Evaluation", icon: RxSpeakerModerate, link:'/evaluation' },
    { name: "MD Audit", icon: FaPenSquare, gap: true, link:'/md-audit' },

    { name: "Disconnection", icon: FaCloudBolt, link:'/disconnection' },
    { name: "Reconnection", icon: TbCloudDataConnection, link:'/reconnection' },
    { name: "DT Complaint ", icon: RiCustomerService2Fill, gap: true, link:'/dt-complaint' },
    { name: "Customer Engagement", icon: TbUsersGroup, link:'/customer-engagement' },
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