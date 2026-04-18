// 婚禮基本資訊 — 請在此修改新人名稱、日期、地點等資料
export const wedding = {
  groomName: '啟賢',
  brideName: '羽薇',
  date: '2026.11.14',
  time: '中午 12:00',
  venue: '全國大飯店2F',
  venueAddress: '台灣臺中市西區館前路57號',
  mapUrl: 'https://www.google.com/maps/place/%E5%85%A8%E5%9C%8B%E5%A4%A7%E9%A3%AF%E5%BA%97/data=!4m2!3m1!1s0x34693d9d07e49ca1:0x380e1e9dad8a5b5b?sa=X&ved=1t:242&ictx=111',
  music: '/music/wedding-bgm.mp3',  // 放入 MP3 後填路徑，例如 '/music/wedding-bgm.mp3'
}

// 照片分配 — 可依實際拍攝內容調整編號
const p = (n: number) => `/images/photo/LINE_ALBUM_2025.12.28_251231_${n}.jpg`

export const photos = {
  hero: p(1),
  storyMeet: [p(3), p(4), p(5)],
  storyDate: [p(6), p(7), p(8)],
  storyPropose: [p(9), p(10), p(11)],
  emotion: [p(12), p(13), p(14)],
  footer: p(2),
  gallery: Array.from({ length: 32 }, (_, i) => p(i + 1)),
}

export const signs = {
  invitation: '/images/sign/Invitation.webp',
  loveYou: '/images/sign/LoveYou.webp',
  sweetDay: '/images/sign/SweetDay.webp',
  thanks: '/images/sign/Thanks.webp',
}
