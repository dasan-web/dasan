export interface SubMenu {
  enName?: string;
  name: string;
  link: string;
}

export interface MajorMenu {
  enName?: string;
  name: string;
  link?: string;
  subMenus: SubMenu[];
}

export interface GrandMenu {
  enName?: string;
  name: string;
  link: string;
  majors: MajorMenu[];
}

export const navigationData: GrandMenu[] = [
  {
    name: 'Company',
    link: '/about',
    majors: [
      {
        name: '회사소개', enName: 'Company Overview',
        subMenus: [
          { name: '인사말', enName: 'CEO Greeting', link: '/about/greeting' },
          { name: '기업개요', enName: 'Company Info', link: '/about/intro' },
          { name: '사업영역', enName: 'Business Area', link: '/about/business-area' },
          { name: '연혁', enName: 'History', link: '/about/history' },
          { name: 'CI', enName: 'CI', link: '/about/ci' },
          { name: '글로벌 인프라', enName: 'Global Infrastructure', link: '/about/facilities' },
          { name: '찾아오시는길', enName: 'Location', link: '/about/location' },
        ],
      },
      {
        name: 'ESG', enName: 'ESG',
        subMenus: [
          { name: '지속가능경영', enName: 'Sustainability', link: '/about/esg/ethics' },
          { name: '환경경영방침', enName: 'Environmental Policy', link: '/about/esg/environment' },
          { name: '안전보건경영방침', enName: 'Health & Safety Policy', link: '/about/esg/safety' },
          { name: '부패방지방침', enName: 'Anti-Corruption Policy', link: '/about/esg/anti-corruption' },
          { name: '윤리강령', enName: 'Code of Ethics', link: '/about/esg/code-of-ethics' },
        ],
      },
      {
        name: 'IR', enName: 'IR',
        subMenus: [
          { name: '공시정보', enName: 'Public Announcement', link: '/about/ir/announcement' },
          { name: '재무정보', enName: 'Financial Info', link: '/about/ir/financial' },
          { name: 'IR News', enName: 'IR News', link: '/about/ir/news' },
        ],
      },
    ],
  },
  {
    name: 'Innovation', enName: 'Innovation',
    link: '/rd',
    majors: [
      {
        name: 'Innovation', enName: 'Innovation',
        subMenus: [
          { name: '연구소 소개', enName: 'R&D Center Intro', link: '/rd/intro' },
          { name: '파이프라인', enName: 'Pipeline', link: '/rd/pipeline' },
        ],
      },
    ],
  },
  {
    name: 'Business', enName: 'Business',
    link: '/business',
    majors: [
      {
        name: '완제의약품', enName: 'Finished Products',
        subMenus: [
          { name: '제품검색', enName: 'Product Search', link: '/business/finished/search' },
          { name: '제품소식', enName: 'Product News', link: '/business/finished/news' },
        ],
      },
      {
        name: 'API', enName: 'API',
        link: '/business/api/raw',
        subMenus: [],
      },
      {
        name: 'CDMO', enName: 'CDMO',
        link: '/business/cdmo',
        subMenus: [],
      },
    ],
  },
  {
    name: 'Connect', enName: 'Connect',
    link: '/contact',
    majors: [
      {
        name: '뉴스룸', enName: 'Newsroom',
        subMenus: [
          { name: '보도자료', enName: 'Press Release', link: '/contact/newsroom/press' },
          { name: '홍보자료실', enName: 'PR Materials', link: '/contact/newsroom/media' },
        ],
      },
      {
        name: '채용정보', enName: 'Careers',
        subMenus: [
          { name: '인재상', enName: 'Ideal Candidate', link: '/contact/careers/talent' },
          { name: '채용절차', enName: 'Hiring Process', link: '/contact/careers/process' },
          { name: '채용공고', enName: 'Job Openings', link: '/contact/careers/jobs' },
        ],
      },
      {
        name: '고객센터', enName: 'Customer Service',
        subMenus: [
          { name: '제품 문의(일반소비자)', enName: 'Product Inquiry', link: '/contact/inquiry' },
          { name: '비즈니스 문의(기업대상)', enName: 'Sales Inquiry', link: '/contact/inquiry/sales' },
          { name: '부패신고 문의(익명)', enName: 'Corruption Report (Anonymous)', link: '/contact/inquiry/corruption' },
          { name: '문의 확인', enName: 'Check Inquiry', link: '/contact/inquiry/check' },
        ],
      },
    ],
  },
];
