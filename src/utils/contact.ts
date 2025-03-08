import { Mail, MapPin } from "lucide-react";
import { email, github_url, linkedIn_url } from "./constants";
import { FiLinkedin, FiGithub } from "react-icons/fi";

export const CONTACT = [
  {
    icon: Mail,
    title: "Email",
    content: "sreejith190nair@gmail.com",
    href: `mailto:${email}`,
  },
  {
    icon: FiLinkedin,
    title: "LinkedIn",
    content: "linkedin.com/in/sreejith-nair-a60915207",
    href: linkedIn_url,
  },
  {
    icon: FiGithub,
    title: "GitHub",
    content: "github.com/sreejithnair190",
    href: github_url,
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Mumbai, India",
  },
];
