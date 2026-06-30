const fs = require('fs');

let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

// 1. Add states
code = code.replace(
  '  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);',
  `  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [popups, setPopups] = useState<any[]>([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupContent, setPopupContent] = useState('');
  const [popupLinkUrl, setPopupLinkUrl] = useState('');
  const [popupStartDate, setPopupStartDate] = useState('');
  const [popupEndDate, setPopupEndDate] = useState('');
  const [popupIsActive, setPopupIsActive] = useState(true);
  const [popupWidth, setPopupWidth] = useState(400);
  const [popupHeight, setPopupHeight] = useState(400);
  const [popupTop, setPopupTop] = useState(100);
  const [popupLeft, setPopupLeft] = useState(100);`
);

// 2. Add fetchPopups
code = code.replace(
  '  const fetchAdminUsers = async () => {',
  `  const fetchPopups = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/management/popups');
      if (res.ok) {
        const data = await res.json();
        setPopups(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchAdminUsers = async () => {`
);

// 3. Add handleFormSubmit for popups
const handleSubmitTarget = `      if (formMode === 'edit') {
        bodyData.id = activeItem.id;
        bodyData.views = activeItem.views;
      }
    }`;
const handleSubmitReplacement = `      if (formMode === 'edit') {
        bodyData.id = activeItem.id;
        bodyData.views = activeItem.views;
      }
    } else if (currentSubPath === 'popups') {
      url = '/api/management/popups';
      bodyData = {
        title: popupTitle,
        content: popupContent,
        link_url: popupLinkUrl,
        start_date: popupStartDate,
        end_date: popupEndDate,
        is_active: popupIsActive ? 1 : 0,
        width: popupWidth,
        height: popupHeight,
        top_pos: popupTop,
        left_pos: popupLeft,
      };
      if (formMode === 'edit') bodyData.id = activeItem.id;
    }`;
code = code.replace(handleSubmitTarget, handleSubmitReplacement);

// 4. Add fetchPopups to form success
const fetchNewsTarget = `        if (
          currentSubPath === 'contact/newsroom/press' ||
          currentSubPath === 'contact/newsroom/media' ||
          currentSubPath === 'about/ir/announcement' ||
          currentSubPath === 'about/ir/financial' ||
          currentSubPath === 'about/ir/news' ||
          currentSubPath === 'contact/careers/jobs'
        ) {
          fetchNews();
        }
      } else {`;
const fetchNewsReplacement = `        if (
          currentSubPath === 'contact/newsroom/press' ||
          currentSubPath === 'contact/newsroom/media' ||
          currentSubPath === 'about/ir/announcement' ||
          currentSubPath === 'about/ir/financial' ||
          currentSubPath === 'about/ir/news' ||
          currentSubPath === 'contact/careers/jobs'
        ) {
          fetchNews();
        }
        if (currentSubPath === 'popups') fetchPopups();
      } else {`;
code = code.replace(fetchNewsTarget, fetchNewsReplacement);

fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code);
console.log('patched');
