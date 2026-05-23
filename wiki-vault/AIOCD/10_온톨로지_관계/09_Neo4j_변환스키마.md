# Neo4j 그래프 데이터베이스 스키마

## 1. 노드 유형 (Node Types)

```cypher
-- 플랫폼 노드
Platform {
  id: String (primary key)
  name: String
  description: String
  type: String (AIOCD, GEO_SCORE_AI, MEDVO, INSIGHT_BANK, AX_ONTOLOGY)
}

-- 기능 노드
Function {
  id: String
  name: String
  platform: String (AIOCD 내 기능)
  input: String
  output: String
  sequence: Integer
}

-- 고객 문제 노드
CustomerProblem {
  id: String
  name: String
  customerType: String (ORTHODONTIST, HOSPITAL, PATIENT, SOCIETY)
  impact: String
}

-- 성과 지표 노드
KPI {
  id: String
  name: String
  currentValue: Float
  targetValue: Float
  unit: String
  timeframe: String
}

-- 데이터 노드
Data {
  id: String
  name: String
  format: String
  source: String (AIOCD, MEDVO, etc)
}

-- 상품 노드
Product {
  id: String
  name: String
  platforms: List[String]
  monthlyPrice: Integer
  expectedRevenue: Integer
}

-- 특허 아이디어 노드
Patent {
  id: String
  name: String
  technologies: List[String]
  novelty: String (HIGH, MEDIUM, LOW)
  relatedPatents: List[String]
}
```

---

## 2. 관계 유형 (Relationship Types)

```cypher
-- 기능 흐름
(Function)-[FEEDS_INTO]->(Function)
  Properties: sequence, dataType

-- 데이터 흐름
(Function)-[GENERATES]->(Data)
  Properties: priority
(Data)-[USED_BY]->(Function)
  Properties: usage

-- 문제 해결
(Function)-[SOLVES]->(CustomerProblem)
  Properties: effectiveness, impact

-- 플랫폼 연결
(Platform)-[CONNECTS_TO]->(Platform)
  Properties: relationship_type (진입, 전환, 데이터, 신뢰, 수익)

-- 성과 측정
(Function)-[IMPROVES]->(KPI)
  Properties: impact_level

-- 상품 통합
(Platform)-[BELONGS_TO_PACKAGE]->(Product)
  Properties: role, pricing

-- 특허 기술
(Function)-[ENABLES_PATENT]->(Patent)
  Properties: essentiality (CORE, SUPPORTING, OPTIONAL)
```

---

## 3. Neo4j Cypher 생성 스크립트

### A. 플랫폼 생성

```cypher
-- 플랫폼 노드 생성
CREATE (aiocd:Platform {
  id: 'AIOCD',
  name: 'AIOCD',
  description: '교정진단 자동화 플랫폼',
  type: 'AIOCD'
})

CREATE (geo:Platform {
  id: 'GEO_SCORE_AI',
  name: 'GEO Score AI',
  description: '병원 마케팅 진단 플랫폼',
  type: 'GEO_SCORE_AI'
})

CREATE (medvo:Platform {
  id: 'MEDVO',
  name: 'MedVo',
  description: '다국어 상담통역 플랫폼',
  type: 'MEDVO'
})

CREATE (insight:Platform {
  id: 'INSIGHT_BANK',
  name: 'Insight Bank Hub',
  description: '신뢰 콘텐츠 미디어 플랫폼',
  type: 'INSIGHT_BANK'
})

CREATE (ax:Platform {
  id: 'AX_ONTOLOGY_OS',
  name: 'AX Ontology OS',
  description: '병원 업무 분석 플랫폼',
  type: 'AX_ONTOLOGY'
})
```

### B. AIOCD 기능 생성

```cypher
-- AIOCD 내 8개 기능
CREATE (f1:Function {
  id: 'AIOCD_F1',
  name: 'AI 부정교합 분류',
  platform: 'AIOCD',
  input: '치과이미지',
  output: '부정교합분류, 난이도등급',
  sequence: 1
})

CREATE (f2:Function {
  id: 'AIOCD_F2',
  name: '세팔로메트리 분석',
  platform: 'AIOCD',
  input: '3D/2D세팔로데이터',
  output: '각도값, 거리값, 편차분석',
  sequence: 2
})

-- ... (F3~F8 동일하게 생성)
```

### C. 플랫폼 간 연결

```cypher
-- AIOCD → GEO Score AI
MATCH (aiocd:Platform {id: 'AIOCD'}), (geo:Platform {id: 'GEO_SCORE_AI'})
CREATE (aiocd)-[r:CONNECTS_TO {
  relationship_type: '진입',
  description: 'AIOCD는 GEO의 진단 진입도구'
}]->(geo)

-- AIOCD → MedVo
MATCH (aiocd:Platform {id: 'AIOCD'}), (medvo:Platform {id: 'MEDVO'})
CREATE (aiocd)-[r:CONNECTS_TO {
  relationship_type: '전환',
  description: '진단데이터 → 상담설명',
  dataFlow: true
}]->(medvo)

-- AIOCD → Insight Bank Hub
MATCH (aiocd:Platform {id: 'AIOCD'}), (insight:Platform {id: 'INSIGHT_BANK'})
CREATE (aiocd)-[r:CONNECTS_TO {
  relationship_type: '신뢰',
  description: '콘텐츠 → 기사화'
}]->(insight)

-- MedVo → AIOCD (역방향 - 데이터 피드백)
MATCH (medvo:Platform {id: 'MEDVO'}), (aiocd:Platform {id: 'AIOCD'})
CREATE (medvo)-[r:CONNECTS_TO {
  relationship_type: '피드백',
  description: '상담데이터 → 콘텐츠개선'
}]->(aiocd)
```

