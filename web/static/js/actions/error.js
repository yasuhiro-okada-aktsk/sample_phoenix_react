/*
 TODO readux-actions で error をサポートしたら error を使う
 */
export function createErrorMeta(message) {
  return {
    error: {
      message: message
    }
  }
}
