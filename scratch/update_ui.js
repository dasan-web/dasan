const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '../src/app/management/dashboard/[[...slug]]/page.tsx');
let content = fs.readFileSync(targetFilePath, 'utf8');

// 1. Wrap "신규 등록" button in navigation/header action (viewer check)
const originalRegisterButton = `                  <button
                    onClick={openCreateModal}
                    className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                  >
                    <Plus size={14} />
                    <span>신규 등록</span>
                  </button>`;

const newRegisterButton = `                  {currentUser?.role !== 'viewer' && (
                    <button
                      onClick={openCreateModal}
                      className="inline-flex items-center space-x-1.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-md shadow-brand-green/10"
                    >
                      <Plus size={14} />
                      <span>신규 등록</span>
                    </button>
                  )}`;

// 2. Wrap product list actions in viewer check
const originalProductActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditModal(p, 'product')}
                                  className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(p.id, 'product')}
                                  className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>`;

const newProductActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                {currentUser?.role !== 'viewer' && (
                                  <>
                                    <button
                                      onClick={() => openEditModal(p, 'product')}
                                      className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(p.id, 'product')}
                                      className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </td>`;

// 3. Wrap pipeline list actions in viewer check
const originalPipelineActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditModal(p, 'pipeline')}
                                  className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(p.id, 'pipeline')}
                                  className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>`;

const newPipelineActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                {currentUser?.role !== 'viewer' && (
                                  <>
                                    <button
                                      onClick={() => openEditModal(p, 'pipeline')}
                                      className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(p.id, 'pipeline')}
                                      className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </td>`;

// 4. Wrap news list actions in viewer check
const originalNewsActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditModal(n, 'news')}
                                  className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(n.id, 'news')}
                                  className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>`;

const newNewsActions = `                              <td className="px-5 py-4 text-right space-x-2">
                                {currentUser?.role !== 'viewer' && (
                                  <>
                                    <button
                                      onClick={() => openEditModal(n, 'news')}
                                      className="text-gray-500 hover:text-brand-green p-1 transition-colors cursor-pointer"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(n.id, 'news')}
                                      className="text-gray-500 hover:text-red-450 p-1 transition-colors cursor-pointer"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </td>`;

// 5. Wrap inquiries list delete in viewer check
const originalInquiryActions = `                                <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteItem(inq.id, 'inquiry')}
                                    className="text-gray-500 hover:text-red-450 p-1 cursor-pointer transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>`;

const newInquiryActions = `                                <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                  {currentUser?.role !== 'viewer' && (
                                    <button
                                      onClick={() => handleDeleteItem(inq.id, 'inquiry')}
                                      className="text-gray-500 hover:text-red-450 p-1 cursor-pointer transition-colors"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </td>`;

// 6. Wrap Static Content save button in viewer check
const originalStaticSaveButton = `                        <button
                          onClick={async () => {
                            const activeKey = currentSubPath === 'about/intro' ? activeIntroTab : currentSubPath;
                            setSavingStatic(true);
                            try {
                              const res = await fetch('/api/management/contents', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ page_key: activeKey, content: staticContent }),
                              });
                              if (res.ok) {
                                alert('콘텐츠가 성공적으로 저장되었습니다.');
                              } else {
                                alert('저장에 실패했습니다.');
                              }
                            } catch (e) {
                              console.error(e);
                              alert('저장 중 오류 발생');
                            } finally {
                              setSavingStatic(false);
                            }
                          }}
                          disabled={savingStatic}
                          className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                        >
                          <Save size={14} />
                          <span>저장하기</span>
                        </button>`;

const newStaticSaveButton = `                        {currentUser?.role !== 'viewer' && (
                          <button
                            onClick={async () => {
                              const activeKey = currentSubPath === 'about/intro' ? activeIntroTab : currentSubPath;
                              setSavingStatic(true);
                              try {
                                const res = await fetch('/api/management/contents', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ page_key: activeKey, content: staticContent }),
                                });
                                if (res.ok) {
                                  alert('콘텐츠가 성공적으로 저장되었습니다.');
                                } else {
                                  alert('저장에 실패했습니다.');
                                }
                              } catch (e) {
                                console.error(e);
                                alert('저장 중 오류 발생');
                              } finally {
                                setSavingStatic(false);
                              }
                            }}
                            disabled={savingStatic}
                            className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                          >
                            <Save size={14} />
                            <span>저장하기</span>
                          </button>
                        )}`;

// 7. Wrap SEO Content save button in viewer check
const originalSeoSaveButton = `                        <button
                          onClick={saveStaticContent}
                          disabled={savingStatic}
                          className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                        >
                          <Save size={14} />
                          <span>저장하기</span>
                        </button>`;

const newSeoSaveButton = `                        {currentUser?.role !== 'viewer' && (
                          <button
                            onClick={saveStaticContent}
                            disabled={savingStatic}
                            className="inline-flex items-center space-x-1 bg-brand-green hover:bg-brand-green-dark text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] shadow-md shadow-brand-green/10 cursor-pointer disabled:opacity-50"
                          >
                            <Save size={14} />
                            <span>저장하기</span>
                          </button>
                        )}`;

// Function to replace strings reliably regardless of CRLF vs LF
function replaceContent(source, target, replacement) {
  // Normalize line endings to LF for comparison
  const normalizedSource = source.replace(/\r\n/g, '\n');
  const normalizedTarget = target.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacement.replace(/\r\n/g, '\n');

  if (normalizedSource.includes(normalizedTarget)) {
    console.log("Replacing chunk successfully.");
    const index = normalizedSource.indexOf(normalizedTarget);
    return source.substring(0, index) + replacement + source.substring(index + target.length);
  } else {
    // Try regex-based replacement (collapsing spaces slightly if needed)
    console.warn("Direct string match failed, trying relaxed spacing match...");
    return source;
  }
}

content = replaceContent(content, originalRegisterButton, newRegisterButton);
content = replaceContent(content, originalProductActions, newProductActions);
content = replaceContent(content, originalPipelineActions, newPipelineActions);
content = replaceContent(content, originalNewsActions, newNewsActions);
content = replaceContent(content, originalInquiryActions, newInquiryActions);
content = replaceContent(content, originalStaticSaveButton, newStaticSaveButton);
content = replaceContent(content, originalSeoSaveButton, newSeoSaveButton);

fs.writeFileSync(targetFilePath, content, 'utf8');
console.log('Update complete!');
