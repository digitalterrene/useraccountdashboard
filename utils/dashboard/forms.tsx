"use client";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";
import {
  MdLocationSearching,
  MdOutlineFingerprint,
  MdOutlineVerifiedUser,
} from "react-icons/md";

export const entities_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: [
      "name",
      "extension",
      "username",
      "dashboard_type",
      "tagline",
      "description",
    ],
  },
  {
    name: "administration_information",
    icon: <MdOutlineVerifiedUser />,
    keys: [
      "domain_name",
      "professional_email",
      "access_key",
      "rodlip_registry",
      "entity_type",
      "description",
    ],
  },

  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const entities_forms_inputs = {
  basic_information: {
    name: "",
    extension: "",
    username: "",
    dashboard_type: "",
    tagline: "",
    description: "",
  },
  administration_information: {
    domain_name: "",
    professional_email: "",
    access_key: "",
    rodlip_registry: "",
    entity_type: "",
    description: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};
export const blogs_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: [
      "name",
      "organization_name",
      "department_name",
      "office_name",
      "cubicle_name",
      "description",
    ],
  },
  {
    name: "administration_information",
    icon: <MdOutlineVerifiedUser />,
    keys: [
      "professional_email",
      "password",
      "access_key",
      "security_key",
      "account_type",
      "banner_text",
    ],
  },

  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const blogs_forms_inputs = {
  basic_information: {
    name: "",
    organization_name: "",
    department_name: "",
    office_name: "",
    cubicle_name: "",
    description: "",
  },
  administration_information: {
    professional_email: "",
    password: "",
    access_key: "",
    security_key: "",
    account_type: "",
    banner_text: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};

export const office_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: [
      "name",
      "organization_name",
      "department_name",
      "office_name",
      "cubicle_name",
      "description",
    ],
  },
  {
    name: "administration_information",
    icon: <MdOutlineVerifiedUser />,
    keys: [
      "professional_email",
      "password",
      "access_key",
      "security_key",
      "account_type",
      "banner_text",
    ],
  },

  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const office_forms_inputs = {
  basic_information: {
    name: "",
    organization_name: "",
    department_name: "",
    office_name: "",
    cubicle_name: "",
    description: "",
  },
  administration_information: {
    professional_email: "",
    password: "",
    access_key: "",
    security_key: "",
    account_type: "",
    banner_text: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};

export const home_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: ["name", "tagline", "home_type", "description"],
  },

  {
    name: "entities_information",
    icon: <MdOutlineFingerprint />,
    keys: [
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },
  {
    name: "office_information",
    icon: <IoMdLaptop />,
    keys: [
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },
  {
    name: "stores_information",
    icon: <BsCart4 />,
    keys: [
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },
  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const home_forms_inputs = {
  basic_information: {
    name: "",
    tagline: "",
    home_type: "",
    description: "",
  },
  entities_information: {
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  office_information: {
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  stores_information: {
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};

export const sites_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: ["name", "site_type", "tagline", "description"],
  },
  {
    name: "administration_information",
    icon: <MdOutlineVerifiedUser />,
    keys: [
      "organization_name",
      "department_name",
      "office_name",
      "cubicle_name",
      "description",
    ],
  },
  {
    name: "webiste_information",
    icon: <IoGlobeOutline />,
    keys: [
      "external_url",
      "verse_url",
      "access_key",
      "security_key",
      "keywords",
    ],
  },
  {
    name: "entities_information",
    icon: <MdOutlineFingerprint />,
    keys: [
      "external_url",
      "verse_url",
      "access_key",
      "security_key",
      "keywords",
    ],
  },
  {
    name: "office_information",
    icon: <IoMdLaptop />,
    keys: [
      "external_url",
      "verse_url",
      "access_key",
      "security_key",
      "keywords",
    ],
  },
  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const sites_forms_inputs = {
  basic_information: {
    name: "",
    site_type: "",
    tagline: "",
    description: "",
  },
  administration_information: {
    organization_name: "",
    department_name: "",
    office_name: "",
    cubicle_name: "",
    description: "",
  },
  webiste_information: {
    external_url: "",
    verse_url: "",
    access_key: "",
    security_key: "",
    keywords: "",
  },
  entities_information: {
    external_url: "",
    verse_url: "",
    access_key: "",
    security_key: "",
    keywords: "",
  },
  office_information: {
    external_url: "",
    verse_url: "",
    access_key: "",
    security_key: "",
    keywords: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};

export const stores_forms = [
  {
    name: "basic_information",
    icon: <FaRegUser />,
    keys: ["name", "tagline", "industry", "description"],
  },
  {
    name: "administration_information",
    icon: <MdOutlineVerifiedUser />,
    keys: [
      "organization_name",
      "department_name",
      "office_name",
      "cubicle_name",
      "description",
    ],
  },
  {
    name: "webiste_information",
    icon: <IoGlobeOutline />,
    keys: [
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },
  {
    name: "entities_information",
    icon: <MdOutlineFingerprint />,
    keys: [
      "entity_type",
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },
  {
    name: "office_information",
    icon: <IoMdLaptop />,
    keys: [
      "https",
      "vttps",
      "access_key",
      "security_key",
      "domain_name",
      "keywords",
    ],
  },

  {
    name: "location_information",
    icon: <MdLocationSearching />,
    keys: [
      "address",
      "city",
      "postal_code",
      "region",
      "country",
      "coordinates",
    ],
  },
  {
    name: "socials_information",
    icon: <AiOutlineShareAlt />,
    keys: [
      "phone_number",
      "whatsapp",
      "linkedin",
      "instagram",
      "threads",
      "facebook",
    ],
  },
];
export const stores_forms_inputs = {
  basic_information: {
    name: "",
    tagline: "",
    industry: "",
    description: "",
  },
  administration_information: {
    organization_name: "",
    department_name: "",
    office_name: "",
    cubicle_name: "",
    description: "",
  },
  webiste_information: {
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  entities_information: {
    entity_type: "",
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  office_information: {
    https: "",
    vttps: "",
    access_key: "",
    security_key: "",
    domain_name: "",
    keywords: "",
  },
  location_information: {
    address: "",
    city: "",
    postal_code: "",
    region: "",
    country: "",
    coordinates: "",
  },
  socials_information: {
    phone_number: "",
    whatsapp: "",
    linkedin: "",
    instagram: "",
    threads: "",
    facebook: "",
  },
};
