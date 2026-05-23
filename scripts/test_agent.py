#!/usr/bin/env python3
"""
에이전트 API 로컬 테스트 스크립트
"""

import os
import sys
import json
import requests
from dotenv import load_dotenv

load_dotenv()


def test_agent_api(agent_id: str, message: str, api_url: str = "http://localhost:3000/api/agent_engine"):
    """API 엔드포인트 테스트"""

    payload = {
        "agent_id": agent_id,
        "message": message,
        "user_id": "test_user",
        "session_id": "test_session"
    }

    print(f"\n📤 요청:")
    print(f"  Agent ID: {agent_id}")
    print(f"  Message: {message}")
    print(f"  URL: {api_url}")

    try:
        response = requests.post(api_url, json=payload, timeout=30)
        print(f"\n📥 응답 (HTTP {response.status_code}):")

        if response.status_code == 200:
            data = response.json()
            print(f"  Success: {data.get('success')}")
            print(f"  Agent: {data.get('agent_name')}")
            print(f"  Response:\n    {data.get('response')[:200]}...")
            return True
        else:
            print(f"  Error: {response.text}")
            return False

    except requests.exceptions.ConnectionError:
        print(f"  ❌ 연결 실패: vercel dev 가 실행 중인지 확인하세요")
        return False
    except Exception as e:
        print(f"  ❌ 오류: {str(e)}")
        return False


def main():
    """메인 테스트"""
    print("=" * 60)
    print("🧪 KD Agent House - API 테스트")
    print("=" * 60)

    # 환경 변수 확인
    print("\n✔️  환경 설정 확인...")
    required_env = [
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
    ]

    for var in required_env:
        if os.environ.get(var):
            print(f"  ✅ {var}")
        else:
            print(f"  ⚠️  {var} (선택사항)")

    # API 테스트
    print("\n" + "=" * 60)
    print("🧪 테스트 케이스")
    print("=" * 60)

    test_cases = [
        ("qa_assistant", "EZM이 뭐야?"),
        ("concept_explainer", "Deep Bite를 쉽게 설명해줄래?"),
        ("case_analyzer", "상악 돌출과 개방교합이 있는 환자의 치료계획은?"),
        ("learning_tutor", "나는 초보자인데 어디서부터 시작해야 할까?"),
    ]

    results = []
    for i, (agent_id, message) in enumerate(test_cases, 1):
        print(f"\n[테스트 {i}/{len(test_cases)}]")
        success = test_agent_api(agent_id, message)
        results.append((agent_id, success))

    # 결과 요약
    print("\n" + "=" * 60)
    print("📊 테스트 결과 요약")
    print("=" * 60)

    passed = sum(1 for _, success in results if success)
    total = len(results)

    for agent_id, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"  {status}: {agent_id}")

    print(f"\n총 {passed}/{total} 테스트 통과")

    if passed == total:
        print("\n🎉 모든 테스트 통과! 배포 준비 완료.")
        return 0
    else:
        print("\n⚠️  일부 테스트 실패. 아래를 확인하세요:")
        print("  1. Supabase URL, Key 설정 (.env)")
        print("  2. LLM API 키 설정 (.env)")
        print("  3. 에이전트 데이터 초기화 (setup_supabase.py 실행)")
        return 1


if __name__ == '__main__':
    sys.exit(main())
