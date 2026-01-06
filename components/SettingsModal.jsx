'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { updateMyProfile, getPendingMembers, approveMember, rejectMember } from '@/lib/sheets'
import { X, Save, Smile, ShieldCheck, Check, UserX } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  
  // 내 정보 상태
  const [status, setStatus] = useState('온라인')
  const [message, setMessage] = useState('')
  const [loginId, setLoginId] = useState('')

  // 관리자 기능 상태
  const [pendingList, setPendingList] = useState([])
  const ADMIN_ID = 'jung2358' // ⭐ 관리자 아이디 하드코딩

  // 모달 열릴 때 정보 불러오기
  useEffect(() => {
    if (isOpen) {
      loadMyInfo()
    }
  }, [isOpen])

  // 관리자라면 대기자 명단 불러오기
  useEffect(() => {
    if (loginId === ADMIN_ID) {
      loadPendingList()
    }
  }, [loginId])

  const loadMyInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      const { data: member } = await supabase
        .from('members')
        .select('status, message, login_id')
        .eq('auth_id', user.id)
        .single()
      
      if (member) {
        setStatus(member.status || '온라인')
        setMessage(member.message || '')
        setLoginId(member.login_id)
      }
    }
  }

  const loadPendingList = async () => {
    const list = await getPendingMembers()
    setPendingList(list)
  }

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    try {
      await updateMyProfile(user.id, status, message)
      toast.success('프로필이 업데이트되었습니다!')
      onClose()
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error('업데이트 실패')
    } finally {
      setLoading(false)
    }
  }

  // 승인 핸들러
  const handleApprove = async (id, name) => {
    if(!confirm(`${name}님을 승인하시겠습니까?`)) return
    try {
        await approveMember(id)
        toast.success(`${name}님 승인 완료`)
        loadPendingList() // 목록 새로고침
    } catch(e) {
        toast.error('승인 실패')
    }
  }

  // 거절 핸들러
  const handleReject = async (id, name) => {
    if(!confirm(`${name}님의 가입을 거절(삭제)하시겠습니까?`)) return
    try {
        await rejectMember(id)
        toast.success('거절되었습니다.')
        loadPendingList()
    } catch(e) {
        toast.error('거절 실패')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smile className="text-indigo-500" size={20}/> 설정
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* 바디 (스크롤 가능) */}
        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* 1. 내 상태 설정 */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">내 프로필 설정</h4>
            
            <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase">현재 상태</label>
                <div className="grid grid-cols-3 gap-2">
                {['온라인', '자리비움', '바쁨'].map((s) => (
                    <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        status === s 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                    >
                    <div className={`w-2 h-2 rounded-full inline-block mr-2 ${
                        s === '온라인' ? 'bg-green-400' : s === '자리비움' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    {s}
                    </button>
                ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">오늘의 한마디</label>
                <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="예: 오후 미팅 준비 중 ☕️"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all text-sm"
                />
            </div>

            <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? '저장 중...' : <><Save size={16}/> 내 정보 저장</>}
            </button>
          </div>

          {/* 2. 관리자 전용 구역 (아이디가 일치할 때만 표시) */}
          {loginId === ADMIN_ID && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-2">
                <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                    <ShieldCheck size={16}/> 가입 승인 대기 ({pendingList.length})
                </h4>
                
                {pendingList.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 dark:bg-slate-800 rounded-lg">대기 중인 요청이 없습니다.</p>
                ) : (
                    <div className="space-y-3">
                        {pendingList.map(member => (
                            <div key={member.id} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{member.name} <span className="text-xs font-normal text-slate-500">({member.login_id})</span></p>
                                    <p className="text-xs text-slate-500">{member.department} / {member.position}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => handleApprove(member.id, member.name)} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title="승인">
                                        <Check size={16} />
                                    </button>
                                    <button onClick={() => handleReject(member.id, member.name)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="거절">
                                        <UserX size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}