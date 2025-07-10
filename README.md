You are a SQL expert. Given the following schema:





LDSM_PREDVR_REQUEST_DETAIL_INFO:  

  description: 평가의뢰서 상세 정보들을 담은 table

  columns:

    - name: NUM

      description: KEY

      dtype: NUMBER



    - name: SEQ

      description: 평가 의뢰 기본 정보 KEY VALUE

      dtype: VARCHAR



      foreign: LDSM_PREDVR_FILE

    - name: EVALUE_ITEM_1

      description: 평가 의뢰서 평가 항목1

      dtype: VARCHAR

      values: 기술의뢰, DVx, 정규, PVX, DOE, DV, QUAL, MAPPING, MAP, 기타



    - name: EVALUE_ITEM_2

      description: 평가 의뢰서 평가 항목 2

      dtype: VARCHAR

      values: 열선가열,Self-DCH,단락,Steam Heat,DCH-Rate,Drop,열노출,Thermal Shock,Change of Temperature,Alternating steam heat,수명,기타,Damp heat, steady-state,압축,방치,과방전,Ripple,DCH-DCIR,Driving,Vibration,CHA-DCIR,과충전,CP capacity,CF/SF,OCV,관통,Damp heat cyclic,급속충전,CHA-Rate,온도별 Capacity,M-shock,A-Shock,Temperature cycling,Salt test



    - name: TYPE

      description: 평가 의뢰 셀 기종

      dtype: VARCHAR



    - name: PROJECT_CODE

      description: 평가 의뢰 과제 코드 

      dtype: VARCHAR



    - name: PROJECT_NAME

      description: 평가 의뢰 과제 명

      dtype: VARCHAR



    - name: BLOCK_ID

      description: 충방전기 호기 

      dtype: VARCHAR



    - name: CH_CHAMBER

      description: 챔버 넘버

      dtype: VARCHAR



    - name: CH_CHANNEL

      description: 채널 번호

      dtype: VARCHAR



    - name: CAPA_STANDARD

      description: 셀의 표준용량

      dtype: VARCHAR



    - name: CAPA_READ_CYCLE

      description: REAL CYCLE 용량

      dtype: VARCHAR



    - name: CELL_ID

      description: 셀 아이디

      dtype: VARCHAR



    - name: CHAMBER_TEMP

      description: 챔버 온도

      dtype: VARCHAR



    - name: COND_CHARGE_RATE

      description: (실험조건) 충전 C-RATE

      dtype: VARCHAR



    - name: COND_DISCHARGE_RATE

      description: (실험조건) 방전 C-RATE

      dtype: VARCHAR



    - name: COND_CUT_OFF

      description: (실험조건) CUT-OFF

      dtype: VARCHAR



    - name: COND_SOC_RANGE

      description: (실험조건) SOC RANGE

      dtype: VARCHAR



    - name: COND_DOD

      description: (실험조건) DOD

      dtype: VARCHAR



    - name: RPT

      description: Cycle주기 (RPT)

      dtype: VARCHAR



    - name: VOLTAGE_RNG

      description: 전압범위

      dtype: VARCHAR



    - name: EQL_CYCLE_CNT

      description: (종료조건) Cycle수 , 수명 및 성능 평가일 경우에만 작성

      dtype: VARCHAR



    - name: EQL_SOH

      description: (종료조건) SOH, 수명 및 성능 평가일 경우에만 작성

      dtype: VARCHAR



    - name: EQL_DCIR

      description: (종료조건) DCIR, 수명 및 성능 평가일 경우에만 작성

      dtype: VARCHAR



    - name: CH_LOCATION_TYPE

      description: 사업장

      dtype: VARCHAR



    - name: CUSTOMER

      description: 고객

      dtype: VARCHAR



    - name: NOMINAL_VOLTAGE

      description: Nominal voltage (공칭전압)

      dtype: VARCHAR



    - name: CAPA_REAL_CYCLE_TEMP

      description: (용량) Real Cycle 온도

      dtype: VARCHAR





LDSM_PREDVR_REPORT_INFO:

  description: 평가의뢰서 세부 사항 

  columns:

    - name: BLOCK_ID

      description: 충방전기 호기 넘버

      dtype: VARCHAR



    - name: BOL_CAPA

      description: BATTERY BEGINNING OF LIFE 용량 

      dtype: VARCHAR



    - name: BOL_DCIR

      description: BATTERY BEGINNING OF LIFE DCIR 값

      dtype: VARCHAR



    - name: CELL_ID

      description: 셀 아이디 고유값

      dtype: VARCHAR



    - name: CHANNEL_NO

      description: 충방전기 호기 내 채널 번호

      dtype: VARCHAR



    - name: CHARGE_C_RATE

      description: 충전 C-RATE

      dtype: VARCHAR



    - name: CHARGE_CUT_OFF

      description: CUT-OFF

      dtype: VARCHAR



    - name: CYCL_CNT

      description: CYCLE COUNT 또는 방치 일수

      dtype: VARCHAR



    - name: DEPARTMENT

      description: 의뢰자 부서

      dtype: VARCHAR



    - name: DISCHARGE_C_RATE

      description: 방전 C-RATE

      dtype: VARCHAR



    - name: DOD

      description: DEPTH OF DISCHARGE

      dtype: VARCHAR



    - name: EVALUE_ITEM

      description: 평가항목

      dtype: VARCHAR

      values: 수명, 방치, 안전성, 환경 or 성능



    - name: EVALUE_TARGET

      description: 평가 대상

      dtype: VARCHAR

      values: 셀 OR 기타



    - name: EVALUE_TYPE

      description: 평가 구분

      dtype: VARCHAR

      values: 개발, 양산, BM OR 기타



    - name: LAST_CAPA

      description: LAST CAPACITY 

      dtype: VARCHAR



    - name: LAST_DCIR

      description: LAST DCIR

      dtype: VARCHAR



    - name: LOCATION_TYPE

      description: 사업장

      dtype: VARCHAR



    - name: LOT_ID

      description: 셀 아이디, 평가 세부 종류 등의 정보를 포함

      dtype: VARCHAR



    - name: NUM

      description: 테이블의 KEY

      dtype: VARCHAR



    - name: PROJECT_CODE

      description: 과제 코드

      dtype: VARCHAR

      foreign key: 



    - name: PROJECT_CUSTOMER

      description: 고객사 

      dtype: VARCHAR

      

      

    - name: ROW_KEY

      description: 모판데이터 KEY VALUE

      dtype: VARCHAR

    

    - name: RPT

      description: REFERENCE PERFORMANCE TEST 값

      dtype: VARCHAR      

      

    - name: SOC

      description: STATE OF CHARGE 값 %

      dtype: VARCHAR



    - name: SOC_RANGE

      description: SOC 범위

      dtype: VARCHAR



    - name: TEMPERATURE

      description: 평가 온도 

      dtype: VARCHAR      





User question: "수명평가중에서 DOD가 100인 셀 ID들 리스트를 줘, 가능하면 테이블을 조인해줘"



Write an SQL query in standard format.
