// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // レビュー + 書籍情報
    books: [],
    // 現在編集 / 選択中の書籍
    current: null
  }),
  getters: {
    // 登録済みのレビュー数
    bookCount: state => {
      return state.books.length
    },
    // 全てのレビュー情報
    allBooks: state => {
      return state.books
    },
    // 指定されたページのレビュー情報（引数はページ番号）
    getRangeByPage: state => {
      return page => {
        const SIZE = 3
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    },
    // 指定されたidのレビュー情報
    getBookById: state => {
      // 引数idをキーに配列booksを検索
      return id => {
        return state.books.find(book => book.id === id)
      }
    },
    // 現在編集中の書籍
    current: state => {
      return state.current;
    },
  },
  actions: {
    // 編集中の書籍（current）を更新
    updateCurrent: (payload) => {
      this.current = payload
    },
    // レビュー情報を更新（引数payloadは更新された書籍情報）
    updateBook: (payload) => {
      // id値（payload.id）で既存のレビューを検索
      const b = this.getters.getBookById(payload.id)
      if (b) {
        // 既存のレビュー情報がある場合は、更新情報（payload）で上書き
        Object.assign(b, payload)
      } else {
        // 既存の情報が無ければ、新規としてthis.booksに追加
        this.books.push(payload)
      }
    }
  },
  
})
