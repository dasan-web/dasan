const fs = require('fs');

let code = fs.readFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', 'utf8');

// 1. Add Sidebar Menu
const sidebarMenuTarget = `            {
              name: 'SEO 설정 관리',
              path: 'seo',
              icon: Search,
            },
          ]`;
const sidebarMenuReplacement = `            {
              name: 'SEO 설정 관리',
              path: 'seo',
              icon: Search,
            },
            {
              name: '팝업 관리',
              path: 'popups',
              icon: LayoutList,
            },
          ]`;
code = code.replace(sidebarMenuTarget, sidebarMenuReplacement);

// 2. Add Popups List View
const listTarget = `              {/* Case Landing: Dashboard Summary Overview */}`;
const listReplacement = `              {/* Case H: Popups Management */}
              {currentSubPath === 'popups' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-sm font-extrabold text-white">
                      팝업 관리
                    </h3>
                    <button
                      onClick={() => {
                        setFormMode('create');
                        setPopupTitle('');
                        setPopupContent('');
                        setPopupLinkUrl('');
                        setPopupStartDate('');
                        setPopupEndDate('');
                        setPopupIsActive(true);
                        setPopupWidth(400);
                        setPopupHeight(400);
                        setPopupTop(100);
                        setPopupLeft(100);
                        setShowFormModal(true);
                      }}
                      className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                    >
                      <Plus size={14} />
                      <span>신규 팝업 등록</span>
                    </button>
                  </div>

                  <div className="bg-[#0a1120]/65 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="px-5 py-4 w-[10%]">상태</th>
                            <th className="px-5 py-4 w-[35%]">제목</th>
                            <th className="px-5 py-4 w-[25%]">노출 기간</th>
                            <th className="px-5 py-4 w-[15%]">등록일</th>
                            <th className="px-5 py-4 w-[15%] text-right">관리</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                          {popups.length > 0 ? (
                            popups.map(p => (
                              <tr key={p.id} className="hover:bg-white/[0.04] border-b border-white/5 last:border-0 transition-colors">
                                <td className="px-5 py-4">
                                  <span className={\`px-2 py-1 rounded text-[10px] font-black uppercase border \${p.is_active ? 'bg-brand-green/20 text-brand-green border-brand-green/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}\`}>
                                    {p.is_active ? '활성' : '비활성'}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-bold text-white">{p.title}</td>
                                <td className="px-5 py-4 text-xs text-gray-400">
                                  {p.start_date ? new Date(p.start_date).toLocaleDateString() : '무기한'} ~ <br/>
                                  {p.end_date ? new Date(p.end_date).toLocaleDateString() : '무기한'}
                                </td>
                                <td className="px-5 py-4 text-xs text-gray-500">
                                  {new Date(p.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-4 text-right space-x-2">
                                  <button
                                    onClick={() => {
                                      setFormMode('edit');
                                      setActiveItem(p);
                                      setPopupTitle(p.title);
                                      setPopupContent(p.content || '');
                                      setPopupLinkUrl(p.link_url || '');
                                      setPopupStartDate(p.start_date ? new Date(p.start_date).toISOString().slice(0, 10) : '');
                                      setPopupEndDate(p.end_date ? new Date(p.end_date).toISOString().slice(0, 10) : '');
                                      setPopupIsActive(!!p.is_active);
                                      setPopupWidth(p.width || 400);
                                      setPopupHeight(p.height || 400);
                                      setPopupTop(p.top_pos || 100);
                                      setPopupLeft(p.left_pos || 100);
                                      setShowFormModal(true);
                                    }}
                                    className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm('이 팝업을 삭제하시겠습니까?')) {
                                        try {
                                          const res = await fetch(\`/api/management/popups?id=\${p.id}\`, { method: 'DELETE' });
                                          if (res.ok) fetchPopups();
                                        } catch (e) {
                                          console.error(e);
                                        }
                                      }
                                    }}
                                    className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="text-center py-12 text-gray-500 text-xs">
                                등록된 팝업이 없습니다.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Case Landing: Dashboard Summary Overview */}`;
code = code.replace(listTarget, listReplacement);


// 3. Add Popups Form Modal Fields
const formTarget = `              {/* Action buttons */}`;
const formReplacement = `              {/* Popups Form Fields */}
              {currentSubPath === 'popups' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">제목 <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={popupTitle}
                      onChange={e => setPopupTitle(e.target.value)}
                      className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all placeholder:text-gray-600"
                      placeholder="팝업 제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">내용 (에디터)</label>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <RichTextEditor
                        value={popupContent}
                        onChange={setPopupContent}
                        placeholder="팝업 내용 또는 이미지를 입력하세요"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">연결 링크 URL (선택)</label>
                    <input
                      type="text"
                      value={popupLinkUrl}
                      onChange={e => setPopupLinkUrl(e.target.value)}
                      className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all placeholder:text-gray-600"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">노출 시작일 (선택)</label>
                      <input
                        type="date"
                        max="9999-12-31"
                        value={popupStartDate}
                        onChange={e => setPopupStartDate(e.target.value)}
                        className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">노출 종료일 (선택)</label>
                      <input
                        type="date"
                        max="9999-12-31"
                        value={popupEndDate}
                        onChange={e => setPopupEndDate(e.target.value)}
                        className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">크기 (너비 x 높이)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={popupWidth}
                          onChange={e => setPopupWidth(Number(e.target.value))}
                          placeholder="가로"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                        <input
                          type="number"
                          value={popupHeight}
                          onChange={e => setPopupHeight(Number(e.target.value))}
                          placeholder="세로"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1">위치 (상단 x 좌측)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={popupTop}
                          onChange={e => setPopupTop(Number(e.target.value))}
                          placeholder="Top"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                        <input
                          type="number"
                          value={popupLeft}
                          onChange={e => setPopupLeft(Number(e.target.value))}
                          placeholder="Left"
                          className="w-full bg-[#0a1120] border border-white/10 text-white rounded-xl px-4 py-2.5 font-semibold text-xs focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="popupIsActive"
                      checked={popupIsActive}
                      onChange={e => setPopupIsActive(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green bg-white/5"
                    />
                    <label htmlFor="popupIsActive" className="text-xs font-bold text-gray-300 cursor-pointer">
                      사용자 페이지에 즉시 노출 (활성화)
                    </label>
                  </div>
                </div>
              )}

              {/* Action buttons */}`;
code = code.replace(formTarget, formReplacement);

fs.writeFileSync('src/app/management/dashboard/[[...slug]]/page.tsx', code);
console.log('patched UI');
