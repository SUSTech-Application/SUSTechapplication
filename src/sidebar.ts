import { type DefaultTheme } from "vitepress";

// TODO: count posts automatically

// TODO: disable new sidebar temporarily

/**
import { posts as allPosts } from "./collections";
import { metadata } from "./metadata";
import { type Post } from "./posts";

const postsByType = Object.groupBy(
  allPosts,
  (post) => post.metadata.type as string, // TODO: type metadata
) as Record<string, Post[]>;

const gradPostsByDept = Object.groupBy(
  postsByType.grad,
  (post) => post.metadata.department as string,
);

const gradSchool: DefaultTheme.SidebarItem = {
  text: "升学经验分享",
  collapsed: false,
  items: [
    {
      items: Object.entries(gradPostsByDept).map(([dept, list]) => ({
        collapsed: true,
        text: metadata.department[dept] ?? "No Department",
        items: list?.map((post) => ({
          text: post.metadata.title as string,
          link: post.url,
        })),
      })),
    },
  ],
};

*/

const gradSchool: DefaultTheme.SidebarItem = {
  text: "个人申请总结",
  collapsed: false,
  items: [
    {
      items: [
        {
          text: "计算机科学与工程系 (21)",
          link: "grad-application/computer-science-and-engineering",
        },
        {
          text: "生物医学工程系 (11)",
          link: "grad-application/biomedical-engineering",
        },
        { text: "物理系 (7)", link: "grad-application/physics" },
        { text: "生物系 (6)", link: "grad-application/biology" },
        {
          text: "力学与航空航天工程系 (8)",
          link: "grad-application/mechanics-and-aerospace-engineering",
        },
        { text: "化学系 (6)", link: "grad-application/chemistry" },
        {
          text: "地球与空间科学系 (1)",
          link: "grad-application/earth-and-space-science",
        },
        { text: "数学与统计系 (13)", link: "grad-application/math" },
        {
          text: "机械与能源工程系 (4)",
          link: "grad-application/mechanical-and-energy-engineering",
        },
        {
          text: "材料科学与工程系 (9)",
          link: "grad-application/materials-science-and-engineering",
        },
        {
          text: "海洋科学与工程系 (2)",
          link: "grad-application/marine-science-and-engineering",
        },
        {
          text: "环境科学与工程学院 (4)",
          link: "grad-application/environmental-science-and-engineering",
        },
        {
          text: "电子与电气工程系 (10)",
          link: "grad-application/electronic-and-electrical-engineering",
        },
        { text: "金融系 (19)", link: "grad-application/finance" },
        { text: "医学院 (3)", link: "grad-application/medicine" },
        {
          text: "深港微电子学院 (10)",
          link: "grad-application/microelectronics",
        },
        {
          text: "信息系统与管理工程系 (1)",
          link: "grad-application/information-systems-and-management-engineering",
        },
        { text: "系统设计与智能制造学院 (1)", link: "grad-application/sdim" },
      ],
    },
  ],
};

const studyAbroad: DefaultTheme.SidebarItem = {
  text: "海外交流",
  collapsed: false,
  items: [
    {
      text: "学期交流 (2)",
      link: "oversea-program/semester-program",
    },
    { text: "暑校 (1)", link: "oversea-program/summer-school" },
    { text: "暑研 (3)", link: "oversea-program/summer-research" },
  ],
};

const experience: DefaultTheme.SidebarItem = {
  text: "学习经验 (6)",
  collapsed: false,
  items: [
    { text: "GMAT", link: "英语学习/GMAT" },
    { text: "GRE (3)", link: "英语学习/GRE" },
    { text: "IELTS (2)", link: "英语学习/IELTS" },
    { text: "TOEFL", link: "英语学习/TOEFL" },
    { text: "四六级", link: "英语学习/四六级" },
    { text: "日常学习 (1)", link: "英语学习/日常学习" },
  ],
};

const posts: DefaultTheme.SidebarItem[] = [gradSchool, studyAbroad, experience];

/** Sidebar object for documentations */
const docs = {
  base: "docs/",
  items: [
    { text: "分享经验", link: "contribute" },
    { text: "路径格式", link: "path" },
    { text: "元数据", link: "metadata" },
  ] as DefaultTheme.SidebarItem[],
};

export default { posts, docs };
