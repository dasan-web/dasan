export interface SubMenu {
  name: string;
  link: string;
}

export interface MajorMenu {
  name: string;
  subMenus: SubMenu[];
}

export interface GrandMenu {
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
        name: '회사소개',
        subMenus: [
          { name: '기업개요', link: '/about/intro' },
          { name: '사업영역', link: '/about/business-area' },
          { name: '연혁', link: '/about/history' },
          { name: 'CI', link: '/about/ci' },
          { name: '공장 및 연구소', link: '/about/facilities' },
          { name: '찾아오시는 길', link: '/about/location' },
        ],
      },
      {
        name: 'ESG',
        subMenus: [
          { name: '윤리경영', link: '/about/esg/ethics' },
          { name: '환경경영', link: '/about/esg/environment' },
          { name: '안전보건경영', link: '/about/esg/safety' },
        ],
      },
      {
        name: 'IR',
        subMenus: [
          { name: '공시정보', link: '/about/ir/announcement' },
          { name: '재무정보', link: '/about/ir/financial' },
          { name: 'IR News', link: '/about/ir/news' },
        ],
      },
    ],
  },
  {
    name: 'Innovation',
    link: '/rd',
    majors: [
      {
        name: 'Innovation',
        subMenus: [
          { name: '연구소 소개', link: '/rd/intro' },
          { name: '연구 활동', link: '/rd/activities' },
          { name: '파이프라인', link: '/rd/pipeline' },
        ],
      },
    ],
  },
  {
    name: 'Business',
    link: '/business',
    majors: [
      {
        name: '완제의약품',
        subMenus: [
          { name: '제품검색', link: '/business/finished/search' },
          { name: '제품소식', link: '/business/finished/news' },
        ],
      },
      {
        name: 'API',
        subMenus: [
          { name: '원료의약품(API)', link: '/business/api/raw' },
          { name: '원료의약품 중간체', link: '/business/api/intermediates' },
        ],
      },
      {
        name: 'CDMO',
        subMenus: [
          { name: '서비스 품질', link: '/business/cdmo/quality' },
          { name: '특장점', link: '/business/cdmo/advantages' },
          { name: '물류', link: '/business/cdmo/logistics' },
        ],
      },
    ],
  },
  {
    name: 'Connect',
    link: '/contact',
    majors: [
      {
        name: '뉴스룸',
        subMenus: [
          { name: '보도자료', link: '/contact/newsroom/press' },
          { name: '홍보자료실', link: '/contact/newsroom/media' },
        ],
      },
      {
        name: '채용정보',
        subMenus: [
          { name: '인재상', link: '/contact/careers/talent' },
          { name: '채용절차', link: '/contact/careers/process' },
          { name: '채용공고', link: '/contact/careers/jobs' },
        ],
      },
      {
        name: '고객센터',
        subMenus: [
          { name: '제품 문의', link: '/contact/inquiry' },
          { name: '영업 문의', link: '/contact/inquiry/sales' },
          { name: '부패신고 문의(익명)', link: '/contact/inquiry/corruption' },
          { name: '문의 확인', link: '/contact/inquiry/check' },
        ],
      },
    ],
  },
];
