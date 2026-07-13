const fs = require('fs');
const path = require('path');

const applyTranslation = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('usePathname')) {
    content = content.replace(
      "import { ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';",
      "import { ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';\nimport { usePathname } from 'next/navigation';"
    );
  }

  // Inject isEnglish inside the component
  const componentMatch = content.match(/export default function \w+\([^)]*\)\s*\{/);
  if (componentMatch && !content.includes('const isEnglish')) {
    content = content.replace(
      componentMatch[0],
      componentMatch[0] + "\n  const pathname = usePathname();\n  const isEnglish = pathname?.startsWith('/en');\n"
    );
  }

  // Translations for PressList.tsx
  if (filePath.includes('PressList.tsx')) {
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[10%\]">번호<\/th>/g,
      '<th className="py-4 px-4 text-center w-[10%]">{isEnglish ? "No." : "번호"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-left w-\[60%\]">제목<\/th>/g,
      '<th className="py-4 px-4 text-left w-[60%]">{isEnglish ? "Title" : "제목"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[18%\]">등록일<\/th>/g,
      '<th className="py-4 px-4 text-center w-[18%]">{isEnglish ? "Date" : "등록일"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[12%\]">조회수<\/th>/g,
      '<th className="py-4 px-4 text-center w-[12%]">{isEnglish ? "Views" : "조회수"}</th>'
    );
    content = content.replace(
      /<span>보도자료 상세 내용<\/span>/g,
      '<span>{isEnglish ? "Press Release Details" : "보도자료 상세 내용"}</span>'
    );
    content = content.replace(
      /item\.file_name \|\| '첨부파일'/g,
      "item.file_name || (isEnglish ? 'Attachment' : '첨부파일')"
    );
    content = content.replace(
      /item\.file_name \|\| '첨부파일 다운로드'/g,
      "item.file_name || (isEnglish ? 'Download Attachment' : '첨부파일 다운로드')"
    );
  }

  // Translations for JobList.tsx
  if (filePath.includes('JobList.tsx')) {
    content = content.replace(
      /type: '공통',/g,
      "type: isEnglish ? 'Common' : '공통',"
    );
    content = content.replace(
      /qualifications: '상세내용 참조',/g,
      "qualifications: isEnglish ? 'See Details' : '상세내용 참조',"
    );
    content = content.replace(
      /deadline: '상시채용',/g,
      "deadline: isEnglish ? 'Continuous Hiring' : '상시채용',"
    );
    
    // JobList table headers
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[12%\]">채용구분<\/th>/g,
      '<th className="py-4 px-4 text-center w-[12%]">{isEnglish ? "Type" : "채용구분"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-left w-\[40%\]">공고명<\/th>/g,
      '<th className="py-4 px-4 text-left w-[40%]">{isEnglish ? "Title" : "공고명"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[18%\]">자격요건<\/th>/g,
      '<th className="py-4 px-4 text-center w-[18%]">{isEnglish ? "Requirements" : "자격요건"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[15%\]">마감일<\/th>/g,
      '<th className="py-4 px-4 text-center w-[15%]">{isEnglish ? "Deadline" : "마감일"}</th>'
    );
    content = content.replace(
      /<th className="py-4 px-4 text-center w-\[15%\]">조회수<\/th>/g,
      '<th className="py-4 px-4 text-center w-[15%]">{isEnglish ? "Views" : "조회수"}</th>'
    );
    content = content.replace(
      /진행 중인 상시\/정기 공고 \(\{parsedJobs\.length\}\)/g,
      '{isEnglish ? `Ongoing Regular/Permanent Openings (${parsedJobs.length})` : `진행 중인 상시/정기 공고 (${parsedJobs.length})`}'
    );
    content = content.replace(
      /진행 중인 채용공고가 없습니다\./g,
      '{isEnglish ? "No ongoing job openings." : "진행 중인 채용공고가 없습니다."}'
    );
    content = content.replace(
      /<span>채용공고 상세 내용<\/span>/g,
      '<span>{isEnglish ? "Job Opening Details" : "채용공고 상세 내용"}</span>'
    );
    content = content.replace(
      /item\.file_name \|\| '첨부파일'/g,
      "item.file_name || (isEnglish ? 'Attachment' : '첨부파일')"
    );
    content = content.replace(
      /item\.file_name \|\| '첨부파일 다운로드'/g,
      "item.file_name || (isEnglish ? 'Download Attachment' : '첨부파일 다운로드')"
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
};

applyTranslation(path.join(__dirname, '..', 'src', 'components', 'PressList.tsx'));
applyTranslation(path.join(__dirname, '..', 'src', 'components', 'JobList.tsx'));

console.log('Translated PressList and JobList tables!');
