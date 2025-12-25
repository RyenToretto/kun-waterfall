import mockPage1 from '../data/mockPage1.json'
import mockPage2 from '../data/mockPage2.json'
import mockPage3 from '../data/mockPage3.json'
import mockPage4 from '../data/mockPage4.json'
import mockPage5 from '../data/mockPage5.json'
import mockPage6 from '../data/mockPage6.json'
import mockPage7 from '../data/mockPage7.json'
import mockPage8 from '../data/mockPage8.json'
import mockPage9 from '../data/mockPage9.json'
import mockPage10 from '../data/mockPage10.json'
import mockPage11 from '../data/mockPage11.json'

const mockPages: Record<number, any> = {
  1: mockPage1,
  2: mockPage2,
  3: mockPage3,
  4: mockPage4,
  5: mockPage5,
  6: mockPage6,
  7: mockPage7,
  8: mockPage8,
  9: mockPage9,
  10: mockPage10,
  11: mockPage11,
}

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const curPage = Number(query.curPage) || 1

  // 如果请求的页码超出范围，返回空数据
  if (curPage < 1 || curPage > 11) {
    return {
      result: {
        curPage,
        pageSize: 20,
        totalSize: 212,
        data: [],
      },
      message: {
        code: 200,
        messageInfo: 'ok',
        serverTime: Date.now(),
      },
    }
  }

  // 返回对应页码的 mock 数据
  const pageData = mockPages[curPage]

  return {
    result: {
      ...pageData.result,
      curPage, // 确保返回请求的页码
    },
    message: {
      code: 200,
      messageInfo: 'ok',
      serverTime: Date.now(),
    },
  }
})
