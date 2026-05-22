// Supabase 초기화
// 프로젝트: yrefhwvpopmqqvgalomt

const SUPABASE_URL = localStorage.getItem('supabase_url') || 'https://yrefhwvpopmqqvgalomt.supabase.co';
const SUPABASE_KEY = localStorage.getItem('supabase_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWZod3Zwb3BtcXF2Z2Fsb210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTg3MDksImV4cCI6MjA5NTAzNDcwOX0.MlrHV8f7xF5Sll3O-L_5DRq6LSKtn8FRcL1PfoNQ9V8';

class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
        this.isConfigured = !!(url && key);
    }

    async request(method, path, body = null) {
        if (!this.isConfigured) {
            console.warn('Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY');
            return null;
        }

        const options = {
            method,
            headers: {
                'apikey': this.key,
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${this.url}/rest/v1${path}`, options);
            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Supabase API error: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error('Supabase request error:', error);
            return null;
        }
    }

    // 진도 데이터 저장 (사용자 인증 필수)
    async saveProgress(userId, progressData) {
        if (!userId) {
            console.error('User ID required for cloud sync');
            return null;
        }
        return this.request('POST', '/progress', {
            user_id: userId,
            phase1: progressData.phase1Progress || 0,
            phase2: progressData.phase2Progress || 0,
            phase3: progressData.phase3Progress || 0,
            hoursSpent: progressData.hoursSpent || 0,
            data: progressData,
            updated_at: new Date().toISOString()
        });
    }

    // 진도 데이터 불러오기 (사용자 인증 필수)
    async getProgress(userId) {
        if (!userId) {
            console.error('User ID required for cloud sync');
            return null;
        }
        return this.request('GET', `/progress?user_id=eq.${userId}`);
    }

    // 사용자 가입
    async signUp(email, password, name) {
        return this.request('POST', '/auth/v1/signup', {
            email,
            password,
            user_metadata: { name }
        });
    }

    // 사용자 로그인
    async signIn(email, password) {
        return this.request('POST', '/auth/v1/token?grant_type=password', {
            email,
            password
        });
    }

    // 노트 저장
    async saveNote(userId, title, content, phase) {
        return this.request('POST', '/notes', {
            user_id: userId,
            title,
            content,
            phase,
            created_at: new Date().toISOString()
        });
    }

    // 노트 불러오기
    async getNotes(userId, phase = null) {
        let query = `/notes?user_id=eq.${userId}`;
        if (phase) {
            query += `&phase=eq.${phase}`;
        }
        return this.request('GET', query);
    }
}

// Supabase 클라이언트 인스턴스
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);

// Supabase 설정 함수
async function configureSupabase() {
    const url = prompt('Supabase URL을 입력하세요:\n(https://[프로젝트명].supabase.co)');
    const key = prompt('Supabase Anon Key를 입력하세요:\n(Settings → API → anon key)');

    if (url && key) {
        localStorage.setItem('supabase_url', url);
        localStorage.setItem('supabase_key', key);

        supabase.url = url;
        supabase.key = key;
        supabase.isConfigured = true;

        alert('✅ Supabase 설정 완료!\n\n데이터베이스 테이블을 생성해야 합니다.\nSupabase 대시보드 → SQL Editor에서 다음을 실행하세요:\n\n' + getSQLSetup());
        return true;
    }
    return false;
}

// SQL 테이블 생성 스크립트
function getSQLSetup() {
    return `-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Progress table
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  phase INTEGER,
  page TEXT,
  status TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT,
  phase INTEGER,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (사용자는 자신의 데이터만 접근)
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);`;
}

// 페이지 로드 시 Supabase 상태 확인
document.addEventListener('DOMContentLoaded', function() {
    if (supabase.isConfigured) {
        console.log('✅ Supabase 연동됨');
        document.body.setAttribute('data-supabase-ready', 'true');
    } else {
        console.log('⚠️ Supabase 미설정. 데이터는 로컬에만 저장됩니다.');
    }
});