### D. 데이터 흐름

```cypher
-- AIOCD F1 → F2
MATCH (f1:Function {id: 'AIOCD_F1'}), (f2:Function {id: 'AIOCD_F2'})
CREATE (f1)-[r:FEEDS_INTO {
  sequence: 1,
  dataType: '부정교합분류'
}]->(f2)

-- F3이 데이터 생성
MATCH (f3:Function {id: 'AIOCD_F3'}), (d1:Data {id: 'DATA_TREATMENT_PLAN'})
CREATE (f3)-[r:GENERATES {priority: 'HIGH'}]->(d1)

-- MedVo가 데이터 사용
MATCH (d1:Data {id: 'DATA_TREATMENT_PLAN'}), (medvo:Platform {id: 'MEDVO'})
CREATE (d1)-[r:USED_BY {usage: '상담설명자료'}]->(medvo)
```

### E. 문제 해결 매핑

```cypher
-- F1이 P1 (진단시간 부족) 해결
MATCH (f1:Function {id: 'AIOCD_F1'}), (p1:CustomerProblem {id: 'PROBLEM_DIAGNOSIS_TIME'})
CREATE (f1)-[r:SOLVES {
  effectiveness: 'HIGH',
  impact: '20분→3분 단축'
}]->(p1)

-- F4 + F5가 P3 (환자설득) 해결
MATCH (f4:Function {id: 'AIOCD_F4'}), (f5:Function {id: 'AIOCD_F5'}), (p3:CustomerProblem {id: 'PROBLEM_PATIENT_PERSUASION'})
CREATE (f4)-[r1:SOLVES {effectiveness: 'HIGH'}]->(p3),
       (f5)-[r2:SOLVES {effectiveness: 'HIGH'}]->(p3)
```

### F. 성과 지표 연결

```cypher
-- 함수가 KPI 개선
MATCH (f1:Function {id: 'AIOCD_F1'}), (kpi1:KPI {id: 'KPI_DIAGNOSIS_EFFICIENCY'})
CREATE (f1)-[r:IMPROVES {
  impact_level: 'HIGH',
  expectedImprovement: '+50%'
}]->(kpi1)
```

---

## 4. 조회 쿼리 예시

### 쿼리 1: AIOCD의 모든 연결 플랫폼 조회

```cypher
MATCH (aiocd:Platform {id: 'AIOCD'})-[r:CONNECTS_TO]->(other:Platform)
RETURN other.name, r.relationship_type, r.description
```

### 쿼리 2: P1 (진단시간 부족)을 해결하는 모든 기능

```cypher
MATCH (func:Function)-[r:SOLVES]->(problem:CustomerProblem {id: 'PROBLEM_DIAGNOSIS_TIME'})
RETURN func.name, func.platform, r.effectiveness, r.impact
```

### 쿼리 3: AIOCD 데이터가 어디로 흐르는가?

```cypher
MATCH (aiocd:Platform {id: 'AIOCD'})<-[:GENERATES]-(f:Function)-[:GENERATES]->(d:Data)-[:USED_BY]->(other)
RETURN f.name, d.name, other.name, other.type
```

### 쿼리 4: 4개 플랫폼 통합의 데이터 사이클

```cypher
MATCH path = (aiocd:Platform)-[*1..3]-(geo:Platform {id: 'GEO_SCORE_AI'})
RETURN path
```

### 쿼리 5: 각 플랫폼의 ROI 기여도

```cypher
MATCH (platform:Platform)-[r:IMPROVES]->(kpi:KPI)
RETURN platform.name, kpi.name, r.impact_level, kpi.targetValue
```

---

## 5. 그래프 시각화 (Neo4j Browser)

### 구조도
```
AIOCD (중앙 허브)
├─ 내부 연쇄: F1→F2→F3→F4/F5/F6, F7→F8
├─ GEO Score AI (진입/성과측정)
├─ MedVo (데이터/피드백)
├─ Insight Bank Hub (신뢰/콘텐츠)
└─ AX Ontology OS (최적화)
```

### 복잡도
- **노드**: 50+ (플랫폼 5, 기능 15, 문제 6, KPI 8, 데이터 10, 상품 5, 특허 5)
- **관계**: 70+ (기능흐름, 데이터, 문제해결, 플랫폼연결 등)
- **깊이**: 최대 4 단계 (AIOCD F1 → 다른 플랫폼 → 다른 기능 → KPI)

---

## 6. 구현 체크리스트

- [ ] Neo4j Desktop 설치
- [ ] 새 데이터베이스 생성 (AIOCD_ONTOLOGY)
- [ ] 위 Cypher 스크립트 실행
- [ ] 데이터 검증 (노드/관계 수 확인)
- [ ] 브라우저에서 시각화 확인
- [ ] 조회 쿼리 테스트
- [ ] API 연동 (Node.js / Python)
- [ ] 정기적 업데이트 프로세스 구축

---

**이 스키마는 AIOCD 온톨로지를 실제 그래프로 구현할 수 있게 합니다.**

