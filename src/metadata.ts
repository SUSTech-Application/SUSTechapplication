/**
 * Allowed metadata fields, options, and corresponding description.
 * @see https://sustech-application.com/docs/metadata
 */
const METADATA = {
  type: {
    grad: "研究生项目",
    abroad: "境外交流项目",
    job: "就业",
    recruit: "招生",
    experience: "专项经验分享",
  },

  degree: {
    doctor: "博士",
    master: "硕士",
  },

  /**
   * ISO 3166 Country Codes
   * @see https://countrycode.org/
   */
  region: {
    au: "澳大利亚",
    ca: "加拿大",
    ch: "瑞士",
    cn: "中国大陆",
    de: "德国",
    dk: "丹麦",
    fr: "法国",
    gb: "英国",
    hk: "香港特别行政区",
    jp: "日本",
    kr: "韩国",
    mo: "澳门特别行政区",
    nl: "荷兰",
    nz: "新西兰",
    sa: "沙特阿拉伯",
    sg: "新加坡",
    tw: "台湾省",
    us: "美国",
  },

  /** Based on domain name of department/college website: xyz.sustech.edu.cn */
  department: {
    bio: "生命科学学院",
    bme: "生物医学工程系",
    business: "商学院",
    chem: "化学系",
    cse: "计算机科学与工程系",
    eee: "电子与电气工程系",
    ese: "环境学院",
    ess: "地球与空间科学系",
    mae: "力学与航空航天工程系",
    math: "数学系",
    mee: "机械与能源工程系",
    med: "医学院",
    mse: "材料科学与工程系",
    ocean: "海洋科学与工程系",
    phy: "物理系",
    sdim: "系统设计与智能制造学院",
    sme: "深港微电子学院",
    "stat-ds": "统计与数据科学系",
  },

  /** Based on domain name of university website: xyz.edu */
  university: {
    nd: "University of Notre Dame",
  },
};

export default METADATA;

// TODO: we should probably move to a better runtime typing tool, maybe Zod?
// TODO: migrated to TS, migrate docs as well

// need to type keys of METADATA correctly
export const OPTIONS = Object.fromEntries(
  (Object.keys(METADATA) as (keyof typeof METADATA)[]).map((k) => [
    k,
    Object.keys(METADATA[k]),
  ]),
);
