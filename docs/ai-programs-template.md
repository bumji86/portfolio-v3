# AI 프로그램 소개 (Works 추가용) — 작성본

> 구성 결정: 세 프로그램을 **카드 1장으로 묶고**, 본문 안에서 짧은 사례 3개로 보여준다.

---

## 프로그램 1

- **Title (EN)**: Tools I Built with AI
- **Title (KO)**: AI로 직접 만든 업무 도구
- **Card image**: ⟨~/downloads/171454_187707_3021.png⟩
- **Cover image**: ⟨~/downloads/171454_187707_3021.png⟩
- **Tags (EN)**: AI-Assisted Building, Marketing Ops, Market Signals, Automation
- **Tags (KO)**: AI-Assisted Building, Marketing Ops, Market Signals, Automation
- **Built with**: Claude, Qoder (AI coding assistants) · Next.js, TypeScript, SQLite · Chrome extension with on-device OCR · Home server + Cloudflare Tunnel
- **Links**: YouTube Trend Radar — https://radar.sumimasen.dev / Hotdeal Monitor — https://hotdeal.sumimasen.dev ##민감데이터 없음#

**Summary (EN)**: Three work tools I built with AI coding assistants as a non-developer — each one starting from the decision it needed to support, not from the technology.

**Summary (KO)**: 개발자가 아닌 마케터로서 AI와 함께 만든 업무 도구 세 가지--기술이 아니라 "어떤 판단을 돕는가"에서 출발

**Body (EN)**:

I use AI coding assistants to turn recurring workflow problems into practical tools. Each project starts with a clear question: what information would improve the decision, and which steps can be automated reliably?

Reimbursement Submit Assistant
Built a browser extension to address recurring errors in overseas expense reporting, including missing card fees, duplicate records and inconsistent categorization. It processes six receipt formats locally, reconciles charges and applies team-specific rules. Ambiguous cases and final submission remain with the user.

Hotdeal Monitor
Built a cross-platform dashboard to surface purchase-interest signals from Korean deal communities. Updated every two hours, it organizes posts into individual product cards for easier comparison across retailers. Unreadable fields remain blank to prevent uncertain data from becoming misleading information.

YouTube Trend Radar
Built a topic-discovery dashboard that prioritizes recent view growth over cumulative popularity. It distinguishes emerging topics from isolated viral hits and flags data gaps that could distort interpretation. Designed around YouTube API requirements and deployed on a home server, it now supports weekly content planning.

**Body (KO)**:

반복되는 업무 문제를 정의하고, AI 코딩 도구를 활용해 실무에 필요한 도구를 직접 제작했습니다. 의사결정에 필요한 정보와 자동화할 수 있는 작업을 구분하고, 데이터의 정확성과 사람의 판단이 필요한 지점을 기준으로 설계했습니다.

경비 정산 어시스턴트
해외 출장비 정산에서 반복되는 카드 수수료 누락, 증빙 중복과 같은 오류, 그리고 정산으로 소모되는 시간을 줄이기 위해 브라우저 확장 프로그램을 제작했습니다. 증빙 영수증을 업로드하면 OCR을 통해 가격, 비용 유형, 내역 등을 정리하고 이상이 없을 시 사용자가 입력 버튼을 통해 최종 검토하는 프로그램입니다. 통상 월별로 소요되던 2시간 가량의 정산 업무를 단 5분 안으로 줄일 수 있게 되었습니다.

Hotdeal Monitor
국내 핫딜 커뮤니티에 흩어진 구매 관심 신호를 비교할 수 있도록 통합 대시보드를 제작했습니다. 두 시간마다 게시물을 수집하고, 여러 상품이 포함된 글도 개별 상품 카드로 나누어 플랫폼별 상품과 혜택을 쉽게 살펴볼 수 있게 했습니다. 어느 커뮤니티에서 우리 플랫폼과 관련한 관심이 올라오는지 확인할 수 있게 되었습니다.

YouTube Trend Radar
누적 조회수보다 최근 조회수 증가에 주목해, YouTube 안에서 현재 관심이 높아지는 주제를 찾는 대시보드를 제작했습니다. YouTube 안에서만 흐르는 내부 신호를 추정하여, 다음 콘텐츠 제작의 주제 선정에 도움을 주는 의사결정용 프로그램입니다.

- **Reference 1** (image): ⟨~/desktop/Screenshot 2026-10-04 at 11.43.33 PM.png⟩
- **Reference 2** (image): ⟨~/desktop/Screenshot 2026-10-04 at 11.43.58 PM.png⟩

---

## 배치 방식

- [x] **A. 기존 Works 캐러셀에 이어 붙이기** — 카드 1장이라 탭이나 별도 섹션은 과함. 마지막 카드로 두면 "마케팅 실무 → 그 실무를 스스로 개선하는 사람" 순서로 읽힘
- [ ] B. Works 안에서 필터 탭으로 구분
- [ ] C. Works 아래 별도 섹션
