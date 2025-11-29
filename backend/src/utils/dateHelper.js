// 한국 시간(KST, UTC+9) 관련 유틸리티

/**
 * 현재 시간을 한국 시간(KST)으로 반환
 * @returns {Date} 한국 시간 Date 객체
 */
export function getKSTNow() {
  const now = new Date();
  // 현재 UTC 시간에 9시간을 더함
  const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return kstTime;
}

/**
 * Date 객체를 한국 시간 문자열로 포맷
 * @param {Date} date - 포맷할 Date 객체
 * @returns {string} "YYYY-MM-DD HH:mm:ss" 형식의 문자열
 */
export function formatKST(date) {
  if (!date) return '';
  
  const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
  
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');
  const hours = String(kstDate.getUTCHours()).padStart(2, '0');
  const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(kstDate.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
