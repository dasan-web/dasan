const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'en', 'about', '[[...slug]]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the placeholder for /about/esg/ethics
const esgEthicsFallback = `              <div className="text-center text-gray-500 py-12">
                (The entered text will be displayed here)
              </div>`;

const esgEthicsEnglishContent = `              <div className="space-y-12 text-left w-full">
                <section>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    1. ESG Management Vision (Slogan)
                  </h3>
                  <h4 className="text-lg text-brand-blue font-bold mb-4">
                    Dasan Pharmaceutical\\'s Promise to Heal Tomorrow with Righteous Management
                  </h4>
                  <p className="text-[15px] text-gray-600 leading-[1.8] whitespace-pre-wrap">
                    Based on our founding philosophy of 'Aemin (Love for the People)', Dasan Pharmaceutical opens a sustainable healthcare future by establishing an eco-friendly process that considers the Environment (E), a safe workplace that coexists with Society (S), and a transparent and upright Governance (G).
                  </p>
                </section>

                <section>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    2. Performance by Core Area (ESG Pillars)
                  </h3>
                  
                  <div className="mb-8">
                    <h4 className="text-lg text-brand-blue font-bold mb-4">Environmental | Eco-friendly Management (E)</h4>
                    <p className="text-[15px] text-gray-600 leading-[1.8] mb-4">
                      Protecting human health begins with creating a healthy Earth. Dasan Pharmaceutical is creating an eco-friendly production ecosystem that minimizes environmental impact.
                    </p>
                    <ul className="list-disc pl-4 text-[15px] text-gray-600 space-y-2">
                      <li><strong>ISO 14001 (Environmental Management System) Certification:</strong> We systematically operate an environmental management system that meets global standards.</li>
                      <li><strong>Smart Eco-Factory Establishment:</strong> Selected for the support project by the Ministry of Environment and Korea Environment Corporation, we are advancing our eco-friendly manufacturing infrastructure, such as reducing pollutant emissions and improving energy efficiency.</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg text-brand-blue font-bold mb-4">Social | Social Responsibility and Safety Management (S)</h4>
                    <p className="text-[15px] text-gray-600 leading-[1.8] mb-4">
                      The safety of our employees is the foundation of quality, and their growth is our corporate competitiveness. Dasan Pharmaceutical realizes the value of coexistence where everyone is safe and happy.
                    </p>
                    <ul className="list-disc pl-4 text-[15px] text-gray-600 space-y-2">
                      <li><strong>ISO 45001 (Occupational Health and Safety Management System) Certification:</strong> We proactively manage and prevent risk factors in the workplace to maintain a safe working environment of 'Zero Severe Accidents'.</li>
                      <li><strong>Aiming for a Great Workplace:</strong> Based on being selected as a Youth-Friendly Small Hidden Champion and a Good Job Company, we are creating a healthy organizational culture where safety, work, and life are in harmony.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg text-brand-blue font-bold mb-4">Governance | Transparent and Thorough Righteous Management (G)</h4>
                    <p className="text-[15px] text-gray-600 leading-[1.8] mb-4">
                      Inheriting the 'Seeking Truth from Facts' spirit of Dasan Jeong Yak-yong, we prove the market's trust with transparent and clean management processes rather than empty theories.
                    </p>
                    <ul className="list-disc pl-4 text-[15px] text-gray-600 space-y-2">
                      <li><strong>ISO 37001 (Anti-Bribery Management System) Certification:</strong> We establish a company-wide anti-corruption policy and ethical management system to thoroughly control risks and lead a transparent transaction culture.</li>
                      <li><strong>Official Satisfaction of K-ESG Indicators:</strong> By securing a governance system and disclosure capabilities that meet the Korean ESG (K-ESG) guidelines, we continue to maximize shareholder value and transparent management befitting a listed company.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    3. ESG Certification Status (Certifications)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h5 className="font-bold text-gray-900 mb-1">ISO 14001</h5>
                      <p className="text-xs text-gray-500">Environmental Management System Certification</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h5 className="font-bold text-gray-900 mb-1">ISO 45001</h5>
                      <p className="text-xs text-gray-500">Occupational Health and Safety Management System Certification</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h5 className="font-bold text-gray-900 mb-1">ISO 37001</h5>
                      <p className="text-xs text-gray-500">Anti-Bribery Management System Certification</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <h5 className="font-bold text-gray-900 mb-1">K-ESG</h5>
                      <p className="text-xs text-gray-500">Korean ESG Indicator Satisfaction</p>
                    </div>
                  </div>
                </section>
              </div>`;

content = content.replace(esgEthicsFallback, esgEthicsEnglishContent);

// Replace the fallback for /about/esg/environment and /about/esg/safety
const esgEnvSafetyFallback = `                <p className="text-gray-600 text-sm leading-relaxed">
                  다산제약은 신약 개발을 통한 보건 기여뿐만 아니라 미래 세대를 위한 친환경 공정 도입, 철저한 안전 보건 관리, 투명하고 정의로운 윤리경영 실현을 약속합니다.
                </p>
                <div className="p-4 bg-emerald-50/50 rounded-lg text-xs space-y-2">
                  <p><strong>E (Environment)</strong>: 친환경 고효율 정화 시스템 가동 및 에너지 사용 절감 목표 수립</p>
                  <p><strong>S (Social)</strong>: 임직원 안전을 위한 ISO45001(안전보건경영) 시스템 정밀 준수 및 정기 검진</p>
                  <p><strong>G (Governance)</strong>: 부패 방지 가이드라인 실천과 임직원 자율적 공정거래 자율준수 프로그램(CP) 교육 의무화</p>
                </div>`;

const esgEnvSafetyEnglishContent = `                <p className="text-gray-600 text-sm leading-relaxed">
                  Dasan Pharmaceutical promises not only to contribute to healthcare through new drug development, but also to introduce eco-friendly processes for future generations, strictly manage health and safety, and realize transparent and upright ethical management.
                </p>
                <div className="p-4 bg-emerald-50/50 rounded-lg text-xs space-y-2">
                  <p><strong>E (Environment)</strong>: Operating eco-friendly high-efficiency purification systems and establishing energy reduction goals</p>
                  <p><strong>S (Social)</strong>: Strict compliance with ISO45001 (Health & Safety Management) system and regular check-ups for employee safety</p>
                  <p><strong>G (Governance)</strong>: Practicing anti-corruption guidelines and making autonomous fair trade compliance programs (CP) training mandatory for employees</p>
                </div>`;

content = content.replace(esgEnvSafetyFallback, esgEnvSafetyEnglishContent);

fs.writeFileSync(filePath, content);
console.log('Fixed esg/ethics, esg/environment, esg/safety text!');
