'use client'

import Link from 'next/link'
import { ArrowRight, LayoutDashboard, Calendar, Book, Users, ShieldCheck, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    // h-screen과 overflow-hidden으로 스크롤을 원천 차단하여 '한 페이지' 느낌 구현
    <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* 🌌 배경 효과 (은은한 오로라) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 1. 헤더 (고정) */}
      <header className="flex-none h-20 w-full border-b border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white cursor-default">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <span>N</span>
            </div>
            <span className="tracking-tight">Cams Nexus</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white transition-colors px-4 py-2">
              로그인
            </Link>
            <Link href="/signup" className="relative group overflow-hidden rounded-lg px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md hover:shadow-xl transition-all">
              <span className="relative text-sm font-bold flex items-center gap-1.5">
                팀 합류하기 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 (화면 꽉 채움) */}
      <main className="flex-1 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 relative z-10 h-full max-h-[900px]">
        
        {/* [LEFT] 텍스트 & 액션 영역 */}
        <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            All-in-One Workspace
          </div>
          
          <h1 className="text-5xl xl:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            협업의 모든 것을 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              한눈에, 한곳에서.
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            영업지원팀을 위해 설계된 직관적인 워크스페이스.<br/>
            복잡한 절차 없이, 지금 바로 업무의 본질에 집중하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link href="/login" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              <Zap size={20} className="fill-white"/> 바로 시작하기
            </Link>
            <div className="flex items-center gap-2 px-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck size={16} className="text-green-500"/>
              <span>검증된 보안 시스템</span>
            </div>
          </div>
        </div>

        {/* [RIGHT] 핵심 기능 그리드 (스크롤 없이 바로 확인) */}
        <div className="flex-1 w-full max-w-2xl grid grid-cols-2 gap-4 p-4">
          {[
            { icon: LayoutDashboard, title: '칸반 보드', desc: '직관적인 업무 흐름 관리', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { icon: Calendar, title: '프로젝트 WBS', desc: '체계적인 일정 타임라인', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { icon: Book, title: '팀 지식고', desc: '노하우와 매뉴얼 자산화', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
            { icon: Users, title: '실시간 협업', desc: '팀원 접속 상태 라이브 확인', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            { icon: ShieldCheck, title: '보안 관리', desc: '철저한 데이터 접근 제어', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
            { icon: Zap, title: '빠른 성능', desc: '끊김 없는 최적의 속도', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          ].map((item, idx) => (
            <div key={idx} className="group relative p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-white/50 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all hover:scale-[1.02] hover:shadow-xl cursor-default">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* 3. 푸터 (최하단 고정) */}
      <footer className="flex-none py-6 text-center text-xs text-slate-400 dark:text-slate-600">
        © 2026 Cams Nexus. Designed for Won-ga Team.
      </footer>
    </div>
  )
}