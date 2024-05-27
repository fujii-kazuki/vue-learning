// Utilities
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  /******************
  State
  ******************/
  // レビュー + 書籍情報
  const books = ref([])
  // 現在編集 / 選択中の書籍
  const current = reactive(null)

  /******************
  Getters
  ******************/
  // 登録済みのレビュー数
  const getBookCount = computed(() => {
    return books.length
  })
  // 指定されたページのレビュー情報（引数はページ番号）
  const getRangeByPage = computed(page => {
    const SIZE = 3
    return books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
  })
  // 指定されたidのレビュー情報（引数idをキーに配列booksを検索）
  const getBookById = computed(id => {
      return books.find(book => book.id === id)
  })

  /******************
  Actions
  ******************/
  // 編集中の書籍（current）を更新
  function updateCurrent(payload) {
    current = payload
  }
  // レビュー情報を更新（引数payloadは更新された書籍情報）
  function updateBook(payload) {
    // id値（payload.id）で既存のレビューを検索
    const b = getBookById(payload.id)
    if (b) {
      // 既存のレビュー情報がある場合は、更新情報（payload）で上書き
      Object.assign(b, payload)
    } else {
      // 既存の情報が無ければ、新規としてthis.booksに追加
      books.push(payload)
    }
  }

  return {
    books,
    current,
    getBookCount,
    getRangeByPage,
    getBookById,
    updateCurrent,
    updateBook
  },
  {
    persist: true //ストアのデフォルト永続設定
  }
})