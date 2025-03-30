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
